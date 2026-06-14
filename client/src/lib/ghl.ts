/**
 * Beacon Momentum — GoHighLevel CRM Integration Utility
 * Design: Deep Water Editorial / Quiet Authority
 *
 * Submits contacts to the Beacon Momentum GHL location.
 * Used by: Newsletter signup, Pathfinder Assessment result capture.
 *
 * GHL Location: Beacon Momentum (vvhkYM6iySBVh5kOcFGM)
 * Base URL: https://services.leadconnectorhq.com
 *
 * Tags applied:
 *   BM_Newsletter       — Beacon Brief newsletter subscriber
 *   BM_Path_Life        — Pathfinder result: Beacon Life
 *   BM_Path_Work        — Pathfinder result: Beacon Work
 *   BM_Path_Venture     — Pathfinder result: Beacon Venture
 *   BM_Path_Systems     — Pathfinder result: Beacon Systems
 *   BM_Path_Labs        — Pathfinder result: Beacon Labs
 *   BM_Pathfinder       — Any Pathfinder Assessment completion
 *
 * SECURITY: API key must be set via VITE_GHL_API_KEY environment variable.
 * Never hardcode credentials in source files.
 */

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_LOCATION_ID = "vvhkYM6iySBVh5kOcFGM";
// Loaded from environment — set VITE_GHL_API_KEY in .env or deployment secrets
const GHL_API_KEY = import.meta.env.VITE_GHL_API_KEY as string;

export interface GHLContactPayload {
  email: string;
  firstName?: string;
  tags?: string[];
  source?: string;
  // GHL v2 requires field ID (not key string) for custom field writes
  customFields?: { id: string; field_value: string }[];
}

// GHL custom field IDs for Beacon Momentum location (vvhkYM6iySBVh5kOcFGM)
// Retrieved via GET /locations/{id}/customFields
const GHL_FIELD_IDS = {
  pathfinder_result: "4KG5TRT5jHFIv4rO7bqg",
  pathfinder_answers: "9zwDjVuo8TNXlRmljoAO",
} as const;

/**
 * Create or update a contact in the Beacon Momentum GHL location.
 * Returns true on success, false on failure.
 */
export async function submitToGHL(payload: GHLContactPayload): Promise<boolean> {
  if (!GHL_API_KEY) {
    console.warn("GHL API key not configured. Set VITE_GHL_API_KEY in environment.");
    return false;
  }

  try {
    const body: Record<string, unknown> = {
      email: payload.email,
      locationId: GHL_LOCATION_ID,
      source: payload.source || "beaconmomentum.com",
      tags: payload.tags || [],
    };

    if (payload.firstName) body.firstName = payload.firstName;
    if (payload.customFields) body.customFields = payload.customFields;

    // Use /contacts/upsert to create-or-update without 400 duplicate errors
    const response = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GHL_API_KEY}`,
        Version: "2021-07-28",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error("GHL upsert failed:", response.status, await response.text());
      return false;
    }

    const data = await response.json();
    return data.succeeded === true || data.succeded === true;
  } catch (err) {
    console.error("GHL submission error:", err);
    return false;
  }
}

/**
 * Subscribe an email to the Beacon Brief newsletter.
 */
export async function subscribeToBeaconBrief(email: string, firstName?: string): Promise<boolean> {
  return submitToGHL({
    email,
    firstName,
    tags: ["BM_Newsletter", "BM_Beacon_Brief"],
    source: "beaconmomentum.com/newsletter",
  });
}

/**
 * Submit a Pathfinder Assessment result to GHL.
 * Tags the contact with their pillar path and BM_Pathfinder.
 */
export async function submitPathfinderResult(
  email: string,
  pillar: string,
  answers?: Record<string, string>,
  firstName?: string
): Promise<boolean> {
  const pillarTag = `BM_Path_${pillar.charAt(0).toUpperCase() + pillar.slice(1)}`;

  // Use field IDs (not key strings) — GHL v2 API requires IDs for custom field writes
  const customFields: { id: string; field_value: string }[] = [
    { id: GHL_FIELD_IDS.pathfinder_result, field_value: pillar },
  ];

  if (answers) {
    customFields.push({
      id: GHL_FIELD_IDS.pathfinder_answers,
      field_value: JSON.stringify(answers),
    });
  }

  return submitToGHL({
    email,
    firstName,
    tags: ["BM_Pathfinder", pillarTag],
    source: "beaconmomentum.com/assessment",
    customFields,
  });
}
