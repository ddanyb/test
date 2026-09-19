# Abatement Solutions Website

A static marketing site for Abatement Solutions LLC — a family-owned asbestos
abatement, mold remediation, and demolition contractor serving the St. Louis
metro (Missouri & Illinois).

## Structure

- `index.html` — single-page site (hero, services, why us, process, contact/quote form, footer)
- `css/styles.css` — all styling
- `js/main.js` — mobile nav toggle + quote form validation/submission
- `assets/` — favicon and other static assets

## Running locally

No build step required. Serve the directory with any static file server, e.g.:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploying

Being a plain static site, it can be deployed as-is to GitHub Pages, Netlify,
Vercel, S3/CloudFront, or any static host — just upload these files.

## Quote form

The "Request a Quote" form validates required fields client-side. On submit
it currently opens a pre-filled email to
`dannybacon@abatementsolutionsllc.net` via `mailto:` (see
`submitQuoteRequest()` in `js/main.js`) since no backend is wired up yet. To
receive submissions directly (e.g. via a form backend service or a custom
API endpoint), replace that function's body with a `fetch()` call to the
chosen endpoint.
