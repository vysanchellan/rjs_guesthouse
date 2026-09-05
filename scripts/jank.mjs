/** Locates long frames by the section they occur in. */
import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
const cdp = await p.createCDPSession();
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
await p.goto(process.env.AUDIT_URL ?? "http://localhost:4474", { waitUntil: "networkidle0" });
await new Promise(r => setTimeout(r, 1500));

const data = await p.evaluate(async () => {
  const samples = [];
  let last = performance.now(); let running = true;
  const tick = (now) => { samples.push({ dt: now - last, y: window.scrollY }); last = now; if (running) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
  const total = document.documentElement.scrollHeight - window.innerHeight;
  for (let i = 0; i <= 90; i++) {
    window.scrollTo(0, Math.round(total * i / 90));
    await new Promise(r => requestAnimationFrame(() => r()));
    await new Promise(r => setTimeout(r, 16));
  }
  running = false;
  const sections = [...document.querySelectorAll("section, footer")].map(el => ({
    id: el.id || el.tagName.toLowerCase(),
    top: el.offsetTop, bottom: el.offsetTop + el.offsetHeight,
  }));
  return { samples: samples.slice(2), sections, docH: document.documentElement.scrollHeight };
});

const nameFor = (y) => data.sections.find(s => y + 400 >= s.top && y + 400 < s.bottom)?.id ?? "?";
const long = data.samples.filter(s => s.dt > 50);
console.log(`long frames (>50ms): ${long.length} of ${data.samples.length}`);
const tally = {};
for (const s of long) { const n = nameFor(s.y); (tally[n] ??= []).push(Math.round(s.dt)); }
for (const [k, v] of Object.entries(tally)) console.log(`  ${k.padEnd(14)} ${v.length} frame(s): ${v.join(", ")}ms`);
await b.close();
