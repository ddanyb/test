# Abatement Solutions Website

A static marketing site for Abatement Solutions LLC — a family-owned asbestos
abatement, mold remediation, and demolition contractor serving the St. Louis
metro (Missouri & Illinois).

## Structure

- `index.html` — single-page site (hero, services, why us, process, contact/quote form, footer)
- `css/styles.css` — all styling
- `js/main.js` — mobile nav toggle + quote form validation/submission
- `assets/` — favicon and other static assets
- `blog/` — blog section (see below)

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
it POSTs to [FormSubmit.co](https://formsubmit.co) via `fetch()` (see
`submitQuoteRequest()` in `js/main.js`), which emails the submission
straight to `dannybacon@abatementsolutionsllc.net` with no page redirect
and no account/dashboard setup required.

**One-time activation:** the first submission ever sent to a given email
address triggers an "Activate Form" confirmation email from FormSubmit
instead of forwarding that submission's content — click the link in it once
to activate. Every submission after that goes straight through. To send
quote requests to a different address, change `FORMSUBMIT_ENDPOINT` in
`js/main.js` (it will need its own one-time activation too).

## Blog

There's no CMS — each post is a plain HTML file in `blog/`, built the same
way as the rest of the site (same header, footer, and `css/styles.css`).

To add a new post:

1. Copy an existing file in `blog/` (e.g. `blog/popcorn-ceiling-asbestos-signs.html`) as a starting point — it already has the shared header/footer wired up with the correct relative paths (`../` back to the site root).
2. Update the `<title>`, `<meta name="description">`, and the content inside `<article class="article">`.
3. Add a matching `<a class="post-card">` entry to `blog/index.html` so the new post shows up in the listing.

Post URLs are just the filename, e.g. `yoursite.com/blog/post-name.html` —
keep filenames short, lowercase, and hyphenated for clean, readable links
(this also helps a little with search engines).
