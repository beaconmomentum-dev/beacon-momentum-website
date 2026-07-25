# Beacon Momentum Production Workflow

## Source of Truth

**The GitHub repository `beaconmomentum-dev/beacon-momentum-website` is the sole source of truth for `beaconmomentum.com`.** The production branch is `main`.

The managed preview environment may be used only as a disposable design or visual-review surface. It is never a production dependency and must not be treated as the canonical copy of the site. Any prototype or preview work that is approved for release must be deliberately reconciled into this repository before it is tested, committed, and deployed.

## Required Change Sequence

Every website change follows this sequence:

1. Begin in this repository and synchronize with the canonical branch:

   ```bash
   git fetch origin
   git switch main
   git pull --ff-only origin main
   ```

2. Make the change locally in the repository.

3. Use local compute for routine work whenever possible. This includes local builds, TypeScript checks, visual rendering, deterministic scripts, and repeatable content processing. For substantial analysis or drafting that does not require external data, use the Beacon local-model path through the local lab instead of a hosted model. External services are reserved for work that requires live web data, authenticated third-party actions, or capabilities unavailable in the local environment.

4. Test the changed code locally before making a commit:

   ```bash
   pnpm check
   pnpm build:client
   ```

   Review the responsive desktop and mobile experience, then confirm each affected internal and external destination works as intended.

5. Review the diff, create a descriptive commit, and push the approved change to `main`:

   ```bash
   git status
   git diff --check
   git add <approved-files>
   git commit -m "Describe the production change"
   git push origin main
   ```

6. Let GitHub Actions deploy the pushed commit to the DigitalOcean production droplet. The workflow invokes `/usr/local/bin/deploy-beacon-www.sh`, which pulls the repository, builds the site, and reloads Nginx.

7. Verify the production result at `https://beaconmomentum.com/`, record the deployed commit and result, and investigate any failed deployment before making further production changes.

## Deployment Rules

| Rule | Required behavior |
|---|---|
| Canonical code | Edit and commit only in this repository. |
| Production trigger | Push an approved commit to `main`. |
| Production host | The DigitalOcean droplet serves the live site through Nginx. |
| Emergency recovery | A manual server action is permitted only after the desired commit exists in GitHub; reconcile the server back to that commit immediately afterward. |
| Preview environments | Treat as non-canonical review tools. Never use as the production deployment path. |
| Local-first processing | Prefer local CPU/GPU and the Beacon local-model service for non-live work. |

## Local Model Path

The Beacon local lab exposes local Ollama models through the production environment. When a task needs local model inference, establish the documented SSH tunnel, confirm available models, and choose the smallest capable local model for the workload. Do not send private or high-volume source material to hosted model services when the local model path can perform the work.

## Release Evidence

For each meaningful release, retain the commit SHA, the local test result, the GitHub Actions outcome, and the live-site verification result in the commit history or release notes. This creates an auditable recovery path without introducing a vendor-managed production dependency.

## Verified Production Topology

As of July 24, 2026, the production repository on the DigitalOcean host is `/var/www/beacon-momentum-www`. GitHub Actions invokes the host’s `deploy-beacon-www.sh` release script after a push to `main`; that script pulls the repository, installs dependencies, builds the production bundle, restarts the `beacon-momentum-www` process, and performs a local health check.

The Beacon local-model service is available to the production environment through its existing SSH and relay configuration. Use that local service for suitable private or repeatable inference work, but do not record connection credentials, API keys, or other secrets in this repository.
