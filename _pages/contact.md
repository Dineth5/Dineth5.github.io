---
layout: page
title: Contact
permalink: /contact/
description: 📬 Get in touch with me
nav: true
nav_order: 5
---

<div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: flex-start;">

  <!-- Contact Form -->
  <div style="flex: 1 1 400px; min-width: 300px;">
    <h2>Contact Form</h2>
    <form id="contactForm" action="https://formspree.io/f/xyzpvvqz" method="POST" style="display: flex; flex-direction: column; gap: 15px;">
      <label>
        Name:
        <input type="text" name="name" required style="width: 100%; padding: 12px; font-size: 1rem;">
      </label>
      <label>
        Email:
        <input type="email" name="email" required style="width: 100%; padding: 12px; font-size: 1rem;">
      </label>
      <label>
        Message:
        <textarea name="message" rows="8" required style="width: 100%; padding: 12px; font-size: 1rem;"></textarea>
      </label>
      <button type="submit" style="background: #007acc; color: white; padding: 12px 20px; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer;">
        Send Message
      </button>
    </form>
    <p id="formResponse" style="margin-top: 10px; font-weight: bold; color: green;"></p>
  </div>

  <!-- Contact Info -->
  <div style="flex: 0 0 250px; min-width: 200px;">
    <h2>Contact Info</h2>
    <p><strong>Email:</strong><br>📧 <a href="mailto:dineth.ilapperuma@email.com">dineth.ilapperuma@email.com</a></p>
    <p><strong>Phone:</strong><br>📞 <a href="tel:+447585261005">+44 7585 261005</a></p>
    <p><strong>Social Media:</strong><br>
      - <a href="https://linkedin.com/in/ilapperuma">LinkedIn</a><br>
      - <a href="https://github.com/yourusername">GitHub</a>
    </p>
  </div>

</div>

<script>
  const form = document.getElementById('contactForm');
  const response = document.getElementById('formResponse');

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // prevent normal form submission

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        response.textContent = '✅ Message sent successfully!';
        form.reset();
      } else {
        res.json().then(data => {
          if (data.errors) {
            response.textContent = '❌ Error: ' + data.errors.map(e => e.message).join(', ');
          } else {
            response.textContent = '❌ Error sending message.';
          }
        });
      }
    }).catch(() => {
      response.textContent = '❌ Error sending message.';
    });
  });
</script>
