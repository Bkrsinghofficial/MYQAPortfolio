"""
Convert Scrollbackground PNG frames to mobile-optimised WebP.

Strategy:
  - Source : Scrollbackground/ezgif-frame-NNN.png  (300 frames, ~500 KB each)
  - Output : Scrollbackground/mobile/ezgif-frame-NNN.webp
  - Target size : 800 x 1200 px  (portrait-safe, covers tall phones)
  - Quality : 72  (good visual fidelity, ~15-30 KB per frame vs ~500 KB PNG)
"""

import os
import sys
from pathlib import Path
from PIL import Image

SRC_DIR   = Path("Scrollbackground")
OUT_DIR   = Path("Scrollbackground/mobile")
TARGET_W  = 800
TARGET_H  = 1200
QUALITY   = 72          # WebP quality (0-100)
TOTAL     = 300

OUT_DIR.mkdir(parents=True, exist_ok=True)

converted = 0
skipped   = 0
errors    = []

for i in range(1, TOTAL + 1):
    filename = f"ezgif-frame-{str(i).zfill(3)}.png"
    src_path = SRC_DIR / filename
    dst_path = OUT_DIR / filename.replace(".png", ".webp")

    if not src_path.exists():
        print(f"  [MISSING] {src_path}")
        continue

    # Skip if already converted and up-to-date
    if dst_path.exists() and dst_path.stat().st_mtime >= src_path.stat().st_mtime:
        skipped += 1
        continue

    try:
        with Image.open(src_path) as img:
            # Convert to RGB (strips alpha, avoids WebP lossless-only mode for RGBA)
            img = img.convert("RGB")

            orig_w, orig_h = img.size
            # Scale to fit inside 800x1200, maintaining aspect ratio
            scale = min(TARGET_W / orig_w, TARGET_H / orig_h)
            new_w = int(orig_w * scale)
            new_h = int(orig_h * scale)

            img = img.resize((new_w, new_h), Image.LANCZOS)
            img.save(dst_path, "WEBP", quality=QUALITY, method=6)

        converted += 1
        if converted % 30 == 0:
            print(f"  Converted {converted}/{TOTAL}... ({dst_path.stat().st_size // 1024} KB)")

    except Exception as e:
        errors.append((filename, str(e)))
        print(f"  [ERROR] {filename}: {e}")

print(f"\nDone. Converted={converted}, Skipped={skipped}, Errors={len(errors)}")
if errors:
    for f, e in errors:
        print(f"  {f}: {e}")
