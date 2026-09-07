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

SOURCE_PATH = "/Users/macair1/.gemini/antigravity/brain/8bc304cf-639e-4a14-86a6-105281c9ab17/.user_uploaded/media_1788823464356.png"
REPO_ROOT = "/Users/macair1/projects/html"

def main():
    print(f"Reading source logo from {SOURCE_PATH}")
    logo_path = os.path.join(REPO_ROOT, "assets", "logo.png")
    logo_dark_path = os.path.join(REPO_ROOT, "assets", "logo-dark.png")

    # 1. Generate logo.png with symmetric 8px padding around content (1014x211+5+10)
    cmd_light = [
        "magick", SOURCE_PATH,
        "-crop", "1014x211+5+10",
        "+repage",
        "-bordercolor", "none",
        "-border", "8x8",
        "-strip",
        logo_path
    ]
    subprocess.check_call(cmd_light)

    # 2. Generate logo-dark.png (inverted colors for dark backgrounds)
    cmd_dark = [
        "magick", logo_path,
        "-channel", "RGB",
        "-negate",
        "+channel",
        "-strip",
        logo_dark_path
    ]
    subprocess.check_call(cmd_dark)
    print("Logo generation complete:", logo_path, logo_dark_path)

if __name__ == "__main__":
    main()
