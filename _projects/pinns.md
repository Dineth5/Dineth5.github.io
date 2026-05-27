---
layout: page
title: QCPINN — AI-Accelerated CFD
description: Physics-Informed Neural Networks for real-time intracranial haemodynamics (Imperial MSc Dissertation)
img: assets/img/Meth_Flow.png
importance: 1
category: Work
---

<span class="eyebrow">MSc Dissertation · Imperial College London · 2025–2026</span>

### Overview

My MSc dissertation at Imperial College London develops **QCPINN** — a _Quasi-Cartesian Physics-Informed Neural Network_ — designed to replace computationally expensive Navier–Stokes finite-volume solvers with a real-time, mesh-free neural surrogate for patient-specific intracranial haemodynamics.

Traditional CFD pipelines for aneurysm haemodynamics require multi-hour simulations per patient geometry, making real-time clinical decision support infeasible. QCPINN embeds the governing PDE residuals directly into the network's loss function, enforcing physical consistency without labelled simulation data.

---

### Architecture

The QCPINN builds on the PINN framework (Raissi et al., 2019) with a domain-adapted coordinate transformation:

- **Quasi-Cartesian embedding**: Maps the curvilinear vessel geometry to a structured domain, improving gradient flow and convergence compared to vanilla collocation-point PINNs.
- **Multi-task loss**: Simultaneous minimisation of: PDE residual (continuity + momentum), boundary condition loss (no-slip walls, inlet Womersley profile), and sparse data loss (CFD snapshot supervision at key timesteps).
- **Pulsatile inlet BC**: Womersley flow profile with patient-specific cardiac frequency and stroke volume.

```
Input: (x, y, z, t) → [Encoder] → [Residual blocks × 6] → [Output head: u, v, w, p]
Loss  = λ₁·L_pde + λ₂·L_bc + λ₃·L_data
```

Training runs on **Imperial's HPC cluster (CX3)** using PyTorch + CUDA, with adaptive loss-weight scheduling (NTK-informed).

---

### Key Results

| Metric | Value |
|--------|-------|
| Velocity MAE vs. CFD | < 4% |
| Pressure field RMSE | < 6% |
| Inference time (full 3D field) | **< 80 ms** |
| Training time (HPC, 4× A100) | ~14 hours |

The model achieves real-time inference over a patient-specific geometry — enabling a potential clinical tool where a surgeon inputs geometry from MRA imaging and receives haemodynamic risk maps within seconds rather than hours.

---

### Clinical Relevance

Elevated **Wall Shear Stress (WSS)** and **Oscillatory Shear Index (OSI)** are established rupture-risk predictors for intracranial aneurysms. QCPINN reconstructs these fields with sub-clinical-grade accuracy, creating a pathway toward AI-assisted pre-operative planning.

---

<div class="tags">
  <span class="tag">PyTorch</span>
  <span class="tag">Physics-Informed Neural Networks</span>
  <span class="tag">Navier–Stokes</span>
  <span class="tag">HPC / CUDA</span>
  <span class="tag">Computational Haemodynamics</span>
  <span class="tag">Imperial College London</span>
</div>
