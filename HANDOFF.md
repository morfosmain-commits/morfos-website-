# MORFOS — session handoff

**Paste this whole file into a new Claude session to pick the work up.**
It covers what the project is, how to work on it, what exists on disk, what is
finished, and what to do next — in priority order.

Last updated: 2026-09-20 (end of the dither-reveal + About text-audit session).

---

## 0. The two things to know first

1. **Nothing is deployed.** `www.morfos.in` is still serving an older build.
   Until the current files ship, none of the SEO work, none of the copy
   changes and none of the bug fixes are live.
2. **Commit `546d4ca "Update website"` captured the footer mid-rebuild** — it
   contains a broken bracket layout, a 19×23px tap target and a failing
   contrast ratio. All the fixes for those, plus everything since, are sitting
   **uncommitted** in `index.html` and `about.html`. Do not treat the last
   commit as a good state to fall back to.

Deploying is step 1 of §7.

---

## 1. What this is

MORFOS is a Shopify launch-partner studio based in **Mumbai, Maharashtra**. It
sells fixed-price Shopify store builds delivered in 7 days, backed by a 14-day
refund and a rebuild-until-right commitment.

The site is **self-contained static HTML** — no build step, no framework, no
package manager, no bundler. All CSS, JS, traced SVG geometry and canvas
engines live inside the HTML files themselves. **Keep it that way** unless
explicitly told otherwise.

- **Working directory:** `C:\Users\HET\New folder`
- **Platform:** Windows 11. The Bash tool is Git Bash; PowerShell also works.
- **Git:** yes. Last commit `546d4ca`, branch `main`. See §0 point 2.
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
| `index.html` | 415 KB | **The main site.** Most work happens here. Was `morfos.html` — renamed. |
| `about.html` | 78 KB | About page. Broadsheet layout. Same site header, same cursor engine. Carries the dither-reveal panel. |
| `client-roster.html` | 164 KB | Client portal, PIN-gated. `noindex,nofollow`. |
| `frostbreak.html` | 18 KB | Unrelated scratch demo. Live but `noindex,nofollow`. |
| `morfos-booking.gs` | 5 KB | Google Apps Script for the booking endpoint. **Not part of the site** — it gets pasted into script.google.com. |
| `robots.txt` | 0.2 KB | Allows all, disallows portal + demo, points at the sitemap. |
| `sitemap.xml` | 0.4 KB | 2 URLs: `/` and `/about.html`. |
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
| **Hero** | Canvas butterfly that shatters into 22 shards on pointer proximity and reassembles. Click impulse, drag with throw, wing beat, magnetic pills. Leaving the hero knits it back together and flies it out — see below. |
| **Statement** (`#statement`) | Word-by-word mask reveal, retimed to finish mid-screen. |
| **Work** (`#work`) | 3D perspective filmstrip, draggable, 12 cloned panels with drawn SVG artwork. |
| **Services** (`#services`) | Three stepped panels + ASCII canvas + per-letter corner word. |
| **How we work** (`#process`) | Flow chart: a rail that draws itself, four nodes lighting in order. Vertical on phones. |
| **Offers** (`#referral`) | Two torn two-part coupon tickets, viewBox 300×186, notches cut with an SVG `<mask>`. Each carries the real traced cocoon mark at 28 units tall. |
| **Calculator** (`#calculator`) | Working price calculator, geometric product slider, rolling digit figure. **Floor is ₹68,000**, default reads ₹1,00,000–₹1,22,000. |
| **Guarantee** (`#guarantee`) | Curtain-reveal cards + animated capacity meter. |
| **FAQ** (`#faq`) | Six Q&A, accordion, first open by default. |
| **Booking** (`#book`) | Full state machine. See §6. |
| **Footer** | Full-viewport closing screen. See below. |
| **Cursor** | Spring-damper follow + tapered trail ribbon. See below. |

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

Behind it, the **traced MORFOS cocoon extruded into 26 depth slices**, rotating
about its vertical axis in `#fd2702` tones. The horizontal scale *is* `cos θ`
and each slice steps along `sin θ` — a real rotation, not a sprite. It fades
out with a `destination-out` gradient just above the bottom legal row, which
is the only thing in the footer set in greys too quiet to carry a backdrop.

- **The object is fitted whole into the band above that row.** It used to be
  scaled to `0.78H` and centred at `0.52H`, with the erase gradient running
  `0.42H → 0.54H` — which meant roughly **half the form was erased** and it
  read as cut off (measured: drawn bottom 385px against a geometric bottom of
  655px, 52% of the shape). It now measures the top of `.foot-row` in `size()`,
  exposes it as `__footBg.guard`, and scales to `0.96` of the band above it.
  Verified across 18 angles at three viewports: the drawn height is 1.002–1.016
  of the geometry (the excess is the 2.2px rim stroke) and never crosses the
  guard. At exactly 90° nothing draws, because the form is edge-on — that is
  the maths, not a bug.
- **Contrast was re-measured, not assumed.** Every text node in the footer was
  sampled against the real canvas pixels over 16 angles, before and after. The
  numbers are identical: worst case is still the `© 2026 Morfos` line at
  **4.18:1**, which is the pre-existing pure-black value in §7.8. Everything
  else is 5.47:1 or better.
- The guard is read in `size()`, not in `draw()` — a `getBoundingClientRect()`
  per frame would thrash layout at 60fps.

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

## 6. The booking system — BUILT, one step from working

`#book` is a two-column block: pitch on the left, interactive booking card on
the right. A state machine `pick → details → done`, with WhatsApp and
call-me-back as side branches.

- Slot picker (not a calendar) — three real times, Sundays and past times
  skipped, no duplicates. Verified over **3,200 samples**.
- Name + email required, phone optional. Confirmation screen with an animated
  tick and two add-to-calendar links (Google, plus a generated `.ics`).
- Side doors hide themselves when unconfigured rather than shipping dead links.

### THE ONE STEP LEFT

`BOOK_CFG.endpoint` is `""`, so **nothing is stored and no email is sent.**
Everything else works end to end. To finish:

1. Open `morfos-booking.gs`, follow the comment at the top — new Google Sheet
   → Extensions → Apps Script → paste → Deploy as web app, "Anyone" access.
   About 4 minutes.
2. Paste the web-app URL into `BOOK_CFG.endpoint`, at **line ~7300 of
   `index.html`** (search for `const BOOK_CFG`; the line number drifts with
   every edit, so search rather than trusting it).

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

### 1. Commit, then deploy. Nothing else matters until this happens.
There are two modified files (`index.html`, `about.html`) and the last commit
is a **bad intermediate state** (§0). Commit the working tree first.

New files that must go up: `robots.txt`, `sitemap.xml`, `og-image.png`,
`favicon-64.png`, `apple-touch-icon.png`, `butterfly.png`.
Then in Google Search Console: submit `https://www.morfos.in/sitemap.xml` and
request indexing on `/`. That is what starts the clock.

After deploying, sanity-check live: `/robots.txt`, `/sitemap.xml` and
`/og-image.png` should all return 200, and the share card should render when
the URL is pasted into WhatsApp.

**Then look at the footer and the cursor in a real browser.** Both were
verified by measurement, but the preview pane freezes `requestAnimationFrame`,
so the cocoon's live rotation, the cursor's live spring and the footer's
in-view gating have never actually been *watched* running. The maths was
validated independently (at 87° the extrusion predicted 76px of width and
measured exactly 76), but a ten-second look is still worth having.

### 2. Connect the booking endpoint (§6).
Right now the site takes bookings and silently drops them. This is the highest
business risk on the list.

### 3. Give Claude the WhatsApp and phone numbers.
Two side doors are built and hidden for want of a number.

### The dither-reveal panel on `about.html`

Het sent the Originkit "Dither Reveal" component and asked for it on the About
page. It is in the **"Who you talk to"** section, directly above the note that
has always promised photographs — it *is* that slot. The picture is drawn as a
three-tone dithered monochrome field and the pointer carries a soft circle of
the real image with it, over a slow wave distortion.

Ported shader for shader. What went was the React wrapper only — this site has
no build step and stays that way. The defaults are the component's own:
bayer8, dot 5, reveal 100 at 50% softness, wave on at 82 with density 25,
cover, focus 50. The engine is on `window.__dither` with `tick(n, ms)`,
`at(x, y)`, `away()`, `paint()` and `settings`.

**Two things about the source could not be shipped as they were.**

1. **Its image is not usable.** The component's own default is a dead
   `blob:` URL and its fallback is somebody's Unsplash photograph. The panel
   points at `butterfly.png` until Het sends a picture; `data-src` on the
   `.dith` div is the whole switch.
2. **Its `contain` branch is wrong.** `fitUv` reads `1.0 / cover`, which
   inverts each axis but does not swap them, so a portrait picture in a
   landscape panel comes out stretched across the full width — measured, the
   mark rendered at aspect ~3.7 against its true 0.844. Contain is cover with
   the axes swapped **and** inverted. Corrected in place and commented; the
   cover branch is untouched. After the fix the rendered ink measures 0.846
   against the source's 0.844, **0.3% error**, in a 1.78 panel. The panel is
   set to `contain` only because the holding mark is a cut-out; drop
   `data-fit` when the photograph arrives and it is back on the default.

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

### 7. Real work screenshots.
The filmstrip uses drawn SVG placeholders tagged "Concept". Only the hero
fragment of each panel needs changing.

### 8. Smaller open items
- **`© 2026 Morfos` in the footer measures 4.18:1** against black — under the
  4.5:1 AA floor. It is `#6f6f6f` and is **pre-existing**, left alone
  deliberately rather than restyling something Het didn't ask about.
  `#767676` fixes it (4.54:1) if he wants it fixed.
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
| `window.__flow` | how-we-work chart: `p`, `lit`, `railPct`, `vertical`, `titles`, `draw()` |
| `window.__cursor` | cursor: `on`, `hot`, `wide`, `label`, `pos`, `head`, `vel`, `running`, `trail`, `spring`, `trailCfg`, `canvasBox`, `at(x,y)`, `target(x,y)`, `step(ms, frames)`, `over(el)`, `paint()`, `snap()` |
| `window.__footBg` | footer cocoon: `live`, `reduced`, `theta`, `slices`, `size()`, `guard`, `step()`, `draw()` |
| `window.__footForm` | footer email field: `value`, `note`, `valid(v)`, `set(v)` |
| `window.__cpnMark` | coupon marks: `hosts`, `tall`, `box` |
| `window.__offers` | offer cards: `open()` |
| `window.__hz` | statement words: `count`, `p`, `settled`, `opacities`, `offsets`, `draw()` |
| `window.__kg` | work filmstrip: `dials`, `depth`, `tune({...})`, `draw()`, `nudge(px)` |
| `window.__cap` | capacity meter: `total`, `shown`, `filled`, `chipsIn`, `run()` |
| `window.__morfos` | hero shatter: `broken`, `breakSpread`, `shards`, `exit`, `willHandOff`, `maskLayer`, `drawArt`, `tick(n,ms)`, `setScroll(k)`, `restart()` |
| `window.__flit` | travelling butterfly: `at`, `target`, `progress`, `held`, `drawn`, `hostW`, `markW`, `hold(on,snap)`, `tick(n,ms)`, `settle(n)` |
| `window.__loader` | loader timeline: `seek(ms)`, `duration`, `marks` |
| also | `__ascii` `__kgword` `__morfosFont` `__pwword` `__reveal` `__svword` |

> `__morfos.shards` returns the full shard array — **don't print it whole**, it
> is enormous. Read `.length`.
>
> `about.html` has its own, much smaller set: `__reveal`, `__footMark`,
> `__dither`,
> `__cursor`. Its `__footMark` is the About masthead, unrelated to the footer
> wordmark that was removed from `index.html`.

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
