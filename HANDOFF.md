# Aionik site — session handoff

Paste this whole file as your first message in a new Claude Code session on another machine
(after cloning the repo), or save it as HANDOFF.md and say "read HANDOFF.md and continue."

_Last updated: 31 Aug 2026. The site is LIVE on its own domain, and analytics is on. The
structure described here is current; anything older is not._

---

## STATE OF PLAY

**Nothing is blocking.** The site is live, analytics is running behind a consent bar, and no
task is waiting on an input from Dane.

**Analytics is on** (switched on 30 Aug 2026). Both IDs sit at the top of `js/investors.js`:

```js
const CF_BEACON_TOKEN    = 'dc964eef76044a8b9c527ac23f86b6d6';  // Cloudflare Web Analytics
const CLARITY_PROJECT_ID = 'yaet5grufy';                        // Microsoft Clarity
```

- Cloudflare counts visits, sets no cookies, and needs no consent banner.
- Clarity gives heatmaps and session replay. It sets a cookie, so it loads only after the
  visitor accepts the consent bar. See "The consent bar" below.
- Either provider goes dormant again the moment its constant is set back to an empty string.
  Verified working in both states.
- CTA clicks and form submits fire as Clarity custom events, so the funnel shows up next to
  the replays.

**Working copy: `~/aionik-site`, and only that one.** From 28 to 31 Aug 2026 two clones
existed, the second at `~/Documents/aionik-site`, because sessions started in different
directories and cloned fresh instead of finding the existing copy. Both were genuinely used
and they forked on 30 Aug, which is what merge commit `31e1096` reconciles. The duplicate
was retired on 31 Aug 2026 after both trees were confirmed byte identical and fully pushed;
it sits in the Trash as `aionik-site-duplicate-clone-31aug2026` until emptied.
**Before starting work, `cd ~/aionik-site` and `git pull`. Do not clone a second copy.**

---

## What this site is

One public page plus one deep-dive page, on `aioniklabs.com`. The homepage is an investor
brief in substance, framed as a company page: it argues from insight, evidence, and team.

It deliberately contains **no ask, no terms, no roadmap, and no market strategy**. Aionik is
not raising (Dane, 29 Aug 2026) and does not want its business plan public. Market *sizing*
from published analyst reports is fine and is on the page; beachhead, adjacency, and go to
market are not.

## Repo, hosting, and how to publish

- GitHub: `danespencer01-png/aionik-site` (public), default branch `main`
- Clone: `git clone https://github.com/danespencer01-png/aionik-site.git`
- **Live: https://aioniklabs.com** (apex canonical; `www` redirects to it)
- Hosting: GitHub Pages serving `main` at repo root
- DNS: Cloudflare. Four A records on `@` to GitHub's Pages IPs (185.199.108–111.153) plus a
  `www` CNAME to `danespencer01-png.github.io`. **All records are DNS only, grey cloud.**
  If they are ever switched to proxied/orange, GitHub cannot renew the certificate.
- `CNAME` file at repo root contains `aioniklabs.com`. Deleting it un-sets the custom domain.
- Certificate: issued, covers `aioniklabs.com` and `www.aioniklabs.com`
- **Publish workflow: commit + `git push origin main`. Pages rebuilds in ~40s.**
- The old `danespencer01-png.github.io/aionik-site/` links redirect to the domain.

## Files

| File | What it is |
|---|---|
| `index.html` | The homepage. This is the investor page; it became the root on 30 Aug 2026. |
| `pdms.html` | Deep dive on how a PDMS chip is made, what it costs, how long it takes, how it fails. |
| `investors.html` | Redirect stub to `/`. Keeps links shared before the restructure working. **Do not delete.** |
| `main-site-draft.html` | The parked v1 marketing homepage. `noindex`, unlinked. Still has a placeholder contact address (`contact@aionik.example`). Kept for when the main site is resumed. |
| `css/styles.css` | Base design system. Shared. |
| `css/investors.css` | Homepage components. |
| `css/pdms.css` | Deep-dive page components. |
| `js/main.js` | Shared; canvas/network code self-guards and stays dormant on these pages. |
| `js/investors.js` | Analytics config, self-updating footer date, and the whole inquiry form. |
| `assets/aionik-mark.svg` | The AK monogram, vectorised. Traced from a PNG screenshot of the original logo (`~/Documents/Screenshots/Aionik Logo.png`) by boundary-walking the bitmap, since no vector source was available. 19-point outline plus the A's counter. Uses `currentColor` so it themes per placement. **If the designer's original vector ever turns up, prefer it over this trace.** |
| `assets/favicon.svg` | Same mark in the violet-to-cyan gradient, with padding. Browser tab icon. |
| `assets/` | hero-device.jpg, proof-droplets.jpg, og-investors.png, team-{dane,gongchen,henry,guillermo,gabriel}.jpg |

## Design system

Tokens in `css/styles.css`: `--bg #07070E`, `--surface #0E0E1A`, `--violet #8B5CF6`,
`--uv #A78BFA`, `--cyan #22D3EE`, `--text #E7E7F2`, `--muted #8A8AA3`,
`--line rgba(139,92,246,0.18)`.

`.grad` is the violet→cyan gradient used for **headings only**.

**Logo lockup:** the AK monogram carries the gradient and the AIONIK wordmark is plain white
(option B of four Dane reviewed on 30 Aug 2026). The `.logo .logo-word` rule in
`investors.css` deliberately overrides the `.logo span` gradient in `styles.css`, which would
otherwise make the whole wordmark transparent. Footer mark stays muted and solid. Money figures use solid
`#B99BFF` on purpose, so they read as figures rather than as a heading treatment. Kicker
labels, glass cards, `.sheen` hover, `.reveal` scroll-in. Sentence case, active voice.
No hero canvas, no ticker, no animated backgrounds on these pages.

**House style: no em dashes and no hyphens in prose.** Bullets over paragraphs.

## Page structure

**index.html** — hero (device photo on a built product stage; status strip of IP / License /
Origin) → mission band → why now (regulators, fabrication gap, wider demand, market sizing,
cost comparison table, printing caught up) → the insight + patent proof figure → what we have
and what we need → what making a chip actually takes (summary, links to pdms.html) → team →
evidence → contact form.

**pdms.html** — hero → eleven process steps in two phases, each with a failure note → bonding
window diagram → elapsed time timeline → the operator skill problem → six failure modes →
service life + seam cross-section diagram → cost (production, research bench, injection
molding, cleanroom) → video references → closing.

## HARD RULES — do not break these

- **"Patent pending" only. NEVER "patented" or "granted."** It is a published application,
  US 2026/0131529 A1, A1 kind code.
- **Exclusive license from UT System, stated plainly.** The "terms in final negotiation"
  qualifier was removed 30 Aug 2026 at Dane's instruction. Do not reinstate it.
- **Never invent numbers, dates, patent status, or test results.** Leave a visible TODO chip
  instead. Every number on the site is either sourced with a link or came from Dane.
- **TM, never R.** Aionik is unregistered. TM appears in exactly three places on the homepage
  by design: the nav wordmark, the first body use (the Aionik row in the comparison table),
  and "Aionik curing process" in the proof caption. Marking every instance reads as amateurish.
- **Confirm before pushing to main.** (Standing exception: Dane went autonomous on 30 Aug 2026
  for the analytics and handoff work.)
- **No business plan detail.** No beachhead, adjacency, market strategy, hiring plans, roadmap.
- **73 µm and 13.1 µm in the proof figure are printed in the source patent image. Do not alter.**
- **The figure image itself says "Spinning Desicurer Method."** The caption says "Aionik curing
  process" and names the figure's label, so a reader can reconcile them. Dane does not want the
  Spinning Desicurer name used as branding.

## Numbers on the site, and where they came from

| Claim | Source |
|---|---|
| Research bench $30k–$65k; aligner ~$50k, exposer ~$15k, plasma ~$7k, spin coater ~$7k | [Micromachines 2018 (PMC6187812)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6187812/), peer reviewed |
| Production aligners and bonders $150k–$500k+, quote only | Market ranges. [ClassOne SUSS+EVG catalogue](https://www.classoneequipment.com/suss-and-evg) cited as proof the class is quote only |
| PVA TePla 660 $35,000 / ION-100 $29,500, used | [BidService](https://bidservice.com/collections/pva-tepla) listings, independently verified |
| Cleanroom per sq ft by ISO class | [Labs USA](https://labs-usa.com/blog/prefabricated-cleanroom-cost/) |
| Injection tooling $15k–$100k+ | [Meridian Medical](https://www.meridian-medical.com/how-much-do-injection-moulding-tools-for-medical-devices-cost/), [Formlabs](https://formlabs.com/blog/injection-molding-cost/) |
| Lead times: 1–12 weeks outsourced, days in house | [uFluidix](https://www.ufluidix.com/microfluidics-technical-notes/purchase-pdms-chips-or-diy/) |
| Market: $27B median today, $67B median forecast, 8.3–24% CAGR | Dane's 8-firm analyst workbook, all eight linked on the page |
| Plasma bonding window ~15 min to 1 hr | [Harrick Plasma](https://harrickplasma.com/pdms-bonding/), [Langmuir 2024](https://pubs.acs.org/doi/10.1021/acs.langmuir.4c03086) |
| Bonding failure modes | [PMC11618810](https://pmc.ncbi.nlm.nih.gov/articles/PMC11618810/) |
| 30 usable chips in 4 hrs, one operator, two printers, two Aionik curing devices | **Dane's own figure.** Not externally verifiable. Was 4.5 hrs; Dane simplified it to 4 on 31 Aug 2026 and reframed the bullet around scalable capacity rather than a chip count. |
| "Lowest cost per chip" | **Dane's claim.** Unsourced superlative; the only one on the site. |

## The contact form

A native styled form in the closing CTA posts straight to a Google Form; responses land in its
linked Google Sheet (Dane owns it). People never leave the site.

- Form name: "Aionik - Investor Inquiry"
- POST endpoint (published alias, this is what the page uses):
  `https://docs.google.com/forms/d/e/1FAIpQLSfZdrmqg4KDKS1ceFqaoDpt4alQLhv_4Y3kGxPw32bfBXSxwg/formResponse`
- Editing URL: `https://docs.google.com/forms/d/1-rKCsga_Png1Tm3dc06Siotlk73QByeuj05QLUqIR3o/viewform`
- Entry IDs (verified 29 Aug 2026): Name `entry.1305723353`, Email `entry.278522877`,
  Firm `entry.1516766862`, Discuss `entry.1270242905`, Amount `entry.423035212`
- **CAUTION:** reordering questions keeps IDs valid. DELETING and recreating a question changes
  its ID and that field then stops recording **silently**. Re-read IDs from the live form's
  `FB_PUBLIC_LOAD_DATA_` after editing it.
- Google sends no CORS headers on `formResponse`, so the browser cannot read the reply. A
  resolved request means *delivered*, not *accepted*. Hence validation happens client side
  before sending, and a failed request falls back to a link to the hosted form.
- Honeypot field, no captcha. Right for a page shared by link; revisit if spam appears.
- Test rows were deleted by Dane on 30 Aug 2026. The sheet is clean.

## Other mechanics worth knowing

- **Footer date updates itself.** `js/investors.js` reads `document.lastModified` and rewrites
  the footer at load, so it tracks deploys. The hardcoded date is only a fallback. Caveat: it
  reflects last *deploy*, not last meaningful content edit.
- **The consent bar.** Built 31 Aug 2026 in `js/investors.js`, styled in `css/styles.css`
  under "Cookie consent bar". No markup in any page: the bar is created in JS, so both
  `index.html` and `pdms.html` get it for free. Cloudflare loads regardless. Clarity waits
  for Accept. The answer is stored in localStorage as `aionik-consent` (`yes` or `no`) and
  the bar is shown once per browser. Every localStorage access is guarded, so a browser that
  refuses to store simply asks again next visit. Verified in four states: no answer (bar
  shown, Clarity dormant), accepted (no bar, Clarity loads), declined (no bar, no Clarity),
  and blank `CLARITY_PROJECT_ID` (no bar at all). To see the bar again while testing, run
  `localStorage.removeItem('aionik-consent')` in the console.
  There is still no privacy page; the bar's own text is the whole disclosure.
- **OG image** is `assets/og-investors.png`, 1200x630, generated by rendering an HTML file in
  headless Chrome at device scale 2. Regenerate the same way if the brand changes.
- **Previewing renders:** `.reveal` starts at opacity 0, so inject
  `<style>.reveal{opacity:1!important;transform:none!important}</style>` into a temp copy
  before screenshotting, or everything below the fold renders blank. Chrome clamps minimum
  window width to ~500px, so verify mobile at 500px, not narrower.
- No build step. Static HTML, CSS, JS. Edit and push.

## OPEN ITEMS

1. **`main-site-draft.html`** still has the placeholder address `contact@aionik.example`
   (line 7 comment and the mailto on line 404). That page is parked and `noindex`, so this
   only matters before it is ever unparked.
2. **Optional:** carry TM onto the rebuilt main site when it exists.
3. **Would strengthen the site if obtained:** independent third party test data with
   methodology, and methodology for each of the four demonstrated results.

_Closed since the last rewrite: analytics IDs pasted and live, the consent bar built, real
PDMS video titles set, `.logo .tm` moved from `investors.css` into `styles.css`._

## HOW DANE WORKS

- No em dashes or hyphens in prose. Bullets over paragraphs. Sentence case, active voice.
- Confirm before pushing to main or anything outward facing.
- Never invent numbers, dates, patent status, or test results.
- He reviews visually and gives specific, batched feedback. Batching many items into one
  message is the efficient pattern; keep encouraging it.
- He will say when something reads as too crowded or too loud. Prefer restraint.
