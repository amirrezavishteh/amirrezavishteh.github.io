---
layout: single
author_profile: true
title: "Tags"
permalink: /tags/
---

{% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}

{% assign tags = site_tags | split: ',' | sort %}

<div id="tags">
  {% for tag in tags %}
  <div id="{{ tag | slugify }}">
    <h2>{{ tag }}</h2>
    <ul>
      {% for post in site.posts %}
        {% if post.tags contains tag %}
        <li>
          <a href="{{ post.url }}">{{ post.title }}</a>
          <span class="post-meta">{{ post.date | date: "%b %d, %Y" }}</span>
        </li>
        {% endif %}
      {% endfor %}
    </ul>
  </div>
  {% endfor %}
</div>

<style>
  #tags {
    margin-top: 2rem;
  }

  #tags h2 {
    margin-top: 2rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e0e0e0;
    font-size: 1.5rem;
  }

  #tags ul {
    list-style: none;
    padding-left: 0;
  }

  #tags li {
    margin: 0.5rem 0;
    padding: 0.5rem 0;
  }

  #tags a {
    color: #0066cc;
    text-decoration: none;
  }

  #tags a:hover {
    text-decoration: underline;
  }

  .post-meta {
    display: block;
    font-size: 0.85rem;
    color: #999;
    margin-top: 0.25rem;
  }
</style>
