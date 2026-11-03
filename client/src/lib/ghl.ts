/**
 * Browser-safe public capture helpers.
 *
 * The browser may submit one of the narrow, reviewed public event types below.
 * Source, tags, CRM location, custom field identifiers, and the HighLevel
 * credential are owned exclusively by the same-origin server relay.
 */

type PathfinderPillar = "life" | "work" | "venture" | "systems" | "labs";

function isPathfinderPillar(value: string): value is PathfinderPillar {
  return ["life", "work", "venture", "systems", "labs"].includes(value);
}

type RelayEvent =
  | { event: "newsletter_signup"; email: string; firstName?: string; consentVersion: string }
  | { event: "starter_pack_request"; email: string; firstName?: string; consentVersion: string }
  | { event: "watch_brief_premium_interest"; email: string; firstName?: string; privacyAcknowledged: true; consentVersion: string }
  | { event: "pathfinder_result"; email: string; firstName?: string; pillar: PathfinderPillar; consentVersion: string }
  | { event: "watch_enrollment_request"; email: string; firstName?: string; privacyAcknowledged: true; consentVersion: string };

async function submitCapture(payload: RelayEvent): Promise<boolean> {
  try {
    const response = await fetch("/api/trpc/capture.submit?batch=1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "0": { json: payload } }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export function subscribeToBeaconBrief(email: string, firstName?: string) {
  return submitCapture({ event: "newsletter_signup", email, firstName, consentVersion: "beacon-brief-v1" });
}

export function requestWatchBriefPremiumDetails(email: string, firstName: string | undefined, privacyAcknowledged: boolean) {
  if (!privacyAcknowledged) return Promise.resolve(false);
  return submitCapture({ event: "watch_brief_premium_interest", email, firstName, privacyAcknowledged: true, consentVersion: "watch-brief-premium-v2" });
}

export function submitPathfinderResult(email: string, pillar: string, _answers?: Record<string, string>, firstName?: string) {
  if (!isPathfinderPillar(pillar)) return Promise.resolve(false);
  return submitCapture({ event: "pathfinder_result", email, firstName, pillar, consentVersion: "pathfinder-result-v1" });
}

export function requestStarterPack(email: string, firstName?: string) {
  return submitCapture({ event: "starter_pack_request", email, firstName, consentVersion: "starter-pack-v1" });
}

export function submitWatchEnrollmentRequest(email: string, firstName: string | undefined, privacyAcknowledged: boolean) {
  if (!privacyAcknowledged) return Promise.resolve(false);
  return submitCapture({ event: "watch_enrollment_request", email, firstName, privacyAcknowledged: true, consentVersion: "watch-enrollment-request-v2" });
}
