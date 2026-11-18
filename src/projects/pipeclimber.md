---
title: Internal Pipe Climber
short: Internal pipe climber
order: 9
kind: Design challenge
org: IMechE Design Challenge
years: 2022
role: First-year design and build
summary: A £30 machine that climbs two metres up the inside of a pipe carrying a load, with no control electronics.
plate: pipeclimber
cover: Pipe/Explo1.webp
tools: FMEA | Hand fabrication | SolidWorks
metrics: 21 s = climb and return | ≤£30 = total budget | 2 m = vertical pipe | 6 V, 2 W = motor limit
---

## Overview

For the [IMechE Design Challenge](https://www.imechedesignchallenge.org/wp-content/uploads/2023/01/IMechE-1st-Year-Design-Challenge-Project-Specification-2023-V1.1.pdf) I designed and built a climber that ascends a 2 m vertical pipe from the inside, lifts a 0.265 kg chain, and returns to the start as fast as possible. The challenge mirrors the pigging operations used to inspect and clean pipelines.

The constraints were tight:

- no more than £30 for every made and bought part,
- fit inside a 105.6 mm diameter and 300 mm length,
- a motor of at most 6 V and 2 W, and
- no control electronics of any kind.

## Design

<figure class="figs">
  <img src="/assets/img/Pipe/sketch_pipe.webp" alt="Four hand-sketched concepts">
  <figcaption>Initial concepts.</figcaption>
</figure>

- **Tripod.** Light, but aligning the wheels and axles within the envelope was impractical.
- **Quadrant.** Good for a free-fall return, but the spring-loaded wheels were unstable.
- **Rectangular chassis (chosen).** A stiff frame for the motor, battery and gears, with triangular cut-outs to shed weight.

## FMEA

A failure mode and effects analysis was run twice, before and after testing. It flagged three risks: too little spring tension to grip the wall, tyres with too little friction, and too much weight to reach the top. Each was addressed through spring rate, tyre selection and chassis lightening.

<figure class="figs figs-2 figs-contain">
  <img src="/assets/img/Pipe/Explo1.webp" alt="Isometric exploded view">
  <img src="/assets/img/Pipe/Explo2.webp" alt="Front exploded view">
  <figcaption>Exploded views of the climber.</figcaption>
</figure>

## Result

The climber ascended the pipe with its load and returned under gravity in 21 seconds, passed scrutineering, and performed consistently within the competition constraints. Early prototypes slipped; higher-tread tyres and a lighter chassis fixed it.

<figure class="figs">
  <img src="/assets/img/Pipe/Assembly.webp" alt="Assembly drawing of the pipe climber">
  <figcaption>Assembly drawing.</figcaption>
</figure>
