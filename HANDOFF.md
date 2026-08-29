# Aionik investor page — session handoff

Paste this whole file as your first message in a new Claude Code session on the other PC
(after cloning the repo), or save it as HANDOFF.md and say "read HANDOFF.md and continue."

_Last updated: 29 Aug 2026, current with commit `0b829f2` on `main`._

## What this is
A single investor landing page added to the existing Aionik marketing site. It argues from
insight, team, and scope, not from traction metrics. It is live already, unlinked from the
main nav, and shared by direct URL only. Visible amber TODO placeholders mark fields not yet
filled in; these stay on the page on purpose until Dane says it is ready to go public.

## Repo + live URL
- GitHub: `danespencer01-png/aionik-site` (public), default branch `main`
- Clone: `git clone https://github.com/danespencer01-png/aionik-site.git`
- Live page: https://danespencer01-png.github.io/aionik-site/investors.html
- Hosting: GitHub Pages, serves `main` at repo root. No custom domain yet.
- Publish workflow: commit + `git push origin main`. Pages rebuilds in ~40s. Page is `noindex`.

## Files that make up the investor page
- `investors.html`      — the page (standalone, not linked from main nav; unlinked on purpose)
- `css/investors.css`   — new components only; reuses tokens from `css/styles.css`
- `js/investors.js`     — CTA click tracking stub (no analytics provider wired yet)
- Reuses existing `js/main.js` (its canvas/network code self-guards and stays dormant here)
- `assets/` — hero-device.jpg, proof-droplets.jpg, team-{dane,gongchen,henry,guillermo,gabriel}.jpg

## Design system (from css/styles.css — reuse, do not reinvent)
- Tokens: --bg #07070E, --surface #0E0E1A, --violet #8B5CF6, --uv #A78BFA, --cyan #22D3EE,
  --text #E7E7F2, --muted #8A8AA3, --line rgba(139,92,246,0.18)
- Gradient text: `.grad` (violet -> cyan). Kicker labels, glass cards, `.sheen` hover,
  `.reveal` scroll-in. Investor page is deliberately QUIETER: no hero canvas, no ticker,
  no animated backgrounds. Respect prefers-reduced-motion. Sentence case, active voice.

## DONE (content is real and final unless noted)
- Hero headline + resolution line + positioning line (all real).
- Hero visual: real device photo on a built "product stage" — the photo's near-black backdrop
  lighten-blends into --bg, a mirrored floor reflection fades out below, a violet->cyan light
  seam marks the contact point, and a soft backlight sits behind it. (`.hero-photo`,
  `.stage-*` in investors.css; `assets/hero-device.jpg`.)
- Mission band ("Why it matters") directly below the hero: purpose statement + the
  "patent pending curing process strips away the chemicals, the solvents, and the delays" line.
  (Note: Dane's source copy said "patented" — changed to "patent pending" per the rule below.)
- Why now: original 4 blocks (FDA/NIH/UK/EPA + Nature + PubMed source links, cost-comparison
  table) PLUS a new block "The demand runs wider than biology" citing the Microsystems &
  Nanoengineering "Top 10 ground challenges" editorial (Microsyst Nanoeng 12, 34 (2026),
  doi 10.1038/s41378-025-01153-5). It maps the product to four of the ten: organ on chip
  reconstruction, affordable point of care diagnostics, precision that survives the print,
  and the AI-augmented design-to-fabrication loop. Positioning only, no invented performance.
- The insight: "One process change, four results" (optical clarity, smooth surface,
  biocompatibility, 1 to 3 minute cures), FOLLOWED BY a comparative proof figure from the
  patent — droplet generation, traditional 73 um vs Spinning Desicurer 13.1 um. Those two
  values are printed in the source figure; do not alter. (`assets/proof-droplets.jpg`.)
- Team: 5 real headshots in circular gradient-ring avatars. Guillermo and Gabriel are PhD
  HOLDERS (not "pursuing"). Gongchen keeps his Sun Lab link. NO LinkedIn links (see decision).
- Evidence IP row (REAL): "US 2026/0131529 A1 — patent pending", filed July 2025, published
  May 2026, assigned to University of Texas System, exclusive license to Aionik, terms in final
  negotiation. Origin row now points to the droplet figure above.
- Contact: all three "Book a call" CTAs (nav, hero, closing) open the Google Form in a new tab;
  responses land in the form's linked Google Sheet. Tested end to end — a labeled test row was
  submitted successfully (delete it when convenient). Firm-field label typo was fixed by Dane.

## KEY DECISIONS MADE
- Contact = Google Form, NOT Calendly and NOT a form backend (Formspree/etc). Form is
  "Aionik - Investor Inquiry":
  https://docs.google.com/forms/d/1-rKCsga_Png1Tm3dc06Siotlk73QByeuj05QLUqIR3o/viewform
  Fields: Name*, Email*, Firm/organization*, "What would you like to discuss?", capital amount.
  Responses -> the form's linked Google Sheet (Dane owns it). If ever rebuilding a native
  styled form, the entry IDs are: Name entry.1305723353, Email entry.278522877,
  Firm entry.1516766862, Discuss entry.1270242905, Amount entry.423035212;
  POST to .../formResponse.
- Team will NOT have LinkedIn links. The four dead placeholders were removed.
- Pitch deck is coming, not ready. The deck-request form was removed and replaced with a
  "deck on the way" note. Revisit (second Google Form, or just link the file) when it exists.
- Patent language: "patent pending" only, NEVER "patented"/"granted" (published application,
  A1 kind code). Exclusive license from UTSA, terms still finalizing.
- Page is `noindex` (round not public). Confirm before removing.
- Page is UNLINKED from the homepage. Not yet decided whether to add a footer link.
- Why-now block-order: table (Block 4) sits before Block 3 so Block 3 hands off to the insight
  section. The spec's "four blocks in this order" and "Block 3 above the solution" can't both
  hold literally — flagged in an HTML comment; Dane to confirm which wins.
- Amber TODO chips STAY visible until Dane says the site is ready; removing them is the final
  pre-launch step.

## OPEN TODOs (amber chips on the live page) — these are content Dane is still deciding
- Round-status line in hero: STAGE / RAISE_TARGET / INSTRUMENT (ties to the ask below).
- Batch 2 (what exists today): methodology per result; what is explicitly NOT built yet;
  NEXT_12_MONTHS; LONG_HORIZON.
- Batch 3 (scope): beachhead + why start there; 2-3 adjacent applications; long horizon as
  thesis; directional market framing (industries + rough scale + source, NO TAM/SAM/SOM).
- Batch 5 (the ask): RAISE_TARGET, INSTRUMENT (SAFE/note/priced), VALUATION_OR_CAP, MIN_CHECK,
  COMMITTED_TO_DATE, USE_OF_FUNDS (3-4 buckets w/ %), MILESTONES (with dates), next round,
  existing investors.
- Team: "how the team came together / why not easily assembled" line; advisors/board; roles
  hiring for.
- Evidence: independent third-party test data with methodology; grants/competitions/LOIs/
  design partners/publications (cut any row that stays empty rather than padding).
- Optional "What we're still figuring out" section — keep with 2-3 real open questions, or cut.

## NON-CONTENT TOUCH-UPS before going public (not amber chips)
- Analytics: pick provider (Plausible/GA4/Fathom); wire into js/investors.js (hooks are ready).
- OG/Twitter preview image: assets/og-investors.png is referenced but does NOT exist —
  forwarded links show a blank preview card. Generate a branded 1200x630.
- Footer "Last updated ..." date is stale — refresh at launch.
- Confirm the `noindex` decision when the round goes public.
- Final step: strip all amber TODO chips and cut/soften any sections still empty.
- Custom domain (optional).

## HOW WE WORK (client preferences — persist across sessions)
- No em dashes or hyphens in prose. Bullets over paragraphs. Sentence case, active voice.
- Confirm before pushing to main / anything outward-facing. Work is pushed only when asked.
- Never invent numbers, dates, patent status, or test results — leave a visible TODO.
- To preview renders: clone repo, then headless Chrome screenshot. Because `.reveal` starts at
  opacity 0, inject `<style>.reveal{opacity:1!important;transform:none!important}</style>`
  into a temp copy before screenshotting, or elements below the fold render blank. Chrome
  clamps min window width to ~500px, so a 390px screenshot just crops a 500px layout — verify
  mobile at 500px, not narrower.

## SUGGESTED NEXT STEP
Content gaps are all that's left. Highest-leverage is Batch 5 (the ask numbers) plus the
hero round-status line. Everything else (functional links, contact form, photos, proof
figures, mission + why-now copy) is done and live.
