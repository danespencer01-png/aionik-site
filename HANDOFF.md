# Aionik investor page — session handoff

Paste this whole file as your first message in a new Claude Code session on the other PC
(after cloning the repo), or save it as HANDOFF.md and say "read HANDOFF.md and continue."

## What this is
Adding a single investor landing page to the existing Aionik marketing site. The page argues
from insight, team, and scope, not from traction metrics. It is live already, with visible
amber TODO placeholders for fields not yet filled in.

## Repo + live URL
- GitHub: `danespencer01-png/aionik-site` (public), default branch `main`
- Clone: `git clone https://github.com/danespencer01-png/aionik-site.git`
- Live page: https://danespencer01-png.github.io/aionik-site/investors.html
- Hosting: GitHub Pages, serves `main` at repo root. No custom domain yet.
- Publish workflow: commit + `git push origin main`. Pages rebuilds in ~40s. Page is `noindex`.

## Files that make up the investor page
- `investors.html`      — the page (standalone, not linked from main nav; unlinked on purpose)
- `css/investors.css`   — new components only; reuses tokens from `css/styles.css`
- `js/investors.js`     — CTA click tracking stub
- Reuses existing `js/main.js` (its canvas/network code self-guards and stays dormant here)

## Design system (from css/styles.css — reuse, do not reinvent)
- Tokens: --bg #07070E, --surface #0E0E1A, --violet #8B5CF6, --uv #A78BFA, --cyan #22D3EE,
  --text #E7E7F2, --muted #8A8AA3, --line rgba(139,92,246,0.18)
- Gradient text: `.grad` (violet -> cyan). Kicker labels, glass cards, `.sheen` hover,
  `.reveal` scroll-in. Investor page is deliberately QUIETER: no hero canvas, no ticker,
  no animated backgrounds. Respect prefers-reduced-motion. Sentence case, active voice.

## DONE (content is real and final unless noted)
- Hero: headline "The bottleneck in research isn't ideas. It's how fast you can *hold one in
  your hands.*" + smaller resolution line "We're bridging that gap." + positioning line
  ("...replaces IPA chemical washing entirely, enabling rapid prototyping and manufacturing of
  high quality, biocompatible microfluidic chips.")
- Why now section: built exactly to the client's why-now-formatting spec. 4 blocks, all 6
  inline source links live (FDA, NIH, UK, EPA, Nature, PubMed), comparison table with Aionik
  row accented, mobile collapses table to stacked cards. Aionik "Per iteration" cell now reads
  "30 to 60 minute print, multiple chips per plate, then a 3 minute cure".
- The insight: "One process change, four results" — optical clarity, smooth surface,
  biocompatibility, 1 to 3 minute cures.
- Team: 5 members reused from index.html.
- Evidence IP row (REAL, worded carefully): "US 2026/0131529 A1 — patent pending", filed
  July 2025, published May 2026, assigned to University of Texas System, exclusive license to
  Aionik, terms in final negotiation. NEVER write "patented"/"granted" — it is a published
  application (A1 kind code = patent pending).

## KEY DECISIONS MADE
- Patent language: "patent pending" only. Exclusive license from UTSA, terms still finalizing.
- Page is `noindex` (round not public). Confirm before removing.
- Page is UNLINKED from the homepage (shared by direct URL only). Not yet decided whether to
  add a footer link.
- Two-spec conflict flagged in an HTML comment: the why-now spec says "four blocks in this
  order" AND "Block 3 immediately above the solution section." Both can't hold literally.
  Current build puts the table (Block 4) before Block 3 so Block 3 hands off to the insight
  section. Client to confirm which wins.

## OPEN TODOs (the amber chips on the live page), grouped by interview batch
- Batch 1 (hero): real hero visual (photo/test capture/demo video); round-status line
  (STAGE / RAISE_TARGET / INSTRUMENT).
- Batch 2 (what exists today): methodology per result; what is explicitly NOT built yet;
  NEXT_12_MONTHS; LONG_HORIZON.
- Batch 3 (scope): beachhead + why start there; 2-3 adjacent applications; long horizon as
  thesis; directional market framing (industries + rough scale + source, NO TAM/SAM/SOM).
- Team: LinkedIn URLs for Dane, Henry, Guillermo, Gabriel (only Sun Lab link exists for
  Gongchen); advisors/board; roles hiring for.
- Evidence: independent/university test data with methodology; grants/competitions/LOIs/
  publications (cut any row that stays empty rather than padding).
- Batch 5 (the ask): RAISE_TARGET, INSTRUMENT (SAFE/note/priced), VALUATION_OR_CAP,
  MIN_CHECK, COMMITTED_TO_DATE, USE_OF_FUNDS (3-4 buckets w/ %), MILESTONES (with dates),
  next round, existing investors.
- Conversion: real calendar booking link for all 3 "Book a call" CTAs; founder CONTACT_EMAIL;
  deck-request form endpoint (Formspree/Tally/Basin) — form is rendered DISABLED until then.
- Analytics: pick provider (Plausible/GA4/Fathom); wire into js/investors.js.
- OG/Twitter preview image: assets/og-investors.png (referenced, not created).
- Custom domain (optional).

## HOW WE WORK (client preferences)
- No em dashes or hyphens in prose. Bullets over paragraphs.
- Confirm before pushing to main / anything outward-facing. Work is pushed only when asked.
- Never invent numbers, dates, patent status, or test results — leave a visible TODO.
- To preview renders: clone repo, then headless Chrome screenshot. Because `.reveal` starts at
  opacity 0, inject `<style>.reveal{opacity:1!important;transform:none!important}</style>`
  into a temp copy before screenshotting, or elements below the fold render blank.

## SUGGESTED NEXT STEP
Resume the batch interview. Next unanswered items: hero visual, then Batch 5 (the ask numbers).
