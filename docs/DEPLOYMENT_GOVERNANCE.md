# Beacon Momentum Deployment Governance

## Purpose

This policy keeps Beacon Momentum production systems portable, reviewable, and recoverable. The canonical source of truth for the public site and its application logic is the GitHub repository `beaconmomentum-dev/beacon-momentum-website`, not a managed preview URL, local sandbox, or third-party builder workspace.

## Production Boundary

`beaconmomentum.com` is served from Beacon-owned infrastructure. The public domain, production application process, database, Stripe live configuration, and customer-facing enrollment paths must not depend on a Manus-hosted project, a Manus preview URL, or any other managed-preview platform.

Managed previews are permitted only as optional, disposable review surfaces. They must remain unlinked from public navigation, must not receive production-domain traffic, and must never become the only copy of source code, configuration, or deployable assets. A preview is not an approval, release, or production environment.

## Required Release Workflow

Every production change follows this sequence:

1. Pull or clone the current `main` branch from the canonical GitHub repository.
2. Make changes in the repository, keeping secrets outside source control.
3. Run the relevant checks and test the changed behavior.
4. Commit the reviewed change and push it to GitHub.
5. Deploy the exact GitHub revision through the established CI/CD path or, when needed, by pulling that revision onto the Beacon-owned DigitalOcean server.
6. Verify the public domain, application health, and any affected integration after deployment.

Manual production edits that are not represented in GitHub are prohibited, except for narrowly scoped emergency recovery. Any emergency change must be immediately reconciled into a reviewed GitHub commit.

## Stripe and Other External Services

Live payment credentials, webhook signing secrets, and private database credentials remain server-side. Stripe test-mode resources may be used for controlled validation, but test routes and credentials must stay separately configured and cannot replace or alter the live enrollment path. A managed preview may never be the required host for a live payment flow.

## Portability Requirements

The production application must be reproducible from the canonical GitHub repository plus documented server-side environment configuration. Static assets, build instructions, deployment scripts, and operational documentation must remain exportable and usable outside any managed preview platform. All new integrations should have a documented owner, replacement path, and configuration location.

## Current Sandbox Preview Disposition

The `beaconhome-ejdfdk4g.manus.space` URL is a non-production sandbox preview. It does not serve the public Beacon domain, is not referenced by the active Beacon production configuration, and is not the authoritative implementation for the current Watch checkout lifecycle. It must not be treated as a deployment target or required dependency for future Beacon Momentum work.
