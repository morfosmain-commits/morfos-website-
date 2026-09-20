# MORFOS — session handoff

**Paste this whole file into a new Claude session to pick the work up.**
It covers what the project is, how to work on it, what exists on disk, what is
finished, and what to do next — in priority order.

Last updated: 2026-09-20.

---

## 0. The one thing to know first

**Everything below is built and verified but NOT DEPLOYED.** `www.morfos.in` is
still serving an older build. Until the current files ship, none of the SEO
work, none of the copy changes and none of the bug fixes are live.

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
- **Git:** yes, this IS a git repository now. Last commit `0f48933`. There are
  substantial uncommitted changes (all the work in §5–6).
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
   edit. Take that backup first, every time.

3. **Reference sites: take the structure, never the styling.**
   Het briefs work by sending a URL, screenshot or artifact and asking for
   "this kind of" thing. Copy the *mechanism and layout*. The palette,
   typefaces, copy and artwork always come from MORFOS's own system. Inspect
   the reference closely enough to understand the real mechanism rather than
   guessing — reading its DOM is usually worth the time.

4. **The brand red is `#fd2702`.**
   Red is already at ceiling, so any lighter tint must raise **green and blue
   together**. Raising green alone walks the hue toward orange and Het rejects
   it. Verify by computing the hue of every lit pixel: median near 9°, almost
   nothing above 20°.

5. **Don't ship fake work.** Het has repeatedly been offered and has declined
   stock imagery or fabricated client screenshots behind client names. Work
   panels stay tagged "Concept"/"Study" with drawn artwork until real
   screenshots exist.

---

## 3. Files on disk

### Live project files (`C:\Users\HET\New folder\`)

| File | Size | What it is |
|---|---|---|
| `index.html` | 347 KB | **The main site.** Most work happens here. Was `morfos.html` — renamed. |
| `about.html` | 58 KB | About page. Broadsheet layout. Carries the same site header. |
| `client-roster.html` | 164 KB | Client portal, PIN-gated. `noindex,nofollow`. |
| `frostbreak.html` | 18 KB | Unrelated scratch demo. Live but now `noindex,nofollow`. |
| `morfos-booking.gs` | 5 KB | Google Apps Script for the booking endpoint. **Not part of the site** — it gets pasted into script.google.com. |
| `robots.txt` | 0.2 KB | Allows all, disallows portal + demo, points at the sitemap. |
| `sitemap.xml` | 0.4 KB | 2 URLs: `/` and `/about.html`. |
| `og-image.png` | 74 KB | 1200×630 social share card, drawn in the site's own faces. |
| `favicon-64.png` | 2 KB | The favicon actually linked. |
| `apple-touch-icon.png` | 6.7 KB | 180×180 home-screen icon. |
| `butterfly.png` | 24 KB | Wordmark butterfly, used by `about.html`. |
| `favicon.png` | 278 KB | The **original** 2000×2000 icon. No longer referenced — kept in case it's wanted. Safe to delete. |
| `.claude/launch.json` | — | Preview-server config so `preview_start` can serve the site over HTTP. |
| `HANDOFF.md` | — | This file. |

### Backups

All in this session's scratchpad:
`C:\Users\HET\AppData\Local\Temp\claude\C--Users-HET-New-folder\5553c707-ea62-45c9-b211-06287f10a8b3\scratchpad\t\`

Newest last: `index.preSeo` → `index.preHead` → `index.postSeo2` →
`index.preSocial` → `index.postSocial` → `index.preHeader` ·
`about.pre` → `about.preSocial` → `about.preHeader` → `about.postHeader` →
`about.preStrip` → `about.postStrip` · `roster.pre`, `roster.preHeader`,
`frostbreak.pre`.

> **The scratchpad is session-scoped and may be cleared.** If these matter,
> copy them somewhere permanent. The real safety net is git — commit early.

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

**Write patch scripts with the Write tool, not a bash heredoc.** Backticks and
`${}` in the payload break shell parsing, and very long lines silently truncate.

### A trap that cost real time

Do **not** write a `patch(file, callback)` helper where the callback both
receives the string as a parameter *and* closes over a `rep()` that mutates an
outer copy. The callback returning its own `s` silently discards every `rep()`
edit. It reported success and wrote a larger file, so nothing looked wrong.
Put everything through one string.

---

## 5. What is already built

Twelve scroll- and pointer-driven engines, all verified. Condensed:

| Area | What's there |
|---|---|
| **Loader** | Traced-SVG wordmark timeline, skippable. |
| **Hero** | Canvas butterfly that shatters into 22 shards on pointer proximity and reassembles. Wordmark lockup scales to fit. |
| **Statement** (`#statement`) | Word-by-word mask reveal, retimed to finish mid-screen. |
| **Work** (`#work`) | 3D perspective filmstrip, draggable, 12 cloned panels with drawn SVG artwork. |
| **Services** (`#services`) | Three stepped panels + ASCII canvas + per-letter corner word. |
| **How we work** (`#process`) | Flow chart: a rail that draws itself, four nodes lighting in order. Vertical on phones. |
| **Offers** (`#referral`) | Two offer cards. |
| **Calculator** (`#calculator`) | Working price calculator, geometric product slider, rolling digit figure. **Floor is ₹68,000**, default state reads ₹1,00,000–₹1,22,000. |
| **Guarantee** (`#guarantee`) | Curtain-reveal cards + animated capacity meter. |
| **FAQ** (`#faq`) | Six Q&A, accordion, first open by default. **New** — added for SEO. |
| **Booking** (`#book`) | Full state machine. See §6. |
| **Cursor** | Custom ring, 26/64/168px states, `data-cursor` labels, difference blend. |

### Recent passes (all undeployed)

**Copy/SEO pass (18 changes).** Hero's first line became the page's only `<h1>`
(there was none at all). Step titles `<h4>`→`<h3>`. Section headings reworded
to carry "Shopify". Calculator shows a starting price in markup.

**Technical SEO pass.** Title, meta description, canonical, robots,
theme-color, Open Graph + Twitter on both indexable pages. A five-node JSON-LD
graph (ProfessionalService+Organization / WebSite / WebPage / Service /
FAQPage) — validated, no dangling `@id` refs, all 6 FAQ questions confirmed
present in the markup. `robots.txt`, `sitemap.xml`, OG image, right-sized
favicons. Visually-hidden `<h2>` for Work and Services, whose visible titles
are per-letter animations a crawler cannot read.

**Bugs fixed.** `hello@morfos.studio` → `support.morfos@gmail.com` (7 places).
**Eight dead `morfos.html` links** across three files, left over from the
rename — `/morfos.html` returns 404 in production, so every route off About
was broken. Three dead `href="#"` social anchors. `frostbreak.html` was live
and indexable. Footer social tap targets were 17×17px, now 40×40.

**About page.** Now carries the same header as the homepage (sticky, not fixed
— there's no hero to scroll past), with cross-page anchors and
`aria-current="page"`. The giant "Morfos" masthead word and the header's
Book-a-call button were then removed at Het's request.

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
2. Paste the web-app URL into `BOOK_CFG.endpoint`, at **line ~6379 of
   `index.html`**, top of the last `<script>` block.

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
Commit and push. New files that must go up: `robots.txt`, `sitemap.xml`,
`og-image.png`, `favicon-64.png`, `apple-touch-icon.png`, `butterfly.png`.
Then in Google Search Console: submit `https://www.morfos.in/sitemap.xml` and
request indexing on `/`. That is what starts the clock.

After deploying, sanity-check live:
`/robots.txt`, `/sitemap.xml` and `/og-image.png` should all return 200, and
the share card should render when the URL is pasted into WhatsApp.

### 2. Connect the booking endpoint (§6).
Right now the site takes bookings and silently drops them. This is the highest
business risk on the list.

### 3. Give Claude the WhatsApp and phone numbers.
Two side doors are built and hidden for want of a number.

### 4. The copy rewrite — needs Het's sign-off first.
The page is written beautifully about *the promise* and is nearly silent about
*the product and the place*. "fixed" appears 15 times; "developer", "agency"
and "e-commerce" appear zero times. Nobody searches "rebuild until it is
right". A few sentences should name what the studio is and where it is.

### 5. Separate service pages.
The homepage cannot rank for everything. One page each for **Shopify
migration**, **Shopify speed optimisation**, and **Shopify vs WooCommerce**
would outrank this homepage for those terms within months. This is the largest
remaining SEO win.

### 6. Real work screenshots.
The filmstrip uses drawn SVG placeholders tagged "Concept". Only the hero
fragment of each panel needs changing.

### 7. Smaller open items
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
Nineteen engines expose live state. Read them from the console or via JS:

| Hook | Gives you |
|---|---|
| `window.__book` | booking: `step`, `mode`, `slots`, `state`, `cfg`, `slotsAt(date)`, `go(step)`, `reset()` |
| `window.__calc` | calculator: `state`, `result`, `figure`, `days`, `rows`, `set({...})`, `quiet(bool)` |
| `window.__faq` | FAQ: `count`, `open`, `expanded`, `questions`, `answers`, `toggle(i)` |
| `window.__flow` | how-we-work chart: `p`, `lit`, `railPct`, `vertical`, `titles`, `bodyOpacity`, `draw()` |
| `window.__cursor` | cursor: `on`, `hot`, `wide`, `label`, `size`, `pos`, `ringCentre`, `at(x,y)`, `over(el)` |
| `window.__hz` | statement words: `count`, `p`, `settled`, `opacities`, `offsets`, `draw()` |
| `window.__kg` | work filmstrip: `dials`, `depth`, `tune({...})`, `draw()`, `nudge(px)` |
| `window.__cap` | capacity meter: `total`, `shown`, `filled`, `chipsIn`, `run()` |
| `window.__morfos` | hero shatter: `broken`, `breakSpread`, `shards`, `restart()` |
| `window.__flit` | travelling butterfly: `at`, `target`, `progress`, `settle(n)` |
| `window.__loader` | loader timeline: `seek(ms)`, `duration`, `marks` |
| also | `__ascii` `__footMark` `__kgword` `__morfosFont` `__offers` `__pwword` `__reveal` `__svword` |

### Browser-pane gotchas — these cost real time

- The pane reports **`document.hidden === true`** and throttles
  `requestAnimationFrame` to ~1 fps even while visible. **Canvas engines often
  render nothing.** Drive them manually via the dev hooks; don't wait on rAF.
- **A CSS transition cannot be timed in the pane.** Reading a computed style
  right after a class change gives you a mid-flight value, not the target.
  This produced *four* separate false alarms across these sessions. The
  reliable method: **disable the transition, toggle the class, read both
  states.** Watch for the transition living on a *child* element.
- Local files load as **`data:` URLs**, so **relative paths do not resolve** —
  images, icons and any `url()` in CSS will fail. To test those, run
  `preview_start` with the `morfos-static` config in `.claude/launch.json` and
  load `http://localhost:4173/`.
- `localStorage` throws under `data:` URLs. Already handled in try/catch.
- `resize_window` is **per tab**, and `navigate` often creates a *new* tab,
  which resets the emulated viewport. Re-apply after navigating.
- Screenshots go stale and come back wrongly scaled. Prefer reading values out
  of the page.
- Never return a `data:` URL (or a whole base64 payload) from an evaluated
  script — it blows the token limit. If you must move bytes out, let the result
  spill to a tool-results file and decode it there with Node.
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

Expect: **`index.html` 7 js / 0 errors / 1 ld / 1 h1**, and
**`about.html` 2 js / 0 errors / 1 ld / 1 h1**.

### Other things that have bitten before

- **SVG presentation attributes lose to stylesheet rules** — set
  `element.style.fill`, not `setAttribute("fill", …)`, when CSS also targets it.
- **Media queries add no specificity.** `body.has-cursor .cur` beat
  `@media (max-width:760px){.cur{display:none}}` and leaked the cursor onto
  phones with a mouse. Repeat the selector inside the media query.
- **A sphere is rotation-invariant** — one traced object never changed a pixel.
  If an animation looks frozen, check the maths before the loop.
- **Write shader colours in linear light**, not sRGB. Skipping the conversion
  made green ~8× too strong and turned `#fd2702` orange.
- **Don't comment out old HTML blocks casually** — nested comments break the
  parse. The social-link TODOs are safe only because they contain no comments.
- Watch for temporal dead zone when reordering `const` blocks in the loader; it
  fails silently and leaves `window.__loader` undefined.
- Beware measuring the wrong thing. Averaging brightness over a bounding box,
  counting visible panels as a depth proxy, and checking the *last* letter of a
  left-travelling animation were all wrong methods that produced confident,
  false results.
