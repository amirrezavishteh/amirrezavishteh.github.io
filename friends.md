---
layout: redesign
permalink: /friends/
title: Friends
tags: [Friends]
modified: 4-10-2019
comments: true
gallery:
  - url: /assets/images/dml-lab-hamidreza-rabiee.jpg
    image_path: /assets/images/dml-lab-hamidreza-rabiee.jpg
    alt: "Hamidreza Rabiee"
    title: "Hamidreza Rabiee & amirreza vishteh"
  - url: /assets/images/amirsina.jpeg
    image_path: /assets/images/amirsina.jpeg
    alt: "sina alinejad"
    title: "sina alinejad & amirreza vishteh"
  - url: /assets/images/amirmammd.jpeg
    image_path: /assets/images/amirmammd.jpeg
    alt: "mohamad osolian"
    title: "mohamad osolian & amirreza vishteh"
  - url: /assets/images/friendsf.jpeg 
    image_path: /assets/images/friendsf.jpeg 
    alt: "amirreza vishteh"
    title: "amirreza vishteh"    
  - url: /assets/images/mamadamir3.jpeg
    image_path: /assets/images/mamadamir3.jpeg
    alt: "placeholder image 3"
    title: " amirreza vishteh & mohamad osolian"
    image_size: large
  - url: /assets/images/sinavishteh.jpeg
    image_path: /assets/images/sinavishteh.jpeg
    alt: "placeholder image 3"
    title: "sina alinejad & amirreza vishteh "
    image_size: large
  - url: /assets/images/sinavishteh2.jpeg
    image_path: /assets/images/sinavishteh2.jpeg
    alt: "placeholder image 3"
    title: "sina alinejad & amirreza vishteh "
    image_size: large
  - url: /assets/images/sinaamir.jpeg
    image_path: /assets/images/sinaamir.jpeg
    alt: "placeholder image 3"
    title: "sina alinejad & amirreza vishteh "
    image_size: large
  - url: /assets/images/abasamir.jpeg
    image_path: /assets/images/abasamir.jpeg
    alt: "placeholder image 3"
    title: "sina alinejad & amirreza vishteh "
    image_size: large
  # - url: /assets/images/elyna ataee - elina ataee - elyna ataei - elyna etaee- elina etaee - elina etaei.jpg
  #   image_path: /assets/images/elyna ataee - elina ataee - elyna ataei - elyna etaee- elina etaee - elina etaei.jpg
  #   alt: "placeholder image 3"
  #   title: "elyna ataee - elina ataee - elyna ataei - elyna etaee- elina etaee - elina etaei "
  #   image_size: large
  - url: /assets/images/friendsb.jpeg
    image_path: /assets/images/friendsb.jpeg
    alt: "placeholder image 3"
    title: "sina alinejad & amirreza vishteh & mohamad hossein abaspor & navid ebrahimi & mohamad osolian"
    image_size: large
  - url: /assets/images/friendsc.jpeg
    image_path: /assets/images/friendsc.jpeg
    alt: "placeholder image 3"
    title: " amirreza vishteh & mohamad hossein abaspor & navid ebrahimi & vahid"
    image_size: large
  - url: /assets/images/friendsd.jpeg
    image_path: /assets/images/friendsd.jpeg
    alt: "placeholder image 3"
    title: "Farzan Rahmani & sina alinejad & amirreza vishteh & mohamad hossein abaspor & navid ebrahimi & vahid"
    image_size: large
  - url: /assets/images/realfriends.jpeg
    image_path: /assets/images/realfriends.jpeg
    alt: "placeholder image 3"
    title: "sina alinejad & amirreza vishteh & mohamad hossein abaspor & navid ebrahimi & vahid"
    image_size: large
  - url: /assets/images/all.jpeg
    image_path: /assets/images/all.jpeg
    alt: "placeholder image 3"
    title: "all"
    image_size: large
---

<section class="rd-hero rd-hero--text-only">
  <div>
    <div class="rd-eyebrow">Friends</div>
    <h1 class="rd-hero__title" style="font-size: 44px;">People who make it better</h1>
    <p class="rd-hero__lead">A few of the people I've studied and built things with.</p>
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
