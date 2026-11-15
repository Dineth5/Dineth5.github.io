# dineth5.github.io

Personal site and portfolio of Dineth Ilapperuma. Custom-built static site: no framework, no template, no runtime dependencies.

## Run it

```bash
node tools/build.mjs          # builds into dist/
node tools/check.mjs          # checks every internal link
python3 -m http.server 4173 --directory dist   # preview at http://localhost:4173
```

Needs Node 20 or newer. Nothing to install.

## Where things live

| Path | What it is |
| --- | --- |
| `src/pages/*.html` | The pages. Each starts with a small front matter block (`url`, `title`, `description`). |
| `src/projects/*.md` | One markdown file per project. The file name is the URL: `VIMA.md` becomes `/projects/VIMA/`. |
| `src/layout.html` | The shell shared by every page: head, navigation, footer. |
| `src/partials/` | SVG drawings (footer skyline, Hyperloop capsule). |
| `src/assets/css/site.css` | All styles. Colours and fonts are variables at the top. |
| `src/assets/js/site.js` | Scroll effects, forms, theme toggle. |
| `src/assets/img/` | Generated images. Do not edit by hand. |
| `media-originals/` | The source images. Not deployed. |
| `tools/` | Build script, link checker, image generators. |

## Common edits

**Add a project.** Copy a file in `src/projects/`, change the front matter and the text, and set `order` (the first five appear on the home page). Front matter fields:

```
title, short, order, kind, org, years, role, summary
plate:    name of a line drawing in src/assets/img/plates/
tools:    A | B | C
metrics:  38% = lower peak stress | 2.5× = safety factor
```

**Add images.** Put the original in `media-originals/<Folder>/`, then run `python3 tools/make_assets.py` (needs `pillow numpy scipy`). It writes an optimised `.webp` to `src/assets/img/<Folder>/`. To trace a new blueprint plate from a CAD render, add a line to `PLATES` in that script.

**Change experience, education or skills.** Edit `src/pages/index.html`.

**Change colours.** Edit the variables under `:root` in `site.css`. Light and dark values sit next to each other.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to the `gh-pages` branch. Pull requests are built and link-checked but not deployed.

## Credits

Fonts: Hanken Grotesk, Playfair Display and IBM Plex Mono, all under the SIL Open Font License. Markdown parsing: [marked](https://github.com/markedjs/marked) (MIT), vendored in `tools/`.
