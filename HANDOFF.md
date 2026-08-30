# Aionik investor page — session handoff

Paste this whole file as your first message in a new Claude Code session on the other PC
(after cloning the repo), or save it as HANDOFF.md and say "read HANDOFF.md and continue."

_Last updated: 29 Aug 2026, current with the native inquiry form on `main`._

## What this is
A single investor landing page added to the existing Aionik marketing site. It argues from
insight, evidence, and team. It does NOT contain an ask, terms, a roadmap, or market strategy,
by Dane's decision on 29 Aug 2026 (see KEY DECISIONS). It is live already, unlinked from the
main nav, and shared by direct URL only. Two amber TODO chips remain and stay visible on
purpose until Dane fills them or says the page is ready.

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
                          PLUS the inquiry form: validation, honeypot, Google Forms POST
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
- Contact: a NATIVE styled form in the closing CTA band posts straight to the Google Form.
  Nav and hero "Book a call" now scroll to `#book` instead of opening a new tab. Responses
  still land in the same linked Google Sheet. Fields, validation, honeypot, and the success
  panel live in `js/investors.js` and the `.inv-form` block in `css/investors.css`.
  Tested end to end on 29 Aug 2026: validation, honeypot, and a real browser submit all pass.
  THREE labeled test rows are in the sheet now ("ZZ TEST DELETE ME ..."), one from the earlier
  hosted-form test and two from this build. Delete them when convenient.
  Firm-field label typo was fixed by Dane.

## KEY DECISIONS MADE
- Contact = Google Form as the BACKEND, NOT Calendly and NOT a form backend (Formspree/etc),
  but the page now presents its own native styled form rather than sending people to Google.
  Form is "Aionik - Investor Inquiry". Responses -> its linked Google Sheet (Dane owns it).
  Fields: Name*, Email*, Firm/organization*, "What would you like to discuss?", capital amount.
  Entry IDs, re-verified against the live form on 29 Aug 2026: Name entry.1305723353,
  Email entry.278522877, Firm entry.1516766862, Discuss entry.1270242905,
  Amount entry.423035212.
  POST endpoint (published alias, this is what the page uses):
  https://docs.google.com/forms/d/e/1FAIpQLSfZdrmqg4KDKS1ceFqaoDpt4alQLhv_4Y3kGxPw32bfBXSxwg/formResponse
  Editing URL: https://docs.google.com/forms/d/1-rKCsga_Png1Tm3dc06Siotlk73QByeuj05QLUqIR3o/viewform
  CAUTION: reordering questions keeps the IDs valid, but DELETING and recreating a question
  changes its ID and that field then stops recording silently. Re-read the IDs from the live
  form's FB_PUBLIC_LOAD_DATA_ after editing it.
  Google sends no CORS headers on formResponse, so the browser cannot read the reply. A
  resolved request means "delivered", not "accepted" — hence validation happens client side
  before sending, and a failed request falls back to a link to the hosted form.
- TRADEMARK (29 Aug 2026). Aionik is NOT registered, so the page uses TM, never R.
  Using R before registration would be a real problem; TM on an unregistered mark is fine.
  TM appears in exactly three places on investors.html, and this restraint is deliberate:
  the nav wordmark, the first body-text use (the Aionik row in the comparison table), and
  "Spinning Desicurer" in the proof-figure caption, which reads as branded usage ("Our
  Spinning Desicurer method"). Do NOT mark every instance; it reads as amateurish. Left
  unmarked on purpose: the copyright line, the license sentence, the form privacy note,
  page title/meta, image alt text, and the team prose.
  `.logo .tm` in investors.css zeroes the wordmark's 0.14em tracking so the symbol sits
  correctly. It is scoped to investors.css, so index.html is untouched.
  NOT YET DONE: index.html (the live main site) has 10 Aionik references and no TM at all.
  Dane has not approved touching the live homepage. If he does, mark the nav wordmark and
  the first body use ("Aionik's post-process replaces isopropyl alcohol washes...") and move
  the `.logo .tm` rule into styles.css so both pages share it.
- Confirm with Dane whether "Spinning Desicurer" is genuinely being used as a brand name or
  is descriptive patent terminology. The TM there is easy to remove if it is the latter.
- Team will NOT have LinkedIn links. The four dead placeholders were removed.
- NOT RAISING (Dane, 29 Aug 2026). Aionik is not running a round and is not necessarily
  seeking outside investment right now. Consequences already applied to the page:
  the ask section, the hero round-status line, and the deck note are all GONE. Do not
  reintroduce terms, a SAFE, valuation, use-of-funds buckets, or milestone dates without
  Dane saying the round is open. The page's job now is credibility and inbound leads.
  Cutting the ask also avoids anything that reads as publicly soliciting investment, which
  preserves options on how a future round is structured. (Not legal advice; worth a lawyer's
  read before the page goes fully public.)
- NO BUSINESS PLAN DETAIL (Dane, 29 Aug 2026). No beachhead, no adjacent-market mapping, no
  market sizing, no hiring plans, no roadmap. "Why now" stays because it argues from public
  regulatory and literature sources only and reveals nothing about strategy.
- The capital-amount field STAYS on the contact form and stays optional. Dane wants it as a
  lead-prioritization signal. Suggested but NOT applied: relabel it on the page from
  "Starting capital injection amount" to something like "Typical check size", which reads
  less transactional for a company that is not raising. Renaming the question inside Google
  Forms is safe (entry IDs survive a rename; only delete-and-recreate changes them).
- Pitch deck: not ready, and the "deck on the way" note was removed since there is no round.
  Revisit when both a deck and a round exist.
- Patent language: "patent pending" only, NEVER "patented"/"granted" (published application,
  A1 kind code). Exclusive license from UTSA, terms still finalizing.
- Page is `noindex`. Originally because the round was not public; now because Dane shares it
  by direct link only. Confirm before removing.
- Page is UNLINKED from the homepage. Not yet decided whether to add a footer link.
- Why-now block-order: table (Block 4) sits before Block 3 so Block 3 hands off to the insight
  section. The spec's "four blocks in this order" and "Block 3 above the solution" can't both
  hold literally — flagged in an HTML comment; Dane to confirm which wins.
- Amber TODO chips STAY visible until Dane says the site is ready; removing them is the final
  pre-launch step.

## OPEN TODOs (amber chips on the live page)
NONE. As of 29 Aug 2026 the page has zero TODO chips. Every remaining line is real.

The have/need section was renamed "What we have, and what we need" and filled from Dane:
- What we have: working post-process with the four results; biocompatible organoid housings
  in production (deliberately shows the process is not limited to chips); collaborators in
  several scientific fields running work on chips Aionik fabricated; 30 chips fabricated in
  4.5 hours by one operator on modest equipment. Those numbers are Dane's, do not alter.
- What we need: a final device design (R&D still needed on optimal structure); lab space and
  equipment; people to hire and pay. Written as requirements, NOT as a solicitation, to stay
  consistent with the not-raising decision. Dane approved that framing implicitly by asking
  for it; if it ever reads too forward, soften "need" to "next steps".

Cut earlier and still worth GETTING, though no longer marked on the page:
- Methodology for each of the four demonstrated results. Would belong in the insight section.
- Independent third-party test data with methodology. Single strongest possible addition.
- Grants, competitions, LOIs, design partners, publications, for an evidence "traction" row.

## NON-CONTENT TOUCH-UPS — status as of 29 Aug 2026
DONE:
- OG preview image: `assets/og-investors.png` generated at 1200x630 from the brand palette
  and hero-device.jpg. Was referenced but missing, so every forwarded link showed a blank
  card. Regenerate by rendering an HTML file in headless Chrome at 1200x630, scale factor 2.
- robots: now `index, follow`. Was noindex. Changed because this is the ONLY live Aionik page
  while the main site is rebuilt, so it has to be findable.
- Both links to index.html removed (nav "Main site" and the footer wordmark). The wordmark
  stays visible as non-clickable text. Dane chose full removal over a "coming soon" label,
  on the reasoning that advertising an unfinished site undercuts a credibility page.
- Footer date is self-updating: js/investors.js sets it from document.lastModified at load.
  Verified by setting a test file's mtime to 15 Jan 2026 and confirming it overrode the
  fallback text. Caveat: it reflects last DEPLOY, not last meaningful content edit.
- Analytics wired: Cloudflare Web Analytics + Microsoft Clarity, both driven by
  CF_BEACON_TOKEN and CLARITY_PROJECT_ID at the top of js/investors.js. Both stay dormant
  while those are empty strings. Dane still needs to paste the two IDs in.
  Clarity sets cookies, so a consent banner is likely needed if EU traffic matters.

STILL OPEN:
- Paste the two analytics IDs (see the comment block in js/investors.js for where to get them).
- Delete the three "ZZ TEST DELETE ME" rows from the responses sheet AND from the Form's own
  Responses tab; deleting in the Sheet alone does not remove the Form's copy.
- Consent banner decision, if Clarity stays on and EU visitors matter.
- Custom domain (optional).
- THE SWAP: the finished page still lives only at investors-preview.html. Copy it over
  investors.html, delete investors-preview.html, and push this HANDOFF. Not yet approved.

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
The page is close to launch-ready. In order:
1. Fill the two remaining amber chips (methodology per result, and what is not built yet).
   The "Not built yet" column renders visibly thin until it has content.
2. Generate `assets/og-investors.png` (1200x630, branded). It is referenced in the meta tags
   but 404s, so every forwarded link shows a blank preview card. Highest-leverage fix.
3. Delete the three "ZZ TEST DELETE ME" rows from the responses sheet.
4. Refresh the footer "Last updated" date, then strip the two amber chips as the final step.
