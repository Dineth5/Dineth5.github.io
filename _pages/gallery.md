---
layout: page
title: Gallery
permalink: /gallery/
description: Film photography — 35mm analog archive.
nav: true
nav_order: 4
---

<div class="gallery-page">
  <div class="gallery-header" data-reveal>
    <span class="eyebrow">Film</span>
    <h1>The Analog Archive</h1>
    <p>
      Moments captured on 35mm film. There's something about the deliberate pace of analog
      photography — one frame at a time, no delete button — that sharpens how you see the world.
    </p>
    <div class="film-spec">
      <span class="tag">35mm</span>
      <span class="tag">Kodak Gold 200</span>
      <span class="tag">Fujifilm Superia</span>
      <span class="tag">Ilford HP5</span>
    </div>
  </div>

  <div class="photo-grid" data-reveal data-reveal-delay="100">
    {% assign photos = "1,2,3,4,5,6,7,8,9,10,11,12" | split: "," %}
    {% for n in photos %}
      {% capture img_path %}/assets/img/{{ n }}.jpg{% endcapture %}
      <div class="photo-item" title="Frame {{ n }}">
        <img src="{{ img_path | relative_url }}" alt="Film photograph {{ n }}" loading="lazy">
        <div class="photo-overlay">
          <div class="photo-meta">{{ n }} / 12</div>
        </div>
      </div>
    {% endfor %}
  </div>
</div>
