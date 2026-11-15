#!/usr/bin/env python3
"""Raster favicons that match src/static/favicon.svg.  python3 tools/make_icons.py"""
from pathlib import Path
from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parent.parent / "src" / "static"


def icon(n):
    s = 4
    im = Image.new("RGBA", (n * s, n * s), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    u = n * s / 32
    d.rounded_rectangle([0, 0, n * s - 1, n * s - 1], radius=7 * u, fill=(26, 63, 160, 255))
    w = int(2.4 * u)
    d.line([(8.5 * u, 9 * u), (8.5 * u, 23 * u)], fill="white", width=w)
    d.line([(8.5 * u, 9 * u), (13.1 * u, 9 * u)], fill="white", width=w)
    d.line([(8.5 * u, 23 * u), (13.1 * u, 23 * u)], fill="white", width=w)
    d.arc([6.1 * u, 9 * u - w / 2, 20.1 * u, 23 * u + w / 2], -90, 90, fill="white", width=w)
    d.line([(23.5 * u, 9 * u), (23.5 * u, 23 * u)], fill="white", width=w)
    return im.resize((n, n), Image.LANCZOS)


icon(180).save(OUT / "apple-touch-icon.png")
icon(48).save(OUT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
