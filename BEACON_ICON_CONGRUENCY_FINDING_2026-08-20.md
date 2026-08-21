# Beacon Icon Congruency Finding — August 20, 2026

## Confirmed mismatch

The approved parent compact mark is `client/public/brand/beacon-mark.svg`. It is a compact cream lighthouse with a gold beacon light on a deep navy rounded square, using the approved Beacon palette and an accessible title/description.

The current homepage header and footer use `client/public/images/home/beacon-routeboard-mark.webp`. That asset is a 1920×1920 routeboard-era illustration containing a different lighthouse geometry, multiple gold arcs, teal waves, and a bright magenta background layer. It does not match the approved compact parent mark or the favicon/app-icon family and is not suitable as the canonical site identity.

## Required correction

Replace the homepage header/footer `BeaconMark` source with `/brand/beacon-mark.svg`, retain the approved `Beacon Momentum` parent name, and remove the unexplained `Field Systems` identity suffix from the parent lockup unless it is separately approved as a property designation. Verify the same parent mark family across the homepage, The Watch, pricing, checkout, legal/support pages, favicon, Apple touch icon, structured-data logo, social image metadata, and footer.

The routeboard illustration may remain only as supporting editorial artwork if needed; it must not function as the parent brand mark.

## Secondary-route legacy assets

`client/public/icons/beacon-logo.webp` is another unrelated 1920×1920 lighthouse illustration with a large right-facing beam. Its visual style and proportions differ from both the approved compact mark and the routeboard mark.

`client/public/icons/beacon-logo-hero.webp` is a third, photorealistic lighthouse illustration used on the About page. It also differs from the approved parent mark and from every other live lockup.

These two files may remain only as explicitly labeled editorial artwork. They must no longer be used as the site identity in headers, footers, legal pages, pillar pages, contact pages, company pages, or structured brand lockups.

## Final local production-build visual acceptance — August 21, 2026

The corrected homepage desktop capture uses the approved compact lighthouse parent mark in the upper-left lockup and replaces `Momentum · Field Systems` with `Momentum · Public Front Door`. The mark, wordmark, descriptor, navigation, hero, and calls to action remain aligned with no visible overlap or clipping at 1440×1000.

The corrected canonical `/the-watch` desktop capture now uses the same approved compact lighthouse parent-mark family beside `Beacon Momentum · The Watch`. It no longer uses a text-only identity or the separate legacy Manus `Beacon — The Watch` lockup. The founding-year enrollment button and hero remain legible and aligned with no visible layout regression at 1440×1000.

The deterministic browser suite passed 18 desktop/mobile checks across nine canonical routes. Every tested route loaded the approved parent mark, returned no critical document/script/stylesheet/image/font errors, and showed no horizontal overflow. The final screenshots were captured only after the expected route content was present, eliminating the incomplete-animation artifact from the initial command-line capture.
