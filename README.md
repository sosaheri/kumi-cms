 # KUMI CMS

<p align="left">
  <img src="https://img.shields.io/github/license/sosaheri/kumi-cms" alt="License">
  <img src="https://img.shields.io/github/stars/sosaheri/kumi-cms?style=flat&color=yellow" alt="Stars">
  <img src="https://img.shields.io/github/issues/sosaheri/kumi-cms" alt="Issues">
  <img src="https://img.shields.io/github/last-commit/sosaheri/kumi-cms" alt="Last Commit">
</p>

**KUMI Version:** v0.2.0

Description
-----------

KUMI is a compact, modular file-based CMS that assembles static sites from templates in `library/sections/` and data in `data/`.

Quick start
-----------

1. Install dependencies:

```bash
npm install
```

2. Run the wizard to compose your site (interactive):

```bash
# from the project root
node ../kumi-cli/bin/kumi.js wizard
# or, if the CLI is installed globally
kumi wizard
```

3. Generate the standalone (pure HTML):

```bash
node scripts/assemble-theme.js
```

Useful commands
---------------

- `kumi wizard` — interactive guide to choose sections and create `data/layout.json`, `data/sections.json`, and `data/config.json`.
- `kumi clean-themes` — removes `themes/*/index-standalone.html` and `themes/*/assets`.
- `node scripts/assemble-theme.js` — generates `themes/<theme>/index-standalone.html` from `data/`.

Project structure (minimal)
---------------------------

- `library/sections/base/` — base templates.
- `library/sections/premium/` — premium templates (access-controlled).
- `library/catalog.json` — catalog with metadata and `tier` per section.
- `data/layout.json` — order of sections.
- `data/sections.json` — values and HTML fragments per section.
- `themes/default/index-standalone.html` — generated final file.

Standalone notes
----------------

The standalone is a static HTML page (no JS) intended for static hosting. A standalone package typically contains:

- `index-standalone.html` (generated)
- `theme.css` and, optionally, `theme.js` if the theme needs client behavior
- `assets/` with images and static files

Make sure any dynamic content that depends on the runtime CMS (e.g. calls to `Core.loadCollections()`) is prerendered, or provide a theme JS that runs independently of the CMS core.

Reset project
-------------

```bash
# remove generated data
rm -rf data/*.json
# clean builds
node ../kumi-cli/bin/kumi.js clean-themes
```

Mini tutorial (build a site with sample sections)
-----------------------------------------------

1. `kumi wizard` → add sections in this example order: `hero-standard`, `features-grid`, `pricing-base`, `testimonials-base`, `faq-base`, `contact-base`.
2. Fill the items requested by the wizard (for lists, reply Yes/No when asked to add more).
3. Choose to build at the end to run the assembler.
4. Open `themes/default/index-standalone.html` in your browser.

Maintenance & next steps
------------------------

- To extend the library of sections, add templates to `library/sections/base/` and register metadata in `library/catalog.json`.
- Premium sections will show a warning in the wizard; access control and on-demand delivery are planned for a later phase.
- Recommended improvements: add a lightweight Express server for editing `data/*.json` via API, implement JSON validation with `ajv`, and add an admin UI.

Data validation
---------------

You can validate `data/*.json` against the schemas in `schemas/` (example script available in `scripts/`).

```bash
npm run lint:data
```

If you want me to proceed, I can:
- implement a small file-based Express API for `/api/collections/:name`, or
- start building a minimal Admin UI for editing collections.

Which would you prefer?
