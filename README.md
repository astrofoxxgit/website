# Astrofoxx (Full Static Website)

High-end, no-build static website for astrologer Umashankar.

No Node. No bundler. Edit files and push.

## Stack

- Static HTML routes (`folder/index.html`)
- Shared stylesheet: `assets/css/styles.css`
- Shared JS runtime: `assets/js/site.js`
- Local data files:
  - `data/services.json`
  - `data/courses.csv`
  - `data/tools.json`
  - `data/testimonials.json`
- Lucide icons from CDN

## Active routes

- `/` -> `index.html`
- `/about` -> `about/index.html`
- `/services` -> `services/index.html`
- `/courses` -> `courses/index.html`
- `/tools` -> `tools/index.html`
- `/contact` -> `contact/index.html`

## Project structure

```text
.github/workflows/deploy.yml
assets/css/styles.css
assets/js/site.js
data/services.json
data/courses.csv
data/tools.json
data/testimonials.json
about/index.html
services/index.html
courses/index.html
tools/index.html
contact/index.html
index.html
404.html
favicon.svg
og-default.svg
pattern-mandala.svg
ornament-fractal.svg
robots.txt
sitemap.xml
```

## Content editing

### Services

Edit `data/services.json`.

### Courses (CSV-driven)

Edit `data/courses.csv`.

Header columns:

```csv
title,slug,level,duration,price,description,curriculumBullets,whoItsFor,nextBatch,whatsappMessageTemplate,featured
```

Rules:

- `curriculumBullets` uses `|` separator for bullet points.
- `featured` uses `true` or `false`.
- `nextBatch` uses `YYYY-MM-DD`.

### Tools

Edit `data/tools.json`.

### Testimonials

Edit `data/testimonials.json`.

## Global branding/contact config

Update `config` in `assets/js/site.js`:

- `siteName`
- `teacherName`
- `tagline`
- `whatsappPhone`
- `callNumber`
- `email`
- `city`
- `officeHours`
- `siteUrl`

## GitHub Pages deploy (no build)

Workflow: `.github/workflows/deploy.yml`

GitHub setup:

1. Repo `Settings -> Pages`
2. Source: `GitHub Actions`
3. Push to `main`

## SEO URLs

Current production domain is already set to `https://www.astrofoxx.in` in:

- `robots.txt` sitemap URL
- `sitemap.xml` `<loc>` URLs
- `assets/js/site.js` -> `siteUrl`

If domain changes later, update those three places.

## Local preview

Use a local static server (recommended because pages fetch JSON/CSV):

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/`.
