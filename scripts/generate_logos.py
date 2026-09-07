#!/usr/bin/env python3
"""
Generate assets/logo.png and assets/logo-dark.png from the user uploaded logo image:
// html&html
Extracts alpha channel, crops to balanced bounding box, and creates:
- assets/logo.png (#11120F dark ink on transparent background)
- assets/logo-dark.png (#F8FAFC light ink on transparent background)
"""

import os
import subprocess
import struct
import zlib

SOURCE_PATH = "/Users/macair1/.gemini/antigravity/brain/8bc304cf-639e-4a14-86a6-105281c9ab17/.user_uploaded/media_1788816857571.png"
REPO_ROOT = "/Users/macair1/projects/html"

def main():
    print(f"Reading source logo from {SOURCE_PATH}")
    raw_bin = "/tmp/logo_raw_rgba.bin"
    cmd = ["/opt/homebrew/bin/magick", SOURCE_PATH, "-depth", "8", f"rgba:{raw_bin}"]
    subprocess.check_call(cmd)

    w, h = 1024, 182
    with open(raw_bin, "rb") as f:
        raw = f.read()

    # Find bounding box where alpha > 10
    min_x, max_x = w, 0
    min_y, max_y = h, 0
    for y in range(h):
        for x in range(w):
            idx = (y * w + x) * 4
            a = raw[idx + 3]
            if a > 10:
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y

    print(f"Content bbox: x=[{min_x}, {max_x}] (w={max_x-min_x+1}), y=[{min_y}, {max_y}] (h={max_y-min_y+1})")

    # Symmetric balanced padding for clean rendering in 22px-24px headers and footers
    pad_y = 10
    pad_x = 12

    crop_x0 = max(0, min_x - pad_x)
    crop_x1 = min(w - 1, max_x + pad_x)
    crop_y0 = max(0, min_y - pad_y)
    crop_y1 = min(h - 1, max_y + pad_y)

    out_w = crop_x1 - crop_x0 + 1
    out_h = crop_y1 - crop_y0 + 1
    print(f"Cropped dimensions: {out_w}x{out_h}")

    def make_png(color_rgb, filename):
        def chunk(tag, data):
            c = tag + data
            return struct.pack(">I", len(data)) + c + struct.pack(">I", zlib.crc32(c) & 0xffffffff)

        rows = bytearray()
        for y in range(crop_y0, crop_y1 + 1):
            rows.append(0) # filter None
            for x in range(crop_x0, crop_x1 + 1):
                idx = (y * w + x) * 4
                a = raw[idx + 3]
                rows.extend([color_rgb[0], color_rgb[1], color_rgb[2], a])

        ihdr = struct.pack(">IIBBBBB", out_w, out_h, 8, 6, 0, 0, 0)
        idat = zlib.compress(bytes(rows), level=9)
        png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", idat) + chunk(b"IEND", b"")
        with open(filename, "wb") as f:
            f.write(png)
        print(f"Wrote {filename} ({out_w}x{out_h})")

    logo_path = os.path.join(REPO_ROOT, "assets", "logo.png")
    logo_dark_path = os.path.join(REPO_ROOT, "assets", "logo-dark.png")
    make_png((17, 18, 15), logo_path)
    make_png((245, 244, 237), logo_dark_path)
    print("Logo generation complete.")

if __name__ == "__main__":
    main()
