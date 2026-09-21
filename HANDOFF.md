# MORFOS — session handoff

**Paste this whole file into a new Claude session to pick the work up.**
It covers what the project is, how to work on it, what exists on disk, what is
finished, and what to do next — in priority order.

> **Start here, in this order.**
> 1. Read §2. Those are standing instructions from Het and they apply to every
>    task, not just the first one. The short version: **measure, do not assert**,
>    keep the scope exactly as asked, and never invent an image or a quote.
> 2. Skim §5 for whatever area the new task touches. Most of the expensive
>    mistakes on this project have already been made once and written down.
> 3. Take a backup of the file before editing it (§4), and run the integrity
>    check in §8 afterwards.
>
> **If Het has not said what he wants yet, the answer is §7.1: deploy.** The
> work has been finished and verified for several sessions and is still not
> live — and it now includes a working booking system, which makes shipping
> worth more than it was.

Last updated: 2026-09-21 (second session of the day).
Last commit: `7691d37 "Update website"` — a **good** state, everything in it
is verified. Working tree clean apart from this file.

---

## 0. The two things to know first

1. **Nothing is deployed.** `www.morfos.in` is still serving an older build.
   Until the current files ship, none of the SEO work, none of the copy, none
   of the bug fixes and none of the case-study work is live. **This is the
   single highest-value thing left to do** and it is step 1 of §7.
2. **The site takes bookings and silently drops them.** `BOOK_CFG.endpoint` is
   empty, so the form validates, says thank you, and posts nowhere. The Apps
   Script that receives them is written and sitting in `morfos-booking.gs`,
   unpasted. See §6. This is the highest business risk on the list.

Everything is committed and the last commit is a good state to fall back to,
which was **not** true in earlier sessions — the note that used to be here
about `546d4ca` being a bad intermediate no longer applies.

---

## 1. What this is

MORFOS is a launch-partner studio based in **Mumbai, Maharashtra**. It builds
**Shopify stores and 3D websites**, delivered in 7 days, backed by a 14-day
refund and a rebuild-until-right commitment.

> **The "fixed price in writing" positioning is dead — do not bring it back.**
> The site led on it for a long time. Het killed it: *"i dont like the fixed
> price in writing part it sounds very negative ... this looks we have fixed
> price and we wont negotiate ... and that is not even our offer."* The site
> leads on **speed and the refund** now, and price appears only in the
> calculator, as an estimate. The same message also corrected two other
> things the copy had wrong: the studio is **not Shopify-only**, and its
> customers are **founders and brands**, not "founders who have been burned
> before". §5 *The copy correction* has the full list of what moved.

**What the site is for.** It has one job: convince an e-commerce founder who
has been burned before — quoted unfairly, ghosted mid-project, or handed a
store that does not look credible — that this studio is safe to hire, and get
them onto a call. Everything on it is downstream of that.

**What that means in practice, and it shapes most design decisions:**

- **Evidence beats adjectives.** The differentiator is that the promises are
  structural — a price in writing, a date in the contract, a refund. So the
  site shows receipts rather than claims: the case studies lead with the
  agreed price and the two dates, the performance numbers carry the method
  they were measured by, and nothing is published that cannot be pointed at.
  This is also why fabricated testimonials are out, not merely as an ethical
  line but because the whole proposition is "we do not bluff".
- **The craft is the argument.** A studio selling website builds is judged on
  its own website first. That is why there are thirteen hand-built engines in
  here rather than a template, and why "it looks fine" is never the standard —
  see §2.
- **It has to be found.** Organic search is the acquisition channel; there is
  no ad budget in play. Hence the SEO work in §7.6 and the copy problem in
  §7.5.

The site is **self-contained static HTML** — no build step, no framework, no
package manager, no bundler. All CSS, JS, traced SVG geometry and canvas
engines live inside the HTML files themselves. **Keep it that way** unless
explicitly told otherwise.

- **Working directory:** `C:\Users\HET\New folder`
- **Platform:** Windows 11. The Bash tool is Git Bash; PowerShell also works.
- **Git:** yes, branch `main`. Last commit `7691d37 "Update website"` — a
  good, verified state. Het also commits from outside the Claude session, so
  check `git log` at the start rather than assuming.
- **Host:** Vercel, Mumbai edge (`bom1`). TTFB ~7ms, ~111KB gzipped.
- **Contact:** `support.morfos@gmail.com`
- **Instagram:** `https://www.instagram.com/morfos.social/` (the only social
  account that exists; LinkedIn and X are parked in TODO comments)

### Production URL facts (checked against the live site)

- `morfos.in` **308s** to `www.morfos.in` — so **www is canonical**, and every
  `<link rel=canonical>` points at `https://www.morfos.in/...` correctly.
- This deployment does **not** strip `.html`. `/about` is a 404, `/about.html`
  is a 200. The `about.html` canonical is therefore correct as written.
  **If anyone turns on Vercel's Clean URLs, the canonical tags must change.**
- The local `serve` dev server *does* strip `.html`. That is a dev-server
  quirk, not production behaviour. Don't be fooled by it.

---

## 2. Standing instructions from Het — these apply to EVERY task

These are not preferences, they are the working contract. He restates them
constantly; assume they apply even when unstated.

1. **"Keep self verifying until it is perfectly done."**
   *Measure, don't assert.* Drive the page in a browser and read numbers back
   out of it. Screenshots alone are weak evidence. Iterate until the
   measurement passes, then hand over. Several defects on this site only
   surfaced on the second or third measurement pass.

2. **"Don't make any other changes, keep other things as it is."**
   Scope is tight. Prove it by diffing against a backup taken *before* the
   edit. Take that backup first, every time, and read **every removed line** in
   the diff before handing over.

3. **Reference sites: take the structure, never the styling.**
   Het briefs work by sending a URL, screenshot or recording and asking for
   "this kind of" thing. Copy the *mechanism and layout*. The palette,
   typefaces, copy and artwork always come from MORFOS's own system. His words:
   *"not exact brand colour and fonts should be used ours only just the
   design."* Never embed, hotlink or clone the reference's assets.

4. **The brand red is `#fd2702`.**
   Red is already at ceiling, so any lighter tint must raise **green and blue
   together**. Raising green alone walks the hue toward orange and Het rejects
   it. Verify by computing the hue of every lit pixel: median near 9°, almost
   nothing above 20°.

5. **Imagery comes from Het, not from Claude.** He rejected a full page of
   generated artwork outright — *"undo the changes remove the image i didnt
   liked it i will give you the images."* Build the frame, measure it, and ask
   for the assets. Don't spend a turn drawing pictures on spec.

6. **Don't ship fake work.** Stock imagery and fabricated client screenshots
   behind client names have both been offered and declined. Work panels stay
   tagged "Concept"/"Study" with drawn artwork until real screenshots exist.

---

## 3. Files on disk

### Live project files (`C:\Users\HET\New folder\`)

| File | Size | What it is |
|---|---|---|
| `index.html` | 424 KB | **The main site.** Most work happens here. Was `morfos.html` — renamed. |
| `about.html` | 104 KB | About page. Broadsheet layout. Same site header, cursor engine **and footer** as the home page. Carries the dither-reveal panel. |
| `case.html` | 111 KB | **Generated — do not hand-edit.** One file serves every case study; `?c=<id>` picks one. Rebuild with `node build-case.js`. |
| `build-case.js` | 21 KB | Generates `case.html` from `about.html`. **The `CASES` object in here is where all case-study copy lives.** Dev tool, not served. |
| `capture-site.js` | 10 KB | Screenshots a client site for a case study. Driven over CDP; needs nothing installed. Read §5 *Screenshotting a client site* before touching it. Dev tool, not served. |
| `work/` | 1.1 MB | Client-site screenshots. `prabhu-mill-card.jpg` (560×1680, the carousel panel), `-hero.jpg` (2160×1350), `-full.jpg` (1800×8914, the scroll-through). |
| `butterfly-photo.jpg` | 24 KB | Het's photograph, 736×1308. Feeds the dither panel on `about.html`. |
| `client-roster.html` | 164 KB | Client portal, PIN-gated. `noindex,nofollow`. |
| `frostbreak.html` | 18 KB | Unrelated scratch demo. Live but `noindex,nofollow`. |
| `morfos-booking.gs` | 5 KB | Google Apps Script for the booking endpoint. **Not part of the site** — it gets pasted into script.google.com. |
| `robots.txt` | 0.2 KB | Allows all, disallows portal + demo, points at the sitemap. |
| `sitemap.xml` | 0.6 KB | 3 URLs: `/`, `/about.html`, `/case.html?c=prabhu-mill`. |
| `og-image.png` | 74 KB | 1200×630 social share card, drawn in the site's own faces. |
| `favicon-64.png` | 2 KB | The favicon actually linked. |
| `apple-touch-icon.png` | 6.7 KB | 180×180 home-screen icon. |
| `butterfly.png` | 24 KB | Wordmark butterfly, used by `about.html`. |
| `favicon.png` | 278 KB | The **original** 2000×2000 icon. No longer referenced. Safe to delete. |
| `.claude/launch.json` | — | Preview-server config: `morfos-static`, `npx serve -l 4173 .` |
| `HANDOFF.md` | — | This file. Keep **one** of it; update in place. |

### Backups

Backups live in the session scratchpad, which is **session-scoped and may be
cleared**. The real safety net is git — commit early. Backups from the most
recent sessions were at:

`…\AppData\Local\Temp\claude\C--Users-HET-New-folder\<session-id>\scratchpad\t\`

with names like `index.preHero`, `index.preCoupon`, `index.preLogo`,
`index.preFooter`, `index.preCursor`, `about.preAnime`, `about.preCursor`.
**A new session gets a new scratchpad, so those are gone.** Take a fresh
backup before each edit.

---

## 4. How to edit these files

**Use a Node patch script, not hand edits.** The files are large and the edits
are surgical. Every change in this project was made this way:

```js
const fs = require("fs");
const FILE = "C:/Users/HET/New folder/index.html";
let s = fs.readFileSync(FILE, "utf8");

const rep = (a, b, label) => {
  const n = s.split(a).length - 1;
  if (n !== 1) throw new Error(label + ": " + n + " hits");   // throws on 0 or 2+
  s = s.split(a).join(b);
};

rep(`old exact string`, `new string`, "what this is");
fs.writeFileSync(FILE, s);
```

The throw-unless-exactly-one rule has caught several near-misses (a marker
string that appeared twice — once in CSS, once in JS; an email that appeared 6
times when a line-based grep suggested 4).

**Write patch scripts with the Write tool, not a bash heredoc.** Backticks,
`${}` and stray apostrophes in the payload break shell parsing — this has
failed outright at least once — and very long lines silently truncate.

### Two traps that cost real time

- Do **not** write a `patch(file, callback)` helper where the callback both
  receives the string as a parameter *and* closes over a `rep()` that mutates
  an outer copy. The callback returning its own `s` silently discards every
  `rep()` edit. It reported success and wrote a larger file, so nothing looked
  wrong. Put everything through one string.
- **When you insert markup, re-matching can hit what you just inserted.** A
  coupon patch matched `viewBox="0 0 300 186"` twice because the *new* SVG also
  contained it — card 0 ended up with card 1's artwork. Capture all originals
  up front, then substitute via placeholders.

---

## 5. What is already built

Thirteen scroll- and pointer-driven engines, all verified. Condensed:

| Area | What's there |
|---|---|
| **Loader** | Traced-SVG wordmark timeline, skippable. |
| **Hero** | Canvas butterfly that shatters into 22 shards on pointer proximity and reassembles. Click impulse, drag with throw, wing beat, magnetic pills. Leaving the hero knits it back together and flies it out — see below. The **MORFOS wordmark behind it** arrives on a curtain mask reveal. |
| **Statement** (`#statement`) | Word-by-word mask reveal, retimed to finish mid-screen. |
| **Work** (`#work`) | 3D perspective filmstrip, draggable, cloned panels. Six are drawn SVG concepts; **one is a real client** (Prabhu Mill) whose panel is a photograph and which opens a case study. A tap opens it — see *the click that never reached the card* below. |
| **Services** (`#services`) | Three stepped panels + ASCII canvas + per-letter corner word. |
| **How we work** (`#process`) | Flow chart: a rail that draws itself, four nodes lighting in order, **stopping on each one for 950ms** and picking it out. Vertical on phones. |
| **Offers** (`#referral`) | Two torn two-part coupon tickets, viewBox 300×186, notches cut with an SVG `<mask>`. Each carries the real traced cocoon mark at 28 units tall. |
| **Calculator** (`#calculator`) | Working price calculator, geometric product slider, rolling digit figure. **Floor is ₹30,000, ceiling ₹1,50,000**, default reads ₹42,000–₹48,000. |
| **Guarantee** (`#guarantee`) | Curtain-reveal cards + a capacity meter whose twelve bars **fill with the scroll** and are full when the box is centred. |
| **FAQ** (`#faq`) | Six Q&A, accordion, first open by default. |
| **Booking** (`#book`) | Full state machine. See §6. |
| **Footer** | Full-viewport closing screen. See below. |
| **Cursor** | Spring-damper follow + tapered trail ribbon. See below. |
| **Case studies** | `case.html`, one file per every client via `?c=<id>`. See below. |

### Section order — the booking card sits under How we work

Het: *"a book a 15 min call section is very low place it below how we work
section and shift other sections downwards."* `#book` was between the FAQ and
the footer; it is now directly after `#process`, and the ticker, offers,
calculator, guarantee and FAQ all moved down behind it. On a 1280x800 window
it went from about y8800 to **y4783**, with How we work starting at y4317.

The numbered eyebrows (01 work, 02 services, 03 process, 04 referral …) were
**left alone deliberately**: `#book` has never carried one, so the numbered
run is still contiguous with the unnumbered call to action sitting inside it.
If Het wants it numbered, everything below it has to be renumbered too.

Four headings moved with it, all of them still describing the studio as
Shopify-only or reading badly: *How we build your **website** in 7 days*,
***Website** cost calculator*, *Our build guarantee: refund, rebuild, 7 days*
and *Frequently asked questions*.

### The butterfly: the seat is a continuous function of scroll

Het: *"the butterfly is just shifting its place i want a smooth movement
throughout the website it is lagging a little."* Getting this right took three
passes and the first two were wrong in ways only a continuous-scroll
measurement showed.

**The measurement that mattered.** Every earlier test sampled scroll positions
and let the butterfly settle at each one, which flatters it enormously.
Scrolling **continuously, 12px a frame down the whole page**, the version Het
was complaining about was on a heading's line for **23.7% of frames** and had
its seat clamped against the top or bottom edge of the window for **38%**.
With nine headings across 9000px there is no heading in the perching band for
most of the page, so "pick the best heading" cannot work — for most of the page
the honest answer is that there isn't one.

**What it does now.** The seat is not a choice, it is a continuous function of
scroll position. A is the last heading at or above the aim line, B the first
below it, and

    u = (aim - A.cy) / (B.cy - A.cy)

runs 0 → 1 between them. The instant B reaches the aim line, B becomes the new
A and u resets from 1 to 0 **at the same point on screen**, so there is no seam.
A dwell of 0.34 at each end keeps it sitting on a heading rather than
permanently drifting, and each dwell fades out over 0.12vh as its own heading
nears the edge of the band — which is what stops it pinning against an edge
waiting for a heading that has already gone. Both blended points are clamped
into the **band**, never into the window, so it cannot be parked against an
edge at all.

| measured over a full page scroll | before | after |
|---|---|---|
| frames sitting on a heading's line | 23.7% | **68%** (the rest is in transit) |
| frames with the seat against a window edge | 38% | **0%** |
| frames that are neither sitting nor flying | — | **0** |
| worst single-frame jump | **625px** | 69.6px at 12px/frame |

- **The 625px jump was the case the first blend missed.** It only covered
  "no heading in the band". Where two are in it at once — the booking card and
  the offers, the guarantee and the FAQ — one left the band while the next was
  already inside it and the seat switched in a single frame: **531px and 625px,
  twice on the way down**. Blending *every* consecutive pair is what fixed it.
- **The remaining step scales with scroll speed, which is the right shape.**
  Swept at 6, 12 and 30px a frame the worst frame is 37 / 70 / 115px — the
  butterfly moves faster when the page does, and never jumps.
- Symmetric coming back up: 652 frames, **0** off screen, **0** covering a
  heading's words while sitting, never two butterflies and never none.

**The chase underneath it was rewritten too.** It used to be `px += dx * k`,
a fixed share per frame: frame-rate dependent, and slow enough to hide the
seat's jumps, which is precisely what left it trailing the heading it was
supposed to be sitting on. It is now **seat + offset**, where the offset is a
spring-damper (w0 11 rad/s, z 0.9) integrated in fixed 1/240s substeps off real
elapsed time. Riding a heading the offset is **0.0px**, so it is exactly on its
seat with no lag. The spring is now only a safety net: it absorbs anything that
moves the seat more than 120px in one frame, which a scroll cannot do but a
resize or a late image can.

**And the "lagging" was mostly not CPU — the instrument said so.** A first
measurement had the engine at 1.55ms a frame while scrolling, which would have
been a quarter of the frame budget. Timing the same loop with the tick removed
showed **1.47ms of it was `scrollTo` itself**. Isolated properly, the engine
costs **0.032ms a frame before and 0.0075ms after** — a real 4x saving from not
re-choosing the heading every frame, but far too small to have been what Het
could see. The visible fault was the chase algorithm, not the cost. *This is
the third time on this project that a frame-time measurement has been wrong
rather than the code — always difference two runs of the same harness before
believing one.*

### The copy correction, and where the curtain actually goes

A second message the same day corrected four things. Two of them were
corrections to work done an hour earlier, which is the useful part to read.

**The curtain belongs to the MORFOS wordmark, not the tagline.** Asked which
"MORFOS text" he meant, Het first answered "the hero section text" and the
reveal went on the `h1.tagline`. He meant the **wordmark the hero canvas
draws behind the butterfly** — `buildBackdrop()`, the layer the shards
refract. The tagline is back on its original `fadeUp` and the curtain is on
the canvas: same mechanic and the preset's own numbers (centre-horizontal,
750ms, linear), as a `ctx.clip()` rather than a `clip-path`. It opens across
the **word's own ink box**, measured where the text is laid down, not across
the canvas. The glass sits behind the same clip, so a shard cannot refract a
letter the curtain has not reached.

- **Measured with probe columns, not by diffing frames.** A frame diff was
  tried first and was useless: the embers and the wing beat move every tick,
  so p=1 differed from p=1 by 10,842 pixels. Sampling the mean luminance of a
  narrow vertical strip, averaged over five ticks, gives a clean staircase —
  a probe at 0.30 of the half-width lights between p=0.2 and p=0.4, one at
  0.55 between 0.4 and 0.6, one at 0.80 between 0.6 and 0.8, and one at 0.95
  only at p=1. Each lights exactly as the curtain passes it.
- The reveal starts on `body.revealed` — before the loader hands over the
  word is behind the loading screen — and runs 0 → 1 in 750ms on the hero's
  own frame clock. `__morfos.word` reads it; `__morfos.wordSeek(p)` holds it
  at a point for measurement and `wordSeek(null)` hands it back.
- **A seek hook has to actually override the loop.** The first version set
  `wordP` and the next frame recomputed it from the elapsed clock, so every
  reading came back wrong and rising. It sets a `wordFixed` the frame checks.

**The butterfly sits on section headings only.** The first pass let it perch
on sub-headings and on body text — the statement paragraph, the FAQ questions,
the guarantee cards — and Het's answer was *"i want it to sit on just headings
like work services etc"*. `HEAD_SEL` is now five selectors: the two corner
words, `.sec-title`, the booking h2 and the footer wordmark. Nine seats down
the page.

- **The dead-stretch rule had to change with it.** With only nine headings
  the gaps are large, and the old fallback — aim at whichever heading is
  nearest the middle of the screen — made it **cling to the top edge
  following a heading that had already gone**, measured at four separate
  positions. It now aims at whichever heading is nearest to *entering* the
  band, which is the incoming one whichever way the page is moving.
- Re-swept 59 positions down and 59 back up: **58/59 each way** perched on a
  heading's line, **0** off screen, **0** covering a heading's words, exactly
  one butterfly everywhere. The single exception is mid-calculator, where the
  gap between two headings is 921px in a 698px window.

### The copy correction

Three things Het rejected, and the three answers he chose:

| He rejected | The site now says |
|---|---|
| "price fixed in writing" — reads as *we will not negotiate*, and is not the offer | **speed and the refund**: live in 7 days, 14-day refund, rebuilt until it is right. Price appears only in the calculator, as an estimate |
| "we build Shopify stores" — limiting, they build 3D websites too | **"Shopify stores and 3D websites"** |
| "for founders who have been burned before" | **"founders and brands"**, with no reference to bad experiences |

It is a site-wide pass, not a line edit. On `index.html`: the title tag, the
meta / OG / Twitter descriptions, the OG image alt, four JSON-LD blocks, the
FAQ schema and its rendered twin, the hero h1, the statement, two `vh`
headings, a services panel, a flow step, the guarantee chips, the calculator,
the booking pitch, the marquee, the nudge panel, the footer terms and the mail
the footer field composes. On `about.html`: the title, four descriptions, the
h1, key message 02, a founder bio and the same footer. `build-case.js` had to
move in the same pass — **it matches about.html's title and description
strings in order to replace them**, so changing about.html alone breaks the
generator. `case.html` was rebuilt.

- **Services panel 002 was the price lock** — "Fixed price", "Fixed-Price
  Lock", "Price held through launch". It is the **3D website build** now, so
  one edit answered both the rejected framing and the Shopify-only problem.
  **Its bullet list is a draft and Het has not approved it** — it is the only
  place in this pass where capability was described rather than restated, and
  he should correct anything that is not true.
- The FAQ's "Is the price really fixed?" is "How does pricing work?", answered
  without any lock language.
- A grep for `fixed[- ]price|price fixed|fixed in writing|does not move|fixed
  number|Fixed-Price|burned before` comes back **empty on all four files**.
  Worth re-running after any copy edit.
- One typo was caught this way and not by reading: the footer mail body became
  "I would like a **a** scope", because the replacement carried its own
  article and the original's was outside the matched string.

### The calculator prices the real work

Het: *"our pricing is 30k 50k and 1 lakh and i want you to range it from 30k
to 1 lakh 50 thousand."* The old model had a **₹68,000 floor** and ran past
₹3,00,000 at full scope, so every number on the page was wrong — including the
`priceRange`, the `Offer` price and minPrice, and the FAQ answer.

The shape is unchanged — a base for the build and its templates, a catalogue
tier, four priced add-ons, then a band — only the numbers moved, chosen so the
ends land exactly where Het put them:

| | reads |
|---|---|
| 10 products, 3 templates, nothing added | **₹30,000** – ₹34,000 |
| the page default (100 products, 5 templates) | ₹42,000 – ₹48,000 |
| 200 products, 5 templates | ₹47,000 – ₹54,000 (brackets his 50k) |
| 500 products, 8 templates, migration + copy | ₹87,000 – ₹99,000 (his 1 lakh) |
| everything at once | ₹1,32,000 – **₹1,50,000** |

The band multiplier is **1.14** and that is not arbitrary: everything at once
totals 132,000, and 132,000 × 1.14 rounds to the 1,50,000 he set as the top.
The static figure in the markup is the same number the default state computes,
so the page does not flicker when script takes over — checked, both read
₹42,000 – ₹48,000.

### Eight fixes Het asked for in one go — all measured

These were one message and they are all in `index.html`. Each is written up
with the number the measurement gave, because several of them looked fine and
were not.

**1. The click never reached the work card.** The filmstrip called
`kg.setPointerCapture()` on `pointerdown`, which retargets the whole gesture
to the section — measured, both `pointerup` and `click` were dispatched on
`#work` rather than on the card's own `<a>`, so the anchor's default action
never ran and the case study never opened. Capture is now taken on
`pointermove`, past the same 6px the click guard already used. Proved by A/B:
the same click at the same point navigates on the new file and does not on a
copy of the old one, and a drag still moves the strip without navigating.

> The measurement nearly lied first. The Browser pane's screenshot coordinate
> frame is scaled — a click at (504,319) landed on the page at (645,408), a
> factor of 1.28 — so the first "it does not open" was a click into a gap
> between two cards. **Log `e.clientX/Y` in the page before concluding
> anything from a synthetic click.**

**2. The panels read as black.** `FOG` is the opacity a panel has at the focal
centre of the corridor, which is the middle of the screen — so the card you
are actually looking at was the faintest thing in the run, at **0.40**. It is
**0.80**. Measured on the Prabhu Mill photograph: mean luminance 158.3 in the
file, **63.3 on screen before, 126.6 after**. The depth cue survives; the
outermost panel is still 1.0.

**3. The butterfly goes from heading to heading.** It used to fly to the bottom
right corner and stay there, stepping sideways to keep off words. Now the only
places it comes to rest are the page's own headings: it perches just past the
end of a heading's **last line**, rides it while the page scrolls, and when
that heading leaves the perching band (6% to 86% of the window, aiming at 40%)
it flies onto the next. Hysteresis — it keeps the heading it is on until that
one leaves the band — is what makes it read as a journey rather than a twitch.

- Swept 59 scroll positions at 1024x768 and 62 at 1440x900: **0 faults** —
  always on screen, never sitting on a heading's words, and it visits
  **16 distinct headings** on the way down.
- `corner()`, the `SPOTS` ladder, `textRects()`, `blocked()` and
  `clearSpot()` went with it. All of that existed only to keep a parked
  butterfly off text in a corner it no longer sits in.
- **A heading's line box is not its block box.** A two-line title's block
  reaches the full measure, so seating off it puts the butterfly in the middle
  of nowhere. It reads the last line with a Range.
- **And a Range rect is not inside the element.** Most of these headings are
  split into word spans the reveal engine slides in, and mid-reveal one of the
  statement's words reported a right edge of **1057 in a 1024 window** — the
  seat was clamped off the end of the screen. The line is intersected with the
  element's own box now.
- The corner words are a span per letter inside a full-width box, so the box is
  not where the word is: `#kgWord` and `#svWord` are measured by their last
  letter.
- **Still one butterfly, always.** Re-swept 154 positions in both directions
  after the change: never two, never none.
- **One known gap.** The calculator is 932px tall with a single heading at its
  top, so for roughly 400px of scroll there is no heading in the band and the
  butterfly rides the top edge following the one that just left. Its labels
  are slider values, which are a bad thing to perch on, so this was left.

**4. The hero text arrives on a curtain.** Het sent Originkit's *Mask Text
Reveal* (base preset). Ported as CSS — this site has no build step — with the
preset's own numbers: `clip-path: inset(0% 50% 0% 50%)` opening to
`inset(0)`, **0.75s, linear**. Read back off `getAnimations()` with the
clock driven by hand: 50% -> 42% -> 25% -> 0% at 180/300/555/930ms, opacity 1
throughout. The flex column is `align-items:center`, so the h1's box is
already shrink-to-fit — **327px against a 1008px parent** — and the curtain
opens across the words rather than across the hero. The page's own 180/260ms
stagger is kept so the line still waits for the loader.

**5 and 6. Both corner words land before their section is centred.** They ran
to `finish = min(0, vh - height)` — the section's bottom edge reaching the
bottom of the screen. For Work that is the same instant the section fills the
screen, so the W, which departs last, only arrived on the final frame. For How
we work the section is 449px in a 768px window, so that point is far past the
middle and the word was still assembling as the section left: measured **0.78
of the way through at the centred position**. Both finish where the section is
centred now, with a `LEAD` of 0.86 bringing the last letter home before even
that. Measured at 1024x768 and 1440x900: every letter is at 1.00 while the
section's centre is still **93px** short of the window's, and stays there.
Shortening the run is also what makes it quicker, which is the other half of
what Het asked for.

**7. The flow chart stops at every node.** Doing this on scroll distance was
tried first and measured: the whole run is **237px of scroll**, so a segment
is 79px and a 42% hold came out at **33px** — a third of one notch of a wheel,
which nobody sees as a pause. The hold is on the clock instead. Scroll says how
far the line is allowed to go; the line walks there itself and stands on each
node for `DWELL` **950ms** before it is let past. Driven by hand at 16.7ms a
frame: parked 0 -> 0.333 -> 0.667 -> 1 with **~1.1s** on each stop. The step it
is standing on takes a brighter node and body copy at **scale(1.06)** — a
transform, so the column's layout box never moves.

- The enlarged copy was checked against the real gaps, not eyeballed: minimum
  clearance between two bodies **23.8px at 1024** and **30.9px at 1440**, and
  nothing leaves the section's measure, because the outer two scale inwards.
- **`:first-child` matches nothing here** — the rail `<div>` is the list's
  actual first child, so the outer-step rules are `:first-of-type`. The
  pre-existing `.flow-step:first-child{padding-left:0}` has the same bug and
  was left alone as out of scope.
- **On a phone the body is not scaled at all.** At 375 the column is 310px in a
  360px measure, so 6% is **18.6px of overhang** — inside the window but
  outside the text block, exactly the "untidy" Het warned about. Only the step
  title grows there, and the full selectors are repeated inside the media query
  because a media query carries no specificity of its own.

**8. The capacity meter fills with the scroll.** Twelve bars driven straight
off how far `#capBox` has come towards the middle of the window, spread so
they fill one after another, with the numeral counting the same number off the
same number so the two cannot drift. Written as inline style rather than as a
class: a transition to a fixed end state cannot be scrubbed backwards, and this
has to empty again on the way up. Measured 3 -> 5 -> 6 -> 8 -> 10 -> 12 across
the approach and **12/12, all bars at full height, at exactly the centred
position** — at 1024, at 1440 and at 375. A 0.97 lead is in there because at
375 the centred scroll position is fractional and `p` came back 0.999, one
bar short.

**What did not move.** `about.html` is untouched. Every removed line in the
diff against the pre-session backup belongs to one of these eight. 22 hooks, 0
console errors on a clean load, no horizontal overflow at 375 / 1024 / 1440.
The `AbortError: Transition was skipped` that shows up after navigating to a
case study and back is pre-existing view-transition behaviour and comes from
code none of this touched.

### The butterfly handoff — the hero one and the travelling one are now ONE

There used to be two butterflies on the homepage. The hero's scattered into
embers as you scrolled (`scrollK` added break to every fragment), while a
separate one appeared on the corner logo and flew down the page. Het asked for
them to be the same creature, and they are.

**The choreography.** Leaving the hero now knits the fragments back together —
the same scroll that used to break them multiplies the break DOWN — and then
the whole body banks, shrinks and flies to a point high and right in the
viewport. There the travelling butterfly is placed on exactly that point at
exactly that size, and the hero stops drawing. `.foot`-style constants live at
the top of the `#11` block in the hero engine.

**It is time-driven, not scroll-scrubbed, and that matters.** The first version
scrubbed the flight with `scrollK`. Measured, the whole thing fitted inside
195px of scroll, so one notch of a wheel (~100px) skipped half of it and the
last frame the hero drew could be 270px and 230px of width from where the other
butterfly was then placed. Scroll now only TRIGGERS it (`TRIG_ON` 0.14, with
hysteresis down to 0.07); `exitP` then runs 0→1 over `EXIT_MS` = 1400ms on its
own clock, and 950ms coming back. Het's own brief said "1.5 seconds".

**The seam measures about 1px.** Verified by reading the hero's own mask layer
(`__morfos.maskLayer`) frame by frame and comparing the last hero frame with
the first placed frame of the travelling one: 0.91px of position, 0.54px of
width (63.0 → 63.5), identical across three consecutive handoffs. An ordinary
frame of the flight moves it **12.18px**, so the swap is 13× smaller than the
motion around it. Three things had to be fixed to get there:

- **Aim the artwork, not the origin.** The butterfly art sits about 65px left
  of the body origin `(cx, cy)`. Aiming the origin at the landing point left
  the drawn butterfly 5.9px short.
- **`f.box` is the live rect and already carries the current scale.** Sizing
  the snap from it compounded — a second handoff landed at 53px instead of 64.
  Use `__flit.hostW`, the unscaled width.
- **One frame of grace.** Handing over the instant `exitK` hits 1 meant the
  last frame actually drawn was still 60–62px against a 64px landing. It now
  waits one frame so the hero has drawn once at exactly the landing state.

**Exactly one butterfly is visible, always.** Sampled at 142 scroll positions
in both directions: never two, never none. `setHeld(true)` clears the `.on`
class synchronously rather than on the flit's next frame — leaving it to the
frame showed both for a tick, longer on a throttled tab.

**It got cheaper.** The old dissolution left every fragment at maximum break,
the most expensive state there is, and the code comment records it at 9.68ms.
Knitting closes them instead: **1.68ms** mid-flight, 3.73ms at the hero top,
1.07ms once past. There is also a short-circuit in `updateExit` once the
handover is done, because that loop runs for the whole length of the page.

**Fallbacks are the original behaviour, untouched.** Under 861px, under
`prefers-reduced-motion`, or if the travelling butterfly fails to build,
`handoffLive` stays false and the old scroll dissolution runs exactly as it
did — verified at 800px: break 0 → 0.041 → 0.165 → 0.373 and lift 0 → 7.95 →
31.79 → 71.77, the original curves.

**Two safety nets, both measured.** Arriving deep in the page (a reload at
depth, a hash link) completes the handover on the first frame and places the
travelling one on screen — an early version clamped the landing point into the
canvas and put it 3273px above the viewport, so the flight is clamped to the
canvas but the LANDING POINT is not. And the hold is watchdogged: if the hero
never calls, an unfed hold lapses after `HOLD_TTL` 3000ms and the travelling
butterfly takes over on its own. Verified by silencing `__flit.hold` and
driving `__flit.tick` — still held at 1s, released and visible by 3.2s.

### One drawing, not two

The travelling butterfly used to be flat SVG line work — `WING.ringD` filled
red with cuts punched in it — while the hero's was a drawn object: seven wings
in a near and a far pair with the far one foreshortened, a lit body with
segment banding and a thorax bead, antennae. Het asked for the hero's look
everywhere, so there is now one drawing. `drawArt(g, x, y, box)` is exposed on
`__morfos`; the hero's own art layer goes through it and so does the
travelling one, which renders it into a sprite at its own size.

Measured against the hero's art layer, both fitted by their own alpha boxes:
**IoU 0.969**, aspect 1.276 against 1.277. It is the same creature.

Three things this needed, none of them obvious:

- **Draw it large and scale the context down.** `drawButterfly` sets absolute
  line widths — 0.9px for the abdomen banding, 1.15–1.35px for the antennae —
  in the context's units, not as fractions of the butterfly. Asking it for a
  54px butterfly keeps those at full weight against a tenth of the geometry
  and the miniature comes out drawn with a marker pen. It is drawn at
  `S_DRAW` = 420 into a context scaled down to fit.
- **The box had to be re-shaped.** The flat mark was 58×69, taller than wide;
  the drawing is the other way round, measured 144×114. The box is now 71×56.
  This is not cosmetic — that box is what the text avoidance tests against,
  and a box two thirds empty makes the butterfly refuse good places to sit.
- **It needed its own halo back.** Composited over the brand red of a `.btn`,
  the drawing alone measured **1.02:1** and vanished; the element's own drop
  shadow could not fix it, because the shadow of a soft glow is a soft shadow.
  A page-coloured silhouette, blurred and stamped five times under the
  drawing, does the job the flat mark's 14-unit stroke used to. After it, the
  lit core measures **0.253 on all three** of page black, brand red and the
  white button — the background no longer reaches it — at **3.72 / 3.60 /
  3.41:1** against its own surround.

There is still a flat-SVG fallback in the `else` branch, for the case where
the hero did not build and there is no drawing to share.

The sprite is built once and on resize, so it costs nothing per frame: the
travelling butterfly's own frame measures **0.015ms**. A resize now costs
about 16ms more than it did, once.

**The corner logo's accent is empty until it lands.** `body.has-flit` already
hid the static `.mk-lock i` for the whole page below the dock, so this only
extends an existing state to the first screen. If Het wants the accent filled
at the top instead, it is one line — do not hold the flit at scroll 0.

### The footer (rebuilt earlier)

Structure taken from `kodeimmersive.com`, in MORFOS's own colours and faces:
a full-viewport closing screen, a 5-column meta grid with column 3 left empty
for the object, two large headings sharing one row, a bracketed
`[ your email → ]` field, and the social/legal row. `.foot .wrap` fills the
footer and spaces its own children, so meta sits on the top edge and the legal
row on the bottom one.

Under the first of those headings — the word MORFOS — the **traced cocoon
extruded into 64 depth slices**, turning about its vertical axis in `#fd2702`
tones. It fades out with a `destination-out` gradient just above the bottom
legal row, which is the only thing in the footer set in greys too quiet to
carry a backdrop.

**It was rebuilt when Het said it was "very big and also looking 2d".** Three
things were wrong and all three are fixed:

- **The depth was 65 shape units against a 610-wide shape** — about a tenth of
  its own width, so the 26 slices sat nearly on top of one another and the
  thing read as a flat silhouette that squashed rather than a solid that
  turned. Depth is **300** now, a little over half the width, as the object
  itself is, and the slice count went to **64** so the side reads solid instead
  of striped.
- **The projection was a horizontal scale, which is not a rotation.** It is a
  real Y-rotation composed with a `PITCH` of 0.3 rad, so the object is seen
  slightly from above: `sx = x·cosθ + z·sinθ`, `sy = y·cosφ + x·sinθ·sinφ −
  z·cosθ·sinφ`. That `x·sinθ·sinφ` shear is the term a flat scale never had,
  and it is what makes the crossbar show a top face. Near slices are scaled by
  a `FOC = 1500` perspective on top of it.
- **It vanished at 90°.** Every slice is infinitely thin, so edge-on the whole
  solid drew nothing — the old note called that "the maths, not a bug", which
  was true and still looked like a glitch. `|cos θ|` now has a floor of 0.085,
  just wide enough that the slices overlap into a visible edge.

Two lighting notes, both of which came out of measurement rather than taste:

- **The shading leans with the rotation.** A fixed light was tried first and
  fought the front-to-back ramp for half of every turn — the ramp puts the
  highlight on the leading face, the fixed light put it on the left, and
  through `sinθ < 0` the two cancelled into a flat wash. The gradient's axis
  now leans with `sinθ`, which is continuous through zero so it never pops.
  Checked by splitting the object in half and comparing mean luminance:
  **22 of 22** sampled angles now have the lit half on the near side.
- **The ramp and the rim were rebalanced for the smaller object.** Both were
  tuned when this thing was 355px wide. At 159 a constant 2.2px rim drew a
  wireframe, so the body carries more of the red (front slice peaks at
  rgb(124,17,9), brightest composited pixel rgb(158,23,7), hue 6.4°) and the
  rim is 1.1px at .3 alpha.

It is **one gradient a frame, not one per slice**: the slices fill flat and a
single `source-atop` pass sculpts the whole object. It only ever darkens, so
the brightest pixel is still something the contrast audit can be pinned to.
Median frame cost **0.2ms** over 31 runs after a 300-tick warm-up — cheaper
than the old 26 slices were, because the object is a quarter of the area.

- **It hangs off the heading's box, not off the viewport.** `place()` reads
  the first `.foot-head` — the word MORFOS — and sets the object's left edge to
  the word's left edge and its top 24px (16 on a phone) below it, so the two
  read as one block. Before this it floated in the middle of the footer at
  `0.40W`, 355×584, and filled the screen. It is **159×244 at 1280**, which is
  86% less area, and it is capped by the room between the heading and the legal
  row as well as by a hard 244px, so it shrinks rather than collides: measured
  at 1440×900, 1280×800, 1280×600, 1024×420 and 375×812, clearance under the
  heading stays 19–28px and clearance above the legal row 34–182px.
- **The fit uses the projected envelope, and getting that wrong was caught by
  measurement.** A first pass fitted by the flat shape plus the depth, and the
  silhouette ran **25px above its own box** — because the tilt shears x into y
  and the near slices are scaled up by the perspective. `PW`/`PH` carry both
  terms now, and `__footBg.box` is the envelope: swept over 60 angles the drawn
  silhouette is inside it on every side.
- **`place()` runs on a 120/500/1400ms timer as well as the ResizeObserver.**
  The object is positioned off a laid-out element now, so a `size()` that lands
  mid-reflow reads a guard that has not settled — that was seen live, placing
  it 130px too high.
- **Contrast was re-measured, not assumed.** Every text node in the footer is
  sampled against the real canvas pixels over 24 angles, at 1280 and at 375, on
  both pages. **Zero failures on `about.html`**; on `index.html` the only one
  is still the `© 2026 Morfos` line at **4.18:1**, which is the pre-existing
  pure-black value in §7.8 and has nothing to do with the cocoon. Everything
  else is 5.47:1 or better. On a desktop the object no longer sits behind any
  text at all — it is in the empty half of the row.
- **The meta grid still leaves column 3 empty**, which was the gap the object
  used to turn in. Now that it has moved under the heading that column is a
  hole for no reason. Left alone deliberately: closing it moves two cells Het
  did not ask to move. Worth raising with him.
- The guard is read in `size()`, not in `draw()` — a `getBoundingClientRect()`
  per frame would thrash layout at 60fps.

- **`index.html` and `about.html` carry the same engine byte for byte.** Any
  change to it must be applied to both in one script and the two blocks diffed
  afterwards, or the pages drift.
- The cocoon path is shared: `window.COCOON_SHARED = { d, w: 610, h: 885 }`.
  The coupons draw from the same constant.
- **The email field has no backend.** There is no newsletter endpoint, so it
  composes a `mailto:support.morfos@gmail.com`. Validation is tested across 8
  cases. Don't make it look like it stores anything until it does.
- The old giant "MORFOS" wordmark that used to close the footer (`#footMark`)
  was **removed at Het's request** — the new footer already says the name.
  `window.MORFOS_MARK` stays because the loader still draws from it.

### The cursor (rebuilt this session)

Mechanic taken from `originkit.dev/components/dot-cursor`, in `#fd2702`:

- **A real spring-damper, not a lerp.** `STIFF = 1050`, `DAMP = 52`,
  integrated in fixed `1/240s` substeps. ω₀ = 32.4 rad/s, ζ = 0.80.
  Measured: 0.61% overshoot, settled in 133ms, and **0px divergence** between
  60 / 120 / 240Hz at shared instants. The pair was chosen for the lag it
  leaves (`DAMP·v/STIFF`, ~47px at 1200px/s) — a slacker spring put the ring
  120px from what the pointer was actually hovering.
- **A tapered ribbon** on `<canvas class="cur-trail">` at `z-index:89`, under
  the ring at 90. Points expire by **age** (`TRAIL_MS = 260`), not by count, so
  its on-screen length is frame-rate independent. Drawn as **one filled path**
  — a stroke per segment doubles alpha at the joints and comes out beaded.
- Hidden below 760px and under `prefers-reduced-motion`, exactly where the ring
  and dot are.
- **`about.html` carries the same engine with the same constants**, keeping its
  own 34px ring and its own hot-target list. If you change one, change both or
  the cursor's character changes as you walk between pages.

### Keyword movement, rendered text

| Term | Live (old) | Now |
|---|---|---|
| Shopify | 3 | **15** |
| India | 2 | 4 |
| Mumbai | 0 | 1 |
| migration | 0 | 3 |

Still **0** for "D2C", "e-commerce" and "developer" in the *visible* copy —
they exist only in meta and schema. Closing that needs the copy rewrite in §7.

---

### The dither-reveal panel on `about.html`

Het sent the Originkit "Dither Reveal" component and asked for it on the About
page. **It opens the page** — it is the left-hand column of `.lead-grid`, with
the heading and the standfirst stacked beside it in `.lead-body`. The picture
is drawn as a three-tone dithered monochrome field and the pointer carries a
soft circle of the real image with it, over a slow wave distortion.

It started life much larger and in the "Who you talk to" section. Het asked for
it **smaller and seen first**, with the text beside it. Measured at 1280×800:
the panel is **548×365** (down from 1176×783), sits at y147 and ends at y495,
and the text column beside it ends at y497 — the two columns land within 2px of
each other and the whole lead is above the fold. On a phone they stack, picture
first, and it is visible by y204 of an 812 viewport.

Ported shader for shader. What went was the React wrapper only — this site has
no build step and stays that way. The defaults are the component's own:
bayer8, dot 5, reveal 100 at 50% softness, wave on at 82 with density 25,
cover, focus 50. The engine is on `window.__dither` with `tick(n, ms)`,
`at(x, y)`, `away()`, `paint()` and `settings`.

**Two things about the source could not be shipped as they were.**

1. **Its image is not usable.** The component's own default is a dead
   `blob:` URL and its fallback is somebody's Unsplash photograph. **Het sent
   his own**, now `butterfly-photo.jpg` in the project root — a red butterfly
   on black, 736×1308. `data-src` on the `.dith` div is the switch if it ever
   changes again.
2. **Its `contain` branch is wrong.** `fitUv` reads `1.0 / cover`, which
   inverts each axis but does not swap them, so a portrait picture in a
   landscape panel comes out stretched across the full width — measured, the
   mark rendered at aspect ~3.7 against its true 0.844. Contain is cover with
   the axes swapped **and** inverted. Corrected in place and commented; the
   cover branch is untouched. After the fix the rendered ink measures 0.846
   against the source's 0.844, **0.3% error**, in a 1.78 panel. The panel is
   set to `contain` only because the holding mark is a cut-out; drop
   `data-fit` when the photograph arrives and it is back on the default.
   **It has arrived, so the panel is on `cover` — the component's default —
   and `data-fit` is gone.**

Verified by reading the WebGL buffer rather than by looking at it: pointer
away gives **100% monochrome in exactly 3 tones** (which is what `ordered3`
produces); pointer down gives mean saturation **240.9** under it and still
100% monochrome in the far corner; the wave moves ~3% of sampled pixels per
200ms and two paints with the clock frozen are identical, so that is the wave
and not noise. 0.009 ms a frame. It is in the cursor's hot list and labelled
"Reveal".

> Screenshots of this panel come back **black** in the preview pane — it is
> WebGL on localhost, the gotcha already listed below. The block itself is at
> opacity 1 with no transform, so it is the capture that fails, not the page.
> Read `gl.readPixels` instead.

**The picture is a dark one, and that needed a third change.** Its subject
sits dead centre, 183–561 by 452–829, almost exactly square, and 88% of the
frame is black. Inside the wings the median luminance is **0.099** and the
90th percentile only 0.251, so the component's fixed three-level dither put
**90.3% of the panel at pure black** and the butterfly read as faint dust.

The white point is now measured from the picture itself — the 97th percentile
of its lit luminance, by histogram, taken once at load — and passed in as
`uToneWhite`. It came out at **0.3569**, which is what the tone spread in the
subject went from **90.3 / 9.6 / 0.1** to **60.0 / 27.3 / 12.7** on. A bright
picture measures near 1.0 and behaves exactly as the component always did.

It moves the **dither only**. The colour the pointer reveals is sampled before
the scale, and measures rgb(109, 21, 36) under the pointer — the photograph's
own colour, untouched. Cross-origin pictures taint the canvas, so the measure
is wrapped and falls back to 1.0, which is the component's shipped behaviour.

**Panel shape was measured, not guessed.** Under `cover`, a 16/9 panel left
only 19px below the wings across a full wave cycle — and the wave alone moves
the sample by up to 22px. It is **3/2** on desktop (50px clear at the bottom,
nothing clipped, subject filling 63% wide by 87% tall) and **1/1** on a phone,
because at 4/5 the subject swam in black: `cover` can never make it wider than
the 51% of the frame it occupies. Both measured across the whole wave, not at
one instant. 0.008 ms a frame.

**The smaller panel was re-swept for clipping.** Ten panel widths from 548px
down to 121px: never clipped, minimum margin 12px, and the top and bottom
margins stay within 15px of each other all the way down, so the `focusY`
centring below holds at every size.

**`focusY` is 48.7, not the default 50, and that was measured too.** At 50 the
subject sat systematically low — across nine panel widths the top margin ran
28-68px while the bottom fell to **5px**. Sweeping the prop and reading the
rendered box back gives a clean line: the gap between the margins is -125px at
44, -57 at 47, +43 at 50, +87 at 53, crossing zero at **48.7**. The offset is
not in the photograph, whose subject centre is 0.492 — it is the glow and the
dither spread, which is why it had to be measured rather than derived. After
it: never clipped at any of the nine widths, minimum margin **25px**, worst
asymmetry 27px. `__dither.set(key, value)` is the handle that sweep used.

### Two things removed from the About page, and a bug found doing it

**The rules under the heading are gone.** `.lead-head h1 span` carried a
`border-bottom` on every line. Three stacked rules read as a table rather than
as a sentence; Het called it out and they are gone. The heading also came down
from `clamp(2.5rem, 7.4vw, 6.4rem)` to `clamp(2.1rem, 4.3vw, 3.8rem)` because
it shares the row with the picture now.

**The cocoon stamp went, and then came back as the real mark.** The
`aside.stamp` was removed — Het said it did not look good, and what made it
read as a placeholder was that it drew only the outline ring inside a *dashed*
box under a yellow "stamped" label. He then sent the artwork he wanted, and it
is back as `aside.mark-card`: the pod filled, the pattern punched out of it in
the card's own background colour, the bar and stem on top — the construction
the loader and footer already use, so there is one mark on the site.

**It is drawn, not loaded.** Het sent a 2000×2000 PNG, but the traced mark was
already in the page. Rasterising the live SVG and comparing it to his file,
both fitted by their own white bounding boxes: **IoU 0.962**, proportions 0.683
against 0.685, white-pixel counts within 0.3%. So it is the same artwork, and
drawing it saves a 107KB request and stays sharp at any size. His PNG is still
the source of truth if it is ever wanted as a file.

**And the heading was broken before any of this.** `.lead-head h1 span` also
matched the `.wd` word spans the reveal engine injects, and at (0,1,2) it beat
their own `display:inline-block` at (0,1,0) — so every *word* was on its own
line. Measured on the previous build: the h1 was **792px tall** with line spans
of 178 / 264 / 350px. The selector is now `h1 > span`, the direct children
only, and the h1 is **165px** — three lines of 55px. This was pre-existing, not
introduced by the rearrangement; the oversized type had been hiding it.

### Case studies

Het asked for client sites in the work section, each opening a detailed case
study. `case.html` is that page and it serves **every** client from one file:
`?c=prabhu-mill` picks the case out of the `CASES` object near the bottom of
the script. Adding a client is adding an object, not another 109 KB page to
keep in step with this one. Both paths are proven over `file://` (the dev
server strips query strings, which hides the switch): a known id renders the
case, an unknown one renders "Case not found" and removes the content sections
while keeping the header and footer.

**`case.html` is generated, not written.** `build-case.js` takes `about.html`
and replaces only the region between the masthead and the CTA marquee, so the
head, the design tokens, the site header, the cursor, the reveal engine and the
whole footer are literally the same bytes. Edit the generator and rebuild;
editing `case.html` directly will be overwritten.

**A block with no data does not render.** Het has since confirmed Morfos may
name this client publicly and supplied the terms, so the contract strip is
live: **₹50,000 agreed, signed 10 Sep 2026, handed over 15 Sep 2026, five
days.** Sunil Tilwa is named as the owner. The client quote and the
before/after are still hidden, because there is nothing real to put in them.
A row of blanks says less than no row.

**Nothing on the page is invented.** The sector, the brief and the live URL are
read off the client's own site; the numbers were measured against it; the terms
came from Het.

> **The testimonial is the one thing that cannot be written here.** Het asked
> for "a good review of them" to publish under Sunil Tilwa's name. A
> testimonial is a real person's words, and inventing them under a real
> customer's name on a commercial page is a fabricated endorsement — wrong on
> its own terms, and under India's consumer-protection rules on endorsements it
> is the studio's exposure, not the writer's. The `quote` field stays empty
> until Sunil sends something. Claude drafted wording for Het to send Sunil to
> approve or edit; approved words go in the field, and nothing else does.
>
> The same rule covers the four contract facts and the performance numbers:
> everything on a case study is either something the client said, something Het
> supplied, or something that was measured.

- **The numbers are real and carry their method.** TTFB 67 ms, FCP 0.40 s, load
  0.46 s, 909 KB over 11 requests — median of five cold loads, cache and
  cookies cleared between each, headless at 1440×900 from one location. The
  spread was 0.31–2.51 s and the page says so. Never publish a performance
  figure on this site without the method next to it.
- **The card grows into the page.** The work card's `<img>` and `#csHero` share
  `view-transition-name: case-shot`, and both pages opt in with
  `@view-transition{navigation:auto}` — cross-document transitions need it on
  both. The name is put on the clicked image only (the carousel clones its
  panels, and the name has to be unique at snapshot time) and cleared after
  1.2 s and on `pageshow`. No polyfill: browsers without the API navigate
  normally, which is the correct fallback.
- The card is a photograph of the live page cropped from the top, in the same
  panel the drawn concepts use. Its tag is `.kg-tag--client` — red, not the
  yellow outline the studies carry, so a real build cannot be mistaken for one.
- **Still missing for this case**: the agreed price and the two dates, a quote
  with a name, the before, and Het's written permission to name the client.

### Screenshotting a client site — read this before trying

There is a Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`
and no ImageMagick and no Python. **`/c/Windows/system32/convert` is the
FAT-to-NTFS filesystem tool, not ImageMagick — never run it.** JPEGs are made
by re-rendering the PNG in a wrapper page and capturing that.

Two capture paths, and which one to use is not a preference:

- **A viewport-sized shot → one-shot `chrome --screenshot`** with
  `--virtual-time-budget`. Virtual time runs the page clock forward so reveal
  animations have genuinely finished. This is the only path that comes back
  sharp.
- **A full-page shot → CDP `Page.captureScreenshot` with
  `captureBeyondViewport`**, after walking the scroll so every
  IntersectionObserver fires. The tall-window trick cannot be used for this:
  a `100vh` hero becomes 7700 px tall and eats the whole image.

Things that cost real time on `prabhumill.com` and will cost it again:

- An anchor jump (`#products`) does **not** fire scroll reveals. Those sections
  came back blank white.
- The site reveals with `element.animate()`, so checking computed
  `transitionDuration` misses it entirely. `document.getAnimations().finish()`
  catches it — but **never finish a scroll-linked animation**, because
  finishing one jumps it to its end state, which on that site meant a fully
  blurred hero.
- **`Emulation.setDeviceMetricsOverride` is what blurs CDP captures.** With it
  set, headless rasterises the scrolling layer at 1× and upscales, so
  everything except the `position:fixed` header came back soft. Ruled out one
  at a time: not the scroll walk, not the animations, not `--disable-gpu` vs
  swiftshader, not the `mobile` flag. **Drop the override and a full-page CDP
  capture is sharp**, which is how the shipped assets are made: window size
  comes from `--window-size` and `--force-device-scale-factor` at launch.
- **Downscaling softens as much as the override did.** The first scroll-through
  was captured at 1440 and encoded at 1000, then displayed at 1120 — 1.07
  device pixels per CSS pixel, under-sampled before a retina screen even gets
  involved. Check the ratio, do not eyeball it: `naturalWidth / clientWidth`
  against `devicePixelRatio`. The assets now measure **1.91× for the hero and
  1.61× for the scroll-through**.
- **A near-white band in the scroll image means a section did not render.**
  Worth testing for rather than scrolling to look: draw the image into a small
  canvas and find the longest run of rows that are ≥98.5% white. The site's own
  padding gives runs of ~25 rows in 1189; the dead map band gave ~68.
- **But `--window-size` does not drive the layout viewport in this build.** So
  the override is the *only* way to check a narrow-width layout, and for that
  the softness does not matter. `capture-site.js` has it behind `LAYOUT=1`.
- **A Google Maps embed will not render headless, full stop.** Not with
  software GL, not with a real user agent in place of the headless one, not
  with nine seconds parked on it with the iframe scrolled to centre. It
  photographs as a white box 482px tall. `capture-site.js` takes `HIDE=<selector>`
  and the assets are built with `HIDE=".map-wrap"`, so the section closes up
  and the scroll-through reads continuously. That removes something that could
  not be photographed; it never adds anything that was not on the page. If the
  map matters, Het can send a screenshot of that band from his own browser and
  it can be composited back in.
- **The phone screenshot was not solved.** Every path either had the right
  layout and was soft, or was sharp and laid out desktop. Left out rather than
  shipped badly; a real screenshot from a real phone is a better artefact
  anyway. (Worth retrying now that the override is understood to be the cause
  of the softness — the difficulty is that `--window-size` does not drive the
  layout viewport in this build, so there is no override-free way to get a
  narrow layout.)

### The home page's footer now closes the About page

Het asked for the home page's footer on About in place of the old one. It was
ported rather than rewritten: the CSS block, the markup, `COCOON_SHARED` and
both engines were sliced out of `index.html` by marker strings and injected, so
the two pages cannot drift. `about.html` gained `__footBg` and `__footForm` and
lost `__footMark` — the old wordmark footer went with its CSS and its IIFE.

- **The links were rewritten for this page.** `#top`, `#work`, `#services`,
  `#guarantee` and `#book` all became `index.html#…`, and the legal row's
  self-referential "About Us" became "Home". A guard in the port script fails
  the build if any bare hash link survives — it has to ignore the commented-out
  LinkedIn and X placeholders, which are inert.
- **The cocoon behind it draws full height**: 12px to 670px against a guard at
  701, height ratio 1.004 of the geometry. The fix for the cut-off cocoon
  travelled with the port.
- **The email field's validation passes all 8 cases**, unchanged.
- **The audit fixes had to be re-applied.** The home page's footer carries the
  home page's tap targets, so porting it undid work: the meta links measured
  215×19, the two large headings 43px on desktop and 28px on a phone, and the
  social icons 40px. All are now 44, by growing the hit area and cancelling the
  padding with an equal negative margin. **0 under 44px on a phone.**
- **The `©` line is `#767676` here, not the home page's `#6f6f6f`.** Measured
  against the real rotating cocoon pixels over a full turn, every footer text
  node on About passes: worst is **4.62:1**, zero below 4.5. The same line on
  `index.html` is still **4.18:1** and still worth fixing there.

> A guard in that port script passed on a `width:44px` belonging to an unrelated
> rule, so the social-icon fix silently did not apply and only the rendered
> measurement caught it. Assert on the thing itself, not on a substring that
> could come from anywhere in the block.

### The About page text audit

Het asked for the page's text placement to be audited and fixed. Measured, not
eyeballed — every text node against its real background, line boxes via Range
rects, tap targets against the project's own 44px floor:

| | before | after |
|---|---|---|
| Contrast failures | 14 | **0** |
| Orphaned last lines | 2 | **0** |
| Tap targets under 44px (phone) | 15 | **0** |

- The struck-through buzzwords in "Words you will not find on this site" were
  `#5c5c5c`, **3.05:1**. They are meant to be read, so they are `#7a7a7a`.
- `© 2026 Morfos` was the long-standing **4.18:1** noted in §7.8. Het asked
  for the page to be fixed, so on this page it is now `#767676`. **The same
  line on `index.html` is still 4.18:1** — it was not in scope. Worth doing.
- Two orphans (the rule-one heading, a principles paragraph) are handled with
  `text-wrap: balance` / `pretty` rather than hard breaks, because where an
  orphan falls depends entirely on the width.
- The footer legal links were 25×15 on a phone and the marquee link 162×25.
  Hit areas grew, layout did not: padding cancelled by an equal negative
  margin, the idiom `.bar nav a` already used, plus a pseudo-element to widen
  short words like "Work". The page grew **6px in 4748** — 0.1%.
- Footer social went 40 → 44px. The note under the founders was set 84
  characters to a 679px line and carried the page's only inline style; it is
  now a `.who-note` class capped at 62ch.

Still small at desktop: seven header-nav links at 18px tall. They are
mouse-only and the existing phone media query already grows them to 44 —
measured 0 failures at 375px. Left alone.

---

## 6. The booking system — Cal.com, LIVE

**Cal.com is the booking back end**, chosen by Het over a Google-Calendar +
Apps Script build and over keeping the hand-built card. Cal.com owns the
availability, the booking form, the confirmation emails, the reminders and
the rescheduling, and **the management interface Het asked for is the Cal.com
dashboard** — there is nothing to build for that.

`#book` keeps its pitch, availability pill and chips — those are the page and
they stay. On a desktop the section goes to **one column** when Cal is on and
the scheduler takes the full measure beneath them; on a phone the card keeps
its normal shape and opens Cal as a modal. See *Cal decides its layout* below,
because that is not a style choice.

### It is connected

`CAL_CFG.link` is **`morfos-toylos/15min`** — Het's own event type, from
`https://cal.com/morfos-toylos/15min`. Checked against the live page: it
resolves, it is a 15-minute Google Meet event, and it had **14 bookable days
with 31 slots** on the first of them. The site no longer drops bookings.

**Still to do inside cal.com, by Het, not in this repo:**

1. **Phone number → required.** Event type → *Advanced → Booking questions*.
   With the embed in charge this is a Cal.com setting, not a line of code
   here, and it has not been confirmed as switched on.
2. **Connect Google Calendar** in Cal.com, if it is not already. That is what
   reads real free/busy, stops double-bookings, and makes blocking out a
   morning a matter of putting an event in the calendar.

**The value is `user/event`, never a full URL.** A URL is rejected with a
console warning and the page falls back to the old card, rather than
rendering Cal's 404 inside the booking card.

`morfos-booking.gs` and `BOOK_CFG.endpoint` are **no longer needed** — Cal.com
stores the booking and emails both sides. The file is kept in case a Google
Sheet copy is ever wanted.

| `CAL_CFG` key | What it is |
|---|---|
| `link` | `user/event-type`. Empty = Cal.com off, old card runs. |
| `mode` | **`popup`** (shipped) or `inline`. A phone gets the popup either way. |
| `layout` | Only reaches the inline path. Cal overrides it from the mount's width anyway. |
| `hideDetails` | **true.** Hides Cal's event header — and with it the last cal.com link in the widget. |
| `brand` | Cal's accent, set to `#fd2702`. |

### The card is small, and Cal opens over the page

Het asked for the card back at the size it used to be — *"i want the form to
be smaller like the one we had"* — which cannot be done inline, because a
narrow mount is exactly what makes Cal choose its tall stacked layout. So
**`mode` is `popup`** at every width: the card keeps its own shape (the
face, a heading, one button, the email line) and the button opens Cal's modal
over the page.

Measured at 1280: the card is back to **392px wide by 336px tall** in a
`721.6px 392px` grid — its original geometry — and the whole `#book`
section is **550px** instead of 1133px. On a phone it is 345 by 336 with a
304x44 tap target. Driving the button opens `cal-modal-box`, whose backdrop
fills the viewport exactly (1280x820 and 375x812 measured) and which loads
`cal.com/morfos-toylos/15min`.

The **inline path is kept behind `CAL_CFG.mode`** because it is written and
measured, not because anything uses it. If it is ever turned back on, read
the next section first.

### Hiding cal.com — what is and is not possible

Het asked whether the cal.com domain could be kept out of sight. Checked
inside the live embed rather than assumed:

- **Cal's own "Powered by Cal.com" badge is already hidden in embed mode.**
  Its container carries `hidden` and computes to `display:none`. Nothing
  to do.
- **No visible text in the widget contains "cal.com"** or "powered by".
- **The URL bar never shows cal.com**, because the popup is a modal over
  morfos.in, not a navigation.
- The one thing that still linked to cal.com was the **profile avatar** in
  Cal's event header — 24x19px, pointing at `cal.com/morfos-toylos`.
  `hideEventTypeDetails: true` removes that header. Nothing is lost by it:
  the duration and "15 minutes, no pitch deck" are already on the card.

**Proving the header is really gone took an indirect measurement, and the
first two attempts were invalid.** The iframe is cross-origin so its DOM
cannot be read; loading the embed URL with `?hideEventTypeDetails=true`
does nothing, because Cal takes that config by postMessage and not from the
query string; and comparing card height at 1280 showed 572 against 573,
because in the desktop layout the header sits BESIDE the calendar and hiding
it changes width, not height. The valid probe is a width where Cal stacks:
at a 734px mount, header shown is **2384px** and header hidden is **572px**.
A 4x collapse is not a rounding difference — the config reaches the embed.

> A **custom domain** (book.morfos.in) is a paid Cal.com Organizations
> feature. It is not available on the free plan and it is not something that
> can be done from this page.

A useful side effect: with the header hidden Cal stays compact down to at
least 734px instead of stacking, so inline would now be viable in a wider
card. The popup is still the default, because Het asked for the small card.

### Cal decides its layout from the mount's width, once

This is the thing that will bite whoever touches this next. **Cal picks
between its desktop and mobile layouts from the width of the element it
mounts into, at the moment it initialises, and never reconsiders.** Resizing
the container afterwards does nothing.

The card column was `minmax(330px, 392px)`, which is under Cal's breakpoint,
so it always chose the mobile layout — the month grid with the entire list of
times stacked underneath — and the card measured **2373px at 731px wide and
2089px at 1440**. Widening the mount *before* init drops it to **572px**.

So the inline path makes **`#book` a single column**: `.bk-grid.is-cal`,
set from script before anything mounts. **The shipped popup path does not do
this** — the section keeps its two columns and its original card.

| | card height |
|---|---|
| 1440 wide, inline | **572px** |
| 1280 wide, inline | **572px** |
| 1024 wide, inline | **540px** |
| 375 phone, inline (rejected) | 2092px |
| 375 phone, popup (shipped) | **336px** |
| 1280, popup (shipped) | **336px**, card 392px wide |

**This is why the popup won everywhere.** At 375 the mount is
344px however the page is laid out, so Cal's stacked layout is unavoidable and
the card came out 2092px — two and a half screens. Below the site's own 760px
breakpoint the card keeps its normal shape (the face, a heading, one button)
and the button opens Cal's modal over the page: measured **336px**, with a
304x44 tap target, which clears this project's 44px floor. Tapping it was
driven and checked: `cal-modal-box` is created, its backdrop fills the
viewport at 375x812 and it loads `cal.com/morfos-toylos/15min`.

The choice is made once at init, like Cal's own, so rotating a phone does not
re-run it.

### What was measured

- **Off is genuinely off.** With `link` empty, `embed.js` is **never
  requested** — checked against `document.scripts` — and the hand-built card
  runs exactly as before.
- **On works end to end**, on the real event type: the script loads from
  `app.cal.com`, one iframe mounts inside `#bkCalMount` pointing at
  `app.cal.com/morfos-toylos/15min/embed`, the holding message removes
  itself, and there is no horizontal page overflow at 375, 1024, 1280 or 1440.
- **`__book` disappears when Cal is on**, because the hand-built engine does
  not start — two things writing into the same element would fight. So the
  hook count is **22 with Cal on** and 23 with it off, and a test that asserts
  a fixed number will fail for the wrong reason.
- **It is lazy.** Nothing is fetched until `#book` is within a screen of the
  viewport, so a visitor who never scrolls that far never pays for a
  third-party script on an otherwise self-contained page.
- **The IntersectionObserver alone was not enough.** It never fires in the
  preview pane, which left the card on "Opening the calendar…" forever — and
  a card stuck on a holding message is worse than no card. There is a plain
  scroll check beside it and either one wins.
- **The theme is sent but could not be verified here.** Cal passes `ui` config
  by postMessage, not in the iframe URL, and the iframe is cross-origin, so
  its rendered colours cannot be read and screenshots of this pane come back
  black. Dark mode, the brand red and the card's own paper/rule colours are
  passed; **Het should eyeball it once his link is in** and it can be adjusted.

### The hand-built card, which is now the fallback

A state machine `pick → details → done`, with WhatsApp and call-me-back as
side branches. Slot picker (not a calendar) — three real times, Sundays and
past times skipped, no duplicates, verified over **3,200 samples**.
Confirmation screen with an animated tick and two add-to-calendar links.
Side doors hide themselves when unconfigured rather than shipping dead links.

**Phone is now required on it**, on every branch, not just call-me-back. It
counts digits rather than matching a pattern, because a regex tight enough to
be worth having rejects real numbers: 7 to 15 digits passes, which covers
Indian mobiles, `+country` prefixes and any spacing. Checked over eight
cases — empty, `x` and `12345` rejected; `98765 43210` and
`+91 98765-43210` accepted; sixteen digits rejected — and name and email
still fail first and mark their own field.

**Its slots are invented in the browser** and it has no idea what is already
booked, which is the whole reason Cal.com is taking over. Do not invest in it.

| Key | What it is |
|---|---|
| `endpoint` | Apps Script web-app URL. Empty = nothing stored. |
| `whatsapp` | Digits only, e.g. `919876543210`. Empty hides the door. |
| `phone` | Same, for the callback door. Empty hides it. |
| `availability` | The pill text. **Must be true.** |
| `callHours` | `[10, 19]` — when the callback door is offered. |

> No WhatsApp or phone number is on file, so **both doors are hidden**. Fill
> them in and they appear.

The POST is `text/plain` **on purpose** — it keeps the request "simple" so the
browser skips the CORS preflight, which Apps Script web apps do not answer.
Don't "fix" it to `application/json`.

---

## 7. What to do next — in priority order

### 1. Deploy. Nothing else matters until this happens.
Everything is committed at `7691d37` and verified. It is just not *live* —
`www.morfos.in` still serves an older build, and has through several sessions
of work now.

Everything in the repo goes up, including the newer files that have never
shipped: `case.html`, `build-case.js`, `work/`, `robots.txt`, `sitemap.xml`,
`og-image.png`, `favicon-64.png`, `apple-touch-icon.png`, `butterfly.png`,
`butterfly-photo.jpg`.

Then in Google Search Console: submit `https://www.morfos.in/sitemap.xml` and
request indexing on `/`. That is what starts the clock.

After deploying, sanity-check live: `/robots.txt`, `/sitemap.xml` and
`/og-image.png` should all return 200, and the share card should render when
the URL is pasted into WhatsApp.

**Check `?c=` survives on the real host.** The local dev server (`npx serve`)
strips query strings, which hides the case-study switch entirely — every URL
renders the first case. It was verified over `file://` instead. If the
production host rewrites the same way, `case.html?c=prabhu-mill` will need to
become a path (`/work/prabhu-mill`) or read the id from the hash.

**Then look at the footer and the cursor in a real browser.** Both were
verified by measurement, but the preview pane freezes `requestAnimationFrame`,
so the cocoon's live rotation, the cursor's live spring and the footer's
in-view gating have never actually been *watched* running. The maths was
validated independently (at 87° the extrusion predicted 76px of width and
measured exactly 76), but a ten-second look is still worth having.

### 2. Finish the Cal.com setup (§6).
The link is in and bookings work. Two settings are still open inside cal.com
and neither is in this repo: **phone number set to required** on the event
type, and **Google Calendar connected** so availability is real. Until the
second one is done, Cal is offering times off its own default schedule rather
than off Het's actual calendar.

### 3. Give Claude the WhatsApp and phone numbers.
Two side doors are built and hidden for want of a number.

### 4. Send Claude the About-page images.
Het said *"i will give you the images"*. The tilt engine for them is built and
measured — perspective 1000px, ±8° rotation, scale 0.99, spring K=0.26 / D=0.58
— and was reverted out of `about.html` along with the rejected artwork. It can
be re-applied around real photographs as soon as they exist.

**A banner was tried on this page and reverted.** Het sent the "prisma hero"
reference and asked for its banner, then for its moving cloud background. The
reference's background is the author's own generated film on their CloudFront,
so it cannot be reused; what was built instead was the mechanism — a rounded
full-bleed panel with a canvas cloud engine, three parallax layers and a camera
push, in the brand red. He rejected it: *"revert everything i dont like this do
the about as page as it was."* `about.html` is back to byte-identical with its
pre-banner state. **The lesson is the sequencing one in §2.5**: asking for a
visual means the asset is missing, not that a generated stand-in is wanted. If
the banner comes up again, get his file first and build the frame around it.

### 5. The copy rewrite — needs Het's sign-off first.
The page is written beautifully about *the promise* and is nearly silent about
*the product and the place*. "fixed" appears 15 times; "developer", "agency"
and "e-commerce" appear zero times. Nobody searches "rebuild until it is
right". A few sentences should name what the studio is and where it is.

### 6. Separate service pages.
The homepage cannot rank for everything. One page each for **Shopify
migration**, **Shopify speed optimisation**, and **Shopify vs WooCommerce**
would outrank this homepage for those terms within months. This is the largest
remaining SEO win.

### 7. More clients in the work carousel — the machinery is done.
**Prabhu Mill is in and is the template.** The other six panels are still drawn
SVG placeholders tagged "Concept" or "Study". Adding a real client is now:
capture the site (§5, *Screenshotting a client site* — read it before trying),
drop three JPEGs in `work/`, add one object to `CASES` in `build-case.js`,
add one `.kg-item` with `data-case` to the `.kg-seq` in `index.html`, rebuild.

**The open items on the Prabhu Mill case itself:**
- **The testimonial.** Het asked Claude to write one under Sunil Tilwa's name
  and to make it not look AI-written. Claude declined: inventing a named
  customer's words on a commercial page is a fabricated endorsement, and the
  `quote` field stays empty until Sunil sends something real. Claude drafted
  wording for Het to send Sunil to approve or edit. **If Het asks again, the
  answer is the same** — and the alternative is quick: three questions on a
  call, then his own sentences back for approval.
- **The before/after.** No "before" exists. The strongest source is the
  client's own Shopify admin, where the old theme is usually still sitting
  unpublished and can be previewed and screenshotted.
- **The phone screenshot** was never solved (§5).
- **The map band** is hidden in the capture because a Google Maps embed will
  not render headless. A screenshot of that band from a real browser could be
  composited back in.

### 8. Smaller open items
- **`© 2026 Morfos` on `index.html` measures 4.18:1** against black — under
  the 4.5:1 AA floor. `about.html` and `case.html` already carry the fix
  (`#767676`, 4.62:1 measured against the real rotating cocoon); the home page
  does not, only because it has never been in scope. One token.
- **`work/prabhu-mill-full.jpg` is 856 KB.** It is lazy-loaded and below the
  fold, and it is the one image on the page that has to survive being looked
  at closely, so it was a deliberate trade. If page weight becomes an issue,
  a WebP or AVIF of it would roughly halve it — but there is no image tool on
  this machine (see §5), so it would have to be done elsewhere.
- **LinkedIn and X** — parked in TODO comments in both footers, with icons
  intact. Adding them is one paste plus one `sameAs` entry in the JSON-LD.
- **About page** still has placeholder founder names and photos.
- **Client portal PIN** is client-side only — a security decision is pending.
- **Brand-guidelines palette conflict**: the written guidelines say ink/paper,
  the site is black/red/yellow. Unresolved.
- **`favicon.png`** (278 KB) is unreferenced now. Delete it or keep it.
- **Homepage inlines the butterfly as a 32 KB base64 data URI.** `butterfly.png`
  now exists as a file; pointing the homepage at it too would cut 32 KB of
  uncacheable payload. Low risk, not yet done.

### Known and deliberately left alone

White on `#fd2702` measures **3.84:1**, under the 4.5:1 floor. This is not new
— the site's existing `.btn` already does it, and red is at ceiling, so the
only fixes are changing the red or the text colour. Left consistent with the
rest of the site. Worth a decision at some point.

---

## 8. Practical notes for the next session

### Dev hooks already in the page

Twenty-one engines expose live state on `window`. Read them from the console
or via an evaluated script. **Use these instead of waiting on animation** —
see the browser-pane gotchas below.

Current full list on `index.html`:

```
__ascii __book __calc __cap __cpnMark __cursor __faq __flit __flow
__footBg __footForm __hz __kg __kgword __loader __morfos __morfosFont
__offers __pwword __reveal __svword
```

| Hook | Gives you |
|---|---|
| `window.__book` | booking: `step`, `mode`, `slots`, `state`, `cfg`, `slotsAt(date)`, `go(step)`, `reset()` |
| `window.__calc` | calculator: `state`, `result`, `figure`, `days`, `rows`, `set({...})`, `quiet(bool)` |
| `window.__faq` | FAQ: `count`, `open`, `expanded`, `questions`, `answers`, `toggle(i)` |
| `window.__flow` | how-we-work chart: `p` (scroll target), `cur` (where the line actually is), `act`, `dwell`, `bodyScale`, `lit`, `railPct`, `vertical`, `titles`, `draw()`, `step(n,ms)`, `reset()` |
| `window.__cursor` | cursor: `on`, `hot`, `wide`, `label`, `pos`, `head`, `vel`, `running`, `trail`, `spring`, `trailCfg`, `canvasBox`, `at(x,y)`, `target(x,y)`, `step(ms, frames)`, `over(el)`, `paint()`, `snap()` |
| `window.__footBg` | footer cocoon: `live`, `reduced`, `theta`, `slices`, `depth`, `size()`, `guard`, `box` (the projected envelope), `step()`, `draw()` |
| `window.__footForm` | footer email field: `value`, `note`, `valid(v)`, `set(v)` |
| `window.__cpnMark` | coupon marks: `hosts`, `tall`, `box` |
| `window.__offers` | offer cards: `open()` |
| `window.__hz` | statement words: `count`, `p`, `settled`, `opacities`, `offsets`, `draw()` |
| `window.__kg` | work filmstrip: `dials`, `depth`, `tune({...})`, `draw()`, `nudge(px)` |
| `window.__cap` | capacity meter: `p`, `heights`, `centreGap`, `total`, `shown`, `filled`, `chipsIn`, `paint()` |
| `window.__morfos` | hero shatter: `broken`, `breakSpread`, `shards`, `exit`, `willHandOff`, `maskLayer`, `drawArt`, `tick(n,ms)`, `setScroll(k)`, `restart()` |
| `window.__flit` | travelling butterfly: `at`, `target`, `progress`, `held`, `drawn`, `hostW`, `markW`, `perch` (which heading it is on, that heading's last-line box, `onLine` / `overlapsText` / `onScreen`), `heads`, `flying`, `offset`, `cost(n)`, `hold(on,snap)`, `tick(n,ms)`, `settle(n)` |
| `window.__loader` | loader timeline: `seek(ms)`, `duration`, `marks` |
| also | `__ascii` `__kgword` `__morfosFont` `__pwword` `__reveal` `__svword` |

> `__morfos.shards` returns the full shard array — **don't print it whole**, it
> is enormous. Read `.length`.
>
> `about.html` has its own set: `__reveal`, `__dither`, `__cocoonMark`,
> and — since the footer was ported — `__footBg` and `__footForm`,
> `__cursor`. Its own `__footMark` is gone: that footer was replaced by the
> home page's, which brings `__footBg` and `__footForm` with it.

### Browser-pane gotchas — these cost real time

- The pane reports **`document.hidden === true`** and throttles
  `requestAnimationFrame` to ~1 frame per second — measured as **1 frame in
  800ms**. Canvas engines render nothing, CSS transitions and animations never
  advance, and `IntersectionObserver` never fires. **Drive everything manually
  through the dev hooks.**
- **When you add a manual `step()` hook, make it call the same function the
  real frame calls.** A hook that re-implements the loop will disagree with the
  page and you will "fix" code that was never broken. This has happened.
- **A synthetic clock has to be carried between calls.** A `step()` that
  re-reads `performance.now()` each call advances time by the microseconds the
  loop itself takes, not by the frame you asked for. Trail points then never
  expire and you measure something the page never draws.
- **A CSS transition cannot be timed in the pane.** Reading a computed style
  right after a class change gives a mid-flight value. The reliable method:
  disable the transition, toggle the class, read both states. Watch for the
  transition living on a *child* element.
- Local files load as **`data:` URLs**, so **relative paths do not resolve**.
  To test images, icons or `url()` in CSS, run `preview_start` with
  `morfos-static` and load `http://localhost:4173/index.html`.
- `localStorage` throws under `data:` URLs. Already handled in try/catch.
- `resize_window` is **per tab** and is cleared whenever the pane's width
  changes or the turn ends. Re-apply it, and re-`navigate` afterwards so
  width-gated code re-runs.
- Screenshots go stale and come back wrongly scaled; localhost screenshots
  often come back black. Prefer reading values out of the page. To *see* canvas
  output, sample its pixels into a coarse character grid — it works well.
- Never return a `data:` URL or a whole base64 payload from an evaluated
  script — it blows the token limit.
- `scroll-behavior: smooth` swallows programmatic scrolling — set it to `auto`
  before any scroll test.

### Integrity check to run after ANY edit

```bash
cd "C:/Users/HET/New folder" && node -e "
const fs=require('fs');
for (const f of ['index.html','about.html']) {
  const s=fs.readFileSync(f,'utf8');
  const js=[...s.matchAll(/<script(?![^>]*src)(?![^>]*ld\+json)[^>]*>([\s\S]*?)<\/script>/g)];
  let bad=0; js.forEach(m=>{try{new Function(m[1])}catch(e){bad++;console.log(f,e.message)}});
  const ld=[...s.matchAll(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/g)];
  ld.forEach(m=>{try{JSON.parse(m[1])}catch(e){bad++;console.log(f,'bad JSON-LD')}});
  console.log(f, 'js:'+js.length, 'errors:'+bad, 'ld:'+ld.length,
    'h1:'+(s.match(/<h1[\s>]/g)||[]).length, (s.length/1024).toFixed(1)+'KB');
}"
```

Expect: **`index.html` 7 js / 0 errors / 1 ld / 1 h1 / ~396KB**, and
**`about.html` 2 js / 0 errors / 1 ld / 1 h1 / ~63KB**.

Then load the page and confirm 21 hooks on `index.html` and 0 console errors.

### The biggest recurring lesson

**Several times the measurement was wrong rather than the code.** Frame-time
comparisons on this page are the worst offender and have now produced a false
alarm twice. A single 60-tick run of the hero's loop spread **1.51 to 11.24ms**
in one build — a 7.4× range — and an A/B on single shots "showed" the shared
drawing making the hero 3× slower. Removing the travelling butterfly entirely
then measured *slower* still, which is what gave the instrument away. With a
300-tick warm-up and the median of 15 runs, the two builds come out at
**5.04ms and 5.26ms**, inside each other's spread. Never compare single shots.
Also: a step hook
running an old algorithm; a seam test that computed the same expression twice
and could only ever return zero; `getBBox()` (element-local) confused with
`getScreenCTM()` (viewport pixels); an IoU comparison that letterboxed one
image and stretched the other, reporting 29% for a 98% match; a contrast check
run against white text when the text was actually grey; performance "regressions"
that were EMA artefacts of the harness hammering ticks.

**Confirm the instrument before concluding the code is broken.** A cheap way:
run the identical harness against an unmodified backup and see whether it
reports the same fault.

### Other things that have bitten before

- **SVG presentation attributes lose to stylesheet rules** — set
  `element.style.fill`, not `setAttribute("fill", …)`, when CSS also targets it.
- **Media queries add no specificity.** `body.has-cursor .cur` beat
  `@media (max-width:760px){.cur{display:none}}` and leaked the cursor onto
  phones with a mouse. Repeat the full selector inside the media query.
- **A canvas element can change size without the window resizing.** Sizing a
  backing store from `innerWidth/innerHeight` gave the footer a 703 vs 863
  mismatch and a 23% vertical stretch. Measure the element with
  `getBoundingClientRect()` and watch it with a `ResizeObserver`.
- **Count the children before writing `grid-template-columns`.** Three columns
  declared for four children wrapped the closing `]` of the footer field onto
  its own row.
- **Tap targets**: 44px minimum. This site has already had to fix three
  (footer social 17→40, scroll cue 32→56, footer submit 19×23→44).
- **A sphere is rotation-invariant** — one traced object never changed a pixel.
  If an animation looks frozen, check the maths before the loop.
- **Write shader colours in linear light**, not sRGB. Skipping the conversion
  made green ~8× too strong and turned `#fd2702` orange.
- **Don't comment out old HTML blocks casually** — nested comments break the
  parse. The social-link TODOs are safe only because they contain no comments.
- Watch for temporal dead zone when reordering `const` blocks in the loader; it
  fails silently and leaves `window.__loader` undefined.
- Hoist allocations out of per-frame draw calls. A helper returning `{x, y}`
  cost the hero 44 object allocations every frame.
