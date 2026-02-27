/**
 * Meta Conversions API (CAPI) — Beacon Momentum Website
 *
 * Sends server-side conversion events to Meta for Beacon Labs membership
 * purchases. Events are deduplicated against browser-side fbq() calls using
 * a shared event_id that must be passed from the client.
 *
 * Pixel ID: 2728401540849226
 * Docs: https://developers.facebook.com/docs/marketing-api/conversions-api
 */

const https = require('https');
const crypto = require('crypto');

const PIXEL_ID = process.env.META_PIXEL_ID || '2728401540849226';
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const API_VERSION = 'v19.0';

/**
 * SHA-256 hash a value (for PII hashing per Meta requirements)
 */
function hash(value) {
    if (!value) return undefined;
    return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

/**
 * Send a server-side event to Meta CAPI.
 *
 * @param {Object} params
 * @param {string} params.eventName       - Meta standard event name (e.g. 'Subscribe', 'Purchase', 'Lead')
 * @param {string} params.eventId         - Unique ID shared with browser fbq() call for deduplication
 * @param {number} params.value           - Conversion value in USD
 * @param {string} params.currency        - Currency code (default: 'USD')
 * @param {string} [params.email]         - User email (will be hashed)
 * @param {string} [params.firstName]     - User first name (will be hashed)
 * @param {string} [params.lastName]      - User last name (will be hashed)
 * @param {string} [params.ip]            - Client IP address
 * @param {string} [params.userAgent]     - Client user agent
 * @param {string} [params.eventSourceUrl] - URL where the conversion occurred
 * @param {string} [params.subscriptionId] - Stripe subscription ID (for Subscribe events)
 */
async function sendCAPIEvent({ eventName, eventId, value, currency = 'USD', email, firstName, lastName, ip, userAgent, eventSourceUrl, subscriptionId }) {
    if (!ACCESS_TOKEN) {
        console.warn('[CAPI] META_CAPI_ACCESS_TOKEN not set — skipping server-side event');
        return;
    }

    const userData = {
        ...(email && { em: [hash(email)] }),
        ...(firstName && { fn: [hash(firstName)] }),
        ...(lastName && { ln: [hash(lastName)] }),
        ...(ip && { client_ip_address: ip }),
        ...(userAgent && { client_user_agent: userAgent })
    };

    const customData = {
        value,
        currency,
        ...(subscriptionId && { subscription_id: subscriptionId })
    };

    const payload = {
        data: [{
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId,
            event_source_url: eventSourceUrl || 'https://beaconmomentum.com/labs',
            action_source: 'website',
            user_data: userData,
            custom_data: customData
        }]
    };

    const body = JSON.stringify(payload);
    const url = `/v${API_VERSION.replace('v', '')}/act_${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'graph.facebook.com',
            path: `/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.error) {
                        console.error(`[CAPI] ${eventName} event error:`, parsed.error);
                        reject(new Error(parsed.error.message));
                    } else {
                        console.log(`[CAPI] ${eventName} event sent — event_id: ${eventId}, value: $${value}`);
                        resolve(parsed);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on('error', (err) => {
            console.error(`[CAPI] Request error for ${eventName}:`, err.message);
            reject(err);
        });

        req.write(body);
        req.end();
    });
}

/**
 * Convenience: Send a Subscribe event (new membership purchase)
 */
async function sendSubscribeEvent(params) {
    return sendCAPIEvent({ eventName: 'Subscribe', ...params });
}

/**
 * Convenience: Send a Purchase event (one-time payment)
 */
async function sendPurchaseEvent(params) {
    return sendCAPIEvent({ eventName: 'Purchase', ...params });
}

/**
 * Convenience: Send a Lead event (form submission / assessment)
 */
async function sendLeadEvent(params) {
    return sendCAPIEvent({ eventName: 'Lead', ...params });
}

module.exports = { sendCAPIEvent, sendSubscribeEvent, sendPurchaseEvent, sendLeadEvent, hash };
