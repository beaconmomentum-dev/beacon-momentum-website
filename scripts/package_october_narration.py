from __future__ import annotations

import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AUDIO_DIR = ROOT / "client" / "public" / "audio" / "october"
TRANSCRIPT_DIR = AUDIO_DIR / "transcripts"
CAPTION_DIR = AUDIO_DIR / "captions"
MASTER_DIR = ROOT / ".work" / "october-signal-narration" / "masters"
EXPECTED_SLUGS = [
    "a-claim-is-not-evidence",
    "before-you-connect-an-app",
    "a-disclosure-is-not-a-permission-slip",
    "what-an-ai-native-course-platform-has-to-prove",
]


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


def vtt_timestamp(seconds: float) -> str:
    milliseconds = int(round(seconds * 1000))
    hours, remainder = divmod(milliseconds, 3_600_000)
    minutes, remainder = divmod(remainder, 60_000)
    secs, millis = divmod(remainder, 1000)
    return f"{hours:02}:{minutes:02}:{secs:02}.{millis:03}"


def make_captions(transcript: str, total_duration: float) -> str:
    words = re.findall(r"\S+", transcript)
    groups = [words[index : index + 10] for index in range(0, len(words), 10)]
    weighted_total = sum(len(group) for group in groups) or 1
    cursor = 0.0
    cues = ["WEBVTT", ""]

    for index, group in enumerate(groups, start=1):
        share = len(group) / weighted_total
        next_cursor = total_duration if index == len(groups) else cursor + total_duration * share
        cues.extend(
            [
                str(index),
                f"{vtt_timestamp(cursor)} --> {vtt_timestamp(next_cursor)}",
                " ".join(group),
                "",
            ]
        )
        cursor = next_cursor

    return "\n".join(cues)


def main() -> None:
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    CAPTION_DIR.mkdir(parents=True, exist_ok=True)

    for slug in EXPECTED_SLUGS:
        master_path = MASTER_DIR / f"{slug}.wav"
        transcript_path = TRANSCRIPT_DIR / f"{slug}.txt"
        mp3_path = AUDIO_DIR / f"{slug}.mp3"
        caption_path = CAPTION_DIR / f"{slug}.vtt"

        if not master_path.is_file():
            raise SystemExit(f"Missing WAV master: {master_path}")
        if not transcript_path.is_file():
            raise SystemExit(f"Missing transcript: {transcript_path}")

        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-i",
                str(master_path),
                "-codec:a",
                "libmp3lame",
                "-b:a",
                "128k",
                str(mp3_path),
            ],
            check=True,
            text=True,
            capture_output=True,
        )
        transcript = transcript_path.read_text(encoding="utf-8").strip()
        caption_path.write_text(
            make_captions(transcript, duration_seconds(mp3_path)), encoding="utf-8"
        )
        print(f"Packaged {slug}")


if __name__ == "__main__":
    main()
