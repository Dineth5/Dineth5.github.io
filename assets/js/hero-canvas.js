/**
 * hero-canvas.js — Real-time blood flow particle simulation
 * Visualises haemodynamics in an intracranial aneurysm.
 * Canvas fills .hero-canvas; adapts to dark/light theme automatically.
 */
(function () {
  "use strict";

  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // ─── Geometry helpers ───────────────────────────────────────────────────────
  let W, H;
  let vesselY, vesselR, sacX, sacY, sacRx, sacRy, neckW;

  function computeGeometry() {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    vesselY = H * 0.65;
    vesselR = H * 0.1;
    sacX = W * 0.55;
    sacY = vesselY - H * 0.28;
    sacRx = W * 0.12;
    sacRy = H * 0.22;
    neckW = W * 0.08;
  }

  // ─── Velocity field ─────────────────────────────────────────────────────────
  // Returns {vx, vy} at world coords (x, y)
  function velocityAt(x, y, phase) {
    const dy = y - vesselY;
    const inVessel = Math.abs(dy) < vesselR;

    // Oscillatory inlet (cardiac cycle) – peak at phase ≈ 0
    const pulseFactor = 0.6 + 0.4 * Math.pow(Math.max(0, Math.cos(phase * Math.PI * 2)), 2);

    if (inVessel) {
      // Poiseuille-like profile: v ∝ (1 - (r/R)²)
      const r2 = (dy / vesselR) ** 2;
      const baseSpeed = (1 - r2) * 180 * pulseFactor;

      // Near the aneurysm neck: split flow
      const distToNeck = Math.abs(x - sacX);
      if (distToNeck < neckW * 1.2) {
        const upFraction = Math.max(0, 1 - distToNeck / (neckW * 1.5));
        return {
          vx: baseSpeed * (1 - upFraction * 0.4),
          vy: -baseSpeed * upFraction * 0.35,
        };
      }
      return { vx: baseSpeed, vy: (vesselY - y) * 0.8 };
    }

    // Inside aneurysm sac: recirculating vortex
    const ex = (x - sacX) / sacRx;
    const ey = (y - sacY) / sacRy;
    const dist = Math.sqrt(ex * ex + ey * ey);
    if (dist < 1.1) {
      // Tangential velocity (vortex), decays with r
      const tangFactor = 60 * (1 - dist) * pulseFactor;
      const ax = x - sacX,
        ay = y - sacY;
      const len = Math.sqrt(ax * ax + ay * ay) || 1;
      return {
        vx: (-ay / len) * tangFactor,
        vy: (ax / len) * tangFactor,
      };
    }

    return { vx: 0, vy: 0 };
  }

  // ─── Particles ──────────────────────────────────────────────────────────────
  const MAX_PARTICLES = 240;
  const particles = [];

  class Particle {
    constructor() {
      this.respawn();
    }

    respawn() {
      // Start from inlet (left side) in vessel
      this.x = -10 + Math.random() * W * 0.05;
      this.y = vesselY + (Math.random() * 2 - 1) * vesselR * 0.9;
      this.age = 0;
      const lifespan = 160 + Math.random() * 180;
      this.maxAge = lifespan;
      this.opacity = 0;
      this.speed = 0;
      this.size = 1.2 + Math.random() * 0.8;
      this.trail = [];
      this.trailLen = 8 + Math.floor(Math.random() * 8);
    }

    update(phase) {
      const v = velocityAt(this.x, this.y, phase);
      const dt = 0.018;

      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > this.trailLen) this.trail.shift();

      this.x += v.vx * dt;
      this.y += v.vy * dt;
      this.speed = Math.sqrt(v.vx * v.vx + v.vy * v.vy);
      this.age++;

      // Fade in/out
      const t = this.age / this.maxAge;
      if (t < 0.1) this.opacity = t / 0.1;
      else if (t > 0.85) this.opacity = 1 - (t - 0.85) / 0.15;
      else this.opacity = 1;
    }

    isDead() {
      return this.age >= this.maxAge || this.x > W + 20 || this.x < -30 || this.y > H + 20 || this.y < -20;
    }

    color() {
      // Velocity colormap: slow=blue, mid=cyan/gold, fast=orange-red
      const maxSpeed = 160;
      const t = Math.min(this.speed / maxSpeed, 1);
      let r, g, b;
      if (t < 0.3) {
        // deep blue → cyan
        const s = t / 0.3;
        r = Math.round(20 + s * 0);
        g = Math.round(80 + s * 140);
        b = Math.round(200 + s * 55);
      } else if (t < 0.65) {
        // cyan → gold
        const s = (t - 0.3) / 0.35;
        r = Math.round(20 + s * 190);
        g = Math.round(220 - s * 55);
        b = Math.round(255 - s * 205);
      } else {
        // gold → red
        const s = (t - 0.65) / 0.35;
        r = Math.round(210 + s * 45);
        g = Math.round(165 - s * 145);
        b = Math.round(50 - s * 40);
      }
      return `rgba(${r},${g},${b},${this.opacity})`;
    }

    draw() {
      // Trail
      for (let i = 1; i < this.trail.length; i++) {
        const a = this.trail[i - 1];
        const b = this.trail[i];
        const tf = i / this.trail.length;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = this.color().replace(/[\d.]+\)$/, `${tf * this.opacity * 0.4})`);
        ctx.lineWidth = this.size * tf;
        ctx.stroke();
      }
      // Head
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color();
      ctx.fill();
    }
  }

  // Seed initial particles
  for (let i = 0; i < MAX_PARTICLES * 0.6; i++) {
    const p = new Particle();
    p.age = Math.floor(Math.random() * p.maxAge);
    particles.push(p);
  }

  // ─── Draw geometry ──────────────────────────────────────────────────────────
  function drawGeometry() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark" || !document.documentElement.getAttribute("data-theme");

    // Background
    ctx.fillStyle = isDark ? "#070d1c" : "#0a1323";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(74, 120, 176, 0.07)";
    ctx.lineWidth = 0.5;
    const gridStep = 40;
    for (let gx = 0; gx < W; gx += gridStep) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, H);
      ctx.stroke();
    }
    for (let gy = 0; gy < H; gy += gridStep) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(W, gy);
      ctx.stroke();
    }

    // Vessel walls
    const wallGrad = ctx.createLinearGradient(0, vesselY - vesselR, 0, vesselY + vesselR);
    wallGrad.addColorStop(0, "rgba(74, 120, 176, 0.25)");
    wallGrad.addColorStop(0.5, "rgba(74, 120, 176, 0.08)");
    wallGrad.addColorStop(1, "rgba(74, 120, 176, 0.25)");

    ctx.beginPath();
    ctx.rect(0, vesselY - vesselR, W, vesselR * 2);
    ctx.fillStyle = wallGrad;
    ctx.fill();

    // Vessel wall borders
    ctx.strokeStyle = "rgba(74, 120, 176, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, vesselY - vesselR);
    ctx.lineTo(sacX - neckW, vesselY - vesselR);
    // Neck transition (curve up to sac)
    ctx.quadraticCurveTo(sacX - neckW * 0.5, vesselY - vesselR, sacX - neckW * 0.5, vesselY - vesselR - 10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(sacX + neckW * 0.5, vesselY - vesselR - 10);
    ctx.quadraticCurveTo(sacX + neckW * 0.5, vesselY - vesselR, sacX + neckW, vesselY - vesselR);
    ctx.lineTo(W, vesselY - vesselR);
    ctx.stroke();

    ctx.strokeStyle = "rgba(74, 120, 176, 0.5)";
    ctx.beginPath();
    ctx.moveTo(0, vesselY + vesselR);
    ctx.lineTo(W, vesselY + vesselR);
    ctx.stroke();

    // Aneurysm sac
    const sacGrad = ctx.createRadialGradient(sacX, sacY + sacRy * 0.2, 0, sacX, sacY, sacRy);
    sacGrad.addColorStop(0, "rgba(10, 31, 68, 0.15)");
    sacGrad.addColorStop(0.7, "rgba(10, 31, 68, 0.08)");
    sacGrad.addColorStop(1, "rgba(74, 120, 176, 0.22)");

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(sacX, sacY, sacRx, sacRy, 0, 0, Math.PI * 2);
    ctx.fillStyle = sacGrad;
    ctx.fill();
    ctx.strokeStyle = "rgba(74, 120, 176, 0.55)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // Fill neck opening
    ctx.fillStyle = "#070d1c";
    ctx.fillRect(sacX - neckW * 0.48, vesselY - vesselR - 1, neckW * 0.96, 14);
  }

  // ─── Annotations ────────────────────────────────────────────────────────────
  function drawAnnotations() {
    // WSS label near neck
    ctx.fillStyle = "rgba(200, 169, 126, 0.55)";
    ctx.font = '500 10px "JetBrains Mono", monospace';
    ctx.textAlign = "center";
    ctx.fillText("HIGH WSS", sacX, vesselY - vesselR - 18);

    // Aneurysm sac label
    ctx.fillStyle = "rgba(74, 120, 176, 0.6)";
    ctx.font = '500 9px "JetBrains Mono", monospace';
    ctx.fillText("ANEURYSM SAC", sacX, sacY - sacRy * 0.6);

    // Velocity scale (mini colorbar)
    const barX = W - 70,
      barY = 20,
      barW = 60,
      barH = 6;
    const barGrad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
    barGrad.addColorStop(0, "rgba(20,80,200,0.9)");
    barGrad.addColorStop(0.3, "rgba(20,220,255,0.9)");
    barGrad.addColorStop(0.65, "rgba(210,165,50,0.9)");
    barGrad.addColorStop(1, "rgba(255,20,10,0.9)");
    ctx.fillStyle = barGrad;
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = "rgba(185, 213, 235, 0.5)";
    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.textAlign = "left";
    ctx.fillText("0", barX, barY + barH + 10);
    ctx.textAlign = "right";
    ctx.fillText("Vmax", barX + barW, barY + barH + 10);
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(185, 213, 235, 0.4)";
    ctx.font = '7px "JetBrains Mono", monospace';
    ctx.fillText("velocity", barX + barW / 2, barY - 4);
  }

  // ─── Main loop ──────────────────────────────────────────────────────────────
  let frame = 0;
  let rafId;

  function loop() {
    const phase = (frame % 240) / 240; // cardiac cycle
    frame++;

    drawGeometry();

    // Spawn particles
    if (particles.length < MAX_PARTICLES) {
      const toAdd = Math.min(3, MAX_PARTICLES - particles.length);
      for (let i = 0; i < toAdd; i++) particles.push(new Particle());
    }

    // Update & draw
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(phase);
      particles[i].draw();
      if (particles[i].isDead()) {
        particles[i] = new Particle();
      }
    }

    drawAnnotations();

    rafId = requestAnimationFrame(loop);
  }

  // ─── Init ────────────────────────────────────────────────────────────────────
  function init() {
    computeGeometry();
    if (rafId) cancelAnimationFrame(rafId);
    loop();
  }

  // Responsive resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (rafId) cancelAnimationFrame(rafId);
      particles.length = 0;
      init();
    }, 150);
  });

  // Pause when tab hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      loop();
    }
  });

  // Start when fonts are ready (for annotation text)
  if (document.fonts) {
    document.fonts.ready.then(init);
  } else {
    init();
  }
})();
