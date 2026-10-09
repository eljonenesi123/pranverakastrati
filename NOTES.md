# Notes / Outstanding Items

Items still needed from the client before this site is fully production-ready:

1. **Real contact email** — `index.html` currently uses a placeholder
   (`contact@pranverakastrati.example`) in two places: the contact link and the
   mailto-based form action. Search for `contact@pranverakastrati.example` and
   replace with the real address.
2. **Publications / speaking list** — not included in the brief; if Dr. Kastrati
   has publications, reports, or speaking engagements to list, a new section can
   be added without restructuring the site.
3. **Additional photos** — only one portrait (`Profili.jpg`) was supplied. It's
   used in both the hero and About section. A second, higher-resolution photo
   (ideally 1200px+ on the long edge) would allow sharper rendering at larger
   sizes and on high-DPI screens.
4. **Contact form backend** — the form currently submits via `mailto:`, which
   opens the visitor's email client (no backend needed, works on GitHub Pages).
   If a "real" form submission (POST to a server) is wanted instead, swap the
   `<form action>` in index.html for a Formspree (or similar) endpoint — just
   change the `action` URL and method, no other code changes required.
5. **Custom domain / GitHub Pages URL** — once the site has a live URL, add an
   absolute `og:url` meta tag in `index.html`'s `<head>` for correct social
   sharing previews.

## Multilingual readiness

The `<html>` tag carries `data-lang="en"`. Section content is plain, so adding
Albanian/French later means: duplicate `index.html` as `index.sq.html` /
`index.fr.html` (or introduce a JSON content file + JS templating) and add a
language switcher to the nav. No rebuild of CSS/JS is required.

## Deployment (GitHub Pages)

`index.html` sits at the repo root, so Pages can be enabled directly against
the `main` branch root — no `/docs` folder or build step needed.
