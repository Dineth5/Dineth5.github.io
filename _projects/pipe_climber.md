---
layout: page
title: Internal Pipe Climber
description: IMechE Design Challenge 2022 – Internal Pipe Climber
img: assets/img/Pipe/Iso.jpg
importance: 5
category: Work
---

### Overview

<img src="assets/img/Pipe/imeche.png" alt="IMechE Logo" style="float: right; width: 100px; margin-left: 15px;"/>

As part of the IMechE Design Challenge 2022, designed and fabricated an internal pipe climber built to ascend a 2 m vertical pipe, lift an attached 0.265 kg chain load, and return to the start point as quickly as possible.

The challenge simulated real-world pipeline pigging operations used for inspection and cleaning. The design had to meet strict constraints:

- Budget: ≤ £30 for all manufactured and purchased parts
- Size: Must fit within a 105.6 mm diameter, 300 mm length
- Power: Maximum 6 V, 2 W motor
- No control electronics (ie: Arduinos or speed controllers)

---

### Design

Several concepts were explored before arriving at the final rectangular chassis.

- **Tripod concept:** Lightweight, but aligning wheels and axles was impractical within the given dimensions.
- **Quadrant concept:** Allowed for efficient free-fall return, but the spring-loaded wheel mechanism introduced instability and safety risks.
- **Final rectangular chassis:** Provided a robust frame to house the motor, battery pack, and gear system. Triangular cut-outs reduced weight while maintaining rigidity.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Pipe/Sketch.jpg" title="Pipe Climber Sketch" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Pipe climber inital concepts designs
</div>

---

### Failure Mode & Effects Analysis (FMEA)

FMEA was carried out twice (before and after testing) to ensure reliability:

- Risk of insufficient spring tension → failure to grip pipe walls
- Risk of low friction tyres → slipping during ascent
- Risk of excess weight → inability to reach pipe top

These risks were addressed through spring rate adjustments, tyre selection, and chassis weight optimisation.

---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Pipe/Explo1.jpg" title="Isometric Exploded View" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Pipe/Explo2.jpg" title="Front Exploded View" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Exploded views of the internal pipe climber, shown from isometric and front perspectives
</div>

---

### Results

- Performance: The device successfully ascended the 2 m pipe while carrying the chain load and returned under gravity in 21 seconds.
- Testing observations:
  - Early prototypes struggled with grip and friction, causing slips.
  - Improvements included selecting tyres with higher tread and reducing overall chassis weight.
- Competition outcome: The climber performed consistently within the competition constraints and passed scrutineering checks.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Pipe/Assembly.jpg" title="Final Assembly Drawing" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Assembly drawing of the pipe climber
</div>
