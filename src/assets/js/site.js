/* dineth5.github.io — site behaviour. No libraries.
   Everything here is progressive: the pages read fine with this file missing. */
(() => {
  "use strict";
  const doc = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- theme ---------- */
  const isDark = () => (doc.dataset.theme ? doc.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
  $("[data-theme-toggle]")?.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    doc.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    window.dispatchEvent(new Event("themechange"));
  });

  /* ---------- mobile menu ---------- */
  const burger = $("[data-burger]");
  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    burger?.setAttribute("aria-expanded", String(open));
  };
  burger?.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  $$(".nav-links a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  /* ---------- reveal on scroll ---------- */
  const reveals = $$("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) reveals.forEach((el) => el.classList.add("in"));
  else {
    const io = new IntersectionObserver(
      (entries) => {
        let n = 0;
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.style.setProperty("--stagger", n++);
          e.target.classList.add("in");
          io.unobserve(e.target);
          $$("[data-count]", e.target).forEach(countUp);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach((el) => io.observe(el));
  }

  function countUp(el) {
    const end = Number(el.dataset.count);
    const t0 = performance.now();
    const dur = 1100;
    const tick = (t) => {
      const k = clamp((t - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- statement: split into words that ink in as you scroll ---------- */
  const words = $('[data-scrub="words"]');
  let wordEls = [];
  if (words && !reduce) {
    const text = words.textContent.trim().split(/\s+/);
    words.setAttribute("aria-label", text.join(" "));
    words.innerHTML = text.map((w) => `<span class="w" aria-hidden="true">${w}</span>`).join(" ");
    wordEls = $$(".w", words);
  }

  /* ---------- one scroll loop drives every scrubbed effect ---------- */
  const nav = $("[data-nav]");
  const hero = $('[data-scrub="hero"]');
  const sheets = $$("[data-sheet]");
  const timeline = $('[data-scrub="timeline"]');
  const skyline = $('[data-scrub="skyline"]');
  const skySvg = skyline && $("svg", skyline);
  const drifts = $$('[data-scrub="drift"]');
  let lastY = scrollY;
  let ticking = false;

  function frame() {
    ticking = false;
    const y = scrollY;
    const vh = innerHeight;

    // page progress bar + nav state
    const max = doc.scrollHeight - vh;
    doc.style.setProperty("--page", max > 0 ? (y / max).toFixed(4) : 0);
    if (nav) {
      nav.classList.toggle("scrolled", y > 24);
      const down = y > lastY && y > vh * 0.6;
      if (Math.abs(y - lastY) > 6) nav.classList.toggle("hide", down && !document.body.classList.contains("menu-open"));
    }
    lastY = y;
    if (reduce) return;

    if (hero) hero.style.setProperty("--p", clamp(y / (hero.offsetHeight * 0.8)).toFixed(3));

    if (wordEls.length) {
      const r = words.getBoundingClientRect();
      // start when the paragraph enters the lower third, finish as it reaches the upper third
      const p = clamp((vh * 0.82 - r.top) / (r.height + vh * 0.42));
      const lit = p * (wordEls.length + 6);
      wordEls.forEach((w, i) => w.style.setProperty("--o", clamp(0.16 + (lit - i) * 0.3, 0.16, 1).toFixed(2)));
    }

    // each sheet shrinks and dims a little as the next one slides over it
    for (let i = 0; i < sheets.length - 1; i++) {
      const a = sheets[i].getBoundingClientRect();
      const b = sheets[i + 1].getBoundingClientRect();
      const cover = clamp((a.bottom - b.top) / a.height);
      sheets[i].firstElementChild.firstElementChild.style.setProperty("--cover", cover.toFixed(3));
    }

    if (timeline) {
      const r = timeline.getBoundingClientRect();
      timeline.style.setProperty("--p", clamp((vh * 0.7 - r.top) / r.height).toFixed(3));
    }

    if (skyline) {
      const r = skyline.getBoundingClientRect();
      const p = clamp((vh - r.top) / (vh * 0.75));
      skyline.style.setProperty("--p", p.toFixed(3));
      // on narrow screens the drawing is wider than the viewport: pan along the journey
      const extra = skySvg.getBoundingClientRect().width - r.width;
      skyline.style.setProperty("--pan", (extra > 1 ? extra * p : 0).toFixed(1));
    }

    drifts.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect();
      el.style.setProperty("--p", clamp((vh - r.top) / (vh + r.height), 0, 1).toFixed(3) * 2 - 1);
    });
  }
  // A sheet taller than the screen sticks by its bottom edge instead of its top,
  // so its last line is on screen before the next sheet covers it.
  function placeSheets() {
    const navH = nav ? nav.offsetHeight : 64;
    sheets.forEach((s, i) => {
      const natural = navH + 12 + i * 11;
      s.style.setProperty("--top", Math.min(natural, innerHeight - s.offsetHeight - 12) + "px");
    });
  }
  placeSheets();
  addEventListener("resize", placeSheets);
  addEventListener("load", placeSheets);

  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  frame();

  /* ---------- forms: send without leaving the page ---------- */
  $$("[data-form]").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = $("button[type=submit]", form);
      const msg = $(".form-msg", form);
      btn.disabled = true;
      msg.textContent = "Sending…";
      try {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(res.status);
        form.classList.add("sent");
        msg.textContent = form.dataset.done;
      } catch (err) {
        btn.disabled = false;
        msg.innerHTML = 'That did not send. Please email <a href="mailto:dineth.ilapperuma@gmail.com">dineth.ilapperuma@gmail.com</a> instead.';
      }
    });
  });

  /* ---------- a small surprise in the footer ---------- */
  let eggN = 0;
  $("[data-egg]")?.addEventListener("click", () => {
    if (reduce) return;
    const img = new Image();
    img.src = eggN++ % 2 ? "/assets/gif/Penguin.gif" : "/assets/gif/TARDIS.gif";
    img.alt = "";
    img.className = "egg-fly";
    img.onload = () => {
      document.body.append(img);
      img.addEventListener("animationend", () => img.remove());
    };
  });

  /* ---------- hero: potential flow past a cylinder ----------
     Streamlines are integrated from the analytic velocity field
       u = U(1 - a²(x² - y²)/r⁴),  v = -2U a² x y / r⁴
     and redrawn whenever the cylinder moves. Small pulses travel along them. */
  const canvas = $("[data-flow]");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, dpr = 1, lines = [], running = false, raf = 0, t = 0;
    const cyl = { x: 0, y: 0, tx: 0, ty: 0, a: 0 };
    let ink = "#1a3fa0";

    const readInk = () => { ink = getComputedStyle(canvas).color; };

    function home() {
      const narrow = W < 760;
      cyl.a = Math.min(W, H) * (narrow ? 0.11 : 0.12);
      cyl.tx = W * (narrow ? 0.76 : 0.77);
      cyl.ty = H * (narrow ? 0.25 : 0.33);
    }

    function resize() {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      home(); cyl.x = cyl.tx; cyl.y = cyl.ty;
      readInk(); solve(); draw();
    }

    function solve() {
      const n = W < 760 ? 22 : 34;
      const a2 = cyl.a * cyl.a;
      const step = 7;
      lines = [];
      for (let i = 0; i < n; i++) {
        let x = -10, y = ((i + 0.5) / n) * H;
        const pts = [x, y];
        for (let k = 0; k < 400 && x < W + 10; k++) {
          const dx = x - cyl.x, dy = y - cyl.y;
          const r2 = dx * dx + dy * dy;
          if (r2 < a2 * 1.02) break;
          const r4 = r2 * r2;
          let u = 1 - (a2 * (dx * dx - dy * dy)) / r4;
          let v = (-2 * a2 * dx * dy) / r4;
          const m = Math.hypot(u, v) || 1;
          x += (u / m) * step; y += (v / m) * step;
          pts.push(x, y);
        }
        lines.push(pts);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;
      ctx.strokeStyle = ink;
      ctx.globalAlpha = 0.2;
      ctx.beginPath();
      for (const p of lines) {
        ctx.moveTo(p[0], p[1]);
        for (let i = 2; i < p.length; i += 2) ctx.lineTo(p[i], p[i + 1]);
      }
      ctx.stroke();

      // pulses
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      lines.forEach((p, j) => {
        const n = p.length / 2;
        const head = Math.floor((t * 0.5 + j * 37) % (n + 40));
        const from = Math.max(0, head - 9), to = Math.min(n - 1, head);
        if (to <= from) return;
        ctx.moveTo(p[from * 2], p[from * 2 + 1]);
        for (let i = from + 1; i <= to; i++) ctx.lineTo(p[i * 2], p[i * 2 + 1]);
      });
      ctx.stroke();

      // the cylinder, drawn like a part on a sheet: outline, centre lines, a dimension
      const { x, y, a } = cyl;
      ctx.globalAlpha = 0.9;
      ctx.lineWidth = 1.25;
      ctx.beginPath(); ctx.arc(x, y, a, 0, Math.PI * 2); ctx.stroke();
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 0.75;
      ctx.setLineDash([10, 4, 2, 4]);
      ctx.beginPath();
      ctx.moveTo(x - a * 1.3, y); ctx.lineTo(x + a * 1.3, y);
      ctx.moveTo(x, y - a * 1.3); ctx.lineTo(x, y + a * 1.3);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(x + a * 0.707, y - a * 0.707); ctx.lineTo(x + a * 1.25, y - a * 1.25); ctx.lineTo(x + a * 1.25 + 34, y - a * 1.25);
      ctx.stroke();
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = ink;
      ctx.font = '500 10px "IBM Plex Mono", monospace';
      ctx.fillText("Ø " + Math.round(a * 2), x + a * 1.25 + 2, y - a * 1.25 - 5);
      ctx.globalAlpha = 1;
    }

    function loop() {
      raf = requestAnimationFrame(loop);
      t++;
      const dx = cyl.tx - cyl.x, dy = cyl.ty - cyl.y;
      if (Math.abs(dx) + Math.abs(dy) > 0.3) { cyl.x += dx * 0.07; cyl.y += dy * 0.07; solve(); }
      draw();
    }
    const start = () => { if (!running && !reduce) { running = true; loop(); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    resize();
    let rw = innerWidth;
    addEventListener("resize", () => { if (innerWidth !== rw) { rw = innerWidth; resize(); } });
    addEventListener("themechange", () => { readInk(); draw(); });
    matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => { readInk(); draw(); });
    document.fonts?.ready.then(draw);
    new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop())).observe(canvas);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

    // with a mouse, the cylinder follows the pointer (kept clear of the text block)
    if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const heroEl = canvas.parentElement;
      heroEl.addEventListener("pointermove", (e) => {
        const r = canvas.getBoundingClientRect();
        cyl.tx = clamp(e.clientX - r.left, cyl.a, W - cyl.a);
        cyl.ty = clamp(e.clientY - r.top, cyl.a, H - cyl.a);
      });
      heroEl.addEventListener("pointerleave", home);
    }
  }
})();
