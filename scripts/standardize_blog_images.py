#!/usr/bin/env python3
"""Create consistent 16:9 editorial derivatives for every Beacon blog image.

The process preserves the full supplied artwork in the foreground. When original
artwork is portrait or near-square, a subdued blurred continuation of that same
source fills the approved 1920x1080 deep-water master without cropping headlines,
source marks, or visual evidence.
"""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps


REPO_ROOT = Path(__file__).resolve().parents[1]
PUBLIC_ROOT = REPO_ROOT / "client" / "public"
IMAGE_ROOT = PUBLIC_ROOT / "images"
EDITORIAL_ROOT = IMAGE_ROOT / "editorial"
MANIFEST_PATH = IMAGE_ROOT / "BLOG_EDITORIAL_IMAGE_MANIFEST.json"
SOURCE_FILES = [
    REPO_ROOT / "client" / "src" / "pages" / "BlogPage.tsx",
    REPO_ROOT / "client" / "src" / "pages" / "BlogArticlePage.tsx",
]
IMAGE_REF_PATTERN = re.compile(r"(?:thumbnail|heroImage):\s*\"(/images/(?!editorial/)[^\"]+)\"")
TARGET_WIDTH = 1920
TARGET_HEIGHT = 1080
BACKGROUND = (13, 27, 42)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def editorial_path(source_path: str) -> str:
    return f"/images/editorial/{Path(source_path).stem}-16x9.webp"


def referenced_images() -> list[str]:
    references: set[str] = set()
    for source_file in SOURCE_FILES:
        references.update(IMAGE_REF_PATTERN.findall(source_file.read_text(encoding="utf-8")))
    if not references and MANIFEST_PATH.is_file():
        prior_manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
        references.update(record["source"] for record in prior_manifest.get("images", []))
    return sorted(references)


def source_continuation(image: Image.Image, width: int, height: int) -> Image.Image:
    scale = max(TARGET_WIDTH / width, TARGET_HEIGHT / height)
    background = image.resize(
        (round(width * scale), round(height * scale)),
        Image.Resampling.LANCZOS,
    )
    left = (background.width - TARGET_WIDTH) // 2
    top = (background.height - TARGET_HEIGHT) // 2
    background = background.crop((left, top, left + TARGET_WIDTH, top + TARGET_HEIGHT))
    background = background.filter(ImageFilter.GaussianBlur(radius=28))
    return ImageEnhance.Brightness(background).enhance(0.34)


def make_derivative(source_path: str) -> dict[str, object]:
    original = PUBLIC_ROOT / source_path.lstrip("/")
    if not original.is_file():
        raise FileNotFoundError(f"Missing referenced editorial image: {original}")

    target_path = PUBLIC_ROOT / editorial_path(source_path).lstrip("/")
    target_path.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(original) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGBA")
        source_width, source_height = image.size
        background = source_continuation(image, source_width, source_height)
        foreground_scale = min(TARGET_WIDTH / source_width, TARGET_HEIGHT / source_height)
        foreground = image.resize(
            (round(source_width * foreground_scale), round(source_height * foreground_scale)),
            Image.Resampling.LANCZOS,
        )

    canvas = Image.new("RGBA", (TARGET_WIDTH, TARGET_HEIGHT), BACKGROUND + (255,))
    canvas.alpha_composite(background)
    canvas.alpha_composite(Image.new("RGBA", (TARGET_WIDTH, TARGET_HEIGHT), (13, 27, 42, 110)))
    offset = ((TARGET_WIDTH - foreground.width) // 2, (TARGET_HEIGHT - foreground.height) // 2)
    canvas.alpha_composite(foreground, offset)
    canvas.convert("RGB").save(target_path, "WEBP", quality=90, method=6)

    return {
        "source": source_path,
        "derivative": editorial_path(source_path),
        "source_dimensions": [source_width, source_height],
        "derivative_dimensions": [TARGET_WIDTH, TARGET_HEIGHT],
        "source_sha256": sha256(original),
        "transform": "preserved foreground with blurred source continuation",
        "background": "#0D1B2A with blurred source continuation",
        "ratio": "16:9",
    }


def update_source_references(mapping: dict[str, str]) -> None:
    for source_file in SOURCE_FILES:
        text = source_file.read_text(encoding="utf-8")
        for source, derivative in mapping.items():
            text = text.replace(f'"{source}"', f'"{derivative}"')
        source_file.write_text(text, encoding="utf-8")


def main() -> None:
    sources = referenced_images()
    records = [make_derivative(source) for source in sources]
    update_source_references({record["source"]: record["derivative"] for record in records})
    manifest = {
        "standard": "Beacon Editorial Image Specification",
        "canvas": [TARGET_WIDTH, TARGET_HEIGHT],
        "ratio": "16:9",
        "transform": "preserved foreground with blurred source continuation",
        "background": "#0D1B2A with blurred source continuation",
        "images": records,
    }
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Standardized {len(records)} editorial images into {EDITORIAL_ROOT}")


if __name__ == "__main__":
    main()
