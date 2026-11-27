import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sgMail from "@sendgrid/mail";

export const CAPTURE_NOTIFY_TO = ["admin@beaconmomentum.com"] as const;
export const CAPTURE_FROM_EMAIL = "support@beaconmomentum.com";
export const CAPTURE_FROM_NAME = "Beacon Momentum";

export const EVENT_TITLES: Record<string, string> = {
  contact_inquiry: "Contact form",
  newsletter_signup: "Newsletter signup",
  starter_pack_request: "Starter pack request",
  readiness_map_delivery_requested: "Readiness Map delivery request",
  readiness_map_marketing_consent_granted: "Readiness Map updates consent",
  pathfinder_result: "Pathfinder result",
  watch_brief_premium_interest: "Watch Brief premium interest",
  watch_join: "Watch join request",
  readiness_kit_beta_interest: "AI Workflow Readiness Kit inquiry",
  digital_grandpa_library_interest: "Digital Grandpa library waitlist",
  watch_intake_submission: "Watch intake",
};

export type CaptureNotice = {
  event: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  subject?: string;
  message?: string;
  consentVersion?: string;
  website?: string;
  placement?: string;
  pillar?: string;
  track?: string;
  entryStage?: string;
  answers?: Record<string, string>;
  audience?: string;
  workflow?: string;
  challenge?: string;
  stage?: string;
  paidIntent?: string;
  followUpConsent?: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
};

export function defaultCaptureLogPath() {
  return (
    process.env.MOMENTUM_CAPTURE_LOG ||
    "/var/www/beacon-momentum-www/intake/momentum-capture.jsonl"
  );
}

export function notifyRecipients() {
  const raw = process.env.MOMENTUM_CAPTURE_NOTIFY_TO;
  if (raw && raw.trim()) {
    return raw
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  }
  return [...CAPTURE_NOTIFY_TO];
}

export function isHoneypotTriggered(input: { website?: string }) {
  return Boolean(input.website && input.website.trim().length > 0);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export function eventTitle(event: string) {
  return EVENT_TITLES[event] || event;
}

export function buildCaptureNotification(
  input: CaptureNotice,
  requestId: string,
  receivedAt = new Date().toISOString(),
) {
  const title = eventTitle(input.event);
  const lines = [
    `New ${title} submission (beaconmomentum.com).`,
    "",
    `Event: ${input.event}`,
    `Request ID: ${requestId}`,
    `Received: ${receivedAt}`,
    `Email: ${input.email}`,
    `First name: ${input.firstName?.trim() || "(not given)"}`,
  ];

  if (input.lastName) lines.push(`Last name: ${input.lastName}`);
  if (input.phone) lines.push(`Phone: ${input.phone}`);
  if (input.subject) lines.push(`Subject: ${input.subject}`);
  if (input.placement) lines.push(`Placement: ${input.placement}`);
  if (input.pillar) lines.push(`Pathfinder pillar: ${input.pillar}`);
  if (input.track) lines.push(`Track: ${input.track}`);
  if (input.entryStage) lines.push(`Entry stage: ${input.entryStage}`);
  if (input.audience) lines.push(`Audience: ${input.audience}`);
  if (input.stage) lines.push(`Stage: ${input.stage}`);
  if (input.paidIntent) lines.push(`Paid intent: ${input.paidIntent}`);
  if (input.followUpConsent !== undefined) {
    lines.push(`Follow-up consent: ${input.followUpConsent ? "yes" : "no"}`);
  }
  if (input.workflow) {
    lines.push("", "Workflow:", input.workflow);
  }
  if (input.challenge) {
    lines.push("", "Reliability concern:", input.challenge);
  }
  if (input.answers && Object.keys(input.answers).length > 0) {
    lines.push("", "Intake answers:");
    for (const [key, value] of Object.entries(input.answers)) {
      lines.push(`- ${key}: ${value}`);
    }
  }
  const attribution = [
    input.utmSource && `utm_source=${input.utmSource}`,
    input.utmMedium && `utm_medium=${input.utmMedium}`,
    input.utmCampaign && `utm_campaign=${input.utmCampaign}`,
    input.utmContent && `utm_content=${input.utmContent}`,
  ].filter(Boolean);
  if (attribution.length > 0) {
    lines.push(`Attribution: ${attribution.join("; ")}`);
  }
  if (input.message) {
    lines.push("", "Message:", input.message);
  }
  if (input.consentVersion) {
    lines.push("", `Consent version: ${input.consentVersion}`);
  }
  lines.push(
    "",
    "Reply to this email to answer the requester directly.",
    "No auto-reply was sent to the submitter.",
  );

  const text = lines.join("\n");
  const subjectParts = [`[Beacon Momentum] ${title}: ${input.email}`];
  if (input.subject) subjectParts.push(input.subject);

  return {
    to: notifyRecipients(),
    from: {
      email: process.env.MOMENTUM_CAPTURE_FROM_EMAIL || CAPTURE_FROM_EMAIL,
      name: CAPTURE_FROM_NAME,
    },
    replyTo: input.email,
    subject: subjectParts.join(" — "),
    text,
    html: `<pre style="font-family:Menlo,monospace;font-size:13px;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
  };
}

export async function appendCaptureLog(
  entry: Record<string, unknown>,
  logPath = defaultCaptureLogPath(),
) {
  await mkdir(path.dirname(logPath), { recursive: true, mode: 0o700 });
  await appendFile(logPath, `${JSON.stringify(entry)}\n`, { mode: 0o600 });
}

export class CaptureDeliveryError extends Error {
  constructor(
    readonly reason:
      | "not_configured"
      | "upstream_rejected"
      | "upstream_unavailable",
  ) {
    super(reason);
  }
}

type SendGridClient = {
  setApiKey(apiKey: string): void;
  send(message: unknown): Promise<unknown>;
};

export function sendGridStatus(result: unknown): number | undefined {
  if (Array.isArray(result) && result[0] && typeof result[0] === "object") {
    const first = result[0] as { statusCode?: number };
    if (typeof first.statusCode === "number") return first.statusCode;
  }
  if (result && typeof result === "object" && "statusCode" in result) {
    const status = (result as { statusCode?: number }).statusCode;
    if (typeof status === "number") return status;
  }
  return undefined;
}

export async function deliverPublicCapture(
  input: CaptureNotice,
  options: {
    requestId: string;
    apiKey?: string;
    sendGridClient?: SendGridClient;
    logPath?: string;
    now?: string;
  } = { requestId: "" },
): Promise<{ delivered: boolean; honeypot: boolean; status?: number }> {
  const receivedAt = options.now ?? new Date().toISOString();
  const requestId = options.requestId;
  const logPath = options.logPath ?? defaultCaptureLogPath();

  if (isHoneypotTriggered(input)) {
    try {
      await appendCaptureLog(
        { requestId, event: input.event, receivedAt, honeypot: true },
        logPath,
      );
    } catch {
      console.warn("[capture] honeypot log failed", { requestId });
    }
    return { delivered: false, honeypot: true };
  }

  const { website: _unusedHoneypot, ...safeInput } = input;
  try {
    await appendCaptureLog({ requestId, receivedAt, ...safeInput }, logPath);
  } catch {
    console.warn("[capture] local log failed", { requestId });
  }

  const apiKey = options.apiKey ?? process.env.SENDGRID_API_KEY ?? "";
  if (!apiKey) throw new CaptureDeliveryError("not_configured");

  const client = options.sendGridClient ?? sgMail;
  client.setApiKey(apiKey);
  const message = buildCaptureNotification(input, requestId, receivedAt);
  try {
    const result = await client.send(message);
    const status = sendGridStatus(result);
    if (status !== undefined && (status < 200 || status >= 300)) {
      throw new CaptureDeliveryError("upstream_rejected");
    }
    return { delivered: true, honeypot: false, status };
  } catch (error) {
    if (error instanceof CaptureDeliveryError) throw error;
    throw new CaptureDeliveryError("upstream_unavailable");
  }
}
