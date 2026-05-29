---
layout: page
title: CV
permalink: /cv/
description: Request my CV.
nav: true
nav_order: 5
---

<div class="contact-page">

  <div style="margin-bottom: 2.5rem;" data-reveal>
    <span class="eyebrow">Curriculum Vitae</span>
    <h1 style="font-size: clamp(1.8rem, 4vw, 2.8rem); margin: 0.5rem 0 0.75rem;">Request my CV</h1>
    <p style="color: var(--text-secondary); max-width: 480px; line-height: 1.7; margin: 0;">
      Fill in the form and I'll be in touch within 1–2 business days.
    </p>
  </div>

  <div class="contact-grid" data-reveal data-reveal-delay="100">

    <!-- Request form -->
    <div class="contact-form-card">
      <h3 style="font-size: 1rem; font-weight: 600; margin: 0 0 1.5rem; color: var(--text-primary);">Send a request</h3>
      <form id="cvForm" action="https://formspree.io/f/xyzpvvqz" method="POST">
        <div class="contact-field">
          <label for="cv-name">Name</label>
          <input type="text" id="cv-name" name="name" required placeholder="Your name">
        </div>
        <div class="contact-field">
          <label for="cv-email">Email</label>
          <input type="email" id="cv-email" name="email" required placeholder="you@example.com">
        </div>
        <div class="contact-field">
          <label for="cv-org">Role / Organisation</label>
          <input type="text" id="cv-org" name="organisation" placeholder="e.g. Research Lead at Acme Ltd">
        </div>
        <div class="contact-field" style="margin-bottom: 1.5rem;">
          <label for="cv-note">Note <span style="font-weight: 400; color: var(--text-muted);">(optional)</span></label>
          <textarea id="cv-note" name="note" rows="4" placeholder="Anything useful — role type, timeline, context…"></textarea>
        </div>
        <button type="submit" class="btn-primary-custom" style="width: 100%; justify-content: center;">
          Send Request
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2.5 7h9m-4-4.5 4.5 4.5-4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <p id="cvFormResponse" style="margin-top: 1rem; font-size: 0.875rem; text-align: center; display: none;"></p>
      </form>
    </div>

    <!-- Sidebar -->
    <div class="contact-sidebar">
      <div class="contact-info-card" style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
        <h4>What happens next</h4>
        <p style="margin: 0;">I review each request personally and send a tailored version within <strong style="color: var(--text-secondary);">1–2 business days</strong>. For time-sensitive matters, drop me a line on <a href="https://www.linkedin.com/in/ilapperuma" target="_blank" rel="noopener" style="color: var(--clr-gold);">LinkedIn</a>.</p>
      </div>
    </div>

  </div>
</div>

<script>
  const form = document.getElementById("cvForm");
  const response = document.getElementById("cvFormResponse");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    btn.textContent = "Sending…";
    btn.disabled = true;
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    }).then((res) => {
      if (res.ok) {
        form.innerHTML =
          '<p style="text-align:center;font-size:1rem;color:var(--clr-gold);padding:2.5rem 0;">✓ Request sent — I\'ll be in touch soon.</p>';
      } else {
        response.textContent = "Something went wrong. Try emailing directly.";
        response.style.color = "var(--global-danger-block)";
        response.style.display = "block";
        btn.textContent = "Send Request";
        btn.disabled = false;
      }
    });
  });
</script>
