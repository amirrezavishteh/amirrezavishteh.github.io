---
layout: redesign
permalink: /gallery/
title: "Gallery"
og_title: "Amirreza Vishteh's Photo Gallery"
description: "A personal photo gallery from Amirreza Vishteh — travel, university life, and the moments away from research."
og_description: "Personal photography collection - travel, hobbies, and moments that inspire research and life."
tags: [gallery, photography, personal]
last_modified_at: 2025-12-30
comments: false
gallery:
  - url: /assets/images/littleamir.jpeg
    image_path: /assets/images/littleamir.png
    alt: "Amirreza Vishteh - Childhood memories in Bagh Ferdos"
    title: "Amirreza - Bagh Ferdos - Childhood"
  - url: /assets/images/1.jpg
    image_path: /assets/images/1.jpg
    alt: "Amirreza Vishteh - Bagh Ferdos"
    title: "Amirreza - Bagh Ferdos Moment"
  
  - url: /assets/images/3.jpg
    image_path: /assets/images/3.jpg
    alt: "Amirreza Vishteh exploring Bagh Ferdos"
    title: "Amirreza at Bagh Ferdos"
  - url: /assets/images/4.jpg
    image_path: /assets/images/4.jpg
    alt: "Amirreza Vishteh - Personal moment at Bagh Ferdos"
    title: "Amirreza - Bagh Ferdos Reflection"
  - url: /assets/images/5.jpg
    image_path: /assets/images/5.jpg
    alt: "Amirreza Vishteh - Bagh Ferdos"
    title: "Amirreza - Bagh Ferdos"
  - url: /assets/images/5848190623616273499.jpg
    image_path: /assets/images/5848190623616273499.jpg
    alt: "Amirreza Vishteh - Memories at Bagh Ferdos"
    title: "Amirreza - Bagh Ferdos Memory"
  - url: /assets/images/2.jpg
    image_path: /assets/images/2.jpg
    alt: "Amirreza Vishteh at Bagh Ferdos"
    title: "Amirreza - Bagh Ferdos Experience"

---

<section class="rd-hero rd-hero--text-only">
  <div>
    <div class="rd-eyebrow">Gallery</div>
    <h1 class="rd-hero__title" style="font-size: 44px;">Moments along the way</h1>
    <p class="rd-hero__lead">Personal photographs from Bagh Ferdos and beyond &mdash; capturing moments that balance my research in AI Safety and Trustworthy AI with the human experiences that ground meaningful work.</p>
  </div>
</section>

<section class="rd-section">
  <div class="rd-section__inner">
    <div class="rd-bento">
      {% for photo in page.gallery %}
        <div class="rd-bento__item" data-lightbox-src="{{ photo.image_path | relative_url }}" data-lightbox-alt="{{ photo.alt }}" data-lightbox-caption="{{ photo.title }}">
          <img src="{{ photo.image_path | relative_url }}" alt="{{ photo.alt }}" loading="lazy" decoding="async">
          <div class="rd-bento__caption"><span>{{ photo.title }}</span></div>
        </div>
      {% endfor %}
    </div>
  </div>
</section>

