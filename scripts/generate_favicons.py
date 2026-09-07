#!/usr/bin/env python3
"""
Generate multi-resolution favicons, touch icons, and pure vector SVG from user uploaded logo:
media_1788817645322.png
Ensures 100% true-to-source direction (unflipped, exact orientation as user image)
with rounded squircle corners.
Outputs:
- assets/icon-512.png (512x512)
- assets/icon-192.png (192x192)
- apple-touch-icon.png (180x180)
- assets/favicon-32x32.png (32x32)
- assets/favicon-16x16.png (16x16)
- favicon.ico (multi-resolution 16x16, 32x32, 48x48)
- favicon.svg (pure vector SVG with rounded squircle and true-direction parallel slashes)
"""

import os
import subprocess
import struct

REPO_ROOT = "/Users/macair1/projects/html"
SOURCE_PATH = "/Users/macair1/.gemini/antigravity/brain/8bc304cf-639e-4a14-86a6-105281c9ab17/.user_uploaded/media_1788817645322.png"

def build_ico(image_files):
    images = []
    for path, w, h in image_files:
        with open(path, "rb") as f:
            images.append((w, h, f.read()))
    header = struct.pack("<HHH", 0, 1, len(images))
    offset = 6 + len(images) * 16
    entries = bytearray()
    data = bytearray()
    for w, h, png in images:
        entry = struct.pack("<BBBBHHII", 
            0 if w == 256 else w,
            0 if h == 256 else h,
            0, 0, 1, 32, len(png), offset + len(data)
        )
        entries.extend(entry)
        data.extend(png)
    return header + entries + data

def main():
    print(f"Generating favicons from source: {SOURCE_PATH}")
    
    # 1. Create 800x800 squircle mask (r=176, 22% curvature) and composite directly with Magick (zero flipping)
    mask_path = "/tmp/hh_squircle_mask.png"
    subprocess.check_call([
        "/opt/homebrew/bin/magick", "-size", "800x800", "xc:none",
        "-fill", "white", "-draw", "roundrectangle 0,0 799,799 176,176",
        mask_path
    ])
    
    rounded_800 = "/tmp/hh_fav_rounded_800.png"
    subprocess.check_call([
        "/opt/homebrew/bin/magick", SOURCE_PATH, mask_path,
        "-compose", "DstIn", "-composite", rounded_800
    ])
    print(f"Generated rounded source: {rounded_800}")
    
    # 2. Multi-resolution PNGs
    targets = [
        ("assets/icon-512.png", 512),
        ("assets/icon-192.png", 192),
        ("apple-touch-icon.png", 180),
        ("assets/favicon-32x32.png", 32),
        ("assets/favicon-16x16.png", 16),
        ("/tmp/favicon-48x48.png", 48)
    ]
    for rel_path, size in targets:
        out_path = rel_path if rel_path.startswith("/") else os.path.join(REPO_ROOT, rel_path)
        subprocess.check_call(["/opt/homebrew/bin/magick", rounded_800, "-resize", f"{size}x{size}", out_path])
        print(f"Wrote {out_path} ({size}x{size})")
        
    # 3. Multi-resolution ICO
    ico_targets = [
        (os.path.join(REPO_ROOT, "assets", "favicon-16x16.png"), 16, 16),
        (os.path.join(REPO_ROOT, "assets", "favicon-32x32.png"), 32, 32),
        ("/tmp/favicon-48x48.png", 48, 48)
    ]
    ico_data = build_ico(ico_targets)
    ico_path = os.path.join(REPO_ROOT, "favicon.ico")
    with open(ico_path, "wb") as f:
        f.write(ico_data)
    print(f"Wrote {ico_path}")
    
    # 4. Pure Vector SVG with exact un-flipped vector paths
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" rx="176" ry="176" fill="#000000"/>
  <g transform="translate(0,800) scale(0.1,-0.1)" fill="#ffffff" stroke="none">
    <path d="M2746 7451 c-3 -5 -528 -1552 -1165 -3437 -638 -1886 -1163 -3437 -1166 -3446 -7 -17 23 -18 546 -18 l554 0 1156 3448 c983 2930 1154 3448 1140 3454 -24 10 -1059 9 -1065 -1z"/>
    <path d="M5505 4498 c-549 -1624 -1074 -3177 -1166 -3450 l-168 -498 552 0 552 0 779 2323 c428 1277 949 2829 1157 3450 l378 1127 -543 0 -543 0 -998 -2952z"/>
  </g>
</svg>
"""
    svg_path = os.path.join(REPO_ROOT, "favicon.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Wrote {svg_path}")

if __name__ == "__main__":
    main()
