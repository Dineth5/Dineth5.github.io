---
layout: page
permalink: /cv/
title: CV
nav: true
nav_order: 2
---

<div style="max-width: 560px; margin: 3rem auto; text-align: center;">

<span class="eyebrow">Curriculum Vitae</span>

  <h2 style="font-size: 2rem; font-weight: 700; letter-spacing: -0.03em; margin: 1rem 0 0.75rem;">Request my CV</h2>

  <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 2rem;">
    I share my CV directly rather than keeping it publicly indexed.
    Leave your name and email and I'll be in touch shortly.
  </p>

  <form id="cvRequestForm" action="https://formspree.io/f/xyzpvvqz" method="POST"
        style="display: flex; flex-direction: column; gap: 1rem; text-align: left;">

    <div>
      <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.4rem; letter-spacing: 0.04em; text-transform: uppercase;">
        Name
      </label>
      <input type="text" name="name" required placeholder="Your name"
             style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-strong);
                    border-radius: 8px; background: var(--bg-card); color: var(--text-primary);
                    font-family: inherit; font-size: 0.95rem; outline: none;
                    transition: border-color 0.2s;"
             onfocus="this.style.borderColor='var(--clr-gold)'"
             onblur="this.style.borderColor='var(--border-strong)'">
    </div>

    <div>
      <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.4rem; letter-spacing: 0.04em; text-transform: uppercase;">
        Email
      </label>
      <input type="email" name="email" required placeholder="you@example.com"
             style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-strong);
                    border-radius: 8px; background: var(--bg-card); color: var(--text-primary);
                    font-family: inherit; font-size: 0.95rem; outline: none;
                    transition: border-color 0.2s;"
             onfocus="this.style.borderColor='var(--clr-gold)'"
             onblur="this.style.borderColor='var(--border-strong)'">
    </div>

    <div>
      <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.4rem; letter-spacing: 0.04em; text-transform: uppercase;">
        Context <span style="font-weight: 400; opacity: 0.6;">(optional)</span>
      </label>
      <textarea name="context" rows="3" placeholder="e.g. Recruiting for a CFD/ML role at…"
                style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-strong);
                       border-radius: 8px; background: var(--bg-card); color: var(--text-primary);
                       font-family: inherit; font-size: 0.95rem; outline: none; resize: vertical;
                       transition: border-color 0.2s;"
                onfocus="this.style.borderColor='var(--clr-gold)'"
                onblur="this.style.borderColor='var(--border-strong)'"></textarea>
    </div>

    <input type="hidden" name="_subject" value="CV Request — dinethilapperuma.com">

    <button type="submit" class="btn-primary-custom" style="width: 100%; justify-content: center; margin-top: 0.25rem;">
      Send Request
    </button>

    <p id="cvFormStatus" style="text-align: center; font-size: 0.875rem; color: var(--clr-gold); display: none; margin: 0;"></p>

  </form>
</div>

<script>
  const form = document.getElementById("cvRequestForm");
  const status = document.getElementById("cvFormStatus");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    }).then((res) => {
      if (res.ok) {
        form.innerHTML =
          '<p style="text-align:center; font-size:1rem; color:var(--clr-gold); padding: 2rem 0;">✓ Request received — I\'ll be in touch soon.</p>';
      } else {
        status.textContent = "Something went wrong. Try emailing me directly.";
        status.style.display = "block";
      }
    });
  });
</script>
