# Blog and Public-Page Presentation Audit

**Audit status:** In progress. No new blog content will be added during this correction release.

## Live findings — initial routes

| Route | Observed issue | Intended correction |
|---|---|---|
| `/blog` | The featured-card image is square-cropped so that title and branded artwork are visibly cut off. The card’s visual hierarchy relies on an image treatment that does not preserve the asset’s designed composition. | Use an explicit aspect-ratio and `object-position` rule appropriate to each editorial card format; preserve legible title-safe areas and do not display a distorted or accidental crop. |
| `/blog/3-ai-business-models-launch-this-weekend` | The article route shows the **LISTEN** control in the article header, where an article-level audio action belongs. This establishes the intended placement for content-specific playback controls. | Keep content-specific audio/video controls on their owning article or media page, not as detached front-page controls. Confirm the control is only rendered when the article has an actual corresponding media asset. |

## Audit rules

1. Blog-card imagery must preserve the intentional visual safe area of each supplied editorial asset.
2. Article-level video or audio controls must appear only on the article/media route that owns the asset.
3. Index pages may use a non-interactive media cue only when it accurately links to the owning content; they must not render an orphaned play action.
4. Shared header, footer, typography, pathways, and content-width rules must remain consistent across blog index, article, field-note, resource, and member-preview pages.

## Local post-fix verification

| Route | Result | Follow-up |
|---|---|---|
| `/blog` | The featured editorial image now preserves the complete designed composition and no audio player or play/progress control appears on the linked index card. | The image is letterboxed against the feature panel because the supplied artwork ratio differs from the text-led feature grid. Refine the presentation background and vertical anchoring so the preserved artwork reads as intentional rather than as an empty band. |
| `/blog/3-ai-business-models-launch-this-weekend` | The full article image is preserved rather than forced into a cropped hero frame. The **LISTEN** control appears in the article header, its correct owning context. | Confirm another article that uses the legacy `audioFile` alias also renders the article-level control after source normalization. |
| `/blog/watch-brief-nine-to-zero-redistricting` | The article uses the legacy `audioFile` field and now correctly renders its **LISTEN** control in the article header. No index-card media action is required for access. Shared navigation, dark editorial treatment, and article typography remain consistent. | Complete mobile and final index checks after the refined featured-art framing is applied. |
| `/blog` (refined) | The featured image now sits within an intentional deep-water frame with its complete headline and artwork visible. The index remains a reading and navigation surface: no detached play button, duration, or progress bar is rendered on the featured card. | Ready for build validation and canonical release. |

## Validation record

| Check | Result | Notes |
|---|---|---|
| `blogMediaPolicy.test.ts` | Passed | Confirms legacy audio aliases resolve on article pages and index playback controls remain disabled. |
| TypeScript check | Passed | The corrected blog and article presentation code type-checks cleanly. |
| Production build | Passed | Built with temporary local placeholders for unrelated required environment validation; no production configuration was altered. |
| Full suite | Environment-limited | Existing cohort tests require a local `COHORT_LEAD_PASSWORD` and seeded cohort state that are not present in this workspace. Those failures are unrelated to the blog presentation correction. |
