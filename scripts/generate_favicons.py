#!/usr/bin/env python3
"""
Generate multi-resolution favicons and touch icons from the source image.
Outputs:
- assets/icon-512.png (512x512)
- assets/icon-192.png (192x192)
- apple-touch-icon.png (180x180)
- assets/favicon-32x32.png (32x32)
- assets/favicon-16x16.png (16x16)
- favicon.ico (multi-resolution 16x16, 32x32, 48x48)
- favicon.svg (pure vector SVG)
"""

import os
import subprocess
import struct
import zlib

SOURCE_PATH = "/Users/macair1/.gemini/antigravity/brain/5d92e3cc-971a-4ee2-9a97-10e530f5ec14/.user_uploaded/media_1788776824659.png"
REPO_ROOT = "/Users/macair1/projects/html"

def write_png(filename, width, height, rgba_data):
    def chunk(tag, data):
        c = tag + data
        return struct.pack('>I', len(data)) + c + struct.pack('>I', zlib.crc32(c) & 0xffffffff)

    raw = bytearray()
    for y in range(height):
        raw.append(0)  # filter type 0 (None)
        start = y * width * 4
        raw.extend(rgba_data[start:start + width * 4])
    
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    idat = zlib.compress(bytes(raw), level=9)
    png = b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', idat) + chunk(b'IEND', b'')
    with open(filename, 'wb') as f:
        f.write(png)

def build_ico(image_files):
    images = []
    for path, w, h in image_files:
        with open(path, 'rb') as f:
            images.append((w, h, f.read()))
    
    header = struct.pack('<HHH', 0, 1, len(images))
    offset = 6 + len(images) * 16
    entries = bytearray()
    data = bytearray()
    for w, h, png in images:
        entry = struct.pack('<BBBBHHII', 
            0 if w == 256 else w,
            0 if h == 256 else h,
            0, 0, 1, 32, len(png), offset + len(data)
        )
        entries.extend(entry)
        data.extend(png)
    return header + entries + data

def main():
    print(f"Reading source image from: {SOURCE_PATH}")
    # Convert source to BMP to inspect raw RGBA
    tmp_bmp = "/tmp/source_raw.bmp"
    subprocess.check_call(["sips", "-s", "format", "bmp", SOURCE_PATH, "--out", tmp_bmp], stdout=subprocess.DEVNULL)
    
    with open(tmp_bmp, "rb") as f:
        bmp = f.read()
    
    w = abs(struct.unpack("<i", bmp[18:22])[0])
    h = abs(struct.unpack("<i", bmp[22:26])[0])
    offset = struct.unpack("<I", bmp[10:14])[0]
    row_bytes = ((32 * w + 31) // 32) * 4
    
    # Exact non-transparent bounds found: X: [9..520] (512px), Y: [6..517] (512px)
    crop_w, crop_h = 512, 512
    crop_x, crop_y = 9, 6
    
    rgba = bytearray()
    for cy in range(crop_h):
        y = crop_y + cy
        for cx in range(crop_w):
            x = crop_x + cx
            idx = offset + y * row_bytes + x * 4
            b, g, r, a = bmp[idx], bmp[idx+1], bmp[idx+2], bmp[idx+3]
            rgba.extend([r, g, b, a])
    
    icon_512_path = os.path.join(REPO_ROOT, "assets", "icon-512.png")
    os.makedirs(os.path.dirname(icon_512_path), exist_ok=True)
    write_png(icon_512_path, 512, 512, rgba)
    print(f"Wrote {icon_512_path} (512x512)")
    
    # Downscale using sips for optimal bicubic filtering
    targets = [
        ("assets/icon-192.png", 192),
        ("apple-touch-icon.png", 180),
        ("assets/favicon-32x32.png", 32),
        ("assets/favicon-16x16.png", 16),
        ("/tmp/favicon-48x48.png", 48)
    ]
    
    for rel_path, size in targets:
        out_path = rel_path if rel_path.startswith("/") else os.path.join(REPO_ROOT, rel_path)
        subprocess.check_call(["sips", "-z", str(size), str(size), icon_512_path, "--out", out_path], stdout=subprocess.DEVNULL)
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
    
    # Generate pure vector favicon.svg
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="55" ry="55" fill="#000000" />
  <g fill="#ffffff">
    <!-- Left dash -->
    <rect x="77" y="191" width="69" height="28" />
    <!-- Numeral 1: Top flag + Stem -->
    <rect x="207" y="88" width="69" height="28" />
    <rect x="248" y="88" width="28" height="262" />
    <!-- Right dash -->
    <rect x="366" y="191" width="69" height="28" />
    <!-- Underline -->
    <rect x="207" y="392" width="112" height="28" />
  </g>
</svg>
"""
    svg_path = os.path.join(REPO_ROOT, "favicon.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Wrote {svg_path}")

if __name__ == "__main__":
    main()
