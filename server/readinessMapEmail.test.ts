import { describe, expect, it, vi } from "vitest";
import {
  buildReadinessMapDeliveryMessage,
  sendReadinessMapDelivery,
} from "./readinessMapEmail";

describe("Readiness Map SendGrid delivery", () => {
  it("builds a transactional message with a safe fallback greeting and no promotion", () => {
    const message = buildReadinessMapDeliveryMessage({
      email: "person@example.com",
    });

    expect(message.to).toBe("person@example.com");
    expect(message.from).toEqual({
      email: "support@beaconmomentum.com",
      name: "Beacon Momentum",
    });
    expect(message.replyTo).toBe("support@beaconmomentum.com");
    expect(message.subject).toBe("Your Beacon Readiness Map is ready");
    expect(message.text).toContain("Hi there,");
    expect(message.text).toContain(
      "https://beaconmomentum.com/downloads/readiness-map",
    );
    expect(message.html).toContain("Privacy Policy");
    expect(message.text).not.toMatch(/field kit|the watch|beacon labs|\$37/i);
  });

  it("uses a server-provided sender identity and escapes a first name in HTML", () => {
    const message = buildReadinessMapDeliveryMessage(
      { email: "person@example.com", firstName: "Mira <Lee>" },
      { fromEmail: "deliver@beaconmomentum.com", fromName: "Beacon Delivery" },
    );

    expect(message.from).toEqual({
      email: "deliver@beaconmomentum.com",
      name: "Beacon Delivery",
    });
    expect(message.html).toContain("Mira &lt;Lee&gt;");
  });

  it("fails closed when SendGrid is unavailable", async () => {
    await expect(
      sendReadinessMapDelivery(
        { email: "person@example.com" },
        { apiKey: "", sendGridClient: { setApiKey: vi.fn(), send: vi.fn() } },
      ),
    ).rejects.toThrow("sendgrid_not_configured");
  });

  it("sends only the built transactional message through the server-side client", async () => {
    const setApiKey = vi.fn();
    const send = vi.fn().mockResolvedValue([{ statusCode: 202 }]);

    await sendReadinessMapDelivery(
      { email: "person@example.com", firstName: "Mira" },
      {
        apiKey: "test-server-key",
        sendGridClient: { setApiKey, send },
      },
    );

    expect(setApiKey).toHaveBeenCalledWith("test-server-key");
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "person@example.com",
        subject: "Your Beacon Readiness Map is ready",
      }),
    );
  });
});
