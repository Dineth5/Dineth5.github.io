#!/usr/bin/env python3
"""Generate the site's image assets from media-originals/.

Run from the repo root:  python3 tools/make_assets.py

Outputs (all committed, so CI never needs Python):
  src/assets/img/**.webp        optimised copies of every original
  src/assets/img/plates/*.webp  "blueprint plates": line drawings traced from the
                                CAD / CFD renders, stored as alpha masks so CSS
                                can ink them in any colour
  src/assets/img/manifest.json  width/height of every output (used by the build)

Needs: pillow, numpy, scipy.
"""
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps
from scipy import ndimage as ndi

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "media-originals"
OUT = ROOT / "src" / "assets" / "img"

SKIP_DIRS = {"publication_preview", "Videos"}
SKIP_FILES = {
    "prof_pic.jpg", "prof_pic_color.png", "rhino.png", "icon.png", "template_error.png",
    "favicon.ico", "favicon.svg", "favicon-96x96.png", "apple-touch-icon.png",
    "web-app-manifest-192x192.png", "web-app-manifest-512x512.png", "site.webmanifest",
}
MAX_W = {"PINNs": 2200, "Lathe": 1800}
DEFAULT_MAX_W = 1600

# slug -> (source image, crop box as fractions or None)
PLATES = {
    "pinns": ("stent.png", None),
    "aneurysms": ("coil.png", None),
    "vima": ("VIMA/VIMA_expo.png", None),
    "gaze-wheelchair": ("GazeWheelchair/exploded_assembly.png", None),
    "lathe": ("Lathe/Full_explo.png", (0.02, 0.06, 0.98, 0.94)),
    "firehose": ("Fire/Whole.png", None),
    "hydropede": ("Hydropede/modular.png", None),
    "pipeclimber": ("Pipe/Explo1.jpg", None),
    "wheelchair-iso": ("GazeWheelchair/wheelchair_iso.png", None),
    "chassis": ("GazeWheelchair/chassis_internals.png", None),
}


def flatten(im, bg=(255, 255, 255)):
    im = im.convert("RGBA")
    base = Image.new("RGBA", im.size, bg + (255,))
    base.alpha_composite(im)
    return base.convert("RGB")


def optimise():
    manifest = {}
    for p in sorted(SRC.rglob("*")):
        if not p.is_file() or p.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
            continue
        rel = p.relative_to(SRC)
        if rel.parts[0] in SKIP_DIRS or p.name in SKIP_FILES:
            continue
        im = Image.open(p)
        im = ImageOps.exif_transpose(im)
        if rel.as_posix() == "Photos/Anuradhapura_1.png":
            # the scan has black bars above and below the frame: trim them
            g = np.asarray(im.convert("L"))
            rows = np.where(g.mean(axis=1) > 12)[0]
            im = im.crop((0, int(rows[0]) + 4, im.width, int(rows[-1]) - 4))
        has_alpha = im.mode in ("RGBA", "LA", "P") and "A" in im.convert("RGBA").getbands() \
            and np.asarray(im.convert("RGBA"))[..., 3].min() < 250
        im = im.convert("RGBA") if has_alpha else flatten(im)
        max_w = MAX_W.get(rel.parts[0], DEFAULT_MAX_W)
        if im.width > max_w:
            im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
        out = (OUT / rel).with_suffix(".webp")
        out.parent.mkdir(parents=True, exist_ok=True)
        im.save(out, "WEBP", quality=84, method=6)
        manifest[out.relative_to(OUT).as_posix()] = [im.width, im.height]
    return manifest


NO_BODY = {"Lathe/Full_explo.png"}  # renders with a grey backdrop: lines only


def plate(src_rel, crop, size=1400):
    """Trace a render into a line drawing. Returns an 'LA' image: white ink, alpha = line strength."""
    im = flatten(Image.open(SRC / src_rel))
    if crop:
        w, h = im.size
        im = im.crop((int(crop[0] * w), int(crop[1] * h), int(crop[2] * w), int(crop[3] * h)))
    scale = size / max(im.size)
    im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    rgb = np.asarray(im).astype(np.float32) / 255.0
    # edges in every channel so colour boundaries (CFD contours, red/black parts) register too
    mag = np.zeros(rgb.shape[:2], np.float32)
    for c in range(3):
        ch = ndi.gaussian_filter(rgb[..., c], 1.1)
        mag = np.maximum(mag, np.hypot(ndi.sobel(ch, 0), ndi.sobel(ch, 1)))
    mag /= np.percentile(mag[mag > 0.02], 97) if (mag > 0.02).any() else 1
    line = np.clip((mag - 0.10) / 0.75, 0, 1) ** 0.8
    # faint tone for the body of the part so the drawing has some weight
    lum = rgb.mean(axis=2)
    body = ndi.gaussian_filter((lum < 0.97).astype(np.float32), 2.0) * (0 if src_rel in NO_BODY else 0.07)
    alpha = np.clip(line * 0.95 + body, 0, 1)
    # trim empty margins
    ys, xs = np.where(alpha > 0.12)
    pad = 24
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, alpha.shape[0])
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, alpha.shape[1])
    alpha = alpha[y0:y1, x0:x1]
    a = Image.fromarray((alpha * 255).astype(np.uint8), "L")
    out = Image.new("LA", a.size, 255)
    out.putalpha(a)
    return out


def main():
    manifest = optimise()
    (OUT / "plates").mkdir(parents=True, exist_ok=True)
    for slug, (src_rel, crop) in PLATES.items():
        im = plate(src_rel, crop)
        out = OUT / "plates" / f"{slug}.webp"
        im.convert("RGBA").save(out, "WEBP", quality=80, method=6, alpha_quality=85)
        manifest[f"plates/{slug}.webp"] = [im.width, im.height]
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=1, sort_keys=True))
    total = sum(f.stat().st_size for f in OUT.rglob("*.webp"))
    print(f"{len(manifest)} images, {total / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
