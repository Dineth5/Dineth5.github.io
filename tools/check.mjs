#!/usr/bin/env node
// Fails if any built page links to a local file that does not exist.  node tools/check.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const pages = [];
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith(".html")) pages.push(p);
  }
})(DIST);

// Exact-case existence: GitHub Pages is case-sensitive even where the build machine is not.
function exists(rel) {
  let dir = DIST;
  for (const part of rel.split("/").filter(Boolean)) {
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory() || !fs.readdirSync(dir).includes(part)) return false;
    dir = path.join(dir, part);
  }
  return true;
}

let bad = 0;
for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"|url\((\/[^)]+)\)/g)) {
    let ref = decodeURI(m[1] || m[2]);
    if (ref.startsWith("//")) continue;
    if (ref.endsWith("/")) ref += "index.html";
    if (!exists(ref)) {
      console.error(`${path.relative(DIST, page)}: missing ${ref}`);
      bad++;
    }
  }
}
console.log(`${pages.length} pages checked, ${bad} broken link(s)`);
process.exit(bad ? 1 : 0);
