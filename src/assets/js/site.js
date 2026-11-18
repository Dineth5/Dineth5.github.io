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

  /* ---------- one scroll loop drives every scrubbed effect ---------- */
  const nav = $("[data-nav]");
  const hero = $('[data-scrub="hero"]');
  const sheets = $$("[data-sheet]");
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


    // each sheet shrinks and dims a little as the next one slides over it
    for (let i = 0; i < sheets.length - 1; i++) {
      const a = sheets[i].getBoundingClientRect();
      const b = sheets[i + 1].getBoundingClientRect();
      const cover = clamp((a.bottom - b.top) / a.height);
      sheets[i].firstElementChild.firstElementChild.style.setProperty("--cover", cover.toFixed(3));
    }



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
})();
