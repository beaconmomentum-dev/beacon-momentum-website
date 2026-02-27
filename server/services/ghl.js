/**
 * GHL CRM Client — Beacon Momentum Website
 * CommonJS wrapper for GoHighLevel API v2
 * Used by: stripe_webhook.js (new member sync)
 *
 * Location: Beacon Labs sub-account (Z4OoFmxrotxASibl2PKv)
 * API Key:  GHL_API_KEY env var (pit-491c7d0b-...)
 */

// Native fetch available in Node 18+
const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

function getKey() {
  return process.env.GHL_API_KEY || '';
}

function getLoc() {
  return process.env.GHL_LOCATION_ID || 'Z4OoFmxrotxASibl2PKv';
}

async function ghlFetch(method, path, body) {
  const opts = {
    method,
    headers: {
      'Authorization': `Bearer ${getKey()}`,
      'Content-Type': 'application/json',
      'Version': GHL_VERSION,
    },
  };
  if (body) opts.body = JSON.stringify(body);
  try {
    const res = await fetch(`${GHL_BASE}${path}`, opts);
    const data = await res.json();
    if (!res.ok) {
      console.warn(`[GHL] ${method} ${path} → ${res.status}: ${JSON.stringify(data).slice(0, 200)}`);
    }
    return { ok: res.ok, data };
  } catch (err) {
    console.error(`[GHL] fetch error: ${err.message}`);
    return { ok: false, data: {} };
  }
}

// ── Tags ──────────────────────────────────────────────────────────────────
const TAGS = {
  NEW_LEAD:              'new-lead',
  FOUNDING_MEMBER:       'founding-member',
  CAPITAL_SUITE:         'capital-suite',
  SOLOPRENEUR_LAUNCHPAD: 'solopreneur-launchpad',
  ALL_ACCESS:            'all-access',
  ANNUAL_MEMBER:         'annual-member',
  LIFETIME_MEMBER:       'lifetime-member',
  CHURNED_MEMBER:        'churned-member',
  PAYMENT_COMPLETE:      'payment-complete',
  PAYMENT_FAILED:        'payment-failed',
  BEACON_MOMENTUM:       'beacon-momentum',
};

// ── Custom field keys ─────────────────────────────────────────────────────
const FIELDS = {
  MEMBERSHIP_TIER:    'contact.contactmembership_tier',
  PLAN_TYPE:          'contact.contactplan_type',
  MEMBERSHIP_START:   'contact.contactmembership_start_date',
  STRIPE_CUSTOMER_ID: 'contact.contactstripe_customer_id',
  STRIPE_SUB_ID:      'contact.contactstripe_subscription_id',
};

// ── Find contact by email ─────────────────────────────────────────────────
async function findContactByEmail(email) {
  const { ok, data } = await ghlFetch('GET',
    `/contacts/?locationId=${getLoc()}&query=${encodeURIComponent(email)}&limit=1`
  );
  if (ok && data.contacts?.length > 0) return data.contacts[0];
  return null;
}

// ── Create or update contact ──────────────────────────────────────────────
async function upsertContact(contactData) {
  const payload = { locationId: getLoc(), ...contactData };
  if (contactData.email) {
    const existing = await findContactByEmail(contactData.email);
    if (existing) {
      const { ok, data } = await ghlFetch('PUT', `/contacts/${existing.id}`, payload);
      if (ok) return data.contact || existing;
    }
  }
  const { ok, data } = await ghlFetch('POST', '/contacts/', payload);
  if (ok) return data.contact;
  return null;
}

// ── Add tags ──────────────────────────────────────────────────────────────
async function addTags(contactId, tags) {
  return ghlFetch('POST', `/contacts/${contactId}/tags`, { tags });
}

// ── Update custom fields ──────────────────────────────────────────────────
async function updateCustomFields(contactId, fields) {
  const customFields = Object.entries(fields).map(([key, field_value]) => ({ key, field_value }));
  return ghlFetch('PUT', `/contacts/${contactId}`, {
    locationId: getLoc(),
    customFields,
  });
}

/**
 * Sync a new Beacon Momentum member to GHL.
 * Called by the Stripe webhook on successful subscription.
 *
 * @param {object} memberData
 * @param {string} memberData.email
 * @param {string} memberData.firstName
 * @param {string} memberData.lastName
 * @param {string} memberData.membershipTier  e.g. 'capital-suite'
 * @param {string} memberData.planType        'monthly' | 'annual' | 'lifetime'
 * @param {string} memberData.stripeCustomerId
 * @param {string} memberData.stripeSubId
 */
async function syncNewMember(memberData) {
  const {
    email, firstName, lastName,
    membershipTier, planType,
    stripeCustomerId, stripeSubId,
  } = memberData;

  const contact = await upsertContact({ email, firstName, lastName, source: 'Beacon Momentum' });
  if (!contact) {
    console.error('[GHL] syncNewMember: Failed to upsert contact for', email);
    return null;
  }

  const memberTags = [
    TAGS.BEACON_MOMENTUM,
    TAGS.PAYMENT_COMPLETE,
    membershipTier,
    planType === 'annual'   ? TAGS.ANNUAL_MEMBER   : null,
    planType === 'lifetime' ? TAGS.LIFETIME_MEMBER : null,
  ].filter(Boolean);

  await addTags(contact.id, memberTags);

  await updateCustomFields(contact.id, {
    [FIELDS.MEMBERSHIP_TIER]:    membershipTier || '',
    [FIELDS.PLAN_TYPE]:          planType || '',
    [FIELDS.MEMBERSHIP_START]:   new Date().toISOString().split('T')[0],
    [FIELDS.STRIPE_CUSTOMER_ID]: stripeCustomerId || '',
    [FIELDS.STRIPE_SUB_ID]:      stripeSubId || '',
  });

  console.log(`[GHL] Synced new member: ${email} (${membershipTier} / ${planType})`);
  return contact;
}

module.exports = { syncNewMember, TAGS };
