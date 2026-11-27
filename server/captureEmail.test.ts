import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildCaptureNotification,
  CAPTURE_FROM_EMAIL,
  CAPTURE_NOTIFY_TO,
  deliverPublicCapture,
  isHoneypotTriggered,
} from "./captureEmail";

describe("public capture email delivery", () => {
  const priorNotify = process.env.MOMENTUM_CAPTURE_NOTIFY_TO;
  const priorFrom = process.env.MOMENTUM_CAPTURE_FROM_EMAIL;

  afterEach(() => {
    if (priorNotify === undefined) delete process.env.MOMENTUM_CAPTURE_NOTIFY_TO;
    else process.env.MOMENTUM_CAPTURE_NOTIFY_TO = priorNotify;
    if (priorFrom === undefined) delete process.env.MOMENTUM_CAPTURE_FROM_EMAIL;
    else process.env.MOMENTUM_CAPTURE_FROM_EMAIL = priorFrom;
  });

  it("builds a contact notification to admin@ with reply-to set to the submitter", () => {
    const message = buildCaptureNotification(
      {
        event: "contact_inquiry",
        email: "person@example.com",
        firstName: "Person",
        lastName: "Example",
        phone: "+1 555 0100",
        subject: "General Question",
        message: "Please tell me how to get started.",
        consentVersion: "beacon-contact-v1",
      },
      "req-1",
      "2026-11-26T21:00:00.000Z",
    );

    expect(message.to).toEqual([...CAPTURE_NOTIFY_TO]);
    expect(message.to).toEqual(["admin@beaconmomentum.com"]);
    expect(message.from).toEqual({
      email: CAPTURE_FROM_EMAIL,
      name: "Beacon Momentum",
    });
    expect(message.replyTo).toBe("person@example.com");
    expect(message.subject).toContain("Contact form: person@example.com");
    expect(message.text).toContain("Please tell me how to get started.");
    expect(message.text).toContain("No auto-reply was sent to the submitter.");
    expect(message.text).not.toContain("hello@beaconlabs.ai");
  });

  it("treats a filled website field as a honeypot", () => {
    expect(isHoneypotTriggered({ website: "" })).toBe(false);
    expect(isHoneypotTriggered({})).toBe(false);
    expect(isHoneypotTriggered({ website: "https://spam.example" })).toBe(true);
  });

  it("accepts a honeypot without sending mail and without emailing the bot payload", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "capture-log-"));
    const logPath = path.join(dir, "momentum-capture.jsonl");
    const send = vi.fn();
    const result = await deliverPublicCapture(
      {
        event: "contact_inquiry",
        email: "bot@example.com",
        message: "spam",
        website: "https://spam.example",
      },
      {
        requestId: "hp-1",
        apiKey: "test-key",
        sendGridClient: { setApiKey: vi.fn(), send },
        logPath,
      },
    );

    expect(result).toEqual({ delivered: false, honeypot: true });
    expect(send).not.toHaveBeenCalled();
    const recorded = await readFile(logPath, "utf8");
    expect(recorded).toContain('"honeypot":true');
    expect(recorded).not.toContain("https://spam.example");
  });

  it("records a local log and requires SendGrid to accept the message", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "capture-log-"));
    const logPath = path.join(dir, "momentum-capture.jsonl");
    const setApiKey = vi.fn();
    const send = vi.fn().mockResolvedValue([{ statusCode: 202 }]);
    const result = await deliverPublicCapture(
      {
        event: "contact_inquiry",
        email: "person@example.com",
        firstName: "Search",
        lastName: "Bot",
        message: "TEST from Search Bot",
        consentVersion: "beacon-contact-v1",
      },
      {
        requestId: "req-2",
        apiKey: "test-key",
        sendGridClient: { setApiKey, send },
        logPath,
        now: "2026-11-26T21:00:00.000Z",
      },
    );

    expect(setApiKey).toHaveBeenCalledWith("test-key");
    expect(send).toHaveBeenCalledTimes(1);
    const payload = send.mock.calls[0][0] as { replyTo: string; to: string[] };
    expect(payload.replyTo).toBe("person@example.com");
    expect(payload.to).toEqual(["admin@beaconmomentum.com"]);
    expect(result).toEqual({ delivered: true, honeypot: false, status: 202 });
    const recorded = JSON.parse(await readFile(logPath, "utf8"));
    expect(recorded).toMatchObject({
      requestId: "req-2",
      event: "contact_inquiry",
      email: "person@example.com",
      message: "TEST from Search Bot",
    });
    expect(recorded).not.toHaveProperty("website");
  });

  it("fails closed when SendGrid is not configured", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "capture-log-"));
    await expect(
      deliverPublicCapture(
        {
          event: "newsletter_signup",
          email: "person@example.com",
        },
        { requestId: "req-3", apiKey: "", logPath: path.join(dir, "log.jsonl") },
      ),
    ).rejects.toThrow("not_configured");
  });

  it("fails closed when SendGrid returns a non-success status", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "capture-log-"));
    await expect(
      deliverPublicCapture(
        { event: "newsletter_signup", email: "person@example.com" },
        {
          requestId: "req-4",
          apiKey: "test-key",
          sendGridClient: {
            setApiKey: vi.fn(),
            send: vi.fn().mockResolvedValue([{ statusCode: 401 }]),
          },
          logPath: path.join(dir, "log.jsonl"),
        },
      ),
    ).rejects.toThrow("upstream_rejected");
  });
});
