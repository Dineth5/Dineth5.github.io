---
layout: page
title: CFD of Aneurysms
description: CFD to predict rupture risk in intracranial aneurysms
img: assets/img/thumbnails/C2.png
importance: 2
category: Work
---

### Overview

My undergraduate dissertation, _Computational Fluid Dynamics for Intracranial Aneurysms in Clinical Settings_, was conducted under the supervision of [Dr. Amir Keshmiri](https://research.manchester.ac.uk/en/persons/a.keshmiri) and is currently pending publication in Scientific Reports.

---

### Methodology

The pipeline moved from medical imaging through to quantitative haemodynamic output in four stages:

1. **Geometry segmentation** — Patient-specific aneurysm geometries were extracted from 3D rotational angiography (3DRA) data and segmented to produce anatomically accurate surface meshes.
2. **CFD meshing** — High-fidelity polyhedral meshes were generated in STAR-CCM+, with prism-layer refinement at vessel walls to capture near-wall shear gradients accurately.
3. **Simulation** — Pulsatile Navier–Stokes simulations were run across the cardiac cycle using patient-derived boundary conditions (inlet velocity waveforms, outlet pressure profiles). Both untreated and post-treatment (coiling, flow-diverting stent) cases were modelled.
4. **Haemodynamic analysis** — Post-processing extracted Wall Shear Stress (WSS), Oscillatory Shear Index (OSI), and Time-Averaged WSS (TAWSS) — all established markers for aneurysm rupture risk in the clinical literature.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/CFD/Meth_Flow.png" title="Methodology flowchart" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  End-to-end CFD pipeline: from patient imaging to haemodynamic risk output.
</div>

---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/CFD/C2_OSI1.png" title="C2 OSI 1" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/CFD/C2_OSI2.png" title="C2 OSI 2" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/CFD/C2_OSI3.png" title="C2 OSI 3" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/CFD/C2_OSI4.png" title="C2 OSI 4" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Oscillatory Shear Index (OSI) distributions for Patient&nbsp;#2 in the untreated case, shown across four different simulation views.
</div>

---

### Results

- Achieved a final grade of 91% for the dissertation.
- Awarded a grade of 100% for the accompanying poster.
- Successfully segmented patient-specific intracranial aneurysm geometries from medical imaging data.
- Developed and validated high-fidelity CFD meshes to capture aneurysmal blood flow.
- Simulations in STAR-CCM+ demonstrated distinct haemodynamic responses under different treatment strategies:
  - Endovascular coiling reduced flow velocity but in some cases left regions of residual circulation.
  - Flow-diverting stents provided greater reduction in inflow jet momentum, lowering wall shear stress and oscillatory shear index across the aneurysm dome.
- Quantitative haemodynamic analysis showed that elevated OSI and WSS gradients correlated strongly with rupture-prone regions, in line with published clinical literature.
- The study presented a proof-of-concept for employing patient-specific CFD as a clinical decision-support tool in endovascular treatment planning.

---

<div style="margin-bottom: 2rem; text-align: center;">
  <a href="{{ '/assets/pdf/Dineth_Ilapperuma_11121002_Aneurysms.pdf' | relative_url }}" target="_blank" rel="noopener"
     style="display: inline-block; padding: 0.75rem 1.5rem; background-color: #007acc; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; margin-right: 10px;">
    📄 Download Dissertation
  </a>

<a href="{{ '/assets/pdf/TF38_Ilapperuma.pdf' | relative_url }}" target="_blank" rel="noopener"
     style="display: inline-block; padding: 0.75rem 1.5rem; background-color: #007acc; color: white; text-decoration: none; border-radius: 6px; font-weight: 500;">
🖼️ Download Poster
</a>

</div>
