# Dance Fusion

Static marketing landing page (plain HTML/CSS/JS, no build step, no framework) for the Dance Fusion dance academy in Montijo. Content is in Portuguese.

Key files: `index.html`, `styles.css`, `script.js`, static assets under `images/`.

## Cursor Cloud specific instructions

- No build, lint, or test tooling exists in this repo. The only runtime dependency is `serve` (see `package.json`), used to serve the static files locally.
- Run the dev server with `PORT=3000 npm start` (serves the repo root). Alternatively `npm run preview` uses `python3 -m http.server 8000`. There is no hot reload; refresh the browser after editing files.
- Since it is a fully static site, "the app working" just means the pages/assets load over HTTP (not `file://`) and the JS interactions run. Core interactive feature: the enrollment form (`#enrollForm`) opens a pre-filled WhatsApp link via `wa.me` on submit; other JS handles the mobile nav toggle, scroll-spy nav, and event poster carousels.
- Deploy targets are configured but not needed for local dev: GitHub Pages (`.github/workflows/pages.yml`), Netlify (`netlify.toml`), Railway (`railway.json`).
