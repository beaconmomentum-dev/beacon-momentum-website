from __future__ import annotations

import json
import re
import shutil
import subprocess
from pathlib import Path

from mlx_audio.tts.generate import generate_audio

ROOT = Path(__file__).resolve().parents[1]
TRANSCRIPT_DIR = ROOT / "client" / "public" / "audio" / "october" / "transcripts"
WORK_DIR = ROOT / ".work" / "october-signal-narration"
PARTS_DIR = WORK_DIR / "parts"
MASTER_DIR = WORK_DIR / "masters"
MANIFEST_PATH = WORK_DIR / "local_generation_manifest.json"
MODEL = "mlx-community/Kokoro-82M-bf16"
VOICE = Path.home() / ".cache/huggingface/hub/models--mlx-community--Kokoro-82M-bf16/snapshots/a71e4d38b236d968966a2002c4c895dbd12b1c3c/voices/am_puck.safetensors"
SPEED = 1.02
MAX_WORDS_PER_BLOCK = 105
EXPECTED_SLUGS = [
    "a-claim-is-not-evidence",
    "before-you-connect-an-app",
    "a-disclosure-is-not-a-permission-slip",
    "what-an-ai-native-course-platform-has-to-prove",
]


def run(command: list[str]) -> None:
    subprocess.run(command, check=True)


def duration_seconds(path: Path) -> float:
    result = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            str(path),
        ],
        check=True,
        text=True,
        capture_output=True,
    )
    return float(result.stdout.strip())


def concatenate_wavs(parts: list[Path], output: Path) -> None:
    if not parts:
        raise RuntimeError(f"No WAV parts available for {output}")
    inputs = [value for part in parts for value in ("-i", str(part))]
    graph = "".join(f"[{index}:a]" for index in range(len(parts))) + f"concat=n={len(parts)}:v=0:a=1[a]"
    run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "warning",
            *inputs,
            "-filter_complex",
            graph,
            "-map",
            "[a]",
            "-ac",
            "1",
            "-ar",
            "24000",
            str(output),
        ]
    )


def chunk_text(text: str) -> list[str]:
    paragraphs = [part.strip() for part in re.split(r"\n\s*\n", text) if part.strip()]
    chunks: list[str] = []
    current: list[str] = []
    current_words = 0

    for paragraph in paragraphs:
        words = paragraph.split()
        if current and current_words + len(words) > MAX_WORDS_PER_BLOCK:
            chunks.append(" ".join(current).strip())
            current = []
            current_words = 0
        if len(words) <= MAX_WORDS_PER_BLOCK:
            current.append(paragraph)
            current_words += len(words)
            continue

        if current:
            chunks.append(" ".join(current).strip())
            current = []
            current_words = 0
        for index in range(0, len(words), MAX_WORDS_PER_BLOCK):
            chunks.append(" ".join(words[index : index + MAX_WORDS_PER_BLOCK]))

    if current:
        chunks.append(" ".join(current).strip())
    return chunks


def generate_slug(slug: str) -> dict:
    transcript_path = TRANSCRIPT_DIR / f"{slug}.txt"
    text = transcript_path.read_text(encoding="utf-8").strip()
    chunks = chunk_text(text)
    if not chunks:
        raise RuntimeError(f"No narration text produced for {slug}")

    slug_parts = PARTS_DIR / slug
    slug_parts.mkdir(parents=True, exist_ok=True)
    generated_parts: list[Path] = []
    manifest_blocks = []

    for index, chunk in enumerate(chunks, start=1):
        prefix = f"{slug}-{index:02d}"
        generate_audio(
            text=chunk,
            model=MODEL,
            voice=str(VOICE),
            speed=SPEED,
            lang_code="a",
            output_path=str(slug_parts),
            file_prefix=prefix,
            audio_format="wav",
            verbose=False,
        )
        candidates = sorted(slug_parts.glob(f"{prefix}*.wav"))
        if not candidates:
            raise RuntimeError(f"No WAV segments generated for {prefix}")
        final_part = slug_parts / f"{index:02d}.wav"
        concatenate_wavs(candidates, final_part)
        generated_parts.append(final_part)
        manifest_blocks.append(
            {
                "index": index,
                "words": len(chunk.split()),
                "duration_seconds": round(duration_seconds(final_part), 3),
                "file": str(final_part.relative_to(WORK_DIR)),
            }
        )

    master_path = MASTER_DIR / f"{slug}.wav"
    concatenate_wavs(generated_parts, master_path)

    return {
        "id": slug,
        "transcript": str(transcript_path.relative_to(ROOT)),
        "master": str(master_path.relative_to(ROOT)),
        "words": len(text.split()),
        "duration_seconds": round(duration_seconds(master_path), 3),
        "blocks": manifest_blocks,
    }


def main() -> None:
    if not VOICE.is_file():
        raise SystemExit(f"Required owner-selected local Puck voice is missing: {VOICE}")
    if not TRANSCRIPT_DIR.is_dir():
        raise SystemExit(f"Missing prepared transcript directory: {TRANSCRIPT_DIR}")

    if WORK_DIR.exists():
        shutil.rmtree(WORK_DIR)
    PARTS_DIR.mkdir(parents=True)
    MASTER_DIR.mkdir(parents=True)

    records = [generate_slug(slug) for slug in EXPECTED_SLUGS]
    MANIFEST_PATH.write_text(
        json.dumps(
            {
                "voice": "am_puck",
                "voice_clone": False,
                "model": MODEL,
                "speed": SPEED,
                "generation": "local MLX Audio / Kokoro",
                "articles": records,
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(json.dumps({"manifest": str(MANIFEST_PATH), "articles": records}, indent=2))


if __name__ == "__main__":
    main()
