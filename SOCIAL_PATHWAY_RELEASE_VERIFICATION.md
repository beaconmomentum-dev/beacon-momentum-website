# Social Pathway Release Verification

## Local Route Check

**Route:** `/blog/five-questions-keep-you-in-charge`

The source-bound article rendered with its article-owned **Listen**, **Transcript**, and **Captions** controls in the header. The blog index remains the content-discovery surface and does not receive playback controls.

The page rendered the contextual end-of-article pathway after the editorial body:

| Source article | Pathway label | Destination | Intended purpose |
|---|---|---|---|
| Five Questions That Keep You in Charge | Beacon Work — “Put the control into practice.” | `/the-watch/controlled-ai-workflow-kit` | Direct a reader who wants a practical implementation worksheet to the relevant member-facing kit, rather than to a generic sales offer. |

The pathway content appeared in the extracted page content and preserved the existing deep-water editorial presentation. The visual route check found no detached playback control on the blog index.

## Link and Metadata Checks

Focused pathway, August editorial, and media-policy tests passed. TypeScript and the production client build passed.

The article route and each current contextual destination returned HTTP 200 on the local canonical server:

| Route | Result |
|---|---:|
| `/blog/five-questions-keep-you-in-charge` | 200 |
| `/the-watch/controlled-ai-workflow-kit` | 200 |
| `/how-beacon-works` | 200 |
| `/the-watch` | 200 |

The article component now uses the existing `usePageMeta` helper to update page title, description, canonical URL, Open Graph, and Twitter metadata at runtime. The source article’s responsive pathway layout uses wrapping flex content and an accessible text link; it preserves the editorial-first presentation rather than adding a generic offer panel.

## Live Production Check

**Route:** `https://beaconmomentum.com/blog/five-questions-keep-you-in-charge`

After the successful GitHub-to-DigitalOcean deployment for commit `a7c5929`, the live article rendered the article-owned **Listen**, **Transcript**, and **Captions** controls. Its extracted production content also displayed the contextual **Beacon Work** pathway and **Open the Workflow Kit** action beneath the editorial body.
