---
layout: redesign
permalink: /hobbies/
title: Hobbies
tags: [Hoby]
modified: 9-14-2019
comments: false
gallery:
  - url: /assets/images/amirshomal.jpeg
    image_path: /assets/images/amirshomal.jpeg
    alt: "placeholder image 5"
    title: "North"   
  - url: /assets/images/amirrezaSnow.jpeg 
    image_path: /assets/images/amirrezaSnow.jpeg
    alt: "placeholder image 5"
    title: "Darakeh"
  - url: /assets/images/amirrezasu.jpg 
    image_path: /assets/images/amirrezasu.jpg
    alt: "placeholder image 5"
    title: "IUST"
  - url: /assets/images/nature2.jpeg
    image_path: /assets/images/nature2.jpeg
    alt: "Natanz"
    title: "Natanz"
  - url: /assets/images/nature1.jpeg 
    image_path: /assets/images/nature1.jpeg
    alt: "placeholder image 5"
    title: "Natanz" 


    
gallery2:
  - url: /assets/images/amirandtofi.jpeg
    image_path: /assets/images/amirandtofi.jpeg
    alt: "placeholder image 5"
    title: "Tofan"   
  - url: /assets/images/barak.jpeg
    image_path: /assets/images/barak.jpeg
    alt: "placeholder image 5"
    title: "Barak"   
  - url: /assets/images/jordan.jpeg
    image_path: /assets/images/jordan.jpeg
    alt: "placeholder image 5"
    title: "Barak" 
  - url: /assets/images/amirrezaLittledog.jpeg
    image_path: /assets/images/amirrezaLittledog.jpeg
    alt: "placeholder image 5"
    title: "Jaky"  
    
---

<section class="rd-hero rd-hero--text-only">
  <div>
    <div class="rd-eyebrow">Hobbies</div>
    <h1 class="rd-hero__title" style="font-size: 44px;">Outside of work</h1>
    <p class="rd-hero__lead">Nature, mountains, and two very good dogs.</p>
  </div>
</section>

<section class="rd-section">
  <div class="rd-section__inner">
    <div class="rd-bento-group">
      <h2 class="rd-bento-group__title">Nature Tourism</h2>
      <div class="rd-bento">
        {% for photo in page.gallery %}
          <div class="rd-bento__item">
            <img src="{{ photo.image_path | relative_url }}" alt="{{ photo.alt }}">
            <div class="rd-bento__caption"><span>{{ photo.title }}</span></div>
          </div>
        {% endfor %}
      </div>
    </div>
    <div class="rd-bento-group">
      <h2 class="rd-bento-group__title">My Dogs</h2>
      <div class="rd-bento">
        {% for photo in page.gallery2 %}
          <div class="rd-bento__item">
            <img src="{{ photo.image_path | relative_url }}" alt="{{ photo.alt }}">
            <div class="rd-bento__caption"><span>{{ photo.title }}</span></div>
          </div>
        {% endfor %}
      </div>
    </div>
  </div>
</section>
