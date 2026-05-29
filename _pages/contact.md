---
layout: page
title: Contact
permalink: /contact/
description: Get in touch.
nav: true
nav_order: 6
---

<div class="contact-page">

  <div style="margin-bottom: 2.5rem;" data-reveal>
    <span class="eyebrow">Get in touch</span>
    <h1 style="font-size: clamp(1.8rem, 4vw, 2.8rem); margin: 0.5rem 0 0.75rem;">Let's talk</h1>
  </div>

  <div class="contact-grid" data-reveal data-reveal-delay="100">

    <!-- Contact Form -->
    <div class="contact-form-card">
      <h3 style="font-size: 1rem; font-weight: 600; margin: 0 0 1.5rem; color: var(--text-primary);">Send a message</h3>
      <form id="contactForm" action="https://formspree.io/f/xyzpvvqz" method="POST">
        <div class="contact-field">
          <label for="contact-name">Name</label>
          <input type="text" id="contact-name" name="name" required placeholder="Your name">
        </div>
        <div class="contact-field">
          <label for="contact-email">Email</label>
          <input type="email" id="contact-email" name="email" required placeholder="you@example.com">
        </div>
        <div class="contact-field">
          <label for="contact-subject">Subject</label>
          <input type="text" id="contact-subject" name="subject" placeholder="e.g. Research collaboration, hiring…">
        </div>
        <div class="contact-field" style="margin-bottom: 1.5rem;">
          <label for="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows="5" required placeholder="What's on your mind?"></textarea>
        </div>
        <button type="submit" class="btn-primary-custom" style="width: 100%; justify-content: center;">
          Send Message
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2.5 7h9m-4-4.5 4.5 4.5-4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <p id="formResponse" style="margin-top: 1rem; font-size: 0.875rem; text-align: center; display: none;"></p>
      </form>
    </div>

    <!-- Sidebar -->
    <div class="contact-sidebar">

      <div class="contact-info-card">
        <h4>Direct</h4>
        <a href="mailto:dineth.ilapperuma@gmail.com" class="contact-link-row">
          <i class="fa-solid fa-envelope"></i>
          dineth.ilapperuma@gmail.com
        </a>
        <a href="https://www.linkedin.com/in/ilapperuma" target="_blank" rel="noopener" class="contact-link-row">
          <i class="fa-brands fa-linkedin"></i>
          linkedin.com/in/ilapperuma
        </a>
        <a href="https://github.com/Dineth5" target="_blank" rel="noopener" class="contact-link-row">
          <i class="fa-brands fa-github"></i>
          github.com/Dineth5
        </a>
      </div>

      <div class="contact-info-card" style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
        <h4>Response time</h4>
        <p style="margin: 0;">I typically reply within <strong style="color: var(--text-secondary);">1–2 business days</strong>. For urgent matters, LinkedIn DM is fastest.</p>
      </div>

    </div>

  </div>
</div>

<script>
  const form = document.getElementById("contactForm");
  const response = document.getElementById("formResponse");
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
          '<p style="text-align:center;font-size:1rem;color:var(--clr-gold);padding:2.5rem 0;">✓ Message sent — I\'ll be in touch soon.</p>';
      } else {
        response.textContent = "Something went wrong. Try emailing directly.";
        response.style.color = "var(--global-danger-block)";
        response.style.display = "block";
        btn.textContent = "Send Message";
        btn.disabled = false;
      }
    });
  });
</script>
