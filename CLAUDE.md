# CLAUDE.md — Aufa

Portfolio for **Aufa Akmal Bunaya**, a programmer and security engineer studying Electronics & Instrumentation at UGM (2023–present).

## Stack and files
- One-page static site: plain HTML, CSS and JS. No build step.
- `index.html` holds all content, `styles.css` the design, `script.js` the mobile menu and the draggable canvas.
- `assets/motion/` and `assets/moments/` are copied from the design-taste-frontend skill kit: the hover/press layer, the hero entrance and the `counter-rolls` moment (About stats). Don't edit them; page CSS never sets `.btn` transform or transition, and never relies on `clip-path` for `.hero__bg` (the kit resets it).
- `assets/img/` holds real screenshots (WiOur, Gain Link, TikTok Downloader); `assets/img/art/` holds illustrations generated with Higgsfield (gpt_image_2_6): hero night sky, workbench (About), dusk station (Education), and covers for Ourtecads, Wonder, Pong Plus, Vapelussion and Folder Locker.
- Language: **English**.

## Hosting
- GitHub: public repo `aufa-portfolio` on the `daffacerdas22-cell` account, branch `main`.
- Vercel: project linked to that repo; every push to `main` deploys. No `vercel.json` needed.

## Design
- After railway.com: `#13111C` night ground, IBM Plex Serif headings, Inter body, JetBrains Mono details, navy `#1B2132` rounded grounds on alternate sections, a dashed track rail in the left margin, small mono eyebrow labels above headings.
- Colour: teal from the artwork (`--action #2B6F6B`, `--accent #8ED6CB`). Purple was removed to satisfy the taste skill's no-violet rule (the user asked to fix every flagged problem).
- Hero: split. Copy on the left, an app-window canvas on the right with Ourtecads, WiOur and Gain Link as draggable service nodes (desktop only; hidden under 640px). The painting is a full-width image under a rounded frame drawn by `.hero::after`.
- Sections in order: hero, About (text + workbench picture, stats row), Web platforms (navy, 3 cards), Games (2 large pictures), Apps and tools (navy, 3 cards), Education (track across three stops + dusk band), `footer.closing` (close + links in one screen, navy).

## Layout rules (taste skill)
- Page shell: fixed `header.nav`, `main > section`, `footer.closing`. Every section is exactly one screen tall (`height: calc(var(--h) * 100svh)`); on phones sections are at least one screen (`--hm`), About is two there.
- `.wrap` is the content box itself (1200px, no padding); grids use a 24px gutter so text sits on the 12-column lines.
- Check with `node ~/.claude/skills/design-taste-frontend/assets/layout/check.mjs --url index.html --profile .taste-skill/chrome-check --sizes 1440x900,1024x768,820x1180,768x1024,390x844` (clean) and the gate (`GATE: OPEN 2` at last run: the hero canvas counts as an over-tall "strip", and the hero split's columns are not top-aligned).

## Content source
- Taken from Aufa's old site (http://me.aufa.eu.cc/). Project descriptions translated from Indonesian.
- About stats are counted from that content: 8 projects, 11 distinct teammates, 5 languages.
- Left out on purpose: age (out of date), the calendar embed, the mailto form, the email printed as text.

## Open TODOs (ask Aufa)
- University achievements (the old site only had placeholders). TODO comment in the education section.
- A real photo, if wanted; real screenshots to replace the painted covers.

## Local preview
macOS blocks `python3 -m http.server` from reading `~/Downloads`. Copy the folder somewhere temporary and serve it from there; the taste skill's scripts serve the page themselves.
