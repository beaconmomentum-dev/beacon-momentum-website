from __future__ import annotations

import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SLUG = "can-this-agent-do-it-or-may-it-do-it"
AUDIO_DIR = ROOT / "client" / "public" / "audio" / "agent-authority"
TRANSCRIPT = AUDIO_DIR / "transcripts" / f"{SLUG}.txt"
MASTER = ROOT / ".work" / "agent-authority-narration" / "masters" / f"{SLUG}.wav"
MP3 = AUDIO_DIR / f"{SLUG}.mp3"
VTT = AUDIO_DIR / "captions" / f"{SLUG}.vtt"


def duration_seconds(path: Path) -> float:
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
        check=True, text=True, capture_output=True,
    )
    return float(result.stdout.strip())


def stamp(seconds: float) -> str:
    milliseconds = int(round(seconds * 1000))
    hours, remainder = divmod(milliseconds, 3_600_000)
    minutes, remainder = divmod(remainder, 60_000)
    secs, millis = divmod(remainder, 1000)
    return f"{hours:02}:{minutes:02}:{secs:02}.{millis:03}"


def captions(text: str, duration: float) -> str:
    words = re.findall(r"\S+", text)
    groups = [words[i:i + 10] for i in range(0, len(words), 10)]
    cursor = 0.0
    total = sum(len(group) for group in groups) or 1
    output = ["WEBVTT", ""]
    for index, group in enumerate(groups, 1):
        next_cursor = duration if index == len(groups) else cursor + duration * len(group) / total
        output.extend([str(index), f"{stamp(cursor)} --> {stamp(next_cursor)}", " ".join(group), ""])
        cursor = next_cursor
    return "\n".join(output)


def main() -> None:
    if not MASTER.is_file() or not TRANSCRIPT.is_file():
        raise SystemExit("Missing required local narration master or transcript.")
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    VTT.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["ffmpeg", "-y", "-i", str(MASTER), "-codec:a", "libmp3lame", "-b:a", "128k", str(MP3)], check=True)
    VTT.write_text(captions(TRANSCRIPT.read_text(encoding="utf-8").strip(), duration_seconds(MP3)), encoding="utf-8")
    print(f"Packaged {MP3} and {VTT}")


if __name__ == "__main__":
    main()
