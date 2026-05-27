# Phoenix Dashboard Local QC Notes

The updated local artifact at `/home/ubuntu/phoenix_dashboard_work/index.html` now renders with the browser title **Phoenix Command Center — Beacon Momentum** and the visible header **Phoenix Command Center**. The primary navigation has been reframed from the older dashboard language to **Today's Watch**, **Work Orders**, **Continuity Log**, **Beacon Labs**, **Command Console**, and **Architecture**.

The default landing view now presents an executive command-center brief before runtime telemetry. It explains the Phoenix operating model in terms of work orders, approval packets, Beacon Labs delivery, connector controls, Sentinel review, Bob approval, John technical escalation, and audit-ready memory. The new dashboard includes concise panels for **Approval Queue**, **Beacon Labs Delivery Board**, **Content and Campaign Queue**, **Incident and Lessons Log**, **Connector Registry**, **Canonical Knowledge Index**, and **Governed AI Crew**.

Local file testing shows API-dependent widgets report expected local-only fetch failures when opened from `file://`, including conversations and local swarm probes. These failures are not treated as production regressions because the live site will continue to call its same-origin endpoints, while the static governance and presentation sections render correctly without waiting on those endpoints.

The generated page preserves the existing dark Phoenix operations aesthetic and adds Beacon-aligned gold/blue governance panels. The above-the-fold presentation is now clearer for Bob as an executive operator, while the underlying sections remain compatible with the current single-file dashboard architecture.
