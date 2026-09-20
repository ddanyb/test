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
it POSTs to [Web3Forms](https://web3forms.com) via `fetch()` (see
`submitQuoteRequest()` in `js/main.js`), which emails the submission
straight to the business inbox with no page redirect. The access key in
`js/main.js` is a public client-side key (Web3Forms' intended usage, not a
secret) tied to the receiving email address — to change where submissions
go, generate a new key at web3forms.com and swap `WEB3FORMS_ACCESS_KEY`.
