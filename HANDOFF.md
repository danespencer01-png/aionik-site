# Aionik site — session handoff

Paste this whole file as your first message in a new Claude Code session on another machine
(after cloning the repo), or save it as HANDOFF.md and say "read HANDOFF.md and continue."

_Last updated: 1 Sep 2026, after a full restructure and restyle. The site is LIVE on its own
domain. Everything below is current; anything describing a dark violet site, a single scroll
homepage, or two deep dive pages is out of date._

---

## STATE OF PLAY

**Nothing is blocking.** The site is live, analytics is running behind a consent bar, and no
task is waiting on an input from Dane.

**The 31 Aug to 1 Sep session did three large things, all shipped:**

1. **Restructured the homepage** into nine sections in a deliberate order, with **Brief and
   Full reading modes** and a contents block. Brief is the whole argument in about five
   minutes; Full adds the sources, tables and figures. See "Reading layers" below.
2. **Added three deep dive pages**: `ecosystem.html` (five fabrication routes compared),
   `printing.html` (where we sit in SLA printing), `printing-types.html` (the families of 3D
   printing). Total is now five deep dives.
3. **Restyled the whole site** from violet on near-black to a **deep navy hero over white,
   IBM Plex Sans, oxblood cost figures, Carbon grid discipline, square corners, no gradients**.
   Done as a two phase migration, described under "Design system".

**How the restyle was done, because it is repeatable.** Phase 1 moved every colour, alpha
overlay and typeface into tokens and was verified as a **provable no-op**: all seven pages
screenshotted at two widths before and after, pixel diffed, zero differing pixels across
fourteen images. Phase 2 then changed token values in one file. **The next restyle is a token
block, not a project.** If you change the palette, re-run that same before/after pixel diff on
the tokenization step only; the value swap is meant to change pixels.

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
| `cleanrooms.html` | Deep dive on cleanrooms: what one is, the ISO classes, which industries need one, what it costs to build and to keep open, and why microfluidics needs it only for the mold. Added 31 Aug 2026. Linked from `index.html` and `pdms.html`, not in either nav, same as `pdms.html`. |
| `ecosystem.html` | Five fabrication routes compared on one matrix, tinted by what each route is good at, plus the scope section. Added 31 Aug 2026. |
| `printing.html` | Where we sit in the SLA 3D printing process. Six steps, two of them ours outright and a third partly ours. Added 31 Aug 2026. |
| `printing-types.html` | The families of 3D printing and which reach microfluidics, with an equipment cost sheet. Added 31 Aug 2026. |
| `css/theme.css` | **The whole restyle.** Loaded last on every page. Token values plus the three things tokens cannot express: flattened gradients, removed glows, the dark hero band. Remove its link from the seven pages to revert the look entirely. |
| `css/layers.css` | Brief and Full reading modes, the contents block, the section claim line. |
| `assets/brand/` | Logo and wordmark as **separate** files, never combined, plus LinkedIn ready sizes. See the README in that folder. |
| `investors.html` | Redirect stub to `/`. Keeps links shared before the restructure working. **Do not delete.** |
| `main-site-draft.html` | The parked v1 marketing homepage. `noindex`, unlinked. Still has a placeholder contact address (`contact@aionik.example`). Kept for when the main site is resumed. |
| `css/styles.css` | Base design system. Shared. |
| `css/investors.css` | Homepage components. |
| `css/pdms.css` | Deep-dive page components. |
| `js/main.js` | Shared; canvas/network code self-guards and stays dormant on these pages. |
| `js/investors.js` | Analytics config, self-updating footer date, and the whole inquiry form. |
| `assets/aionik-mark.svg` | The AK monogram, vectorised. Traced from a PNG screenshot of the original logo (`~/Documents/Screenshots/Aionik Logo.png`) by boundary-walking the bitmap, since no vector source was available. 19-point outline plus the A's counter. Uses `currentColor` so it themes per placement. **If the designer's original vector ever turns up, prefer it over this trace.** |
| `assets/favicon.svg` | Same mark in navy, with padding. Browser tab icon. |
| `assets/brand/` | Logo and wordmark as **separate** files, never combined. Monogram 1000x1000 at 60% canvas width, matching the previous version so a LinkedIn circular crop lands identically. See the README in that folder. |
| `assets/` | hero-device.jpg, proof-droplets.jpg, og-investors.png, team-{dane,gongchen,henry,guillermo,gabriel}.jpg |

## Design system

**The palette lives in `css/theme.css`, not in the component stylesheets.** Phase 1 of the
restyle moved every colour, alpha overlay and typeface into tokens; `theme.css` loads last on
every page and holds the values. A restyle is an edit to that one block. To revert the whole
look, remove the `theme.css` link from the seven pages.

Current values: `--bg #FFFFFF`, `--surface #F4F4F4`, `--hero #051C2C` (the dark hero band),
`--text #161616`, `--muted #525252`, `--line #E0E0E0`, `--accent #051C2C` (headings, buttons),
`--cyan #2D6CA8` (small labels and marks on light), `--hero-mark #6EA8D8` (the same role on the
dark band), `--good #0F7B5F`, `--cost #7E2B33`. Type is IBM Plex Sans throughout, via
`--font-body` and `--font-head`.

The `*-rgb` triplet tokens exist so translucent variants follow the palette. A literal
`rgba(139, 92, 246, 0.18)` would not survive a palette change; `rgba(var(--violet-rgb), 0.18)`
does. Never reintroduce a colour literal outside `:root`.

**Cost figures are oxblood (`--cost: #7E2B33`), and that is an argument, not a decoration.**
Dane's rule: any key point that is negative about the incumbent takes the cost colour so it
reads as a burden and pulls the eye. It applies to `.cost-table .price`, `.cost-brief b`, and
`.pdms-wait b` (lead time is an incumbent cost in every sense except currency).
- **Never use it for an Aionik figure.** If we publish our own cost, it is not oxblood.
- **Never use it for a neutral quantity.** Non-cost numbers inside a `.cost-table` use `.count`.
  The ISO particle counts on `cleanrooms.html` are the standing example.
- Used sparingly, "within reason, not overused, to maintain exclusivity." Roughly five points
  on the site. Adding one means removing one.
- The matrix legends on `ecosystem.html` and `printing-types.html` name the colours in prose.
  **If the palette changes, those sentences change too** — they said "amber" until 1 Sep 2026.

**No gradients.** The violet to cyan gradient was the site's strongest generic signal and it is
gone. `.grad` now resolves to a solid accent. On the dark hero it takes `--hero-mark`, or it
would render navy on navy and vanish.

**Contrast is measured, not eyeballed.** All fourteen text pairs pass WCAG AA. `--cyan` was
`#6EA8D8` at first and failed at 2.54:1 on white across 41 rules; it is now `#2D6CA8` at 5.49:1.

**House style: no em dashes and no hyphens in prose.** Bullets over paragraphs.

## Reading layers, Brief and Full

The homepage carries the same content at two depths. `css/layers.css` holds the mechanism and
`js` at the foot of `index.html` holds the toggle. The choice persists per browser in
`localStorage` under `aionik-readmode`; Brief is the default.

- `.l-brief` shows in **both** modes. Most content lives here.
- `.l-full` shows in Full only. Sources, tables, the analyst spread, the proof figure.
- `.l-briefonly` shows in Brief only. Use sparingly; it exists for a line that carries a
  section in Brief but would duplicate fuller copy in Full.

**Brief is not a truncation of Full.** Every paragraph has to work standalone in Brief and in
sequence in Full, so a `.l-full` block must ADD detail and must never restate a point a
`.l-brief` block already made. Adding copy means choosing a layer. There is an end-of-brief
handoff block near the contact section, brief only, that tells a reader the sourced version
exists and offers a button to switch.

**Watch for layer orphans.** A deep link or a lead line placed inside `.l-full` disappears
entirely in Brief. This has bitten twice: the ecosystem link in the cost section vanished from
Brief until a `.l-briefonly` twin was added, and a section lead was left without its paragraph.
When you add anything, check it in both modes.

## Page structure

**index.html** — eight sections in this order, chosen so the problem is stated once and in full
before the fix appears:

1. **The bottleneck** — what we do, in one screen. Dark hero band with the device photo.
2. **Why now** — seven regulator rows, the demand argument, the analyst market spread.
3. **Current microfluidic process** — eleven steps, hand work, the cleanroom, the wait.
4. **Cost of fabrication** — the comparison table and the bill. All the oxblood is here.
5. **The Aionik process** — what changed and the four results, with the patent figure.
6. **The team**  7. **Evidence**  8. **Contact**, the inquiry form.

The order matters and was set deliberately: "why now" was split from "what that costs" so the
problem is not told twice, and the incumbent process moved up so it is stated once before the
solution. Do not reorder without a reason.

**Development status was section 06 and was REMOVED on 2 Sep 2026.** It carried a "what we have
/ what we need" split that published the company's gap list, its unknown process envelope, and
its production capacity (30 chips in 4 hours, one operator, two printers, two curing devices).
Under a per-chip business model the site's primary audience is customers and collaborators, and
that section answered an investor question while handing competitors a map. On removal:
`#today` was dropped from the nav and the contents, contents renumbered 01 to 08, and **`team`
was flipped to `team-section` and `evidence` to plain to restore the background alternation the
removed section was carrying.** Four scope cards in `ecosystem.html` linked into the dead anchor
and were rewritten to keep the scientific limits and drop the operational deficit framing.

That material now lives in `~/Downloads/desi aionik/Investor docs/` and in a private artifact.
**Do not put it back on the public site.** If a section is wanted in that slot later, it should
be "what we can make" for customers, not "what we need" for investors.

**pdms.html** — eleven process steps in two phases, bonding window diagram, elapsed time
timeline, the operator skill problem, six failure modes plus the small molecule absorption
block, the seam diagram, cost tables, the room the mold is made in, video references, closing.

**cleanrooms.html** — how a cleanroom works, the ISO class table, industries that require one,
where a cleanroom is required in PDMS fabrication, what it costs.

**ecosystem.html** — the five route matrix, per route detail blocks, the iterate versus produce
split, the outsourcing paragraph, and the scope section.

**printing.html** — SLA and FDM, the six step workflow with ours marked, why the wash is the
problem, why our step composes with the printer's, the CADworks positioning.

**printing-types.html** — six printing families, which reach microfluidics, an equipment cost
sheet.

Section backgrounds alternate plain and `team-section` down each page. Moving a section means
moving that class too, or the alternation breaks.

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
- **Never reintroduce a colour literal outside `:root`.** Phase 1 removed 145 of them. A literal
  does not follow a palette change; a token does. This includes **inline SVG attributes**, which
  Phase 1 missed on `pdms.html` and which survived the restyle in the old palette until caught.
- **Check both reading modes after any change to the homepage.** See "Reading layers".
- **The matrix legends name colours in prose.** If the palette changes, those sentences change
  too. They said "amber" until 1 Sep 2026.
- **Word choice matters to this audience.** A *theory* is a substantiated explanation; an
  untested prediction is a *hypothesis*; an expectation from material class is *reasoning*.
  Using "theory" loosely was caught and corrected. Same care with "hard ceiling" for something
  that is a working range, and with calling a known fact "unproven".
- **No business plan detail.** No beachhead, adjacency, market strategy, hiring plans, roadmap.
- **The three question test before any technical limit goes public.** Added 2 Sep 2026 after
  the Aionik row on `ecosystem.html` was found publishing failure boundaries.
  1. *Is it a property of the material or of physics?* Publish it. Solvent swelling, gas
     permeability, printer bound resolution. These cost nothing, they are already published
     elsewhere, and a limits list with no real limits reads worse than one with them.
  2. *Is it a boundary of our process that we found by hitting it?* Do not publish. That is
     the expensive knowledge and it is a research plan for a competitor. What was removed:
     "a few of those have printed poorly for us", the 15 minute cure ceiling, and the
     autofluorescence deficit against PDMS.
  3. *Does it say we do not know?* Never. Scope the list to the reader's use case instead of
     confessing the gap. "These are the limits that matter most for microfluidic and organoid
     work" replaced "the full limits are not mapped".
  Deflect to the material where that is true and useful: the solvent line already says
  "follows the resin, not the process", and autofluorescence now says "varies with the resin".
- **No development status, gap list, process envelope, or production capacity.** Removed
  2 Sep 2026 and it stays removed. Scientific scope limits are fine and belong on
  `ecosystem.html`; operational deficits are investor material and are not public.
- **Small molecule absorption: the site may state the material class argument, never a measured
  result.** `pdms.html` documents absorption as a PDMS limitation, sourced, then notes that
  uptake is characteristic of elastomers while glassy materials (thermoplastics and cured
  printed resins) show mainly surface adsorption, so lower uptake is an **expected** benefit of
  a resin chip. That sentence ends with "one we have not yet measured against a PDMS control"
  and **that qualifier stays until the test exists.** Never upgrade this to a demonstrated
  result, and never put a number on it. See RESEARCH NOTES for the mechanism and the test.
- **The cleanroom belongs to the master mold, not to chip casting.** Dane flagged 31 Aug 2026
  that an informed scientist or investor would catch an overbroad claim here. Photolithography
  on the silicon wafer is the step that needs the room. Casting, curing, and bonding do not.
  Never widen this back out.
- **Never cite a single ISO class for master fabrication.** There is no mandated class, and
  saying "ISO 7" flatly is the kind of claim a scientist would challenge. The site states the
  requirement as scaling with the finest feature: ISO 5 to ISO 6 for fine geometry, ISO 7 for
  channels in the tens of microns, and a standard lab with a laminar flow hood over the
  exposure steps for less demanding work. Corresponding build cost is $250 to $1,000 per sq ft.
  This wording appears in three places and must stay consistent: `index.html` cost brief,
  `pdms.html` "The room the mold is made in", and the "How clean it has to be" subsection of
  `cleanrooms.html`.
- **73 µm and 13.1 µm in the proof figure are printed in the source patent image. Do not alter.**
- **Rhetoric audit, 31 Aug 2026.** Dane reviewed every heading and bold lead-in for tone.
  Changed: "A chip is two pieces pretending to be one" became "A chip is two pieces bonded at
  an interface"; "The comparison above is easy to read past" became "The comparison is worth
  unpacking". Deliberately KEPT, so do not "fix" them: the hero ("The bottleneck in research
  isn't ideas"), "Soft lithography iterates but cannot produce. Molding produces but cannot
  iterate. We hold both", "Regulators set a clock", "And then you wait", "Printing finally
  caught up", "The wait is the real constraint", "The seam carries the load". A homepage is
  allowed voice; the deep dives are where neutral register matters most.
- **`pdms.html` closing headline.** It read "None of this is anyone's fault" until 31 Aug 2026,
  when Dane pointed out that absolution is not the page's point. It is now "The constraint is
  built into the process," which matches the body copy underneath it: the mold, the room, and
  the trained hands are each a structural limit, and we removed the step that forces them.
- **The figure image itself says "Spinning Desicurer Method."** The caption says "Aionik curing
  process" and names the figure's label, so a reader can reconcile them. Dane does not want the
  Spinning Desicurer name used as branding.

## Numbers on the site, and where they came from

| Claim | Source |
|---|---|
| Research bench $30k–$65k; aligner ~$50k, exposer ~$15k, plasma ~$7k, spin coater ~$7k | [Micromachines 2018 (PMC6187812)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6187812/), peer reviewed |
| Production aligners and bonders $150k–$500k+, quote only | Market ranges. [ClassOne SUSS+EVG catalogue](https://www.classoneequipment.com/suss-and-evg) cited as proof the class is quote only |
| PVA TePla 660 $35,000 / ION-100 $29,500, used | [BidService](https://bidservice.com/collections/pva-tepla) listings, independently verified |
| Cleanroom per sq ft by ISO class, prefabricated | [Labs USA](https://labs-usa.com/blog/prefabricated-cleanroom-cost/) |
| Cleanroom per sq ft by ISO class, constructed; ISO 7 at 60 to 90 ACH; HVAC and filtration 35 to 55% of build budget; validation adds 8 to 18% | [Terrapin Consulting Group, 2026](https://terrapincg.com/news/cleanroom-construction-cost-per-square-foot-2026) |
| ISO 14644-1 particle limits (3,520 / 35,200 / 352,000 / 3,520,000 at 0.5 µm for ISO 5/6/7/8) | [ISO 14644-1:2015](https://www.iso.org/standard/53394.html), tabulated by [GMP Insiders](https://gmpinsiders.com/iso-cleanroom-classification/) |
| Masters have been fabricated outside a cleanroom with dry film photoresist, and features to 5 µm replicated without one | [PMC6471384](https://pmc.ncbi.nlm.nih.gov/articles/PMC6471384/), [PMC8622653](https://pmc.ncbi.nlm.nih.gov/articles/PMC8622653/) |
| ISO 5 to ISO 6 for fine master geometry, ISO 7 for tens of microns, laminar flow hood for less demanding work | **Dane's figure**, supplied 31 Aug 2026. No single published standard mandates a class for this, which is exactly why the site states it as a range tied to feature size rather than one number. Searched for a citable source and none exists in those terms. |
| Injection tooling $15k–$100k+ | [Meridian Medical](https://www.meridian-medical.com/how-much-do-injection-moulding-tools-for-medical-devices-cost/), [Formlabs](https://formlabs.com/blog/injection-molding-cost/) |
| Lead times: 1–12 weeks outsourced, days in house | [uFluidix](https://www.ufluidix.com/microfluidics-technical-notes/purchase-pdms-chips-or-diy/) |
| Market: $27B median today, $67B median forecast, 8.3–24% CAGR | Dane's 8-firm analyst workbook, all eight linked on the page |
| Plasma bonding window ~15 min to 1 hr | [Harrick Plasma](https://harrickplasma.com/pdms-bonding/), [Langmuir 2024](https://pubs.acs.org/doi/10.1021/acs.langmuir.4c03086) |
| Bonding failure modes | [PMC11618810](https://pmc.ncbi.nlm.nih.gov/articles/PMC11618810/) |
| PDMS absorbs small hydrophobic molecules; over 90% of a dye into the walls in 24 hrs | [Toepke and Beebe, Lab Chip 2006, 6(12):1484](https://doi.org/10.1039/b612140c), review in [Micromachines 2022](https://doi.org/10.3390/mi13050713). **Caveat:** both the paper and PubMed were captcha or paywall blocked, so the 90% figure is corroborated from two independent search summaries rather than read in the primary source. Verify before leaning on the number harder than the page currently does. |
| 30 usable chips in 4 hrs, one operator, two printers, two Aionik curing devices | **Dane's own figure.** Not externally verifiable. Was 4.5 hrs; Dane simplified it to 4 on 31 Aug 2026 and reframed the bullet around scalable capacity rather than a chip count. |
| "Lowest cost per chip" | **Dane's claim.** Unsourced superlative; the only one on the site. |

**Revised 31 Aug 2026:** the cleanroom build range went from "$250 to $650 per sq ft" to
"$250 to $1,000" after Dane supplied the ISO 5 to ISO 6 detail, since the tighter classes cost
more. The earlier draft of these pages cited ISO 7 alone; that was too narrow and is corrected.

**Removed 31 Aug 2026:** the homepage cost brief claimed the cleanroom "bills up to $390,000 a
year." No source for it existed on either page and none could be found, and the sourced tables
are build cost per square foot, not annual operating cost. It was replaced with the sourced
ISO 7 build range plus a qualitative statement about the recurring bill. If that figure came
from Dane, it can go back with a note saying so.

## RESEARCH NOTES, not on the site

Gathered 31 Aug 2026 at Dane's request. **None of this is published on any page.** It is here
so the next session does not re-derive it.

### Thermoplastic hot embossing

The press based route to a chip, and the missing third option next to soft lithography and
injection molding.

- **Process:** a thermoplastic sheet is heated just above its glass transition, pressed against
  a mold insert under high force, held while the polymer flows into the features, cooled under
  pressure, and demolded. Ports are drilled and a lid is bonded on afterwards.
- **Reported parameters:** PMMA around 180°C at 240 bar for 6 minutes, roughly 11 minutes total
  cycle per chip. Another study reports 115°C and 10 kN for 8 minutes on features 56 µm wide and
  120 µm deep. Inserts are nickel shims, brass, or micromilled aluminum.
- **Materials:** PMMA, COC, COP, polycarbonate, polystyrene. COC matters most: low
  autofluorescence, good chemical resistance, and far lower small molecule absorption than PDMS.
- **Economics:** tooling roughly $5,000 to $50,000 per mold, an order of magnitude under
  injection molding. Viable above about a thousand units, uneconomic for one offs. Cycle is
  minutes per part, against seconds for injection molding.
- **Used for:** diagnostic cartridges, capillary electrophoresis devices, point of care
  consumables, and pilot runs before committing to injection molding tooling.
- **Geometric limit, and it is decisive for us.** Embossing is surface replication demolded
  along a single axis, so it cannot produce undercuts, internal voids, or enclosed volumes. It
  makes open relief in a flat sheet, which is why every embossed chip needs a separate bonding
  step. **Dane confirmed 31 Aug 2026 that the organoid housings are not shallow and cannot be
  made shallow, so hot embossing cannot produce them at all.** A printed part is built in
  layers and has no demolding constraint. This is a real and defensible differentiator.

### Small molecule absorption, and Dane's hypothesis

The mechanism, which is the part worth understanding before making any claim:

- PDMS is a rubbery elastomer far above its glass transition, with loosely crosslinked chains
  and high free volume. Small hydrophobic molecules diffuse into the bulk. This is **absorption**
  and it is why PDMS is unusually bad here.
- In glassy thermosets and thermoplastics the dominant mechanism is instead **adsorption**, at
  the surface, with much less bulk uptake. A cured SLA resin is a glassy thermoset.

**Dane's hypothesis (31 Aug 2026), explicitly a hypothesis and not for the site:** the Aionik
surface is smoother, so uptake should be lower; and he believes SLA resins absorb less than PDMS
regardless. The literature supports the mechanism behind both halves:

1. Moving from elastomer to glassy thermoset removes most of the bulk absorption term. This
   follows from material class, not from anything Aionik does.
2. The residual term in a glassy thermoset is surface adsorption, which scales with surface
   area, so a smoother surface plausibly reduces it. This is the part that would be Aionik's
   own contribution.

**Caveats before this ever becomes a claim:**
- Not all SLA resins behave alike. Researchers specifically developed PEGDA-co-PEGMEMA for low
  drug absorptivity, which implies baseline methacrylates have enough of a problem to be worth
  solving.
- The opposite direction is the known weakness of printed resins: uncured monomer and
  photoinitiator leaching out, which is cytotoxic. Aionik's existing biocompatibility claim
  speaks to that, and it is the better supported story today.
- **The test is cheap and would settle it:** a hydrophobic dye at fixed concentration, time
  course, measure depletion in an Aionik chip against a PDMS control. That is essentially the
  Toepke and Beebe protocol. Good candidate for the outstanding third party test data item.

Sources: [Micromachines 2022 on partitioning](https://doi.org/10.3390/mi13050713),
[Toepke and Beebe 2006](https://doi.org/10.1039/b612140c),
[Scientific Reports 2025, sorption in PDMS vs COC](https://www.nature.com/articles/s41598-025-97111-2).

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

1. **`main-site-draft.html`** still has the placeholder address `contact@aionik.example`. Parked
   and `noindex`, so it only matters before that page is ever unparked. It has NOT been restyled
   or checked in the new theme.
2. **Hot embossing equipment cost sourcing is weaker than the rest of the site.** The lab press
   versus six figure split came from a ResearchGate discussion. A vendor quote would firm it up.
3. **The absorption comparison and the finer printer test** are both underway per Dane and both
   are listed under "what we need". When results exist, the scope section on `ecosystem.html`
   changes and so does the matrix cell that currently reads "not measured".
4. **Would strengthen the site:** independent third party test data with methodology.

_Closed 1 to 3 Sep: the homepage meta descriptions, which still described the site as it read
before organoid housings entered the hero; the search description, the og:description and the
twitter:description now match the sentence printed on the share image itself._

_Closed 31 Aug to 1 Sep: the homepage restructure, three new deep dive pages, the full restyle,
the launch rename, brand assets regenerated, the double digit growth error corrected on the live
site, link previews repaired (og:image was relative and therefore ignored by LinkedIn and Slack),
and the apple-touch-icon replaced with a real PNG._

## HOW DANE WORKS

- No em dashes or hyphens in prose. Bullets over paragraphs. Sentence case, active voice.
- Confirm before pushing to main or anything outward facing.
- Never invent numbers, dates, patent status, or test results.
- He reviews visually and gives specific, batched feedback. Batching many items into one
  message is the efficient pattern; keep encouraging it.
- He will say when something reads as too crowded or too loud. Prefer restraint.
