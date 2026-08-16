---
layout: redesign
permalink: /blog/
title: "Research & Publications"
og_title: "Research Publications & Blog — AI Safety & LLM Security"
description: "Peer-reviewed papers and technical write-ups by Amirreza Vishteh on backdoor attacks and defenses in large language models, AI safety, and Persian NLP."
og_description: "Explore peer-reviewed research, papers, and technical blog posts on AI Safety, Large Language Model Security, and Trustworthy AI."
tags: [research, publications]
last_modified_at: 2026-08-09
---

<section class="rd-hero rd-hero--text-only">
  <div>
    <div class="rd-eyebrow">Research &amp; Publications</div>
    <h1 class="rd-hero__title" style="font-size: 44px;">Research</h1>
    <p class="rd-hero__lead">Work from the Data Science and Machine Learning research group at Sharif University, centered on AI Safety, LLM security, and NLP for low-resource languages.</p>
  </div>
</section>

<section class="rd-section">
  <div class="rd-section__inner rd-section__inner--narrow">
    <div class="rd-timeline">
      {% for post in site.posts %}
        {% assign post_year = post.date | date: "%Y" %}
        {% if post_year >= "2023" %}
          <div class="rd-timeline__row">
            <div class="rd-timeline__meta">{{ post_year }}</div>
            <div>
              <a href="{{ post.url | relative_url }}" class="rd-timeline__title">{{ post.title }}</a>
              <p class="rd-timeline__excerpt">{{ post.excerpt | strip_html | truncatewords: 32 }}</p>
            </div>
          </div>
        {% endif %}
      {% endfor %}
    </div>
  </div>
</section>
