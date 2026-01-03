# Maritime Modernism Website Handoff Guide

## Overview
This update introduces the new **Maritime Modernism** design language to the Beacon Momentum website. It features a complete visual overhaul, new content structure, and the integration of the "Lighthouse Keepers" community section.

## Key Features
1.  **New Design System:**
    *   **Palette:** Deep Ocean Blue (`#0f172a`) & Lighthouse Amber (`#f59e0b`)
    *   **Typography:** Serif headings for authority, Sans-serif body for clarity
    *   **Visuals:** Topographic textures, "beam of light" motifs, and vertical "mast" guide lines

2.  **New Pages:**
    *   **Home:** "You Are Not Alone" hero section, mission statement, and framework overview.
    *   **Lighthouse Keepers:** Filterable gallery of community stories (Divorce, Career, Identity, etc.).
    *   **About:** The Digital Grandpa story with optional "Deeper Context" (Pleiadian-Sirian synthesis).
    *   **Blog:** Insights and strategies for navigating transition.

## Deployment Instructions

The new site is built as a static React application. The build artifacts are located in the `new_site_build/` directory within this repository.

### To Deploy the New Site:

1.  **Pull the branch:**
    ```bash
    git checkout maritime-modernism
    git pull origin maritime-modernism
    ```

2.  **Run the deployment script:**
    ```bash
    ./deploy_new_site.sh
    ```
    *   This script will automatically backup your current site to a `backup_old_site_TIMESTAMP` directory.
    *   It will then move the new site files to the root directory.

### To Rollback (If Needed):

If you need to revert to the previous version for any reason, run the rollback script created during deployment:

```bash
./rollback_site.sh backup_old_site_TIMESTAMP
```
*(Replace `TIMESTAMP` with the actual timestamp from the backup folder name)*

## Content Management

### Adding New Stories
To add new Lighthouse Keeper stories, edit `client/src/pages/LighthouseKeepers.tsx` in the source code (if you have the source) or update the content in the deployed React app (requires rebuilding).

### Updating the Blog
To add new blog posts, edit `client/src/pages/Blog.tsx`.

## Technical Notes
*   **Framework:** React 19 + Vite
*   **Styling:** Tailwind CSS 4
*   **Routing:** Wouter (Client-side routing)
*   **Icons:** Lucide React

## Next Steps
1.  Review the new site on a staging environment if possible.
2.  Run the deployment script to go live.
3.  Announce the new "Lighthouse Keepers" section to your community!
