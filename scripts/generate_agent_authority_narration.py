from __future__ import annotations

import json
import re
import shutil
import subprocess
from pathlib import Path

from mlx_audio.tts.generate import generate_audio

ROOT = Path(__file__).resolve().parents[1]
SLUG = "can-this-agent-do-it-or-may-it-do-it"
TRANSCRIPT = ROOT / "client" / "public" / "audio" / "agent-authority" / "transcripts" / f"{SLUG}.txt"
WORK = ROOT / ".work" / "agent-authority-narration"
PARTS = WORK / "parts" / SLUG
MASTER = WORK / "masters" / f"{SLUG}.wav"
MANIFEST = WORK / "local_generation_manifest.json"
MODEL = "mlx-community/Kokoro-82M-bf16"
VOICE = Path("/Users/robertburr/.cache/huggingface/hub/models--mlx-community--Kokoro-82M-bf16/snapshots/a71e4d38b236d968966a2002c4c895dbd12b1c3c/voices/am_puck.safetensors")
SPEED = 1.02
MAX_WORDS = 105


def duration(path: Path) -> float:
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(path)], text=True).strip())


def concat(parts: list[Path], output: Path) -> None:
    inputs = [value for part in parts for value in ("-i", str(part))]
    graph = "".join(f"[{i}:a]" for i in range(len(parts))) + f"concat=n={len(parts)}:v=0:a=1[a]"
    subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "warning", *inputs, "-filter_complex", graph, "-map", "[a]", "-ac", "1", "-ar", "24000", str(output)], check=True)


def chunks(text: str) -> list[str]:
    paragraphs = [part.strip() for part in re.split(r"\n\s*\n", text) if part.strip()]
    results: list[str] = []
    current: list[str] = []
    count = 0
    for paragraph in paragraphs:
        words = paragraph.split()
        if len(words) > MAX_WORDS:
            if current:
                results.append(" ".join(current))
                current, count = [], 0
            results.extend(" ".join(words[i:i + MAX_WORDS]) for i in range(0, len(words), MAX_WORDS))
        elif current and count + len(words) > MAX_WORDS:
            results.append(" ".join(current))
            current, count = [paragraph], len(words)
        else:
            current.append(paragraph)
            count += len(words)
    if current:
        results.append(" ".join(current))
    return results


def main() -> None:
    if not VOICE.is_file():
        raise SystemExit(f"Owner-selected Puck voice unavailable: {VOICE}")
    if not TRANSCRIPT.is_file():
        raise SystemExit(f"Missing transcript: {TRANSCRIPT}")
    if WORK.exists():
        shutil.rmtree(WORK)
    PARTS.mkdir(parents=True)
    MASTER.parent.mkdir(parents=True)
    text = TRANSCRIPT.read_text(encoding="utf-8").strip()
    records = []
    generated: list[Path] = []
    for number, block in enumerate(chunks(text), 1):
        prefix = f"block_{number:02d}"
        generate_audio(text=block, model=MODEL, voice=str(VOICE), speed=SPEED, lang_code="a", output_path=str(PARTS), file_prefix=prefix, audio_format="wav", verbose=False)
        candidates = sorted(PARTS.glob(f"{prefix}*.wav"))
        if not candidates:
            raise RuntimeError(f"No audio produced for {prefix}")
        final = PARTS / f"{number:02d}.wav"
        concat(candidates, final)
        generated.append(final)
        records.append({"index": number, "words": len(block.split()), "duration_seconds": round(duration(final), 3), "file": str(final.relative_to(WORK))})
    concat(generated, MASTER)
    MANIFEST.write_text(json.dumps({"id": SLUG, "voice": "am_puck", "voice_clone": False, "model": MODEL, "speed": SPEED, "words": len(text.split()), "duration_seconds": round(duration(MASTER), 3), "blocks": records}, indent=2) + "\n", encoding="utf-8")
    print(MASTER)


if __name__ == "__main__":
    main()
