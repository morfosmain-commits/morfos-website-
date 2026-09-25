/* Builds the case-study pages from about.html.
   They are generated rather than written by hand so the header, the footer, the
   cursor, the fonts and the design tokens are literally the same bytes as the
   About page and cannot drift — the same reason the footer was ported by script
   rather than copied. Only the content between the masthead and the CTA
   marquee is replaced.

   One shared template, several outputs: case.html carries every case and picks
   by ?c=, and each case also gets a real page of its own — prabhu-mill.html,
   aura-learn.html — that names itself in <html data-case>. The per-case files
   exist because a query string is the one part of a URL a static host feels
   free to throw away: `serve`, Netlify pretty URLs, Vercel cleanUrls and
   friends all 301 /case.html?c=aura-learn to /case, and the page then fell
   back to the first case and quietly served Prabhu Mill instead. A path
   survives that redirect; a query does not. case.html keeps working and
   forwards to the real page when it is given a live ?c=. */
const fs = require("fs");
/* run from the project root: node build-case.js */
const SRC = require("path").join(__dirname, "about.html");
const DST = require("path").join(__dirname, "case.html");
let s = fs.readFileSync(SRC, "utf8");

const cut = (a, b, label) => {
  const i = s.indexOf(a); if (i < 0) throw new Error(label + ": start missing");
  const j = s.indexOf(b, i + a.length); if (j < 0) throw new Error(label + ": end missing");
  return [i, j];
};
const rep = (a, b, label) => {
  const n = s.split(a).length - 1;
  if (n !== 1) throw new Error(label + ": " + n + " hits");
  s = s.split(a).join(b);
};

/* ---------------- head ---------------- */
rep("<title>About Morfos — the Shopify and 3D web studio that puts it in writing</title>",
    "<title>Case study — Morfos</title>", "title");
rep('<link rel="canonical" href="https://www.morfos.in/about.html" />',
    '<link rel="canonical" href="https://www.morfos.in/case.html" />', "canonical");
/* the description, og: and twitter: copy are rewritten per case by the
   renderer, because one file serves every case study */
rep('<meta name="description" content="Morfos builds Shopify stores and 3D websites for founders and brands in India, from Mumbai. Live in 7 days, 14-day refund and a rebuild until it is right. Meet the founders and read the house rules." />',
    '<meta name="description" id="metaDesc" content="A Morfos build, in detail: what the site had to do, what was shipped, and what it measures." />',
    "description");

/* the About page's AboutPage JSON-LD does not describe this page. The renderer
   writes a CreativeWork block for whichever case is loaded. */
{
  const [i, j] = cut('<script type="application/ld+json">', "</script>", "jsonld");
  s = s.slice(0, i) + '<script type="application/ld+json" id="caseLd">{}</script>' + s.slice(j + "</script>".length);
}

/* ---------------- content ---------------- */
const MAST = "<!-- ================= masthead ================= -->";
const CTA  = "<!-- ================= cta marquee ================= -->";
{
  const i = s.indexOf(MAST), j = s.indexOf(CTA);
  if (i < 0 || j < 0 || j <= i) throw new Error("content bounds");
  s = s.slice(0, i) + CONTENT() + "\n" + s.slice(j);
}

/* ---------------- styles ---------------- */
rep("  /* ---------- word-level mask reveal, as on the home page ---------- */",
    CSS() + "  /* ---------- word-level mask reveal, as on the home page ---------- */",
    "css");

/* ---------------- renderer ---------------- */
rep("  /* ---------- word-by-word mask reveal ---------- */",
    JS() + "  /* ---------- word-by-word mask reveal ---------- */",
    "js");

fs.writeFileSync(DST, s);
console.log("case.html", (s.length / 1024).toFixed(1) + "KB");

/* ---------------- one real page per case ----------------
   The same bytes as case.html with two edits: the id on <html>, which the
   renderer reads in preference to the query string, and a canonical that
   points at this page rather than the shared one. Add a case to CASES and add
   its id here. */
const IDS = ["prabhu-mill", "aura-learn"];
for (const id of IDS) {
  if (s.indexOf('"' + id + '": {') < 0) throw new Error(id + ": no case data");
  const one = (a, b, label) => {
    const n = p.split(a).length - 1;
    if (n !== 1) throw new Error(id + " " + label + ": " + n + " hits");
    p = p.split(a).join(b);
  };
  let p = s;
  one('<html lang="en">', '<html lang="en" data-case="' + id + '">', "html tag");
  one('<link rel="canonical" href="https://www.morfos.in/case.html" />',
      '<link rel="canonical" href="https://www.morfos.in/' + id + '.html" />', "canonical");
  fs.writeFileSync(require("path").join(__dirname, id + ".html"), p);
  console.log(id + ".html", (p.length / 1024).toFixed(1) + "KB");
}

/* ==================================================================== */

function CONTENT() { return `<!-- ================= masthead ================= -->
<header class="mast">
  <div class="wrap">
    <div class="mast-sub">
      <span class="lab">Case study</span>
      <span class="lab">No. <b id="csNo">01</b> &middot; <span id="csKind">Client build</span></span>
      <span class="lab" id="csPlace"></span>
    </div>
  </div>
</header>

<!-- ================= lead =================
     Deliberately spare. The strongest thing a Morfos case study can say is a
     fact with a number on it, so the page leads with what the build is and
     then goes straight to the thing itself. -->
<section class="cs-lead">
  <div class="wrap">
    <p class="cs-eyebrow" id="csSector"></p>
    <h1 id="csTitle"></h1>
    <p class="cs-stand" id="csStand"></p>
    <dl class="cs-meta" id="csMeta"></dl>
  </div>
</section>

<!-- the contract strip: price agreed, date promised, date delivered, refund
     used. It renders only when the case carries those four facts, because a
     row of blanks would be worse than no row. -->
<section class="cs-contract-wrap" id="csContractWrap" hidden>
  <div class="wrap"><div class="cs-contract" id="csContract"></div></div>
</section>

<!-- ================= the site ================= -->
<section class="cs-shot">
  <div class="wrap">
    <figure class="cs-frame">
      <div class="cs-chrome" aria-hidden="true"><i></i><i></i><i></i><span id="csUrlBar"></span></div>
      <img id="csHero" alt="" width="2160" height="1350" />
      <figcaption id="csHeroCap"></figcaption>
    </figure>
  </div>
</section>

<!-- the whole page, scrolling inside its own frame rather than as three
     cropped hero shots -->
<section class="cs-scrollwrap">
  <div class="wrap">
    <div class="cs-scrollhead">
      <h2><span data-split>The whole page</span></h2>
      <p id="csScrollNote"></p>
    </div>
    <div class="cs-scroll" id="csScroll">
      <img id="csFull" alt="" loading="lazy" />
    </div>
  </div>
</section>

<!-- ================= what it had to do ================= -->
<section class="cs-brief">
  <div class="wrap">
    <h2><span data-split>What the site had to do</span></h2>
    <ol class="cs-jobs" id="csJobs"></ol>
  </div>
</section>

<!-- ================= measured ================= -->
<section class="cs-nums-wrap" id="csNumsWrap" hidden>
  <div class="wrap">
    <h2><span data-split>Measured, not claimed</span></h2>
    <div class="cs-nums" id="csNums"></div>
    <p class="cs-method" id="csMethod"></p>
  </div>
</section>

<!-- the client's own words. Omitted until there are some. -->
<section class="cs-quote-wrap" id="csQuoteWrap" hidden>
  <div class="wrap">
    <blockquote class="cs-quote"><p id="csQuote"></p><cite id="csQuoteBy"></cite></blockquote>
  </div>
</section>

<!-- ================= out ================= -->
<section class="cs-out">
  <div class="wrap">
    <a class="cs-live" id="csLive" target="_blank" rel="noopener" data-hot>
      <span>Visit the live site</span><i aria-hidden="true">&#8599;</i>
    </a>
    <a class="cs-back" href="index.html#work" data-hot>&#8592; All work</a>
  </div>
</section>
`; }

/* ==================================================================== */

function CSS() { return `  /* ---------- case study ----------
     One file serves every case: the copy lives in CASES below and the page is
     filled from it. Adding a client is adding an object, not another 100KB
     page to keep in step with this one. */
  .cs-lead{padding:clamp(30px,6vh,64px) 0 clamp(18px,3vh,30px)}
  .cs-eyebrow{
    font-size:11px;letter-spacing:.15em;text-transform:uppercase;
    color:var(--red);margin-bottom:14px;
  }
  .cs-lead h1{
    font-family:var(--serif);font-weight:400;
    font-size:clamp(2.4rem,6vw,5rem);line-height:1.02;
    text-wrap:balance;
  }
  .cs-stand{
    margin-top:clamp(14px,2vh,22px);max-width:56ch;
    font-size:clamp(1rem,1.5vw,1.15rem);line-height:1.65;color:#d8d8d8;
    text-wrap:pretty;
  }
  .cs-meta{
    display:grid;gap:14px 30px;margin-top:clamp(22px,3.4vh,38px);
    grid-template-columns:repeat(auto-fit,minmax(150px,1fr));
    border-top:1px solid var(--rule);padding-top:20px;
  }
  .cs-meta dt{
    font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;
    /* #8d8d8d, the --muted token, measures 4.1:1 on --page and these are
       labels that have to be read */
    color:#a0a0a0;margin-bottom:5px;
  }
  .cs-meta dd{font-size:14px;line-height:1.45;color:#f2f2f2}
  /* measured 98x18 — under this project's 44px floor. The hit area grows
     and the padding is cancelled by an equal negative margin, so the row's
     leading does not change: the same idiom the footer links use. */
  .cs-meta dd a{
    color:#fff;text-decoration:underline;text-underline-offset:3px;
    display:inline-grid;align-items:center;min-height:44px;margin-block:-13px;
  }

  /* the four contract facts, when a case carries them */
  .cs-contract-wrap{padding:clamp(10px,2vh,18px) 0}
  .cs-contract{
    display:grid;gap:1px;background:var(--rule);
    grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
    border:1px solid var(--rule);
  }
  .cs-contract div{background:var(--paper);padding:18px 16px}
  .cs-contract dt{
    font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;
    color:#a0a0a0;margin-bottom:7px;
  }
  .cs-contract dd{font-family:var(--serif);font-size:clamp(1.2rem,2.2vw,1.7rem);line-height:1}
  .cs-contract div:last-child dd{color:var(--red)}

  /* ---- the site itself ---- */
  .cs-shot{padding:clamp(20px,3.4vh,40px) 0}
  .cs-frame{border:1px solid var(--rule);background:var(--paper);overflow:hidden}
  .cs-chrome{
    display:flex;align-items:center;gap:7px;
    padding:10px 12px;border-bottom:1px solid var(--rule);background:#111;
  }
  .cs-chrome i{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.18);flex:none}
  .cs-chrome span{
    margin-left:8px;font-size:10.5px;letter-spacing:.06em;color:#9a9a9a;
    background:rgba(255,255,255,.05);border-radius:99px;padding:4px 12px;
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
  }
  .cs-frame img{width:100%;height:auto;display:block}
  .cs-frame figcaption{
    padding:12px 14px;border-top:1px solid var(--rule);
    font-size:11.5px;letter-spacing:.06em;color:#a0a0a0;
  }

  /* The whole page in a window you scroll, rather than three cropped heroes.
     max-height is in vh so the frame is always shorter than the screen and the
     inner scroll cannot trap the page scroll on a phone. */
  .cs-scrollwrap{padding:clamp(26px,5vh,56px) 0}
  .cs-scrollhead{display:flex;justify-content:space-between;align-items:baseline;gap:20px;flex-wrap:wrap;margin-bottom:16px}
  .cs-scrollhead h2{font-family:var(--serif);font-weight:400;font-size:clamp(1.5rem,3vw,2.4rem);line-height:1.05}
  .cs-scrollhead p{font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:#a0a0a0}
  .cs-scroll{
    border:1px solid var(--rule);background:var(--paper);
    max-height:min(76vh,760px);overflow-y:auto;overscroll-behavior:contain;
    scrollbar-width:thin;
  }
  .cs-scroll img{width:100%;height:auto;display:block}

  /* ---- what it had to do ---- */
  .cs-brief{padding:clamp(26px,5vh,56px) 0;border-top:1px solid var(--rule)}
  .cs-brief h2,.cs-nums-wrap h2{
    font-family:var(--serif);font-weight:400;
    font-size:clamp(1.5rem,3vw,2.4rem);line-height:1.05;margin-bottom:clamp(18px,3vh,30px);
  }
  .cs-jobs{list-style:none;display:grid;gap:1px;background:var(--rule);border:1px solid var(--rule)}
  .cs-jobs li{background:var(--page);padding:20px 18px;display:grid;gap:8px}
  @media (min-width:780px){.cs-jobs li{grid-template-columns:38px 1fr 1fr;gap:24px;align-items:start}}
  .cs-jobs .n{font-family:var(--serif);font-size:1.3rem;color:var(--red);line-height:1}
  .cs-jobs b{font-weight:500;font-size:15px}
  .cs-jobs p{font-size:14px;line-height:1.6;color:#cfcfcf;text-wrap:pretty}

  /* ---- the numbers ---- */
  .cs-nums-wrap{padding:clamp(26px,5vh,56px) 0;border-top:1px solid var(--rule)}
  .cs-nums{display:grid;gap:1px;background:var(--rule);border:1px solid var(--rule);
           grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
  .cs-nums div{background:var(--paper);padding:22px 18px}
  .cs-nums b{display:block;font-family:var(--serif);font-weight:400;
             font-size:clamp(1.8rem,4vw,2.8rem);line-height:1;color:#fff}
  .cs-nums span{display:block;margin-top:9px;font-size:10.5px;letter-spacing:.14em;
                text-transform:uppercase;color:#a0a0a0}
  .cs-method{margin-top:16px;max-width:70ch;font-size:12.5px;line-height:1.6;color:#a0a0a0;text-wrap:pretty}

  /* ---- quote ---- */
  .cs-quote-wrap{padding:clamp(26px,5vh,56px) 0;border-top:1px solid var(--rule)}
  .cs-quote p{font-family:var(--serif);font-size:clamp(1.3rem,3vw,2.1rem);
              line-height:1.3;max-width:24ch;text-wrap:balance}
  .cs-quote cite{display:block;margin-top:18px;font-style:normal;
                 font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#a0a0a0}

  /* ---- out ---- */
  .cs-out{padding:clamp(26px,5vh,56px) 0;border-top:1px solid var(--rule);
          display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
  .cs-out .wrap{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;width:min(1240px,92vw)}
  .cs-live{
    display:inline-flex;align-items:center;gap:12px;min-height:44px;
    border:1px solid var(--rule-strong);padding:12px 22px;border-radius:99px;
    text-decoration:none;font-size:13px;letter-spacing:.06em;
    transition:border-color .25s,color .25s;
  }
  .cs-live:hover{border-color:var(--red);color:var(--red)}
  .cs-back{display:inline-flex;align-items:center;min-height:44px;
           font-size:12px;letter-spacing:.1em;text-transform:uppercase;
           color:#a0a0a0;text-decoration:none}
  .cs-back:hover{color:#fff}

  /* The card in the work carousel grows into this page where the browser
     supports it, and is an ordinary navigation where it does not. */
  @view-transition{navigation:auto}
  @media (prefers-reduced-motion:reduce){
    ::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}
  }
  #csHero{view-transition-name:case-shot}

`; }

/* ==================================================================== */

function JS() { return `  /* ---------- case studies ----------
     Everything that differs between one client and the next lives here. A
     block whose data is missing does not render at all: a case study with an
     empty "price agreed" row would say less than one without the row.

     Nothing in here is invented. The description, the sector, the jobs and the
     live URL are read off the client's own site; the numbers under \`perf\` were
     measured against it and carry their own method line. Anything Morfos has
     not been given yet — the agreed price, the two dates, the client's own
     words — is simply absent. */
  const CASES = {
    "prabhu-mill": {
      no: "01",
      kind: "Client build",
      client: "Ganesh Group",
      brand: "Prabhu Mill",
      place: "Rajkot, Gujarat",
      sector: "Animal feed &amp; oil cake manufacturing",
      title: "Prabhu Mill",
      stand: "Ganesh Group mill four oil cakes out of three units in Gujarat and sell them through a dealer network rather than a checkout. The site had to make a 25-year-old manufacturer legible to a distributor deciding whether to stock them — product specifications, plant, provenance and a way to get in touch, in that order.",
      owner: "Sunil Tilwa",
      /* Het confirmed Morfos may name this client publicly. All four are facts
         he supplied, not inferences: signed the 10th, handed over the 15th,
         which is five days. */
      contract: [
        ["Price agreed", "\u20b950,000"],
        ["Signed", "10 Sep 2026"],
        ["Handed over", "15 Sep 2026"],
        ["Build time", "5 days"],
      ],
      /* quote: [words, attribution] — deliberately absent. Sunil Tilwa has not
         been asked for a testimonial yet, and a testimonial is a real person's
         words. It goes in when he has sent them, and not before. */
      url: "https://www.prabhumill.com/",
      urlLabel: "prabhumill.com",
      hero: "work/prabhu-mill-hero.jpg",
      heroCap: "prabhumill.com — the opening screen at 1440&times;900.",
      full: "work/prabhu-mill-full.jpg",
      scrollNote: "Scroll inside the frame",
      jobs: [
        ["Sell to dealers, not shoppers",
         "There is no cart. The two things the home page asks for are &ldquo;Explore Products&rdquo; and &ldquo;Become a Dealer&rdquo;, and the dealer route has a page of its own rather than a form buried in a footer."],
        ["Put the specification on the card",
         "Each of the four cakes &mdash; maize, copra, cotton seed, groundnut &mdash; carries its oil and protein figures on the product card itself, because that pair of numbers is what a feed buyer compares before anything else."],
        ["Prove the plant exists",
         "Twenty-five years, fifty dealers and three named units at Padadhari, Upleta and Metoda, each with its own address and phone number, plus a gallery of the mills themselves."],
        ["Be reachable the way the trade actually is",
         "WhatsApp, Instagram and email sit in a fixed rail on every screen, and every one of the three units is listed separately so a dealer contacts the nearest mill."],
      ],
      perf: [
        ["67ms", "Time to first byte"],
        ["0.40s", "First contentful paint"],
        ["0.46s", "Page load"],
        ["909KB", "Transferred, 11 requests"],
      ],
      method: "Median of five cold loads &mdash; cache and cookies cleared before each &mdash; driven headless at 1440&times;900 from a single location in September 2026. The spread across those five runs was 0.31s to 2.51s, so treat the median as the figure and the spread as the weather. Measure it yourself before quoting it anywhere that matters.",
      /* not yet supplied: contract{}, before, quote. See HANDOFF. */
    },

    "aura-learn": {
      no: "02",
      kind: "Client build",
      client: "Aura Learn",
      brand: "Aura Learn",
      place: "Pune, Maharashtra",
      sector: "Children&rsquo;s cognitive learning &amp; education",
      title: "Aura Learn",
      stand: "Aura Learn teaches thinking rather than syllabus &mdash; three programmes in computational thinking, design thinking and cognitive training, for children between six and sixteen. The site had to do the job a parent does in about a minute: work out which programme fits the child&rsquo;s age, see what the twelve weeks actually consist of, and book a trial without filling in a form first.",
      owner: "Shlok Chopde",
      /* Het supplied all four: signed the 17th, handed over the 22nd, which
         is five days. The price is the one he gave, not an inference. */
      contract: [
        ["Price agreed", "₹50,000"],
        ["Signed", "17 Sep 2026"],
        ["Handed over", "22 Sep 2026"],
        ["Build time", "5 days"],
      ],
      /* quote: absent. Shlok Chopde has not been asked for a testimonial yet,
         and a testimonial is a real person's words. The parent videos on the
         client's own site are their parents talking about them, not about
         Morfos, so they are not a quote for this page either. */
      url: "https://auralearn.com/",
      urlLabel: "auralearn.com",
      hero: "work/aura-learn-hero.jpg",
      heroCap: "auralearn.com &mdash; the opening screen at 1440&times;900.",
      full: "work/aura-learn-full.jpg",
      scrollNote: "Scroll inside the frame",
      jobs: [
        ["Let a parent self-select in one screen",
         "Every programme card leads with the two things that decide it &mdash; the age band and the length. Computational Thinking &amp; AI is 8&ndash;15 over 12 weeks, Design Thinking 9&ndash;16 over 10, Neurobics 6&ndash;14 over 8 &mdash; so a parent rules two of the three out before reading a word of the description."],
        ["Say what the child comes away with",
         "Each card carries its own outcomes rather than a shared list: problem solving and coding fundamentals on one, empathy and innovation on another, memory, focus and attention on the third. It is the answer to &ldquo;what will this actually do for my child&rdquo;, on the card that raises the question."],
        ["Show the method, because the category is crowded",
         "The teaching approach is on the page &mdash; project-based, inquiry-based and gamified learning, an assessment framework, parent insights &mdash; so the claim of a brain-first method is something a parent can inspect rather than take on trust."],
        ["Two ways in, and neither is a contact form",
         "The page asks for one of two things: explore the programmes, or book a trial session. A parent who is convinced and a parent who is still deciding each get a next step that fits where they are."],
      ],
      /* perf: deliberately absent. Five cold loads came back 549KB/0.4s to
         9.4MB/3.8s depending on whether the testimonial videos and their
         posters had landed before loadEventEnd, and a figure with that much
         weather in it is not a measurement. It goes in when it can be
         measured properly, and not before. */
    },
  };

  (() => {
    /* Which case this page is. A per-case page says so on <html data-case>,
       which no host can rewrite; case.html has to ask the query string, and a
       query string is exactly the part a static host will drop when it
       redirects /case.html to /case. So when the shared page is handed a live
       ?c= it forwards to that case's own page instead of rendering it here. */
    const own = document.documentElement.dataset.case || "";
    const asked = new URLSearchParams(location.search).get("c");
    if (!own && asked && CASES[asked]) {
      location.replace(asked + ".html" + location.hash);
      return;
    }
    const q = own || asked || Object.keys(CASES)[0];
    const c = CASES[q];
    const set = (id, html) => { const e = document.getElementById(id); if (e) e.innerHTML = html; };

    if (!c) {
      set("csTitle", "Case not found");
      set("csStand", "That case study does not exist. <a href=\\"index.html#work\\">Back to the work</a>.");
      ["csNumsWrap", "csQuoteWrap", "csContractWrap"].forEach(i => {
        const e = document.getElementById(i); if (e) e.hidden = true; });
      document.querySelectorAll(".cs-shot,.cs-scrollwrap,.cs-brief,.cs-out").forEach(e => e.remove());
      window.__case = { id: q, found: false };
      return;
    }

    document.title = c.brand + " \\u2014 a Morfos case study";
    const desc = document.getElementById("metaDesc");
    if (desc) desc.setAttribute("content", c.stand.replace(/<[^>]+>/g, "").slice(0, 300));

    set("csNo", c.no); set("csKind", c.kind); set("csPlace", c.place);
    set("csSector", c.sector); set("csTitle", c.title); set("csStand", c.stand);

    set("csMeta",
      \`<div><dt>Client</dt><dd>\${c.client}</dd></div>\` +
      \`<div><dt>Brand</dt><dd>\${c.brand}</dd></div>\` +
      \`<div><dt>Where</dt><dd>\${c.place}</dd></div>\` +
      (c.owner ? \`<div><dt>Owner</dt><dd>\${c.owner}</dd></div>\` : "") +
      \`<div><dt>Live at</dt><dd><a href="\${c.url}" target="_blank" rel="noopener" data-hot>\${c.urlLabel}</a></dd></div>\`);

    /* the contract strip, only when all four facts exist */
    if (c.contract && c.contract.length === 4) {
      set("csContract", c.contract.map(([k, v]) =>
        \`<div><dt>\${k}</dt><dd>\${v}</dd></div>\`).join(""));
      document.getElementById("csContractWrap").hidden = false;
    }

    const hero = document.getElementById("csHero");
    hero.src = c.hero; hero.alt = "The " + c.brand + " home page as built";
    set("csHeroCap", c.heroCap);
    set("csUrlBar", c.urlLabel);

    const full = document.getElementById("csFull");
    full.src = c.full; full.alt = "The whole " + c.brand + " home page, top to bottom";
    set("csScrollNote", c.scrollNote);

    set("csJobs", c.jobs.map(([t, p], i) =>
      \`<li><span class="n">\${String(i + 1).padStart(2, "0")}</span><b>\${t}</b><p>\${p}</p></li>\`).join(""));

    if (c.perf && c.perf.length) {
      set("csNums", c.perf.map(([n, l]) => \`<div><b>\${n}</b><span>\${l}</span></div>\`).join(""));
      set("csMethod", c.method || "");
      document.getElementById("csNumsWrap").hidden = false;
    }

    if (c.quote) {
      set("csQuote", "&ldquo;" + c.quote[0] + "&rdquo;");
      set("csQuoteBy", c.quote[1]);
      document.getElementById("csQuoteWrap").hidden = false;
    }

    const live = document.getElementById("csLive");
    live.href = c.url;
    live.querySelector("span").textContent = "Visit " + c.urlLabel;

    const ld = document.getElementById("caseLd");
    if (ld) ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "Article",
      headline: c.brand + " \\u2014 a Morfos case study",
      about: { "@type": "Organization", name: c.client, url: c.url },
      author: { "@type": "Organization", name: "Morfos", url: "https://www.morfos.in/" },
      inLanguage: "en-IN",
      url: "https://www.morfos.in/" + q + ".html",
    });

    window.__case = {
      id: q, found: true,
      get blocks() {
        const on = id => { const e = document.getElementById(id); return !!e && !e.hidden; };
        return { contract: on("csContractWrap"), nums: on("csNumsWrap"), quote: on("csQuoteWrap") };
      },
      get imgs() {
        return [...document.querySelectorAll(".cs-frame img,.cs-scroll img")]
          .map(i => ({ src: i.getAttribute("src"), ok: i.complete && i.naturalWidth > 0,
                       w: i.naturalWidth, h: i.naturalHeight }));
      },
      cases: Object.keys(CASES),
    };
  })();

`; }
