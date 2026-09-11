# CLAUDE.md: Aionik site

## Read this first

`HANDOFF.md` at the repo root is the source of truth for this site and is kept current.
Read it before making any change. It covers the state of play, page structure, the design
system, the contact form, every number on the site and where it came from, and the open items.

## What this repo is

- The live Aionik company site at **aioniklabs.com**, GitHub Pages serving `main` at repo root
- One homepage plus five deep dive pages: pdms, cleanrooms, ecosystem, printing, printing-types
- **The homepage IS the investor page.** `investors.html` is a redirect stub, do not delete
- Static vanilla HTML, CSS and JS. No framework, no build step
- Publish is commit plus `git push origin main`. Pages rebuilds in about 40 seconds
- DNS is Cloudflare, all records DNS only and grey cloud. Proxying them breaks cert renewal

## Hard rules (full list and rationale in HANDOFF.md)

- **Patent pending only.** Never "patented" or "granted". It is published application US 2026/0131529 A1
- **The UT System license is NOT signed.** Always qualify it as under negotiation, in all three
  places on the homepage. Never state or imply it is held until Dane confirms signature
- **Never invent numbers, dates, patent status or test results.** Leave a visible TODO chip instead
- **TM, never R.** Aionik is unregistered, and TM appears in exactly three places by design
- Never reintroduce a colour literal outside `:root`
- **Confirm before pushing to main**

## This repo is PUBLIC

Never commit anything confidential. The Master Context Document, investor materials, equity,
BOM costs, market strategy and operational gaps belong in the private `aionik` repo, not here.
Aionik is not publicly raising; the site carries no ask, no terms, and no roadmap by design.

## Style

- No em dashes or hyphens in prose. Bullets over paragraphs. Sentence case, active voice
- Dane reviews visually and gives specific, batched feedback. Encourage batching
- Prefer restraint. He will say when something reads as too crowded or too loud
