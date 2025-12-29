# Core Technical SEO Improvements - Complete Implementation

## 1. Search Engine Verification IDs ✅

**File**: `_config.yml`

Added placeholder verification fields for major search engines:
```yaml
google_site_verification : "YOUR_GOOGLE_VERIFICATION_ID_HERE"
bing_site_verification   : "YOUR_BING_VERIFICATION_ID_HERE"
yandex_site_verification : "YOUR_YANDEX_VERIFICATION_ID_HERE"
naver_site_verification  : "YOUR_NAVER_VERIFICATION_ID_HERE"
```

**Action Required**: Replace these with actual verification codes from:
- [Google Search Console](https://search.google.com/search-console/)
- [Bing Webmaster Tools](https://www.bing.com/webmasters/)
- [Yandex Webmaster](https://webmaster.yandex.com/)
- [Naver Webmaster](https://searchadvisor.naver.com/)

---

## 2. Per-Page Open Graph & Twitter Metadata ✅

**File**: `_includes/head/custom.html`

Implemented dynamic metadata system supporting:

### On Home Page (index.html):
```yaml
og_title: "Amirreza Vishteh - AI Safety & LLM Security Researcher"
og_description: "Defending Large Language Models Against Backdoor Attacks..."
og_image: "/assets/images/BAIT-Large-Language-Model-Backdoor-Scanning-by-Inverting-Attack-Target.png"
twitter_card: "summary_large_image"
twitter_image: "/assets/images/BAIT-Large-Language-Model-Backdoor-Scanning-by-Inverting-Attack-Target.png"
```

### On Gallery Page (gallery.md):
```yaml
og_title: "Amirreza Vishteh's Photo Gallery"
og_description: "Personal photography collection - travel, hobbies, and moments..."
og_image: "/assets/images/rezagreen.jpeg"
twitter_card: "summary_large_image"
twitter_image: "/assets/images/rezagreen.jpeg"
```

### Usage for Any Page:
Simply add to front matter:
```yaml
---
og_title: "Custom Title"
og_description: "Custom description for social sharing"
og_image: "/path/to/image.png"
twitter_card: "summary_large_image"
twitter_image: "/path/to/twitter-image.png"
---
```

**Benefits**:
- Rich previews on Twitter, LinkedIn, Facebook
- Custom title and description for each page
- Controlled image display in shares
- Improved click-through rates from social media

---

## 3. Structured Data & Schema Markup ✅

### Person Schema (Global)
File: `_includes/head/custom.html`

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Amirreza Vishteh",
  "url": "https://amirrezavishteh.github.io",
  "jobTitle": "AI Safety Researcher",
  "sameAs": [
    "https://scholar.google.com/citations?user=ukjmhFwAAAAJ",
    "https://github.com/amirrezavishteh",
    "https://twitter.com/Amirrezav1"
  ]
}
```

**Benefits**: Enables knowledge panel on Google, improves SERP features

### Research Paper Schema (Per-Post)
File: `_includes/paper-schema.html`

Available for blog posts with metadata:
```yaml
---
paper_title: "BAIT: Backdoor Scanning by Inverting Attack Target"
paper_url: "https://arxiv.org/abs/..."
paper_doi: "10.xxxx/xxxxx"
paper_year: 2024
paper_venue: "NeurIPS 2024"
paper_authors: ["Amirreza Vishteh", "Co-author"]
---
```

Generates ScholarlyArticle schema automatically.

---

## 4. Enhanced Publication Cards ✅

**File**: `index.html` → `feature_row_papers`

### BAIT Research Card:
- **Title**: 🏆 BAIT: Backdoor Scanning by Inverting
- **Metadata**: Novel backdoor detection for LLMs (2023-2024)
- **Description**: Includes attack target inversion technique, model security, adversarial robustness
- **Focus Areas**: Model Security, Adversarial Robustness

### FTT-NAS Card:
- **Title**: 🔍 FTT-NAS: Neural Architecture Search
- **Metadata**: Trustworthy AI Systems (2024)
- **Description**: Efficient and robust model design
- **Focus Areas**: Model Efficiency, Interpretability, Robustness

### LLM Robustness Card:
- **Title**: 🛡️ Adversarial Robustness of LLMs
- **Metadata**: Defense Mechanisms (2024-2025)
- **Description**: Attacks, defenses, and practical mitigation
- **Focus Areas**: Adversarial Attacks, Defense Mechanisms

**Benefits**:
- Search engines understand research contribution
- Visitors see concrete years and venues
- Rich snippets in search results
- Better authority signaling

---

## 5. Anchor Navigation & Jump Links ✅

**File**: `index.html`

Added persistent navigation bar after hero:
```html
Jump to Section:
📝 Publications
💻 Code & Data
🤝 Collaborations
📅 Timeline
```

### Section IDs for Direct Linking:
- `#publications-section` → Featured Publications & Research
- `#code-section` → Code & Datasets
- `#collaboration-section` → Collaborations & Research Chat
- `#timeline-section` → Research Journey Timeline

**Benefits**:
- Improves internal linking structure
- Sitelinks in Google results
- Direct bookmarkable URLs
- Better UX for navigation
- Crawlable anchor targets for search engines

---

## 6. Research Statistics Display ✅

**File**: `_includes/research-stats.html`

Displays 4-metric research impact section:

| Metric | Value | Note |
|--------|-------|------|
| Publications | 3+ | 2023–2025 |
| Citations | 30+ | Google Scholar |
| Major Venues | 2 | Conferences & Journals |
| GitHub Repos | 5 | Open Source Code |

Includes direct link to Google Scholar profile.

**Benefits**:
- Immediate credibility signal
- Social proof above fold
- Encourages Scholar profile visits
- Shows research prolific output

---

## 7. Blog/Publications Page Enhancement ✅

**File**: `blog.md`

Added:
- **Custom OG metadata** for rich social previews
- **Instruction guide** for paper metadata in posts
- **Example front matter** for research papers
- **Better page title** highlighting research focus

---

## Implementation Checklist

### Immediate Actions (Required):
- [ ] Replace verification IDs in `_config.yml` with actual codes
- [ ] Test OG metadata using [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/sharing/)
- [ ] Test Twitter cards using [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Verify schema markup using [Schema.org Validator](https://validator.schema.org/)

### For New Research Posts:
- [ ] Include `og_title`, `og_description`, `og_image` in front matter
- [ ] Include `paper_title`, `paper_url`, `paper_doi`, `paper_year`, `paper_venue` for schema
- [ ] Use descriptive excerpt for social sharing
- [ ] Include `twitter_card` and `twitter_image` for custom Twitter previews

### Monitoring:
- [ ] Monitor Google Search Console for new sitelinks
- [ ] Track CTR improvements from rich snippets
- [ ] Monitor Scholar profile citation growth
- [ ] Check social media share analytics

---

## Expected SEO Impact

1. **Knowledge Panel**: Person schema enables knowledge panel display
2. **Rich Snippets**: Publication cards may display in search results
3. **Social Previews**: Custom OG/Twitter metadata on shares
4. **Internal Linking**: Anchor navigation improves crawlability
5. **Author Authority**: sameAs links improve entity recognition
6. **CTR Improvement**: Rich previews typically increase click-through rates by 20-30%
7. **Mobile UX**: Jump links improve navigation on mobile devices

---

## File Summary

| File | Purpose | Status |
|------|---------|--------|
| `_config.yml` | Verification IDs | ✅ |
| `_includes/head/custom.html` | Per-page metadata + schemas | ✅ |
| `_includes/paper-schema.html` | Research paper markup | ✅ |
| `_includes/research-stats.html` | Impact metrics display | ✅ |
| `index.html` | Enhanced with anchor nav + stats | ✅ |
| `blog.md` | Instructions for papers | ✅ |
| `gallery.md` | OG metadata | ✅ |
