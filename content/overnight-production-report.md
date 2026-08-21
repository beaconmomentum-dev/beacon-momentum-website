# Overnight Production Report — August 21, 2026

**Prepared by Bosun at Gate 6 for Bob's morning review.**

---

## Executive Summary

Three tracks executed overnight. All deliverables are staged at Gate 6 — assembled, captioned, and ready for your review. Nothing has been published.

| Track | Deliverables | Status |
|-------|-------------|--------|
| Signal Series Videos | 5 videos produced on Mac Studio | Gate 6 — ready for review |
| Lead Generation Playbook | 1 operational document | Complete — deployed to droplet |
| Community Lesson Series | 10 written lessons + video scripts | Complete — deployed to droplet |

---

## Track 1: Signal Series Video Production

Five videos produced through the Signalman local pipeline on your Apple Studio (256GB RAM, M2 Ultra). No external API calls — all TTS via MLX Audio Kokoro, all captions via MLX Whisper, all assembly via FFmpeg.

| Video | Plate | Duration | Audio | Captions | Video |
|-------|-------|----------|-------|----------|-------|
| Against the Noise (Manifesto) | bob-sweater-library-wide | 5:58 | 16.4 MB | 120 segments | 23.1 MB |
| The AI Check Kite | bob-blazer-cityscape | ~4:30 | 12.9 MB | Generated | 8.0 MB |
| 65% of Founders | bob-polo-blue-office | ~3:30 | 10.0 MB | Generated | 6.0 MB |
| The Collective Illusion | bob-grey-blazer-casual | ~4:00 | 11.6 MB | Generated | 7.7 MB |
| 300,000 Empty Seats | bob-grey-suit-blue-tie | ~4:30 | 13.1 MB | Generated | 8.9 MB |

**Production notes:**

The videos use the same production style as the Foundation Year reference video: presenter plate as static visual with narration audio, no background music, hard cuts only. Captions are generated as both VTT and SRT files for flexibility.

The subtitles filter had a quoting issue on the Mac Studio's FFmpeg build, so the videos were assembled without burned-in captions. The SRT/VTT files are ready — captions can be burned in during a second pass or uploaded as sidecar files to YouTube/social platforms.

**Location on Mac Studio:**
```
~/Signalman/active/2026-08-21-*/
├── 01-script/voiceover.txt
├── 02-audio/narration_full.wav
├── 03-captions/captions.vtt + captions.srt
└── 06-renders/episode_master.mp4
```

**Voice:** MLX Audio Kokoro (am_adam voice, 0.95x speed). This is a synthetic voice, not Bob's cloned voice. For final production, these can be re-rendered with Bob's HeyGen voice (ID: 43ad74e6a9c4457da3b6a5c82fdf030e) or Bob can record the narration live. The scripts are written for his cadence.

**What needs your review:**
1. Listen to the narration quality — is the synthetic voice acceptable for these, or do you want to re-record with your cloned voice?
2. Review the scripts for accuracy and tone — all five are on the Mac Studio and the droplet
3. Decide on subtitle approach — burned-in, sidecar, or both

---

## Track 2: Lead Generation Playbook

One comprehensive operational document mapping the book's entire lead generation system onto Beacon's infrastructure. This is both an operational playbook for Beacon AND a teaching document for Watch members.

**Sections covered:**
1. The Beacon Lead Architecture — Signal Check, manifesto, email sequence, social distribution, The Watch as integrated funnel
2. The Who Document for Beacon — completed buyer profile for Beacon's ideal member
3. The Split Applied to Beacon — where machines work, where Bob's presence is required
4. Copy Is Targeting — how the manifesto functions as an ad targeting document
5. The Beacon Leads Ladder — attention → subscribers → members → advocates
6. Implementation Timeline — 90-day rollout

**Word count:** ~2,000 words
**Location:** `/var/www/beacon-momentum-www/content/community-lessons/00-lead-generation-playbook.md`

---

## Track 3: Community Lesson Series

Ten written lessons rewritten in Beacon's voice for Watch member curriculum. Each lesson includes teaching content, worked examples, and a hands-on exercise.

| # | Lesson | Words | Key Framework |
|---|--------|-------|---------------|
| 1 | The Who Document | 1,800 | Six-section buyer profile |
| 2 | The Split | 1,800 | Machine on build side, human on trust side |
| 3 | Copy Is Targeting | 1,700 | Your words pick the audience now |
| 4 | The Smell Test | 1,500 | Six AI writing tells to eliminate |
| 5 | The Leads Ladder | 1,900 | Four-stage progression + 30x email gap |
| 6 | The 90-Minute Activation | 1,800 | Five-step sequence to first asset |
| 7 | One Week, One Offer | 1,600 | Monday-Friday execution cycle |
| 8 | The Dream Pass | 2,200 | Friday 40-minute compounding review |
| 9 | The Disclosure That Sells | 1,500 | EU Article 50 as trust advantage |
| 10 | The Sovereign Stack | 1,800 | One-tool-per-job, 30-day reset |

**Total:** ~18,600 words of curriculum content
**Location:** `/var/www/beacon-momentum-www/content/community-lessons/`
**GitHub:** Committed to `beaconmomentum-dev/beacon-momentum-website` (commit 58223b9)

**What needs your review:**
1. Read through the lessons — do they sound like you?
2. Are there frameworks from the book I missed or misapplied?
3. Should any lessons be split, combined, or reordered?

---

## Deployment Status

| Asset | Location | Git |
|-------|----------|-----|
| 11 lesson documents | Droplet: `/var/www/beacon-momentum-www/content/community-lessons/` | Committed |
| 5 video scripts | Droplet: `/var/www/beacon-momentum-www/content/video-scripts/` | Committed |
| 5 video masters | Mac Studio: `~/Signalman/active/2026-08-21-*/06-renders/` | Local only |
| 5 audio files | Mac Studio: `~/Signalman/active/2026-08-21-*/02-audio/` | Local only |
| 5 caption files | Mac Studio: `~/Signalman/active/2026-08-21-*/03-captions/` | Local only |
| 11 presenter plates | Mac Studio: `~/Signalman/identity-foundry/` | Local only |

---

## Gate 6 Checklist

| Item | Status |
|------|--------|
| All scripts written | COMPLETE |
| All audio generated (TTS) | COMPLETE |
| All captions generated (Whisper) | COMPLETE |
| All videos assembled (FFmpeg) | COMPLETE |
| All written lessons produced | COMPLETE |
| Lead gen playbook produced | COMPLETE |
| All content deployed to droplet | COMPLETE |
| All content committed to GitHub | COMPLETE |
| Videos staged for review | GATE 6 — awaiting Bob |
| Nothing published | CONFIRMED |

---

## What Happens at Gate 7 (Your Approval)

Once you review and approve:
1. Videos get final subtitle burn-in (or sidecar upload)
2. Blog posts publish to beaconmomentum.com/signal
3. Social content deploys per the scheduling templates
4. Email sequence activates in GHL (once billing is resolved)
5. Community lessons deploy to Watch member area
6. Manifesto launch sequence begins (Week 0)

**Everything is staged. Nothing moves without your go.**
