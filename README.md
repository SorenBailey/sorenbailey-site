# sorenbailey.com

Static site for [SorenBailey.com](https://sorenbailey.com) — real estate operator notes, free guides, and video archive.

## Deploy

Hosted on Cloudflare Pages. Every push to `main` rebuilds automatically.

- **Build command:** *(none)*
- **Build output directory:** `/`
- **Custom domain:** `sorenbailey.com`

## Structure

```
├── index.html               Home
├── guides.html              Free guides index
├── videos.html              Video archive
├── about.html               About Soren
├── guides/                  Individual guide pages
│   ├── brrrr-buy-filter.html
│   ├── brrrr-starter-pack.html
│   ├── distressed-evaluation.html
│   ├── beginner-underwriting.html
│   ├── strategy-decision-sheet.html
│   └── first-90-days.html
├── css/styles.css
└── assets/
```

## Local preview

Just open `index.html` in a browser. No build step required.
