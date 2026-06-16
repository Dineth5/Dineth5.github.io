---
layout: page
title: Gaze-Controlled Wheelchair
description: EU MDR Class IIa medical device — gaze-driven wheelchair enabling hands-free mobility for users with severe motor impairment
img: assets/img/thumbnails/GazeWheelchair.png
importance: 2
category: Work
---

### Overview

As part of a seven-person group at Imperial College London, I contributed to the design and full EU MDR Technical Documentation of a gaze-controlled powered wheelchair — a Class IIa active medical device targeting individuals with severe upper-limb motor impairment such as high-level spinal cord injury, ALS, or quadriplegia. These users retain voluntary eye movement but are unable to operate conventional joystick or sip-and-puff controls.

The device allows a user to navigate a powered wheelchair hands-free by simply looking at where they want to go. An infrared eye-tracking sensor captures gaze direction at 60 Hz, a co-mounted RGB-D depth camera maps that gaze into real-world floor coordinates, and a control algorithm translates the result into proportional motor commands — all within a 200 ms end-to-end latency budget.

The 100+ page technical file produced covers device description and specification, Instructions for Use (IFU), benefit–risk analysis, clinical evaluation, and a Post-Market Clinical Follow-up (PMCF) plan — all structured to EU MDR 2017/745 requirements.

---

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/GazeWheelchair/exploded_assembly.png" title="Exploded assembly of the gaze-controlled wheelchair" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Exploded assembly view showing the full system: powered wheelchair chassis, drive motors, seating, sensor mounting frame, depth camera, and eye-tracking module.
</div>

---

### How It Works

The system relies on three hardware layers working in tight coordination:

1. **Eye-tracking glasses** — Infrared-based, worn by the user, sampling gaze direction at 60 Hz with ±1° angular accuracy. Calibration maps the 2D gaze vector into a coordinate frame shared with the depth sensor.

2. **RGB-D depth camera** — Mounted on the wheelchair, it captures real-time depth data over a 0.5–4.0 m operating range. An affine transformation fuses the gaze vector with depth to compute a 3D gaze point in world coordinates. A floor-detection algorithm filters gaze landing on non-navigable surfaces (walls, objects) from gaze on the floor — preventing the classic "Midas Touch" problem of unintended activation.

3. **Control algorithm** — Two modes were designed and validated: a *Continuous Control Field* interface mapping gaze position to proportional velocity commands, and a *Natural Decoder* interface using a probabilistic model of natural gaze behaviour to output discrete motion states (forward, reverse, left, right). The Natural Decoder achieves **15.3 bits/second** of information throughput — far exceeding conventional switch-based interfaces.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GazeWheelchair/eyetracker_glasses.png" title="IR eye-tracking glasses" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GazeWheelchair/depth_camera.png" title="RGB-D depth camera" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
  Left: IR eye-tracking glasses worn by the user, sampling gaze at 60 Hz. Right: RGB-D dual-lens depth camera mounted on the wheelchair frame, providing real-time floor detection and 3D gaze mapping.
</div>

---

### Design & Engineering

The mechanical design integrates the sensor suite into a standard powered wheelchair platform without compromising usability. Sensor mounting was engineered to a <0.1° angular alignment tolerance between the eye-tracker and depth camera optical axes — critical for calibration stability. The enclosures are rated to 1.0 g vibration (5–500 Hz) to handle the dynamic loads typical of motorized wheelchair operation.

The modular architecture keeps the eye-tracker, depth sensor, and controller independently serviceable — an important consideration for a regulated medical device requiring documented maintenance procedures.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GazeWheelchair/wheelchair_iso.png" title="Assembled wheelchair isometric view" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GazeWheelchair/wheelchair_front.png" title="Assembled wheelchair front elevation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
  Assembled system: depth camera mounted above the headrest for wide field of view, eye-tracker arm positioned on the right armrest. Front elevation shows the sensor layout relative to the user's seated position.
</div>

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/GazeWheelchair/chassis_internals.png" title="Wheelchair chassis internals" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Open chassis view showing the drive motors, battery pack, and controller integration within the structural frame.
</div>

---

### Performance

- **15.3 bits/second** information throughput via the Natural Decoder interface — significantly exceeding switch-based and discrete command systems
- **≤200 ms** end-to-end latency from gaze acquisition to motor command execution
- **±1° angular** gaze estimation accuracy (approximately ±5 cm at 2 m operating distance)
- Floor detection range of **0.5–4.0 m**, validated on surfaces inclined up to **±55°** from the camera axis
- Maximum indoor speed of **≤3 km/h** with fail-safe automatic stop on signal loss or calibration drift
- Dwell-time activation threshold of **200 ms** (configurable 100–500 ms) to suppress accidental command triggering

---

### Regulatory Pathway

The device was classified as **EU MDR Class IIa** under EU 2017/745: an active device delivering mechanical energy to the user, with potential for harm if energy is incorrectly directed (unintended movement, excessive speed, delayed halting). The technical documentation addressed:

- **ISO 7176-15** — wheelchair information disclosure and documentation requirements
- **ISO 20417** — medical device labelling and legibility
- **ISO 15223-1** — standardised medical device symbols
- **Regulation (EU) 2021/2226** — electronic format requirements for IFU

Risk management identified key hazards (unintended gaze-driven movement, calibration drift, visual fatigue) and documented control measures including gaze confidence filtering, floor-contingent logic, calibration integrity monitoring, and mandatory healthcare professional assessment before independent use. A structured PMCF plan was produced to support ongoing post-market surveillance.
