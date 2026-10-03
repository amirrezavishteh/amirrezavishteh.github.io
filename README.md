# Amirreza Vishteh

AI Safety & LLM Security Researcher — defending large language models against backdoor attacks and building trustworthy AI systems.

MSc Computer Engineering, Sharif University of Technology · BSc Computer Engineering, Iran University of Science and Technology (IUST)

[Email](mailto:amireza.vishteh@gmail.com) · [GitHub](https://github.com/amirrezavishteh) · [Google Scholar](https://scholar.google.com/citations?user=ukjmhFwAAAAJ) · [LinkedIn](https://linkedin.com/in/amirreza-vishteh) · [Personal site](https://amirrezavishteh.github.io)

## About

I'm a graduate researcher in Sharif University's Data Science and Machine Learning research group, working at the intersection of two areas:

- **AI Safety & Trustworthy AI** — defending large language models against backdoor attacks and securing neural architectures through benchmarking (BackdoorBench, FTT-NAS).
- **NLP for Low-Resource Languages** — Persian NLP infrastructure (DadmaTools v2) and affective-computing applications.

Ranked **#475 nationally** in Iran's Mathematics Concours (top 0.3% of 150,000+ applicants), and I bring the same rigor to research as to engineering — I've built systems across the full stack, from VHDL to transformer architectures.

## Research & Publications

| Year | Work | Venue / Notes |
|---|---|---|
| 2026 | MECP-GAP: Mobility-Aware MEC Planning via GNNs | IEEE TNSM |
| 2025 | The Sentinel's Dilemma: Guarding AI from Hidden Threats | Survey of LLM backdoor attacks & defenses |
| 2025 | Understanding BackdoorBench | Benchmark analysis for AI security |
| 2025 | FTT-NAS: Implementation and Review | ACL Anthology (2025.fttnas-1.10) |
| 2024 | Wav2Vec2 Sentiment Analysis (Shemo Dataset) | 94% accuracy, Persian speech emotion |
| 2024 | Psychological Health Chatbot | ACL Anthology (2025.abjadnlp-1.8) — with Microsoft Research & University of Ghent |
| 2024 | Multimodal Sentiment Analysis (Persian, 3-class) | Instagram text+image dataset |
| 2023 | Project Iridium | Docker network security simulation |

Earlier work includes **BAIT** (Backdoor Detection via Attack Target Inversion) and **DadmaTools v2**, an adapter-based Persian NLP toolkit presented at the 1st Workshop on NLP for Languages Using Arabic Script.

Full write-ups: [amirrezavishteh.github.io/blog](https://amirrezavishteh.github.io/blog/)

## Featured Project — DentalMind

An AI-assisted dental diagnostics tool applying trustworthy-AI principles to a real clinical workflow: per-tooth radiograph analysis designed to support, not replace, a clinician's judgment. Built with Python, PyTorch, Computer Vision, FastAPI, and React.

## Teaching

- **Sharif University of Technology** — Teaching Assistant, Stochastic Processes and Machine Learning.
- **Iran University of Science and Technology** — Teaching Assistant, NLP, Artificial Intelligence, Theory of Languages, and Computer Architecture.

## Skills

Python · PyTorch · NLP · Persian NLP · AI Safety · Backdoor Detection · LLM Fine-tuning · Wav2Vec2 · Computer Vision · Docker · VHDL · SQL · React · FastAPI

## About this repository

This repo is the source for my personal site ([www.amirrezavishteh.ir](https://www.amirrezavishteh.ir)) — an [Astro](https://astro.build) static site with a git-backed admin panel ([Sveltia CMS](https://github.com/sveltia/sveltia-cms)), built by GitHub Actions and hosted on GitHub Pages.

### Run locally

```
npm install
npm run dev        # http://localhost:4321
npm run build      # production build into dist/
```

`npm run dev` / `build` first run `scripts/optimize-images.mjs`, which writes responsive WebP variants of every image in `public/assets/images` and `public/uploads` to `public/_img` (git-ignored, cached).

### Where things live

| What | File(s) | Admin panel section |
| --- | --- | --- |
| Name, bio, photo, links, hero facts & badges, stats, "Currently", news | `src/data/profile.json` | Profile & CV → Profile |
| Education, research, teaching, honors, skills, courses | `src/data/cv.json` | Profile & CV → CV sections |
| Blog posts | `src/content/blog/*.md` | Blog posts |
| Publications | `src/content/publications/*.md` | Publications |
| Projects (live GitHub stars fetched at build) | `src/content/projects/*.md` | Projects |
| Certificates | `src/content/certificates/*.md` | Certificates |
| Gallery albums | `src/content/albums/*.md` | Gallery albums |
| Logo & icons | `scripts/brand/logo-source.png` → `node scripts/build-brand.mjs` | — |

Old Jekyll URLs (e.g. `/Post-FTTNAS/`, `/friends/`, `/code-data/`) redirect to their new pages — see `redirects` in `astro.config.mjs`.

### Admin panel

Open **`/admin/`** on the live site. Every save is a commit to `master`; the deploy workflow rebuilds the site in ~1–2 minutes.

Sign-in uses a **fine-grained personal access token**:

1. GitHub → Settings → Developer settings → Personal access tokens → *Fine-grained tokens* → **Generate new token**.
2. Repository access: *Only select repositories* → `amirrezavishteh.github.io`.
3. Permissions: **Contents → Read and write** (Metadata read-only is added automatically).
4. Paste the token into "Sign In Using Access Token". It stays in your browser only.

On `localhost`, the panel can also edit your local clone directly ("Work with Local Repository", Chrome/Edge).

To enable a "Sign in with GitHub" button instead, deploy [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) and follow the comment at the top of `public/admin/config.yml`.

### Updating the CMS

`public/admin/index.html` pins a Sveltia CMS version with a Subresource Integrity hash. To upgrade, change the version in the URL and recompute the hash:

```
curl -sL https://unpkg.com/@sveltia/cms@<version>/dist/sveltia-cms.js | openssl dgst -sha384 -binary | openssl base64 -A
```

### Deployment (one-time setup)

In the repository **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` then builds and publishes on every push to `master`. The custom domain is kept via `public/CNAME`.
