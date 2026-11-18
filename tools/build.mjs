#!/usr/bin/env node
// Zero-dependency static site build.  node tools/build.mjs  ->  dist/
//
//   src/layout.html        page shell (nav, footer)
//   src/pages/*.html       pages, with a small front matter block
//   src/projects/*.md      one markdown file per project
//   src/partials/*         snippets pulled in with <!--@name-->
//   src/assets/**          copied as-is to dist/assets
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "./vendor-marked.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");
const SITE = "https://dineth5.github.io";

// Google Search Console: the "content" value of the HTML-tag verification method.
const GSC_TOKEN = "5ZGcQ6cZ-Qo1Mr-P6DW8xdiWZF5qkNiVAou5xSXQLaA";
// Google Analytics 4: paste the measurement ID (G-XXXXXXXXXX) to switch it on. Empty = off.
const GA_ID = "";
const ANALYTICS = GA_ID
  ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${GA_ID}");</script>`
  : "";

const read = (p) => fs.readFileSync(p, "utf8");
const write = (rel, body) => {
  const out = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, body);
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const list = (s) => (s ? s.split("|").map((x) => x.trim()).filter(Boolean) : []);

function frontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return [{}, text];
  const data = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return [data, text.slice(m[0].length)];
}

// ---------- assets ----------
fs.rmSync(DIST, { recursive: true, force: true });
fs.cpSync(path.join(SRC, "assets"), path.join(DIST, "assets"), { recursive: true });
const manifest = JSON.parse(read(path.join(SRC, "assets/img/manifest.json")));
fs.rmSync(path.join(DIST, "assets/img/manifest.json"));
// cache-bust css/js with the build time
const VER = Date.now().toString(36);

// Give every local <img> its intrinsic size (no layout shift) and lazy decoding.
function sizeImages(html) {
  return html.replace(/<img\b([^>]*?)\/?>/g, (tag, attrs) => {
    const src = (attrs.match(/\bsrc="([^"]+)"/) || [])[1];
    if (!src) return tag;
    const dims = manifest[src.replace(/^\/assets\/img\//, "")];
    let extra = "";
    if (dims && !/\bwidth=/.test(attrs)) extra += ` width="${dims[0]}" height="${dims[1]}"`;
    if (!/\bloading=/.test(attrs)) extra += ` loading="lazy"`;
    if (!/\bdecoding=/.test(attrs)) extra += ` decoding="async"`;
    return `<img${attrs.trimEnd()}${extra}>`;
  });
}

// ---------- projects ----------
const projects = fs
  .readdirSync(path.join(SRC, "projects"))
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const [d, body] = frontMatter(read(path.join(SRC, "projects", f)));
    const slug = f.replace(/\.md$/, "");
    return {
      ...d,
      slug,
      url: `/projects/${slug}/`,
      order: Number(d.order || 99),
      tools: list(d.tools),
      metrics: list(d.metrics).map((m) => {
        const [value, label] = m.split("=").map((x) => x.trim());
        return { value, label };
      }),
      html: marked.parse(body),
    };
  })
  .sort((a, b) => a.order - b.order);

const partial = (name) => read(path.join(SRC, "partials", name));

function plate(p, cls = "") {
  if (p.plate === "svg-capsule") return `<div class="plate plate-svg ${cls}" aria-hidden="true">${partial("capsule.svg")}</div>`;
  const dims = manifest[`plates/${p.plate}.webp`];
  return `<div class="plate ${cls}" aria-hidden="true" style="--plate:url(/assets/img/plates/${p.plate}.webp);--ar:${dims[0]}/${dims[1]}"></div>`;
}

const num = (i) => String(i + 1).padStart(2, "0");

// Home page: the five featured projects as a stack of drawing sheets.
function workStack() {
  return projects
    .slice(0, 5)
    .map(
      (p, i) => `
    <article class="sheet" data-sheet style="--i:${i}">
      <a class="sheet-link" href="${p.url}" aria-label="${esc(p.short)}: read the case study">
        <div class="sheet-inner">
          <header class="sheet-head mono">
            <span>DWG ${num(i)} / 05</span><span>${esc(p.kind)}</span><span class="sheet-years">${esc(p.years)}</span>
          </header>
          <div class="sheet-body">
            <div class="sheet-text">
              <h3>${esc(p.short)}</h3>
              <p>${esc(p.summary)}</p>
              <dl class="sheet-metrics">
                ${p.metrics.slice(0, 3).map((m) => `<div><dt>${esc(m.value)}</dt><dd>${esc(m.label)}</dd></div>`).join("")}
              </dl>
              <span class="sheet-cta mono">Open case study <i class="arrow"></i></span>
            </div>
            ${plate(p, "sheet-plate")}
          </div>
        </div>
      </a>
    </article>`
    )
    .join("");
}

// Projects index: every project as a row in a drawing register.
function projectIndex() {
  return projects
    .map(
      (p, i) => `
    <a class="reg-row" href="${p.url}" data-reveal>
      <span class="reg-num mono">${num(i)}</span>
      <span class="reg-title"><strong>${esc(p.short)}</strong><em>${esc(p.summary)}</em></span>
      <span class="reg-kind mono">${esc(p.kind)}</span>
      <span class="reg-year mono">${esc(p.years)}</span>
      ${plate(p, "reg-plate")}
    </a>`
    )
    .join("");
}

function projectPage(p, i) {
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const video = p.video
    ? `<figure class="figs figs-narrow"><video src="/assets/video/${p.video}" autoplay muted loop playsinline preload="metadata" aria-label="Wall shear stress across the cardiac cycle"></video><figcaption>Wall shear stress over one cardiac cycle.</figcaption></figure>`
    : "";
  return `
<article class="case">
  <header class="case-hero blueprint">
    <div class="wrap">
      <a class="back mono" href="/projects/"><i class="arrow arrow-back"></i> All projects</a>
      <div class="case-hero-grid">
        <div>
          <p class="mono case-kicker">DWG ${num(i)} · ${esc(p.kind)} · ${esc(p.years)}</p>
          <h1 class="case-title">${esc(p.title)}</h1>
          <p class="case-summary">${esc(p.summary)}</p>
        </div>
        ${plate(p, "case-plate")}
      </div>
      <dl class="titleblock mono">
        <div><dt>Organisation</dt><dd>${esc(p.org)}</dd></div>
        <div><dt>Context</dt><dd>${esc(p.role)}</dd></div>
        <div><dt>Period</dt><dd>${esc(p.years)}</dd></div>
        <div><dt>Sheet</dt><dd>${num(i)} of ${String(projects.length).padStart(2, "0")}</dd></div>
      </dl>
    </div>
  </header>
  <section class="wrap case-metrics" aria-label="Key results">
    ${p.metrics.map((m) => `<div class="metric" data-reveal><span class="metric-value">${esc(m.value)}</span><span class="metric-label">${esc(m.label)}</span></div>`).join("")}
  </section>
  <div class="wrap case-layout">
    <aside class="case-aside">
      <h2 class="mono">Tools &amp; methods</h2>
      <ul class="tags">${p.tools.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    </aside>
    <div class="prose">
      ${p.html}
      ${video}
    </div>
  </div>
  <nav class="wrap case-nav" aria-label="More projects">
    <a href="${prev.url}"><span class="mono"><i class="arrow arrow-back"></i> Previous</span><strong>${esc(prev.short)}</strong></a>
    <a href="${next.url}"><span class="mono">Next <i class="arrow"></i></span><strong>${esc(next.short)}</strong></a>
  </nav>
</article>`;
}

// ---------- render ----------
const layout = read(path.join(SRC, "layout.html"));
const includes = {
  "work-stack": workStack,
  "project-index": projectIndex,
  "project-count": () => String(projects.length),
  skyline: () => partial("skyline.svg"),
  year: () => String(new Date().getFullYear()),
};
const expand = (html) => html.replace(/<!--@([\w-]+)-->/g, (m, k) => (includes[k] ? includes[k]() : m));

const pages = [];
function render({ url, title, description, body, cls = "", image = "/assets/img/og.png", noindex = false }) {
  const full = title ? `${title} — Dineth Ilapperuma` : "Dineth Ilapperuma — Engineer";
  let html = layout
    .replaceAll("{{title}}", esc(full))
    .replaceAll("{{description}}", esc(description || ""))
    .replaceAll("{{url}}", SITE + url)
    .replaceAll("{{image}}", SITE + image)
    .replaceAll("{{class}}", cls)
    .replaceAll("{{robots}}", noindex ? '<meta name="robots" content="noindex">' : "")
    .replaceAll("{{gsc}}", GSC_TOKEN ? `<meta name="google-site-verification" content="${GSC_TOKEN}">` : "")
    .replaceAll("{{analytics}}", ANALYTICS)
    .replaceAll("{{ver}}", VER)
    .replace("{{content}}", () => body);
  html = sizeImages(expand(html));
  // mark the current nav link
  const section = "/" + (url.split("/")[1] || "");
  html = html.replace(new RegExp(`(<a class="nav-link" href="${section}/")`), `$1 aria-current="page"`);
  write(url.endsWith("/") ? url + "index.html" : url, html);
  if (!noindex) pages.push(url);
}

for (const f of fs.readdirSync(path.join(SRC, "pages")).filter((f) => f.endsWith(".html"))) {
  const [d, body] = frontMatter(read(path.join(SRC, "pages", f)));
  render({ url: d.url, title: d.title, description: d.description, body, cls: d.class || "", noindex: d.noindex === "true" });
}
projects.forEach((p, i) =>
  render({ url: p.url, title: p.short[0].toUpperCase() + p.short.slice(1), description: p.summary, body: projectPage(p, i), cls: "page-case" })
);

// Old al-folio URLs that no longer have their own page.
for (const [from, to] of Object.entries({ "/news/": "/", "/publications/": "/projects/Aneurysms/", "/blog/": "/" })) {
  write(from + "index.html", `<!doctype html><meta charset="utf-8"><title>Moved</title><link rel="canonical" href="${SITE}${to}"><meta http-equiv="refresh" content="0; url=${to}"><meta name="robots" content="noindex"><a href="${to}">This page has moved.</a>`);
}

write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join("\n")}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
write(".nojekyll", "");
for (const f of ["favicon.svg", "favicon.ico", "apple-touch-icon.png", "site.webmanifest"]) {
  const p = path.join(SRC, "static", f);
  if (fs.existsSync(p)) fs.copyFileSync(p, path.join(DIST, f));
}
console.log(`Built ${pages.length} pages, ${projects.length} projects -> dist/`);
