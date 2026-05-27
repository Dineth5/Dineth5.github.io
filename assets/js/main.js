/**
 * main.js — Custom interactions for dinethilapperuma.com
 * Custom cursor · Scroll reveal · Frosted nav · Gallery lightbox · Smooth UX
 */
(function () {
  'use strict';

  // ─── Utility ──────────────────────────────────────────────────────────────
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  // ─── 1. Custom cursor ─────────────────────────────────────────────────────
  if (!isTouchDevice && !prefersReducedMotion) {
    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className  = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.append(dot, ring);

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let isHovered = false;
    let isClicking = false;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
    });

    document.addEventListener('mousedown', () => {
      isClicking = true;
      ring.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
      isClicking = false;
      ring.classList.remove('clicking');
    });

    // Hover on interactive elements
    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, label, .bento-cell, .photo-item';

    function updateHoverState(e) {
      const el = e.target.closest(interactiveSelector);
      if (el && !isClicking) {
        isHovered = true;
        ring.classList.add('hovered');
      } else {
        isHovered = false;
        ring.classList.remove('hovered');
      }
    }

    document.addEventListener('mouseover', updateHoverState);
    document.addEventListener('mouseout', () => {
      ring.classList.remove('hovered');
      isHovered = false;
    });

    // Animate ring with spring lag
    function animateRing() {
      const ease = isHovered ? 0.14 : 0.12;
      rx += (mx - rx) * ease;
      ry += (my - ry) * ease;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hide on leave
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
  }

  // ─── 2. Frosted-glass navbar on scroll ───────────────────────────────────
  const navbar = $('#navbar');
  if (navbar) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      navbar.classList.toggle('scrolled', y > 60);
      lastScroll = y;
    }, { passive: true });
  }

  // ─── 3. Scroll reveal ─────────────────────────────────────────────────────
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => entry.target.classList.add('revealed'), +delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    $$('[data-reveal]').forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: reveal immediately
    $$('[data-reveal]').forEach(el => el.classList.add('revealed'));
  }

  // ─── 4. Stagger children on parent reveal ────────────────────────────────
  $$('[data-reveal-stagger]').forEach(parent => {
    const children = $$(':scope > *', parent);
    children.forEach((child, i) => {
      child.setAttribute('data-reveal', '');
      child.setAttribute('data-reveal-delay', i * 80);
    });
  });

  // ─── 5. Gallery lightbox ─────────────────────────────────────────────────
  const photoItems = $$('.photo-item');
  if (photoItems.length > 0) {
    // Create lightbox DOM
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <button class="lightbox-nav prev" aria-label="Previous">&#8592;</button>
      <div class="lightbox-img-wrap"><img src="" alt="" /></div>
      <button class="lightbox-nav next" aria-label="Next">&#8594;</button>
      <div class="lightbox-counter"></div>
    `;
    document.body.appendChild(lb);

    const lbImg     = $('img', lb);
    const lbCounter = $('.lightbox-counter', lb);
    let currentIdx  = 0;

    function openLightbox(idx) {
      currentIdx = idx;
      const item = photoItems[idx];
      const img  = $('img', item);
      lbImg.src  = img.src;
      lbImg.alt  = img.alt || '';
      lbCounter.textContent = `${idx + 1} / ${photoItems.length}`;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }

    function navigate(dir) {
      currentIdx = (currentIdx + dir + photoItems.length) % photoItems.length;
      openLightbox(currentIdx);
    }

    photoItems.forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(i));
      item.setAttribute('tabindex', '0');
      item.addEventListener('keydown', e => { if (e.key === 'Enter') openLightbox(i); });
    });

    $('.lightbox-close', lb).addEventListener('click', closeLightbox);
    $('.lightbox-nav.prev', lb).addEventListener('click', () => navigate(-1));
    $('.lightbox-nav.next', lb).addEventListener('click', () => navigate(+1));

    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowRight') navigate(+1);
      if (e.key === 'ArrowLeft')  navigate(-1);
    });
  }

  // ─── 6. Smooth anchor scrolling ──────────────────────────────────────────
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = $(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ─── 7. Magnetic buttons ─────────────────────────────────────────────────
  if (!isTouchDevice && !prefersReducedMotion) {
    $$('.btn-primary-custom, .btn-outline-custom').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width  / 2);
        const dy = e.clientY - (rect.top  + rect.height / 2);
        btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px) translateY(-2px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ─── 8. Bento cell touch feedback ─────────────────────────────────────────
  $$('.bento-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      const href = cell.dataset.href;
      if (href) window.location = href;
    });
  });

  // ─── 9. Navbar active-link highlighting ──────────────────────────────────
  const currentPath = window.location.pathname;
  $$('#navbar .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.replace(/\/$/, '');
    const cleanPath = currentPath.replace(/\/$/, '') || '/';
    if (href === '/' && (cleanPath === '' || cleanPath === '/')) {
      link.closest('.nav-item')?.classList.add('active');
    } else if (cleanHref && cleanPath.startsWith(cleanHref) && cleanHref !== '/') {
      link.closest('.nav-item')?.classList.add('active');
    }
  });

  // ─── 10. Canvas theme re-render on dark mode toggle ───────────────────────
  const themeBtn = document.getElementById('light-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      // Give the CSS transition a moment, then the canvas redraw picks it up next frame
      setTimeout(() => {
        window.dispatchEvent(new Event('themechange'));
      }, 50);
    });
  }

  // ─── 11. Typed / cycling subtitle ────────────────────────────────────────
  const cycleEl = document.querySelector('.hero-cycle');
  if (cycleEl && !prefersReducedMotion) {
    const roles = cycleEl.dataset.roles ? JSON.parse(cycleEl.dataset.roles) : [];
    if (roles.length > 1) {
      let idx = 0;
      cycleEl.textContent = roles[0];

      setInterval(() => {
        cycleEl.style.opacity = '0';
        cycleEl.style.transform = 'translateY(-8px)';
        setTimeout(() => {
          idx = (idx + 1) % roles.length;
          cycleEl.textContent = roles[idx];
          cycleEl.style.opacity = '1';
          cycleEl.style.transform = 'none';
        }, 350);
      }, 3500);

      cycleEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    }
  }

})();
