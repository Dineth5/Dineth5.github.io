---
layout: page
title: 2-Axes CNC Lathe
description: Mechanical design project for a compact classroom CNC lathe
img: assets/img/thumbnails/Lathe.png
importance: 3
category: Work
---

## Overview

Designed a compact 2-axes tabletop CNC lathe capable of precision machining aluminium and polymer workpieces up to 40 mm in diameter and length. Features a 3-jaw chuck, achieves high accuracy (≤8 μm deflection at the cutting edge), and fits within a 625 × 250 mm footprint. Ideal for classroom demonstrations, small-scale prototyping, and educational workshops.

---

<style>
  .equal-h {
    height: clamp(180px, 25vw, 300px);
    width: 100%;
    object-fit: cover;
  }
</style>

<div class="row">
    <div class="col-6 mt-3 mt-md-0">
        <img src="/assets/img/Lathe/Lathe.png" 
             alt="Lathe Isometric View" 
             class="equal-h rounded z-depth-1" />
    </div>
    <div class="col-6 mt-3 mt-md-0">
        <img src="/assets/img/Lathe/Lathe_drawing.png" 
             alt="Lathe Engineering Drawing" 
             class="equal-h rounded z-depth-1" />
    </div>
</div>

<div class="caption">
   CAD model (left) and detailed engineering drawing (right) of the 2-Axes Tabletop CNC Lathe.
</div>

---

## Design Process

The lathe was developed by focusing on three main subsystems: the spindle, X-stage, and Z-stage. Key design considerations included minimizing deflection, ensuring rigidity, and selecting components capable of withstanding calculated cutting forces.

- **CAD Modelling:** Used SolidWorks for complex geometry and multi-component assembly.
- **Spindle & Bearings:** Calculated cutting forces determined bearing load ratings. Spindle diameter and bearing placement were optimized to limit deflection to ≤8 μm.
- **X and Z Stages:** Linear rails and lead-screws were selected to handle vertical and axial loads, ensuring smooth, precise motion.
- **Drive Train & Motors:** Pulley-belt spindle drive and DC motors chosen to meet torque and speed requirements.
- **GD&T & Modularity:** Applied geometric dimensioning and tolerancing on all drawings. Designed for easy maintenance and future upgrades.

---

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/Lathe/Z1.png" title="Z-Axis Table (Cross-Section 1)" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/Lathe/Z2.png" title="Z-Axis Table (Cross-Section 2)" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/Lathe/Z1_Drawing.png" title="Z-Axis Table Drawing (Cross-Section 1)" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/Lathe/Z2_Drawing.png" title="Z-Axis Table Drawing (Cross-Section 2)" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="caption">
  Cross-sectional views (top) and corresponding engineering drawings (bottom) of the Z-Axis Table.
</div>

---

## Results

- Achieved design deflection under 8 μm at the cutting edge.
- SolidWorks assembly confirmed proper alignment and clearances.
- Component selection verified through calculations for bearing load, spindle torque, and lead-screw stresses.
- Final CAD models demonstrated a compact footprint suitable for small prototyping environments.
- Design modularity allows easy maintenance, repair, and upgrade of X/Z stages and spindle components.

---

<style>
  .equal-h {
    height: clamp(200px, 28vw, 320px);
    width: 100%;
    object-fit: cover;
  }
</style>

<div class="row">
    <div class="col-6 mt-3 mt-md-0">
        <img src="/assets/img/Lathe/Cross.png" 
             alt="Spindle Housing & Drivetrain (Cross-Section)" 
             class="equal-h rounded z-depth-1" />
    </div>
    <div class="col-6 mt-3 mt-md-0">
        <img src="/assets/img/Lathe/Full_explo.png" 
             alt="Full Assembly – Exploded View" 
             class="equal-h rounded z-depth-1" />
    </div>
</div>

<div class="caption">
  Cross-sectional (left) and exploded (right) views of the complete CNC lathe assembly.
</div>
