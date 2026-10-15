export type BeaconAnalyticsConsent = "granted" | "denied" | null;

type AnalyticsEventProperties = Record<string, string | number | boolean>;

type UmamiClient = {
  track: (eventName: string, data?: AnalyticsEventProperties) => void;
};

declare global {
  interface Window {
    umami?: UmamiClient;
    beaconUmamiBeforeSend?: (type: string, payload: unknown) => unknown;
  }
}

export const BEACON_ANALYTICS_CONSENT_KEY = "beacon_analytics_consent";
const UMAMI_DISABLED_KEY = "umami.disabled";
const UMAMI_SCRIPT_ID = "beacon-umami-analytics";
const UMAMI_WEBSITE_ID = "ac5cc381-7386-4841-aa9a-212f31a6ab38";
const ANALYTICS_READY_EVENT = "beacon:analytics-ready";
const UTM_PARAMETERS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

function inBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function canLoadProductionAnalytics(): boolean {
  return inBrowser() && window.location.hostname === "beaconmomentum.com";
}

function consentStorage(): Storage | null {
  if (!inBrowser()) return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/**
 * Returns the current affirmative choice. Legacy values deliberately return null
 * so visitors see the updated first-party measurement explanation once.
 */
export function getBeaconAnalyticsConsent(): BeaconAnalyticsConsent {
  const saved = consentStorage()?.getItem(BEACON_ANALYTICS_CONSENT_KEY);
  return saved === "granted" || saved === "denied" ? saved : null;
}

export function setBeaconAnalyticsConsent(
  consent: Exclude<BeaconAnalyticsConsent, null>,
): void {
  const storage = consentStorage();
  if (!storage) return;

  storage.setItem(BEACON_ANALYTICS_CONSENT_KEY, consent);

  if (consent === "granted") {
    storage.removeItem(UMAMI_DISABLED_KEY);
  } else {
    // The Umami client checks this before each send, including after it has loaded.
    storage.setItem(UMAMI_DISABLED_KEY, "1");
  }
}

export function resetBeaconAnalyticsConsent(): void {
  const storage = consentStorage();
  if (!storage) return;

  storage.removeItem(BEACON_ANALYTICS_CONSENT_KEY);
  storage.removeItem(UMAMI_DISABLED_KEY);
}

function onlyCampaignParameters(rawUrl: string): string {
  try {
    const url = new URL(
      rawUrl,
      inBrowser() ? window.location.origin : "https://beaconmomentum.com",
    );
    const campaign = new URLSearchParams();

    for (const name of UTM_PARAMETERS) {
      const value = url.searchParams.get(name);
      if (value) campaign.set(name, value);
    }

    url.search = campaign.toString();
    url.hash = "";
    return url.toString();
  } catch {
    return rawUrl;
  }
}

function stripReferrerQuery(rawReferrer: unknown): unknown {
  if (typeof rawReferrer !== "string" || !rawReferrer) return rawReferrer;

  try {
    const referrer = new URL(
      rawReferrer,
      inBrowser() ? window.location.origin : "https://beaconmomentum.com",
    );
    referrer.search = "";
    referrer.hash = "";
    return referrer.toString();
  } catch {
    return rawReferrer;
  }
}

/**
 * Keeps first-party campaign attribution while dropping arbitrary query strings
 * and referrer queries before Umami receives an event payload.
 */
export function beaconUmamiBeforeSend(_type: string, payload: unknown): unknown {
  if (!payload || typeof payload !== "object") return payload;

  const event = payload as Record<string, unknown>;
  return {
    ...event,
    ...(typeof event.url === "string" ? { url: onlyCampaignParameters(event.url) } : {}),
    ...(event.referrer ? { referrer: stripReferrerQuery(event.referrer) } : {}),
  };
}

export function loadBeaconAnalytics(): void {
  if (
    !canLoadProductionAnalytics() ||
    getBeaconAnalyticsConsent() !== "granted" ||
    document.getElementById(UMAMI_SCRIPT_ID)
  ) {
    return;
  }

  window.beaconUmamiBeforeSend = beaconUmamiBeforeSend;

  const script = document.createElement("script");
  script.id = UMAMI_SCRIPT_ID;
  script.defer = true;
  script.src = "/umami/script.js";
  script.dataset.websiteId = UMAMI_WEBSITE_ID;
  script.dataset.beforeSend = "beaconUmamiBeforeSend";
  script.onload = () => window.dispatchEvent(new Event(ANALYTICS_READY_EVENT));
  document.head.appendChild(script);
}

export function trackBeaconEvent(
  eventName: string,
  properties: AnalyticsEventProperties,
): void {
  if (!inBrowser() || getBeaconAnalyticsConsent() !== "granted") return;

  const send = () => window.umami?.track(eventName, properties);

  if (window.umami) {
    send();
  } else {
    window.addEventListener(ANALYTICS_READY_EVENT, send, { once: true });
  }
}

export function buildSignalCampaignUrl(
  pathname: string,
  source: "beacon_updates" | "linkedin" | "facebook" | "x",
  content: string,
): string {
  const url = new URL(pathname, "https://beaconmomentum.com");
  url.searchParams.set("utm_source", source);
  url.searchParams.set(
    "utm_medium",
    source === "beacon_updates" ? "email" : "organic_social",
  );
  url.searchParams.set("utm_campaign", "signal_oct_2026");
  url.searchParams.set("utm_content", content);
  return url.toString();
}
