#!/usr/bin/env bash
# Rebuild logomotion reel edit to match reference reel pacing, using ONLY logomotion-720p-EXTENDED.mp4 footage.
# Real material footage only exists 0.0-5.0s in the source; everything after ~5.0s dissolves into a flat
# red gradient hold, which is the section the user dislikes. This script re-cuts using only 0.0-5.0s,
# ending on the "Morfos" wordmark-on-paper shot (2.5-3.0s) as a proper logo-reveal hold instead of the gradient.
set -e

FFMPEG="/c/Users/HET/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build/bin/ffmpeg.exe"
FFPROBE="/c/Users/HET/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build/bin/ffprobe.exe"
SRC="/c/Users/HET/Downloads/logomotion-720p-EXTENDED.mp4"
SCRATCH="C:/Users/HET/AppData/Local/Temp/claude/C--Users-HET-New-folder/77407c92-71ab-400b-87cd-c857d11a5834/scratchpad"
SEGDIR="$SCRATCH/segs"
OUT="C:/Users/HET/New folder/output/final-reel.mp4"

mkdir -p "$SEGDIR"
rm -f "$SEGDIR"/*.mp4

W=720
H=1280
FPS=30

# seg NAME start dur zoom_factor(punch-in amount, 1.0=none)
seg() {
  name="$1"; start="$2"; dur="$3"; z="$4"
  sw=$(awk -v w="$W" -v z="$z" 'BEGIN{printf "%d", w*z}')
  "$FFMPEG" -y -ss "$start" -t "$dur" -i "$SRC" \
    -vf "scale=${sw}:-1,crop=${W}:${H}:(iw-${W})/2:(ih-${H})/2,fps=${FPS},format=yuv420p" \
    -an -c:v libx264 -crf 16 -preset veryfast "$SEGDIR/${name}.mp4" -loglevel error
}

# Fast punchy intro cuts through the varied real-footage beats (street, glass, space, afro, phone icon,
# grid card, white snake, embossed paper, black snake) - each a quick hard cut with a light punch-in zoom
seg s01 0.02 0.30 1.00
seg s02 0.55 0.30 1.03
seg s03 1.05 0.30 1.00
seg s04 1.55 0.30 1.04
seg s05 2.05 0.30 1.00
seg s06 3.05 0.30 1.03
seg s07 3.55 0.30 1.00
seg s08 4.05 0.30 1.04
seg s09 4.55 0.30 1.00

# Hold segment: a TRUE freeze on the clean "Morfos" wordmark frame (no setpts stutter - setpts on a tiny
# 0.32s source with no frame interpolation just steps/repeats frames, which read as glitchy "stuck" motion
# rather than an intentional pause). A genuine still frame reads as a deliberate hold, matching the reference.
"$FFMPEG" -y -ss 2.90 -t 0.04 -i "$SRC" \
  -vf "scale=${W}:${H},tpad=stop_mode=clone:stop_duration=1.9,format=yuv420p" \
  -an -c:v libx264 -crf 16 -preset veryfast -t 2.0 "$SEGDIR/s10_hold.mp4" -loglevel error

# Rapid flash-cut recap (reuse earlier beats, very short, punchy) right after the hold, like the reference's ending flurry
seg s11 0.55 0.15 1.05
seg s12 1.55 0.15 1.07
seg s13 3.05 0.15 1.05
seg s14 4.05 0.15 1.07

# Final freeze hold on the last frame of the wordmark reveal (clean logo lockup) as the true ending
"$FFMPEG" -y -ss 2.94 -t 0.04 -i "$SRC" \
  -vf "scale=${W}:${H},tpad=stop_mode=clone:stop_duration=0.85,format=yuv420p" \
  -an -c:v libx264 -crf 16 -preset veryfast -t 0.9 "$SEGDIR/s15_freeze.mp4" -loglevel error

# Concat list (cuts -> hold/reveal -> rapid flash recap -> freeze end, mirroring the reference's rhythm)
LIST="$SCRATCH/concat.txt"
> "$LIST"
for f in s01 s02 s03 s04 s05 s06 s07 s08 s09 s10_hold s11 s12 s13 s14 s15_freeze; do
  echo "file '$SEGDIR/${f}.mp4'" >> "$LIST"
done

CONCAT_VIDEO="$SCRATCH/concat_video.mp4"
"$FFMPEG" -y -f concat -safe 0 -i "$LIST" -c copy "$CONCAT_VIDEO" -loglevel error

DUR=$("$FFPROBE" -v error -show_entries format=duration -of csv=p=0 "$CONCAT_VIDEO")
echo "Concatenated video duration: $DUR"

# Matching audio: original source audio (which covers this exact 0-5s window's actual sound), looped/padded
# to the new total duration, faded out at the end
FADEST=$(awk -v d="$DUR" 'BEGIN{v=d-0.5; if (v<0) v=0; printf "%.3f", v}')
"$FFMPEG" -y -stream_loop -1 -i "$SRC" -t "$DUR" -vn -af "afade=t=out:st=${FADEST}:d=0.5" -c:a aac -b:a 192k "$SCRATCH/audio.m4a" -loglevel error

"$FFMPEG" -y -i "$CONCAT_VIDEO" -i "$SCRATCH/audio.m4a" -c:v copy -c:a aac -shortest "$OUT" -loglevel error

echo "DONE: $OUT"
