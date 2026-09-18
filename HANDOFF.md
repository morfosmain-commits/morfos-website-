# MORFOS site — session handoff

Paste this whole file into a new Claude session to pick the work up. It covers
what the project is, what exists on disk, what has been finished, what is
half-open, and what to do next.

---

## 1. What this is

MORFOS is a Shopify launch-partner studio. The site is a **single
self-contained HTML file** — no build step, no framework, no package manager,
no server. Everything (CSS, JS, traced SVG geometry, canvas engines) lives
inside `morfos.html`. Keep it that way unless explicitly told otherwise.

**Working directory:** `C:\Users\HET\New folder`
**Platform:** Windows 11. The Bash tool is Git Bash; PowerShell is also
available. Not a git repository.

### Standing instructions from Het (these apply to every task)

1. **"Keep self verifying until it is perfectly done."** Attached to nearly
   every request. It means *measure*, don't assert — drive the page in a
   browser and read numbers back out of it. Screenshots alone are weak
   evidence. Iterate until the measurement passes, then hand over.
2. **"Don't make any other changes, keep other things as it is."** Scope is
   tight. Prove it by diffing against a backup taken before the edit.
3. **Reference sites: take the structure, never the styling.** Het briefs work
   by sending a URL, screenshot or artifact and asking for "this kind of"
   thing. Copy the *mechanism and layout*; the palette, typefaces, copy and
   artwork always come from MORFOS's own system.
4. **The brand red is `#fd2702`.** Red is already at ceiling, so any lighter
   tint must raise **green and blue together** — raising green alone walks the
   hue toward orange and Het rejects it. Check by computing the hue of every
   lit pixel: median should sit near 9°, with almost nothing above 20°.

---

## 2. Files

### Live project files (`C:\Users\HET\New folder\`)

| File | Size | What it is |
|---|---|---|
| `morfos.html` | ~246 KB | **The main site.** All work happens here. |
| `about.html` | ~53 KB | About page. Shares the traced mark geometry. |
| `client-roster.html` | ~164 KB | Client portal (PIN-gated). |
| `frostbreak.html` | ~18 KB | Older/unrelated page. |
| `morfos-booking.gs` | ~5 KB | Google Apps Script for the booking endpoint. Not part of the site — it is pasted into script.google.com. |
| `HANDOFF.md` | — | This file. |

### Backups (scratchpad — restore points, newest last)

`C:\Users\HET\AppData\Local\Temp\claude\C--Users-HET-New-folder\756a551a-6ebd-484b-b02f-47cb17e1584a\scratchpad\`

`morfos.bak.html` → `morfos.preHero.html` → `morfos.preSPerch.html` →
`morfos.preHero2.html` → `morfos.preSize.html` → `morfos.preWhite.html` →
`morfos.preDust.html` (most recent, taken before the particle-scroll work).
Also `about.bak.html`.

A newer backup, taken before the booking work, is in this session's own
scratchpad: `5553c707-ea62-45c9-b211-06287f10a8b3/scratchpad/morfos.preBook.html`,
with the patch scripts `book.js` .. `book6.js` under `t/`. A second,
`morfos.preBfly.html`, was taken before the hero-lockup work
(`bfly.js` .. `bfly8.js`), and `morfos.postOverlapFix.html` after it. `morfos.preCurtain.html` is the state
before the guarantee cards (`curtain.js`).

> **Note:** the scratchpad is session-scoped and may be cleared. If these
> backups matter, copy them somewhere permanent before starting.

### Patch scripts (`scratchpad/t/`)

Every edit to `morfos.html` was made by a small Node script rather than by hand,
because the file is large and the edits are surgical. **Keep using this
method.** Each script reads the file, does exact-match string replacements that
*throw if the match count is not exactly 1*, and writes it back:

```js
const rep = (a, b, label) => {
  const n = s.split(a).length - 1;
  if (n !== 1) throw new Error(label + ": " + n + " hits");
  s = s.split(a).join(b);
};
```

This has caught several near-misses (e.g. a marker string that appeared twice —
once in CSS, once in JS). Write patch scripts with the **Write tool**, not a
bash heredoc: backticks and `${}` in the payload break shell parsing.

Notable scripts, in rough order of the work:
`png.js`, `geom.js`, `build.js`, `verify.js`, `emit.js`, `wing.js`, `raster.js`
(the logo tracing pipeline) · `patch.js`, `coupon.js`, `about.js`,
`meta-patch.js`, `meta2.js` (mark rollout) · `flit.js`, `flit2.js`, `corner.js`,
`dodge.js`, `rects.js`, `perch.js`, `perch2.js` (travelling butterfly) ·
`hero.js`, `hero2.js` (hero wordmark + break) · `size.js`, `white.js` (hero
type) · `dust.js` … `dust8.js` (particle scroll).

---

## 3. What is already done

### The logo mark
The cocoon/chrysalis was traced from Het's supplied PNGs to sub-pixel accuracy
(**97.556% IoU**). Pipeline: a minimal PNG decoder in Node → connected-component
labelling → Moore-neighbour contour tracing → Douglas–Peucker → arc-length
resampling → **Taubin smoothing** (λ=0.62 / μ=−0.64) → **centripetal
Catmull-Rom** (α=0.5) → cubic Bézier. Verified with an own-built scanline
rasteriser against the source bitmap.

Lives as `window.MORFOS_MARK` (128 POD points, 128 CARD points, `morph(t)`,
`podD`, 5 `cuts`, `ringD`/`ringW`, `bar`, `stem`) and `window.MORFOS_WING`
(butterfly: `RING` 128 pts, `ringD`, 5 `cuts`). Both are defined **just after
`<body>`** so every later script can see them. Used by the loader, the footer
lockup, the coupon cards and the About page stamp.

### The loading screen
Cocoon morphs → chrysalis opens → butterfly emerges and **perches on the S** of
MORFOS while the **O fades back in**. Timeline total 5720 ms. Then it hands the
butterfly over to the page.

### The travelling butterfly (`.flit`)
Starts docked on the corner logo, flies under the header and down the right
side, and **parks in the bottom-right corner** for the rest of the page. It
never crosses the middle. It checks what is underneath it against the real text
boxes and steps to the nearest clear spot (`SPOTS`, 20 corner-relative offsets).
Verified: **zero resting overlaps with text** across 25 scroll positions at
1440×900 and 21 at 1024×820. Hidden below 860 px — at phone width there is
genuinely no clear corner.

### The hero
- **Wordmark** behind the butterfly is the logo serif (Playfair Display 500) in
  plain white, baseline measured from ink metrics, matching the loading screen.
- **Shatter effect** is local: each fragment breaks in proportion to the
  cursor's distance from *that* fragment (`REACH 0.40`, `MOST 0.42`). Measured:
  0 of 22 pieces moving at rest, 3–5 under the cursor, max travel 0.41.
- **Colour**: hue was already correct (median 8°). The complaint was *blowout* —
  19.8% of lit pixels near-white. Retuned 7 highlight stops with green and blue
  lifted together; near-white now 10%.
- **Type sizes** bumped ~20–25%: tagline 13.5–16 px, hero buttons 13.5 px,
  nav 13 px. Scoped to `.stage-ui .pill` / `.nav .pill` so buttons elsewhere on
  the page were untouched.
- **All hero text is now white** (was dusty pink `#9c7a80` / `#6b4a50`).
  Measured average contrast against the live artwork: **16:1**, never below
  16.2:1 across ten frames.

#### The hero lockup — reverted, minus some opacity

The butterfly was moved above the wordmark, shrunk, and given a glow. **Het
asked for all of that to be put back** — "make it how it was originally, bigger
butterfly and text overlapping each other" — keeping only a reduction in the
butterfly's opacity. The hero was restored from `morfos.preBfly.html` and the
whole diff against the original is now **three alpha values**:

| | Was | Now |
|---|---|---|
| refracted glass | .85 | **.62** |
| the fragments | .92 | **.68** |
| full-frame bloom | .34 | **.27** |

Geometry is byte-identical to the original: `R = max(92, min(W*.205, H*.305))`,
butterfly at `W/2, H*.44`, wordmark `W*.86` wide on the same centre, the two
overlapping as they always did.

**Why the bloom had to come down too.** Dropping only the two fragment alphas
moved the wings by **2%**. The bloom is additive and sourced from the whole
frame, so it was putting the light straight back. It has to move with them.

**How to measure this correctly — the first two attempts were both wrong.**
Averaging the red channel over the butterfly's bounding box says almost
nothing, because the box is mostly the white wordmark and empty sky, and both
swamp the wings. The measurement that works is to mask by the **art layer's own
alpha** (`art` canvas, alpha > 150) and read the composited canvas only where
the artwork is solid. Mean brightness is also a poor statistic here because the
wings clip: the honest number is **what fraction of wing pixels are saturated
at 255**.

| masked by art alpha | original | now |
|---|---|---|
| saturated at 255 | **68%** | **43%** |
| 25th percentile | 217 | 178 (**-18%**) |
| mean | 229.2 | 217.5 (-5%) |

So the wings go from two-thirds blown out to showing their red gradient again,
which is what reads as "less opaque" — while the mean barely moves, which is
why the mean is the wrong thing to look at.

Shatter unchanged (0 of 21 pieces at rest, 4 under the cursor, max travel
0.41), `restart()` fine, all 13 engines up, booking section untouched.

**If the earlier version is ever wanted back**, it is
`morfos.postOverlapFix.html` in the scratchpad: butterfly above the word and
centred on the O-R-F run, a real `ctx.filter` glow, and a lockup that scales to
fit short viewports. The patch scripts `bfly.js` .. `bfly8.js` rebuild it step
by step.

### The guarantee section — curtain reveal

The three promises used to be three `<p><b>…</b> …</p>` lines in a plain
block. They are now three **curtain-reveal cards**: number and title always on
show, body held behind a curtain that parts from the centre on hover or focus.

Structure taken from 21st.dev's *Card Curtain Reveal*
(`@youcefbnm/components/card-curtain-reveal`). **Its source is paywalled** —
do not try to unlock it. The mechanism was read straight off its live preview
instead, at `cdn.21st.dev/bundled/1877.html`, which is public: inspect the DOM
there and hover it with a real pointer (synthetic `PointerEvent`s do not drive
framer-motion, so dispatching events proves nothing).

The mechanism is one animated `clip-path`:

```
closed   polygon(50% 0, 50% 0, 50% 100%, 50% 100%)   ← zero-width slit, centre
open     polygon(0 0, 100% 0, 100% 100%, 0 100%)
```

The reference drives its body text, its footer image **and** a white
`mix-blend-difference` panel off that same clip, so the card ends up colour
inverted while open. That is its look, not ours. Here the two keyframes are
kept exactly and the curtain is instead two halves in the card's own
`--paper`, each with a lit `--red` inner edge, sliding out to `±101%`. The
text is uncovered by two red lines sweeping apart.

Classes are `.gc-list` / `.gcard` / `.gc-num` / `.gc-title` / `.gc-stage` /
`.gc-body` / `.gc-veil`. No JavaScript — it is all CSS state.

Things that matter and are easy to get wrong:

- **The body is never removed from the DOM.** `clip-path` does not take it out
  of the accessibility tree, so it is still read, still selectable, still
  copyable. Verified.
- **Keyboard**: each card is `tabindex="0"` and the open state is on
  `:hover, :focus-within`, so tabbing opens a card. Without that the content
  would be mouse-only.
- **Touch**: under `@media (hover:none)` the veils are `display:none` and the
  clip is dropped, so the cards simply stand open. A phone must not have to
  guess that text is hidden.
- **The stage is sized by the body**, which is always laid out, so the card
  height never changes between states — no layout jump. Measured 131px in both
  states at 1440.

Verified: rest state is the reference's closed keyframe exactly; hover and
focus both open it and reverse; siblings unaffected; the curtain fully covers
the body at rest with **0px gap between the halves** on all three cards at
1425 / 1009 / 805 wide; **0 overflowing elements** in `#guarantee`; all 9 text
nodes pass contrast with a minimum of **9.97:1**; the section head, the
"Why we can sign it" box and its 4 chips are untouched; all 12 engines still
initialise.

### The cursor

Rebuilt around the mechanic on **kodeimmersive.com**, read off their live site
rather than guessed at. Theirs is an SVG circle whose **radius** is the animated
property — `transition: r .3s cubic-bezier(0,0,.2,1)` — swinging from a 240px
ring down to an 8px dot when it leaves an interactive region, with a colour swap
and a label inside the ring ("HOLD AND DRAG"). Sampled against `pointermove`,
its **position does not ease**: it settled in a single frame.

What was taken is that mechanic. What was not is their look — theirs is white
and orange on orange; ours keeps white, `#fd2702` and the `difference` blend
this site already used.

| state | size | look | label |
|---|---|---|---|
| rest | 26px | white outline | — |
| over a link / button / field | 64px | filled white | — |
| over something labelled | 168px | red outline | its `data-cursor` word |

The label comes from a **`data-cursor` attribute** and the nearest ancestor
carrying one wins, so a panel inside the work rail says "View" while the rail
itself says "Drag" — without the engine growing a list of special cases.

**The rAF loop is gone.** The old cursor lerped at 0.18 and ran an animation
frame forever; with no easing there is nothing to interpolate, so the transform
is written straight from the pointer event. Cheaper, and truer to the reference.
Measured: **0px tracking error** over 40 random points including the edges, and
the per-move state check costs 0ms median / 0.1ms max.

Two real bugs this turned up:

- **`body.has-cursor .cur` out-specifies the narrow-screen rule.** A media
  query adds no specificity of its own, so `@media (max-width:760px){.cur{display:none}}`
  never won once the cursor had been enabled. On a touch laptop — or a phone
  with a mouse plugged in — the ring stayed at phone width. The narrow rule now
  repeats the `body.has-cursor` selectors so it actually beats it.
- **`.step` was still in the `HOT` selector list** after the steps became a
  flow chart. Now `.flow-step`.

> Verifying this: `window.__cursor` has `at(x,y)` and `over(el)` so the states
> can be driven without a real pointer, and `ringCentre` / `dotCentre` read the
> element's real box rather than the value last stored — which is what proves
> tracking rather than assuming it. As everywhere else on this page, **size
> changes cannot be timed in the preview pane**: disable the transitions,
> toggle the state, read both.

### The statement section (`#statement`) — word slide-in

The particle-scroll canvas is **gone**. Het asked for the animation it had
before, and the old horizontal word reveal was restored from
`morfos.preDust.html` — each word pushed right of its own slot, scroll pulling
it back, staggered so the sentence resolves left to right.

What changed is the **timing**, which was the actual complaint. The old mapping
ran progress from "top edge entering" to "section bottom at 0.2vh", so the last
word only landed as the section was leaving the top of the screen — the tail of
the sentence was never seen standing still. Progress now runs from the top edge
entering to the section being **centred in the viewport**, and `SEG` is 0.34
with a shorter travel (0.34 x innerWidth, clamped 180-620px) so each word snaps
rather than glides.

Verified by sweeping the scroll: **p is monotonic over 50 samples**, every word
is at opacity 1 and offset 0 by the time the section centre reaches the
viewport centre (first settled 10px *before* it), it stays settled, and there
is no horizontal overflow at any point. `.hz-text` keeps `overflow:hidden` so
the incoming words cannot leak sideways.

### The work section (`#work`)

Three separate problems, three fixes.

**1. The WORK letters never finished.** Progress ran `(vh - top) / (vh +
height)`, and the first letter's slice ends at p = 1 — which is the instant the
section has completely left the screen. The word completed exactly when there
was nothing left to look at. It now runs from **the word itself clearing the
bottom of the screen** (not the section's top edge, which left the first few
percent happening below the fold) to **the section's bottom reaching the bottom
of the viewport**, where the section fills the screen. Measured over 148 scroll
samples: 53 of them with letters in motion, **0 with the word off screen, 0
with it under the header**, completing with the section at `top: 0,
bottom: 900` and staying complete after.

> Watch out when testing this: the letters are staggered so the **rightmost
> departs first**. A "has it finished" check that looks at the last span is
> true almost immediately and tells you nothing. Test `min(travelled) >= 0.999`.

**2. The corridor was flat.** With `A = max(760, vw*0.9)` a panel at the screen
edge was only ~1.26x the scale of one at the focal centre. The dials are now
named, tunable through `window.__kg.tune({...})` and readable through
`window.__kg.depth`:

| dial | was | now | what it does |
|---|---|---|---|
| `A_K` / `A_MIN` | .9 / 760 | **.40 / 230** | corridor constant; smaller = more depth |
| `GAP_K` | .07 | **.17** | gap as a share of panel width |
| `PERSP` | — | **2000** | CSS perspective on the stage |
| `ROT` | — | **.78** | share of the path angle a panel turns through |
| `H0_K` / `CY_K` | .78 / .47 | **.52 / .40** | panel height and centre line |
| `FOG` / `FOG_K` | — | **.40 / auto** | distance haze |

A panel at the screen edge is now **1.92x** the focal scale and has turned
through **~31 degrees**, with 33px of clearance and every caption on screen.

Three things that were measured rather than guessed:

- **Rotation widens a panel's projected box.** The near edge is magnified by
  the perspective, so panels that tiled perfectly flat started **overlapping by
  25px** near the screen edge. `PERSP` is the dial that fixes it — at 1100 no
  amount of extra `GAP_K` buys it back cheaply; at 2000 it is clean.
- **Do not measure depth by comparing the visible panels.** Which discrete
  panels land on screen changes with `A`, so that ratio can *fall* while the
  corridor genuinely gets deeper. Measure the analytic scale at the screen
  edge: solve `x(d) = vw/2` and take `1 + (d/A)^2`. Doing it the wrong way
  made a real improvement look like a regression at 1024px.
- **The old `A_MIN` of 520 was binding below ~1130px wide**, not just on
  phones. At 230 the corridor holds a constant **1.75x** from 560px up and
  1.52x at 390px, instead of collapsing to 1.13x on a phone.

**3. The haze had to move off the stage and onto the panels.** The first
version was a radial gradient across the whole section at z-index 3 — it read
as depth but dimmed the **project captions** by the same amount. Each panel's
artwork now carries its own haze as plain `opacity` (compositor-only, free),
driven by its distance along the run, with `FOG_K` derived per resize from
where the screen edge actually falls so the nearest panel is always clear at
any width. Captions are siblings of the artwork, so they stay at opacity 1 —
checked, `minCaptionOpacity` is 1 everywhere.

**The panels are store pages now.** The six were bare diagrams — a circle, a
zigzag, three ellipses — with nothing in them at the new sizes. Each is built
from the same parts (app chrome, nav, hero, headline block, red CTA, 2x2
product grid, footer) with only the hero and tile art differing. **Drawn, not
photographed**: the site is one self-contained file, and these are tagged
Concept/Study, so shipping invented screenshots of client work would be a lie
in both directions. Verified by rasterising each SVG to a canvas — all six
draw, 29-39% lit pixels, brand red and yellow present in every one.

**Performance went up, not down.** Same synthetic drag on both builds:
**12.2ms median per pointermove against 16.6ms before** (p90 13.2 vs 19.6).
`preserve-3d` and `backface-visibility:hidden` promote the panels to their own
compositor layers, which more than pays for the rotation.

Checked at 1425 / 1009 / 390 wide: 0 overlaps, 0 panels escaping the section,
all captions on screen at full opacity, and all 13 engines still initialising.

### The store calculator (`#calculator`)

Was a placeholder box saying the tool was "being specced". It is now live.
Mechanism is a straight port of the price dial from Het's own *Morfos Studio*
artifact — controls on the left, a figure on the right whose digits re-roll
when the number changes, an `aria-live` region so it is announced, and a CTA
that carries the settings. The artifact priced generic websites; this prices
Shopify builds, so the inputs are products / templates / migration / copy /
subscriptions / multi-currency.

The products slider is **geometric** (10, 25, 50 … 1000): the difference
between 10 and 25 items of work is nothing like 250 to 500, and a linear scale
spends most of its travel in a range nobody picks.

Swept all **720 input combinations**: no NaN, low always below high, the build
window never drops under the 7-day promise (max 17), prices run ₹68,000 to
₹5,01,000, price is monotonic in both sliders, every extra only ever adds, and
**the itemised rows always sum to the headline figure** — so the breakdown can
never quietly disagree with the number above it.

Two things fixed while testing:

- **The rolling figure queued a rAF *and* a setTimeout per glyph, per render.**
  The slider fires `input` continuously through a drag, so one sweep queued
  thousands of pending timers; a scripted sweep of the input space wedged the
  page outright. The stagger is a `transition-delay` now and the figure is
  armed in a single rAF. The same sweep went from timing out at 45s to **182ms**.
- **The selected segment used the brand red.** Four red blocks down the column
  competed with the one red CTA under them, and white on `#fd2702` only reaches
  3.84:1. Selected options now borrow `.pill--solid` — ink on paper, **16.8:1**
  — and red is left meaning "act".

### The guarantee box — capacity meter

"Why we can sign it" was a heading, a paragraph and four static chips. The most
interesting thing in it was a number buried mid-sentence: twelve builds a
month, capped. So the number became the object — **twelve ticks fill in
sequence** when the box comes into view and the count rolls up with them, then
the chips stagger in behind. That is the box's own argument made visible: the
guarantee holds because the capacity is finite.

The bars are pure CSS off the `.in` class the appear observer already sets;
only the numeral needs script. Stagger is `transition-delay` (0-770ms on the
bars, 900-1110ms on the chips), not a timer per tick.

> Transitions cannot be timed in the preview pane — it reports itself hidden
> and throttles. Verify these by **disabling transitions and reading the two
> states**: closed is `scaleY(.34)` grey with chips at opacity 0; open is
> `scaleY(1)`, ten bars `#fd2702`, the last two `#F6F167`, chips at opacity 1.

### "How we work" (`#process`) — corner label and the flow chart

- **The label** migrates letter by letter like WORK and OUR SERVICES, using the
  corrected timing (starts when the label clears the bottom of the screen,
  finishes while the section still fills it). Measured: 46 moving samples,
  **0 off screen, 0 under the header**, completes at p = 0.99.

- **The four steps are a flow chart.** A rail with four nodes on it; the rail
  draws itself along as the section crosses the screen, each node lights the
  moment the line reaches it, and that step's body comes up from 42% to full.
  One number drives all of it — how far the chart has crossed the viewport —
  written as one width and four class toggles in a single scroll handler, with
  no per-node observers.

  Verified over 94 scroll samples: the rail tracks progress exactly (0
  mismatches), the lit count is **monotonic** and never steps backwards, all
  four light and stay lit, and the chart is **still fully on screen** when the
  last one fires (471-647 in an 800px viewport).

  On a phone the rail turns **vertical** — four nodes across 390px would leave
  each about sixty pixels of column. Checked at 390: single column, rail 1px
  wide by 448px tall, nodes stacked on one x, and the fill grows in height
  rather than width.

#### What was removed, and why it is worth knowing

The band that used to sit here held six ray-traced solids — a real per-pixel
tracer with analytic hits, Fresnel, a studio environment and pre-rendered
sprite sheets. **Het asked for it out**: "these shapes are looking very cartoon
type" first, then, after the rebuild, "remove the shapes it is not looking
good". The whole thing is deleted — markup, CSS, the tracer and the scatter
engine — which took the page from 343.8KB to 324.6KB. If any of it is ever
wanted again it is in `morfos.preFlow.html` in the scratchpad, built by
`solid.js` .. `solid6.js`.

Two things learned there that still apply anywhere on this page:

- **Write shader colours in linear light.** The tracer gamma-encodes at the
  end, so a base written in sRGB numbers arrives with its green channel about
  eight times too strong — that is what turned `#fd2702` orange (median hue
  16-20 degrees, 45% of lit pixels past 20). Converting properly gave median
  4.4 with 0% past 20.
- **A transition cannot be timed in the preview pane.** It reports itself
  hidden and throttles, so reading a computed style right after a class change
  gives you the value mid-flight, not the target. This produced three separate
  false alarms across this session — the capacity meter, the flow bodies and
  the node numerals all looked broken and were not. **Disable the transitions,
  toggle the class, read both states.** Note the transition may live on a
  child: the numerals fool you again unless `.flow-node b` is in the override.

### Work panels — product shots

The heroes were diagrams inside a store layout. Each is now a **lit object on a
studio sweep** — ring, pack, bottle, orb, folded card, stacked set — from the
same family of solids the shape band uses, so the two sections tie together and
the strip reads as brand photography at a glance. All six rasterise; hero bands
run 12-29% lit.

Still **drawn, not photographed**. These are tagged Concept and Study, and the
site is one self-contained file: putting stock or scraped imagery behind a
client name would claim work that does not exist. When there are real
screenshots, only the hero fragment changes.

### Checked after all of the above

All **17 engines** initialise, all 8 sections present, **0 horizontal overflow**
across a full-page scroll at 1265 and 390 wide, the calculator stacks to one
column on a phone with **0 tap targets under 44px**, and the shape band drops to
four objects there.

## 4. The booking system — BUILT, one step left

`#book` is no longer a dead cal.com link. It is now a two-column block:
the pitch on the left (availability pill, heading, copy, trust chips) and
an interactive booking card on the right.

### What it does

A small state machine — `pick -> details -> done`, with `wa` and a
call-me-back mode as side branches, exactly the structure of Het's
"Always-Open Door" artifact, rebuilt in MORFOS's own palette and faces.

- **Slot picker, not a calendar.** Three real times generated as buttons.
  Sundays skipped, past times skipped, no duplicates.
- **Three fields**, and only name + email are required. Phone is optional
  on a slot booking and required on a callback.
- **Confirmation screen** with an animated tick, a recap, and two
  add-to-calendar links (Google Calendar, and a generated `.ics` for
  Apple/Outlook).
- **Side doors**: WhatsApp with a pre-filled message, and "call me back"
  which only appears inside `callHours`. Both hide themselves when their
  number is not configured, rather than shipping a dead link.
- **"Another time"** opens a pre-filled mailto rather than inventing a slot.

### Deliberate deviation from the artifact

The artifact argues for phone *instead of* email, collecting email later.
Het's requirement ("he should receive an email for his meeting schedule")
needs the address up front, so the card collects **name + email**, with
phone optional. This is the one place the concept was changed on purpose.

### THE ONE STEP LEFT — connect the endpoint

Everything works end to end right now, but with `endpoint: ""` nothing is
stored and no email is sent. To finish:

1. Open `morfos-booking.gs` and follow the setup comment at the top
   (new Google Sheet -> Extensions -> Apps Script -> paste -> Deploy as
   web app, "Anyone" access). Takes about 4 minutes.
2. Paste the web-app URL into `BOOK_CFG.endpoint` in `morfos.html`.

`BOOK_CFG` sits at the top of the last `<script>` block and is the only
thing that needs editing:

| Key | What it is |
|---|---|
| `endpoint` | Apps Script web-app URL. Empty = nothing stored. |
| `whatsapp` | Digits only, e.g. `919876543210`. Empty hides the door. |
| `phone` | Same, for the callback door. Empty hides it. |
| `availability` | The pill text. **Must be true.** |
| `callHours` | `[10, 19]` — when the callback door is offered. |

> Neither a WhatsApp nor a phone number was on file, so both are empty and
> both doors are currently hidden. Fill them in and they appear.

The POST is `text/plain` on purpose — it keeps the request "simple" so the
browser skips the CORS preflight, which Apps Script web apps do not answer.

### How it was verified

- **Slot generation**: 3,200 samples across 400 days x 8 times of day —
  always exactly 3 slots, **0 Sundays, 0 past times, 0 duplicates**.
- **Every branch** driven and asserted: pick, details, done, WhatsApp,
  callback, back, reset, another-time.
- **Validation**: empty name, bad email, and callback-without-phone each
  hold the user on the details step and mark the right field.
- **Payload** captured against a stubbed endpoint — 9 keys, correct
  `slotISO` (4:00 PM IST -> 10:30 UTC) and IANA timezone.
- **Failure**: network error, HTTP 500, and no endpoint at all each still
  reach the confirmation and add a line telling the visitor what to do.
  The booking is also kept in `localStorage` (in a try/catch — storage is
  disabled under `data:` URLs, which is how the preview pane loads it).
- **Calendar**: `.ics` parses, CRLF line endings, 15-minute duration.
- **Keyboard**: autofocus on entering details, focus moves to the offending
  field, Enter submits, every control reachable.
- **Widths 1440 / 1024 / 390**: two columns collapse to one at 860px,
  **0 overflowing elements inside `#book`** at every width.
- **Contrast**: all 43 text nodes measured against the real composited
  background. Minimum **5.69:1** off the brand red.
- **Scope**: diffed against `morfos.preBook.html`. Four hunks, and the only
  lines *removed* from the old file are the five belonging to the old stub.
- All 12 pre-existing engines still initialise, plus the new `window.__book`.

Three defects were found and fixed during verification, all by measurement
rather than by looking: no focus ring on any control but the text fields;
tap targets of 15px and 32px at phone width; and text at 3.62:1 and 2.08:1.

### Known, and left alone on purpose

White on the brand red `#fd2702` measures **3.84:1**, under the 4.5:1 floor.
This is not new — the site's existing `.btn` already does exactly this, and
red is at ceiling so the only fixes are changing the red or the text colour.
Left consistent with the rest of the site; worth a decision at some point.

## 5. Other open items (older, none urgent)

- **Footer social links are `#` placeholders** — real URLs needed.
- **About page** still has placeholder founder names and photos.
- **Brand-guidelines palette conflict**: the written guidelines say ink/paper,
  the site is black/red/yellow. Unresolved.
- **Client portal PIN** (`client-roster.html`) is client-side only — security
  hardening decision pending.
- **Work filmstrip** uses generated SVG placeholders, not real client
  screenshots. All tagged "Concept".
- **Renaming `morfos.html` → `index.html`** would require updating 4
  `morfos.html` references inside `about.html`.
- The hero hint still reads **"Move over it to shatter"** — fine, but worth
  rewording if the shatter is ever changed again.

---

## 6. Practical notes for the next session

### Dev hooks already in the page
Open the console (or drive via JS) and read live state:

| Hook | Gives you |
|---|---|
| `window.__hz` | statement words: `count`, `p`, `settled`, `opacities`, `offsets`, `dist`, `lines`, `draw()`, `sync()` |
| `window.__calc` | store calculator: `state`, `result`, `figure`, `days`, `rows`, `set({...})`, `quiet(bool)`, `products` |
| `window.__cap` | capacity meter: `total`, `shown`, `filled`, `chipsIn`, `delays`, `run()` |
| `window.__pwword` | "How we work" letters: `p`, `travelled`, `text`, `draw()` |
| `window.__cursor` | cursor ring: `on`, `hot`, `wide`, `label`, `size`, `pos`, `ringCentre`, `dotCentre`, `at(x,y)`, `over(el)` |
| `window.__flow` | how-we-work chart: `p`, `lit`, `count`, `railPct`, `vertical`, `titles`, `bodyOpacity`, `draw()` |
| `window.__kg` | work filmstrip: `dials`, `depth`, `tune({...})`, `draw()`, `nudge(px)` |
| `window.__kgword` | work letters: `p`, `travelled`, `done`, `xs`, `spread`, `draw()` |
| `window.__flit` | travelling butterfly: `at`, `target`, `progress`, `corner`, `spot`, `settle(n)` |
| `window.__loader` | loading-screen timeline |
| `window.__morfos.layout` | hero lockup: `R`, `bfly{x,y}`, `word{x,y,fs,width,ascent,descent,orfCentre}`, `alphas`, `haloBlurPx`, `haloArea`, `canFilter` |
| `window.__book` | booking card: `step`, `mode`, `slots`, `state`, `cfg`, `slotsAt(date)`, `go(step)`, `reset()` |
| `window.__morfos` | hero shatter: `broken`, `breakSpread` |
| `window.__kgword`, `window.__svword`, `window.__ascii`, `window.__offers`, `window.__cursor`, `window.__reveal`, `window.__footMark`, `window.__morfosFont` | the other engines |

### Browser-pane gotchas (these cost real time)
- The pane reports **`document.hidden === true`** and throttles `requestAnimationFrame`
  to ~1 fps even while visible. Drive animations manually via the dev hooks
  instead of waiting on rAF.
- `scroll-behavior: smooth` swallows programmatic scrolling — set it to `auto`
  before any scroll test.
- `resize_window` is **per tab**, and `navigate` often creates a *new* tab, which
  resets the emulated viewport. Re-apply it after navigating.
- Screenshots go stale and come back wrongly scaled. Prefer reading values out
  of the page over looking at pictures.
- The page is loaded as a `data:` URL, so **never return `location.href`** from
  an evaluated script — it blows the token limit.

### Integrity check to run after any edit

```bash
cd "C:/Users/HET/New folder" && node -e "
const s=require('fs').readFileSync('morfos.html','utf8');
const b=[...s.matchAll(/<script>([\s\S]*?)<\/script>/g)];let bad=0;
b.forEach((m,i)=>{try{new Function(m[1])}catch(e){bad++;console.log('block',i,e.message)}});
console.log('script blocks',b.length,'syntax errors',bad);
console.log('size',(s.length/1024).toFixed(1)+'KB');"
```

Expect **7 script blocks, 0 syntax errors**. (It was 6 before the booking
block was added.)

### Other things that have bitten before
- SVG presentation attributes lose to stylesheet rules — set `element.style.fill`,
  not `setAttribute("fill", …)`, when a CSS rule also targets it.
- Watch for temporal dead zone when reordering `const` blocks inside the loader;
  it fails silently and leaves `window.__loader` undefined.
- Don't comment out old HTML blocks — nested comments break the parse. Delete them.
