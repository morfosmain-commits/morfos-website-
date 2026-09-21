/* capture-site.js — screenshots a client site for a case study.

   usage:  node capture-site.js <url> <name> [w] [h] [dpr] [full|viewport] [png|jpeg] [quality]
   env:    HIDE=<css selector>   remove elements before the shot
           LAYOUT=1              turn the device-metrics override back on

   Writes <name>.png / <name>.jpg next to this file. Read the
   "Screenshotting a client site" section of HANDOFF.md before changing any of
   it — most of what looks redundant in here is load-bearing.

   Full-page capture that actually works on a site with scroll reveals.
   The one-shot `chrome --screenshot` flag never scrolls, so anything behind an
   IntersectionObserver stays hidden and the section comes back blank — which is
   what happened to #products and #gallery. This drives Chrome over CDP: it
   walks the page a viewport at a time so every reveal fires, waits for the
   network to settle, then captures beyond the viewport in one shot.

   Node 24 has a native WebSocket, so this needs nothing installed. */
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = __dirname;
const PORT = 9223;

const url = process.argv[2];
const name = process.argv[3];
const W = +(process.argv[4] || 1440);
const H = +(process.argv[5] || 900);
const DPR = +(process.argv[6] || 1);
const FULL = process.argv[7] !== "viewport";
const FMT = process.argv[8] || "png";          // png | jpeg
const Q   = +(process.argv[9] || 80);
if (!url || !name) { console.error("usage: node capture-site.js <url> <name> [w] [h] [dpr] [full|viewport]"); process.exit(1); }

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const profile = path.join(OUT, "cdp-profile");
  const chrome = spawn(CHROME, [
    /* NOT --disable-gpu: with the GPU off, Chrome rasterises backdrop-filter
       layers at 1x and upscales them, so a deviceScaleFactor-2 capture of this
       site came back uniformly soft. SwiftShader gives a real 2x raster. */
    "--headless=new", "--use-gl=swiftshader", "--hide-scrollbars",
    "--remote-debugging-port=" + PORT,
    "--user-data-dir=" + profile,
    "--force-device-scale-factor=" + DPR,
    "--window-size=" + W + "," + H,
    /* Headless Chrome announces itself in the UA, and the Google Maps embed
       serves nothing to it — the map band photographed as a white box. This is
       a rendering workaround for a public page, not a way past any control. */
    "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
    "--no-first-run", "--no-default-browser-check",
    "--disable-features=Translate,MediaRouter",
    "about:blank",
  ], { stdio: "ignore" });

  let ws, tries = 0;
  while (tries++ < 60) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find(t => t.type === "page");
      if (page) { ws = page.webSocketDebuggerUrl; break; }
    } catch (e) { /* not up yet */ }
    await sleep(250);
  }
  if (!ws) { chrome.kill(); throw new Error("Chrome did not expose a debugging target"); }

  const sock = new WebSocket(ws);
  await new Promise((ok, no) => { sock.onopen = ok; sock.onerror = no; });

  let id = 0;
  const pending = new Map();
  const events = [];
  sock.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      const { ok, no } = pending.get(m.id); pending.delete(m.id);
      m.error ? no(new Error(m.error.message)) : ok(m.result);
    } else if (m.method) events.push(m.method);
  };
  const send = (method, params = {}) => new Promise((ok, no) => {
    const n = ++id; pending.set(n, { ok, no });
    sock.send(JSON.stringify({ id: n, method, params }));
  });

  await send("Page.enable");
  await send("Network.enable");
  if (process.env.LAYOUT === "1") {
    /* layout-only mode: the override is the only thing that actually drives
       the layout viewport in this Chrome build (--window-size does not), so a
       narrow-width check has to use it. It rasterises soft, which is
       irrelevant when the question is where things sit. */
    await send("Emulation.setDeviceMetricsOverride",
      { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  }

  /* No Emulation.setDeviceMetricsOverride here, deliberately. The size comes
     from --window-size and --force-device-scale-factor at launch instead.
     The override is what was blurring these captures: with it set, headless
     rasterises the scrolling layer at 1x and upscales it, so everything except
     the position:fixed header — which gets its own layer — came back soft.
     Ruled out one at a time: it was not the scroll walk, not finishing the
     animations, not the reveal blur, not --disable-gpu vs swiftshader, and not
     the mobile flag. Removing the override was what fixed it. */

  await send("Page.navigate", { url });
  /* settle: wait for the load event, then for the network to go quiet */
  for (let i = 0; i < 80 && !events.includes("Page.loadEventFired"); i++) await sleep(150);
  await sleep(1500);

  const height = (await send("Runtime.evaluate", {
    expression: "document.documentElement.scrollHeight", returnByValue: true })).result.value;

  /* Only a full-page capture walks the page. A viewport capture of the top is
     taken at rest, because this site drives its hero blur off scroll position
     and anything that moves the scroller leaves the hero soft. */
  if (FULL) {
    for (let y = 0; y < height; y += Math.round(H * 0.8)) {
      await send("Runtime.evaluate", { expression: `window.scrollTo(0,${y})` });
      await sleep(260);
    }
    /* A lazy third-party embed needs longer than a reveal animation does.
       The scroll walk starts the Google Maps iframe loading, but its tiles are
       still arriving when the walk finishes, and the map photographed as a
       white box. It is cross-origin, so its readiness cannot be inspected —
       the only option is to park on it and wait. */
    const frames = (await send("Runtime.evaluate", { returnByValue: true,
      expression: "document.querySelectorAll('iframe').length" })).result.value;
    if (frames) {
      await send("Runtime.evaluate", { expression:
        "document.querySelector('iframe').scrollIntoView({block:'center'}); true;" });
      await sleep(9000);
    }

    await send("Runtime.evaluate", { expression: "window.scrollTo(0,0)" });
    await sleep(1400);
  }

  /* The reliable one: finish every running animation, CSS and Web Animations
     API alike. Checking computed transition/animation duration missed this
     site entirely, because it reveals with element.animate() — which reports
     animationDuration '0s' — and the standfirst and buttons photographed
     half-faded. The style forcing below stays as a backstop. */
  await send("Runtime.evaluate", { expression: `
    document.getAnimations().forEach(a=>{
      /* a scroll-linked animation has no time-based timeline; finishing one
         jumps it to its END state, which on this site meant a fully blurred
         hero. Those are left exactly where the scroll position puts them. */
      const scrollLinked = a.timeline && !(a.timeline instanceof DocumentTimeline);
      if (scrollLinked) return;
      try { a.finish() } catch(e) {}
    }); true;` });
  await sleep(300);

  /* Land every reveal animation. Opacity alone was not enough: this site
     animates a blur and a translate too, so text came back legible-but-soft.
     Anything still mid-flight is forced to its finished state. */
  await send("Runtime.evaluate", { expression: `
    document.querySelectorAll('*').forEach(el=>{
      const s=getComputedStyle(el);
      const moving = s.transitionDuration!=='0s' || s.animationDuration!=='0s';
      if(!moving) return;
      if(parseFloat(s.opacity)<1) el.style.setProperty('opacity','1','important');
      if(s.filter&&s.filter!=='none') el.style.setProperty('filter','none','important');
      if(s.transform&&s.transform!=='none') el.style.setProperty('transform','none','important');
    }); true;` });

  /* and wait for every image actually to have decoded — a hero that is still
     in flight photographs as a flat colour wash */
  for (let i = 0; i < 60; i++) {
    const r = await send("Runtime.evaluate", { returnByValue: true, expression:
      `[...document.images].filter(i=>!i.complete||!i.naturalWidth).length` });
    if (r.result.value === 0) break;
    await sleep(300);
  }
  await sleep(600);

  /* HIDE=<selector> removes elements just before the capture.
     Used for the Google Maps embed: it will not render in headless Chrome at
     all — not with software GL, not with a real user agent, not with nine
     seconds parked on it — and it photographs as a white box the height of the
     map. Collapsing it lets the section close up, so the scroll-through reads
     continuously instead of showing a hole. It removes something that could
     not be photographed; it never adds anything that was not there. */
  if (process.env.HIDE) {
    const gone = (await send("Runtime.evaluate", { returnByValue: true, expression:
      `(()=>{const n=document.querySelectorAll(${JSON.stringify(process.env.HIDE)});
        n.forEach(e=>e.style.display='none');return n.length})()` })).result.value;
    console.log("  hid", gone, "x", process.env.HIDE);
    await sleep(600);
  }

  const shot = await send("Page.captureScreenshot", FMT === "jpeg"
    ? { format: "jpeg", quality: Q, captureBeyondViewport: FULL }
    : { format: "png", captureBeyondViewport: FULL, optimizeForSpeed: false });
  const file = path.join(OUT, name + "." + (FMT === "jpeg" ? "jpg" : "png"));
  fs.writeFileSync(file, Buffer.from(shot.data, "base64"));

  const bin = fs.readFileSync(file);
  const dim = FMT === "jpeg" ? "(jpeg)" : bin.readUInt32BE(16) + "x" + bin.readUInt32BE(20);
  console.log(path.basename(file), dim, (bin.length / 1024).toFixed(0) + "KB", "| pageHeight", height);

  sock.close(); chrome.kill();
  process.exit(0);
})().catch(e => { console.error("FAILED:", e.message); process.exit(1); });
