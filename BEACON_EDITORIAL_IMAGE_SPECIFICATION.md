# Beacon Editorial Image Specification

**Status:** Approved standard for future Beacon blog filings and field-note artwork  
**Applies to:** The Signal, Watch Brief, public field notes, resource cards, editorial email previews, and social-video cover derivatives

## Purpose

Every editorial filing begins with a single **16:9 master image**. The master must remain legible and compositionally complete wherever Beacon presents it: the blog index, featured article treatment, article page, email preview, and any future member-library card. The site preserves the complete master artwork; it does not crop headlines, symbols, or source attribution to fill a container.

## Master canvas and export package

| Requirement | Approved standard |
|---|---|
| Master canvas | **1920 × 1080 pixels** (16:9) |
| Minimum accepted canvas | **1280 × 720 pixels** (16:9) |
| Preferred production source | PNG for editable master; layered source retained in the production asset library |
| Web delivery format | WebP, with PNG only where transparency or visual fidelity requires it |
| Color profile | sRGB |
| File weight target | Under 500 KB for standard blog-card delivery; optimize before upload without reducing headline legibility |
| Filename | `YYYY-MM-DD--article-slug--16x9--v01.webp` |
| Versioning | Increment only when the visible composition changes: `v02`, `v03`, and so on |

## Composition and safe areas

The 16:9 master uses a **10% perimeter safe zone**. Headlines, logos, source marks, icons, faces, and key visual evidence must remain within that zone. The outer 5% is treated as visual breathing room, not a place for essential copy. Avoid text closer than 192 pixels to the left or right edge, or 108 pixels to the top or bottom edge, on a 1920 × 1080 master.

The composition should support Beacon’s Deep Water Editorial treatment: a clear focal subject, restrained use of pathway color, and enough negative space for the artwork to remain readable at card size. The image should stand on its own without a baked-in play button, duration label, subscribe prompt, or sales claim. Narration controls belong only on the page that owns the narrated article.

## Typography, brand, and accessibility

Editorial artwork should use Beacon’s established visual language: dark navy or deep-water grounding where appropriate, restrained amber or pathway-color emphasis, and high-contrast type. Decorative text must be secondary to the article title in the HTML document; no image may be the sole carrier of an essential headline, disclosure, citation, or call to action.

Each filing must include meaningful `alt` text in the article record. Alt text describes the editorial subject and essential visual message in plain language, rather than repeating the article title or beginning with “image of.” If the artwork includes source-dependent evidence, that evidence must also appear in the article body or source block.

## Required filing record

Before a filing is released, the production record must include:

| Field | Required entry |
|---|---|
| Article slug | Canonical route identifier |
| Master image filename | Versioned 16:9 filename |
| Dimensions and format | Confirmed delivered dimensions and file type |
| Alt text | Plain-language description of the editorial image |
| Owner | Named human accountable for the source asset and final composition |
| Rights / provenance | Original, licensed, public-domain, or documented fair-use rationale as applicable |
| Approval status | Draft, ready for human review, approved, or archived |
| Caption / source credit | Required where a third-party image or data visual is used |

## Rendering rule

The blog index uses a fixed **16:9 frame** and `object-fit: contain` for editorial artwork. The article page preserves the full image at its natural aspect ratio inside a Beacon deep-water frame. This deliberately favors complete composition and honest presentation over arbitrary cropping. If an older filing has a non-16:9 image, prepare a new 16:9 master before featuring it; do not solve the mismatch by cutting off the image’s subject or text.

## Release checklist

1. Confirm the canvas is exactly 16:9 and the export is crisp at 100% size.
2. Review the image at featured-card width and mobile-card width; all essential text and marks must remain legible.
3. Confirm no interactive control is baked into the image and no card-level player is introduced.
4. Verify the article route owns any narration control and the appropriate transcript or accessible equivalent.
5. Record the filename, alt text, provenance, approval, and source-credit fields before publication.
