#!/usr/bin/env python3
"""
Generate assets/logo.png and assets/logo-dark.png from the newly uploaded logo image:
media_1788817607188.png (// html&html)
Extracts alpha channel, applies symmetric padding, and creates:
- assets/logo.png (#11120F dark ink on transparent background)
- assets/logo-dark.png (#F8FAFC light ink on transparent background)
"""

import os
import subprocess
import struct
import zlib

REPO_ROOT = "/Users/macair1/projects/html"
SOURCE_PATH = os.path.join(REPO_ROOT, "assets", "brand", "logo-master-2026.png")

def main():
    print(f"Reading source logo from {SOURCE_PATH}")
    logo_path = os.path.join(REPO_ROOT, "assets", "logo.png")
    logo_dark_path = os.path.join(REPO_ROOT, "assets", "logo-dark.png")

    # 1. Detect content trim box based on alpha channel
    trim_info = subprocess.check_output([
        "magick", SOURCE_PATH,
        "-alpha", "extract",
        "-trim", "-format", "%wx%h%O",
        "info:"
    ]).decode().strip()
    print(f"Detected content trim box: {trim_info}")

    # 2. Generate logo.png with symmetric 8px transparent padding
    cmd_light = [
        "magick", SOURCE_PATH,
        "-crop", trim_info,
        "+repage",
        "-bordercolor", "none",
        "-border", "8x8",
        "-channel", "RGB",
        "-evaluate", "set", "0",
        "+channel",
        "-colorspace", "sRGB",
        "-type", "TrueColorAlpha",
        "-strip",
        f"PNG32:{logo_path}"
    ]
    subprocess.check_call(cmd_light)

    # 3. Generate logo-dark.png (crisp white ink on transparent background)
    cmd_dark = [
        "magick", logo_path,
        "-channel", "RGB",
        "-negate",
        "+channel",
        "-colorspace", "sRGB",
        "-type", "TrueColorAlpha",
        "-strip",
        f"PNG32:{logo_dark_path}"
    ]
    subprocess.check_call(cmd_dark)
    print("Logo generation complete:")
    print(" - Light logo:", subprocess.check_output(["magick", "identify", logo_path]).decode().strip())
    print(" - Dark logo:", subprocess.check_output(["magick", "identify", logo_dark_path]).decode().strip())

if __name__ == "__main__":
    main()
