import sgMail from "@sendgrid/mail";

const READINESS_MAP_URL = "https://beaconmomentum.com/downloads/readiness-map";

type DeliveryInput = {
  email: string;
  firstName?: string;
};

type SendGridClient = {
  setApiKey(apiKey: string): void;
  send(message: {
    to: string;
    from: { email: string; name: string };
    replyTo: string;
    subject: string;
    text: string;
    html: string;
  }): Promise<unknown>;
};

type DeliveryOptions = {
  apiKey?: string;
  fromEmail?: string;
  fromName?: string;
  sendGridClient?: SendGridClient;
};

export function buildReadinessMapDeliveryMessage(
  input: DeliveryInput,
  options: Pick<DeliveryOptions, "fromEmail" | "fromName"> = {},
) {
  const firstName = input.firstName?.trim() || "there";
  const fromEmail = options.fromEmail || "support@beaconmomentum.com";
  const fromName = options.fromName || "Beacon Momentum";
  const subject = "Your Beacon Readiness Map is ready";
  const preheader =
    "A printable, four-part worksheet to help you choose your next honest move.";
  const text = [
    `Hi ${firstName},`,
    "",
    "Your Readiness Map is ready.",
    "",
    "It is a short printable worksheet for choosing one real job, setting a boundary, keeping human judgment visible, and deciding what to do when the result is wrong or unclear.",
    "",
    "Download the Readiness Map (PDF):",
    READINESS_MAP_URL,
    "",
    "Start small. Write what is true today. A visible boundary is a useful result.",
    "",
    "If the link gives you trouble, reply to this email or contact support@beaconmomentum.com.",
    "",
    "— Beacon Momentum",
    "",
    "You received this message because you requested The Readiness Map from Beacon Momentum.",
    "Privacy Policy: https://beaconmomentum.com/privacy",
    "Support: support@beaconmomentum.com",
  ].join("\n");

  return {
    to: input.email,
    from: { email: fromEmail, name: fromName },
    replyTo: "support@beaconmomentum.com",
    subject,
    text,
    html: `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f5f1e8;color:#253537;font-family:Georgia,serif;">
    <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;">${preheader}</span>
    <main style="max-width:620px;margin:0 auto;padding:32px 24px;">
      <div style="background:#ffffff;border:1px solid #d8d0bf;padding:32px;">
        <p style="margin:0 0 22px;color:#17353c;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Beacon Momentum</p>
        <p style="margin:0 0 18px;font-size:17px;line-height:1.6;">Hi ${escapeHtml(firstName)},</p>
        <p style="margin:0 0 18px;font-size:17px;line-height:1.6;">Your Readiness Map is ready.</p>
        <p style="margin:0 0 24px;font-size:17px;line-height:1.6;">It is a short printable worksheet for choosing one real job, setting a boundary, keeping human judgment visible, and deciding what to do when the result is wrong or unclear.</p>
        <p style="margin:0 0 24px;"><a href="${READINESS_MAP_URL}" style="display:inline-block;background:#17353c;color:#ffffff;padding:13px 18px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;">Download the Readiness Map (PDF)</a></p>
        <p style="margin:0 0 18px;font-size:17px;line-height:1.6;">Start small. Write what is true today. A visible boundary is a useful result.</p>
        <p style="margin:0;font-size:15px;line-height:1.6;">If the link gives you trouble, reply to this email or contact <a href="mailto:support@beaconmomentum.com" style="color:#17353c;">support@beaconmomentum.com</a>.</p>
      </div>
      <footer style="padding:20px 4px 0;color:#5d6664;font-family:Arial,sans-serif;font-size:12px;line-height:1.6;">
        <p style="margin:0 0 8px;">You received this message because you requested The Readiness Map from Beacon Momentum.</p>
        <p style="margin:0;"><a href="https://beaconmomentum.com/privacy" style="color:#17353c;">Privacy Policy</a> · <a href="mailto:support@beaconmomentum.com" style="color:#17353c;">Support</a></p>
      </footer>
    </main>
  </body>
</html>`,
  };
}

export async function sendReadinessMapDelivery(
  input: DeliveryInput,
  options: DeliveryOptions = {},
): Promise<void> {
  const apiKey = options.apiKey ?? process.env.SENDGRID_API_KEY ?? "";
  if (!apiKey) throw new Error("sendgrid_not_configured");

  const client = options.sendGridClient ?? sgMail;
  client.setApiKey(apiKey);
  await client.send(buildReadinessMapDeliveryMessage(input, options));
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

type NotificationInput = DeliveryInput & { marketingConsent: boolean; consentVersion: string };

export const READINESS_MAP_NOTIFY_TO = ["hello@beaconlabs.ai", "admin@beaconmomentum.com"];

/** Internal record of a Readiness Map request, sent to Beacon's own inboxes (replaces the cancelled GHL CRM event). */
export function buildReadinessMapNotification(
  input: NotificationInput,
  options: Pick<DeliveryOptions, "fromEmail" | "fromName"> = {},
) {
  const when = new Date().toISOString();
  const text = [
    "New Readiness Map request (beaconmomentum.com).",
    "",
    `Email: ${input.email}`,
    `First name: ${input.firstName?.trim() || "(not given)"}`,
    `Updates consent: ${input.marketingConsent ? "YES (checkbox ticked)" : "no"}`,
    `Consent version: ${input.consentVersion}`,
    `Received: ${when}`,
    "",
    "The worksheet email was sent to the requester. Do not add them to marketing unless consent is YES.",
  ].join("\n");
  return READINESS_MAP_NOTIFY_TO.map((to) => ({
    to,
    from: { email: options.fromEmail || "support@beaconmomentum.com", name: options.fromName || "Beacon Momentum" },
    replyTo: input.email,
    subject: `Readiness Map request: ${input.email}${input.marketingConsent ? " (updates: yes)" : ""}`,
    text,
    html: `<pre style="font-family:Menlo,monospace;font-size:13px;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
  }));
}

export async function sendReadinessMapNotification(
  input: NotificationInput,
  options: DeliveryOptions = {},
): Promise<void> {
  const apiKey = options.apiKey ?? process.env.SENDGRID_API_KEY ?? "";
  if (!apiKey) throw new Error("sendgrid_not_configured");
  const client = options.sendGridClient ?? sgMail;
  client.setApiKey(apiKey);
  for (const message of buildReadinessMapNotification(input, options)) {
    await client.send(message);
  }
}

export { READINESS_MAP_URL };
