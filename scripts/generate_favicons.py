#!/usr/bin/env python3
"""
Generate multi-resolution favicons, touch icons, and pure vector SVG from the user uploaded image with rounded/oval corners.
Outputs:
- assets/icon-512.png (512x512)
- assets/icon-192.png (192x192)
- apple-touch-icon.png (180x180)
- assets/favicon-32x32.png (32x32)
- assets/favicon-16x16.png (16x16)
- favicon.ico (multi-resolution 16x16, 32x32, 48x48)
- favicon.svg (100% PURE VECTOR SVG with rounded squircle and traced H&H paths)
"""

import os
import subprocess
import struct
import math
import zlib

SOURCE_PATH = "/Users/macair1/.gemini/antigravity/brain/8bc304cf-639e-4a14-86a6-105281c9ab17/.user_uploaded/media_1788813704883.png"
REPO_ROOT = "/Users/macair1/projects/html"

def write_png(filename, width, height, rgba_data):
    def chunk(tag, data):
        c = tag + data
        return struct.pack(">I", len(data)) + c + struct.pack(">I", zlib.crc32(c) & 0xffffffff)

    raw = bytearray()
    for y in range(height):
        raw.append(0)  # filter type 0 (None)
        start = y * width * 4
        raw.extend(rgba_data[start:start + width * 4])
    
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    idat = zlib.compress(bytes(raw), level=9)
    png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", idat) + chunk(b"IEND", b"")
    with open(filename, "wb") as f:
        f.write(png)

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
    print(f"Reading source image from: {SOURCE_PATH}")
    tmp_bmp = "/tmp/hh_raw.bmp"
    subprocess.check_call(["sips", "-s", "format", "bmp", SOURCE_PATH, "--out", tmp_bmp], stdout=subprocess.DEVNULL)
    
    with open(tmp_bmp, "rb") as f:
        bmp = f.read()
    
    w = abs(struct.unpack("<i", bmp[18:22])[0])
    h = abs(struct.unpack("<i", bmp[22:26])[0])
    offset = struct.unpack("<I", bmp[10:14])[0]
    row_bytes = ((32 * w + 31) // 32) * 4
    
    # Corner radius: 176px out of 800px (22% iOS / macOS squircle ratio)
    r = 176.0
    rgba = bytearray()

    for y in range(h):
        # BMP is stored bottom-up
        bmp_y = h - 1 - y
        if y < r:
            dy = r - y
        elif y > h - 1 - r:
            dy = y - (h - 1 - r)
        else:
            dy = 0.0

        for x in range(w):
            if x < r:
                dx = r - x
            elif x > w - 1 - r:
                dx = x - (w - 1 - r)
            else:
                dx = 0.0

            idx = offset + bmp_y * row_bytes + x * 4
            b, g, red, a = bmp[idx], bmp[idx+1], bmp[idx+2], bmp[idx+3]

            if dx > 0.0 and dy > 0.0:
                dist = math.sqrt(dx * dx + dy * dy)
                if dist > r + 0.5:
                    alpha = 0
                elif dist < r - 0.5:
                    alpha = 255
                else:
                    alpha = int(round((r + 0.5 - dist) * 255))
            else:
                alpha = 255

            if alpha == 0:
                rgba.extend([0, 0, 0, 0])
            else:
                rgba.extend([red, g, b, alpha])
    
    icon_800_path = "/tmp/hh_rounded_800.png"
    write_png(icon_800_path, w, h, rgba)
    print(f"Generated rounded source: {icon_800_path} (800x800, r={r})")
    
    icon_512_path = os.path.join(REPO_ROOT, "assets", "icon-512.png")
    os.makedirs(os.path.dirname(icon_512_path), exist_ok=True)
    subprocess.check_call(["sips", "-z", "512", "512", icon_800_path, "--out", icon_512_path], stdout=subprocess.DEVNULL)
    print(f"Wrote {icon_512_path} (512x512)")
    
    targets = [
        ("assets/icon-192.png", 192),
        ("apple-touch-icon.png", 180),
        ("assets/favicon-32x32.png", 32),
        ("assets/favicon-16x16.png", 16),
        ("/tmp/favicon-48x48.png", 48)
    ]
    
    for rel_path, size in targets:
        out_path = rel_path if rel_path.startswith("/") else os.path.join(REPO_ROOT, rel_path)
        subprocess.check_call(["sips", "-z", str(size), str(size), icon_800_path, "--out", out_path], stdout=subprocess.DEVNULL)
        print(f"Wrote {out_path} ({size}x{size})")
    
    # Build multi-resolution favicon.ico (16x16, 32x32, 48x48)
    ico_targets = [
        (os.path.join(REPO_ROOT, "assets", "favicon-16x16.png"), 16, 16),
        (os.path.join(REPO_ROOT, "assets", "favicon-32x32.png"), 32, 32),
        ("/tmp/favicon-48x48.png", 48, 48)
    ]
    ico_data = build_ico(ico_targets)
    ico_path = os.path.join(REPO_ROOT, "favicon.ico")
    with open(ico_path, "wb") as f:
        f.write(ico_data)
    print(f"Wrote {ico_path} (multi-res 16, 32, 48)")
    
    # 100% PURE VECTOR SVG with rounded squircle and traced H&H paths (no raster <image> fallback)
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <rect width="800" height="800" rx="176" ry="176" fill="#000000"/>
  <g transform="translate(0,800) scale(0.1,-0.1)" fill="#ffffff" stroke="none">
    <path d="M1350 4005 l0 -1155 155 0 155 0 0 550 0 550 570 0 570 0 0 -550 0 -550 155 0 155 0 0 1155 0 1155 -155 0 -155 0 0 -475 0 -475 -567 2 -568 3 -3 473 -2 472 -155 0 -155 0 0 -1155z"/>
    <path d="M4870 4005 l0 -1155 155 0 155 0 0 550 0 550 570 0 570 0 0 -550 0 -550 155 0 155 0 0 1155 0 1155 -155 0 -155 0 0 -475 0 -475 -567 2 -568 3 -3 473 -2 472 -155 0 -155 0 0 -1155z"/>
    <path d="M3792 4229 c-62 -10 -118 -37 -166 -79 -111 -98 -105 -302 13 -474 17 -25 31 -47 31 -50 0 -3 -24 -18 -52 -32 -137 -69 -254 -178 -283 -262 -22 -66 -20 -179 5 -246 24 -64 93 -141 161 -180 162 -93 470 -89 646 10 l64 36 22 -29 c62 -78 53 -74 159 -71 l96 3 -65 80 c-103 127 -99 119 -69 157 58 77 106 214 106 304 l0 34 -84 0 -84 0 -7 -56 c-8 -69 -30 -143 -48 -168 -13 -18 -25 -5 -166 170 -83 104 -151 192 -151 195 0 4 26 22 57 39 74 42 162 131 193 195 31 65 35 210 7 262 -48 90 -128 145 -238 163 -72 11 -73 11 -147 -1z m142 -140 c80 -22 116 -96 96 -196 -15 -69 -65 -127 -149 -172 l-60 -31 -31 45 c-39 57 -77 139 -85 186 -8 45 9 110 34 133 44 40 125 55 195 35z m4 -795 c90 -113 165 -211 169 -219 9 -24 -104 -71 -204 -85 -234 -33 -393 60 -393 230 0 70 29 130 89 181 53 46 139 98 161 98 8 0 88 -92 178 -205z"/>
  </g>
</svg>
"""
    svg_path = os.path.join(REPO_ROOT, "favicon.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Wrote pure vector SVG to {svg_path}")

if __name__ == "__main__":
    main()
