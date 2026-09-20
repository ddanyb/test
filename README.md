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
