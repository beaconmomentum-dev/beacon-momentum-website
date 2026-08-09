# Beacon Momentum Agent Operating Instructions

## Local-Inference-First Analysis Policy

For every **eligible analysis task**, use the Beacon local AI lab through its Ollama endpoint as the default inference path. This is a durable operating rule for future work in this repository, not a one-time preference.

> Use local inference first whenever the requested analysis can be completed from the materials already available in the workspace or supplied by the owner.

### Eligible work

Use local inference by default for document review, source-grounded synthesis, structured extraction, classification, summarization, comparative analysis, technical reasoning, planning analysis, and code analysis that do not require current external information or a connected third-party service.

Choose the local model to fit the work. Prefer `llama3.1:8b` or `gemma4:latest` for light classification and summarization; `qwen3:30b-a3b` for fast reasoning; `qwen3.6:latest` for long-context analysis; `qwen3-vl:32b` for vision or multimodal source material; `beacon-gpt-oss-120b` for high-stakes or deep reasoning; and `beacon-qwen3-coder-30b` for code-focused analysis.

### External exceptions

Use external models, services, browsers, connectors, or APIs only when one or more of the following applies:

1. The task requires live or time-sensitive public information, current web evidence, or authenticated account access.
2. The task requires an external action, transaction, posting, deployment check, or third-party system operation.
3. The local lab cannot perform a required capability, such as a specific externally hosted model, an unavailable modality, or a requested tool integration.
4. The owner explicitly requests a non-local model or service.
5. Safety, legal, privacy, platform, or system requirements require a different approved workflow.

### Operating procedure

Before analysis, verify or establish the local Ollama tunnel using the approved local-lab workflow. State when local inference was used in a completed analysis. If an exception is necessary, identify the specific exception rather than silently substituting an external inference path. External retrieval may still be used to gather current source material, but the subsequent analysis should return to local inference whenever the task is otherwise eligible.

This policy does not override owner instructions, safety requirements, source-validation requirements, or the need to verify live facts with appropriate authoritative sources.

## Beacon Momentum Production Static-Asset Safeguard

`beaconmomentum.com` is served from the DigitalOcean origin at `159.203.81.39`. The React entry document is deployed to `/var/www/beacon-momentum-www/dist/public/`, but Nginx serves the public `/assets/` URL prefix from the separate shared directory `/var/www/beacon-shared-assets/`.

Every production static deployment must follow this order:

1. Build from the committed authoritative GitHub source in an isolated worktree.
2. On the production host, run `ops/deploy-beacon-static-release.sh /path/to/dist/public` from that same committed worktree.
3. The wrapper copies the complete generated asset set into the active Nginx alias `/var/www/beacon-shared-assets/`, verifies every asset referenced by the proposed entry document directly against the origin, and only then publishes the matching `index.html`.
4. If the server bundle changed, deploy `dist/index.js` through the approved server-release path and restart only `beacon-momentum-www` after the static-release wrapper succeeds; otherwise, do not restart the process solely for a static-asset refresh.

> **Do not deploy `index.html` by itself.** A new Vite hash referenced by an entry document but missing from `/var/www/beacon-shared-assets/` produces a public white screen even when the corresponding file exists in the application build directory.
