# Session Mining Prompt

**Instructions for use:** Copy and paste the text below into any previous Manus session to extract and preserve its meaningful data into the Beacon Ecosystem ground truth file.

---

## Prompt to Paste

---

Review this entire session from the beginning and extract all meaningful data that should be preserved in the Beacon Ecosystem ground truth file. The ground truth file lives at `https://beaconlabs.ai/state` and is stored on the production server at `/opt/beacon-state.md`.

Fetch the current state of that file first:

```
curl -sL https://beaconlabs.ai/state
```

Then review this session and identify everything that is not already captured in the state file, including:

- **Infrastructure changes:** Any new servers, services, domains, DNS records, SSL certs, Nginx configs, or systemd services that were created or modified.
- **Code changes:** Any files that were written, edited, or deployed — including what repo they belong to, what they do, and their live path on the server.
- **Integrations:** Any new API connections, webhooks, CRM pipelines, Stripe configurations, or third-party services that were set up or confirmed working.
- **Credentials and keys:** Any API keys, tokens, or credentials that were confirmed valid and in use (do not include raw secret values — reference them by name and location only, e.g., "GHL API key stored in `/opt/bosun/.env`").
- **Decisions and preferences:** Any explicit preferences, workflow rules, or standing instructions the user stated that should govern future sessions.
- **Brand and product updates:** Any changes to brand positioning, offer structure, pricing, funnel stages, or product definitions.
- **Open items:** Anything that was started but not finished, or that the user indicated should be addressed in a future session.
- **People and personas:** Any names, roles, avatar IDs, voice IDs, or persona details that were confirmed or created.

Once you have identified the new data, update `/opt/beacon-state.md` on the production server with a new section or by updating existing sections as appropriate. Use SSH with the `bosun_key` at `root@143.198.23.240`.

After updating the server file, commit the updated `beacon-state.md` to the `beacon-momentum-website` GitHub repository using the token stored in that repo's remote URL.

Finally, confirm what was added and what was already present.

---
