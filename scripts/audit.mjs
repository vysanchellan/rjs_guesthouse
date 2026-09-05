/**
 * Measures what the brief asks to be measured rather than assumed:
 *   - axe-core violations at 390px and 1440px
 *   - scroll frame times at 390px under 4x CPU throttling
 *
 * Drives the locally installed Chrome over CDP. Run against a production
 * build (`next build && next start`), not the dev server.
 */
import puppeteer from "puppeteer-core";
import axeCore from "axe-core";
const axeSource = axeCore.source;

const URL = process.env.AUDIT_URL ?? "http://localhost:3000";
const CHROME =
  process.env.CHROME_PATH ??
  "C:\Program Files\Google\Chrome\Application\chrome.exe";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--force-device-scale-factor=1"],
});

async function axeAt(width, height, mobile) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, isMobile: mobile, hasTouch: mobile });
  await page.goto(URL, { waitUntil: "networkidle0" });
  await page.evaluate(axeSource);
  const results = await page.evaluate(async () =>
    // @ts-ignore - axe is injected above
    await window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
    })
  );
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  await page.close();
  return { results, overflow };
}

for (const [label, w, h, mobile] of [
  ["390x844 (mobile)", 390, 844, true],
  ["1440x900 (desktop)", 1440, 900, false],
]) {
  const { results, overflow } = await axeAt(w, h, mobile);
  console.log(`\n=== axe-core @ ${label} ===`);
  console.log(`violations: ${results.violations.length}`);
  for (const v of results.violations) {
    console.log(`  [${v.impact}] ${v.id} — ${v.help} (${v.nodes.length} node(s))`);
    for (const n of v.nodes.slice(0, 3)) console.log(`      ${n.target.join(" ")}`);
  }
  console.log(`passes: ${results.passes.length}`);
  console.log(`horizontal overflow: ${overflow}px`);
}

/* --- Scroll frame times, 390px, 4x CPU throttle ------------------------- */

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
const cdp = await page.createCDPSession();
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
await page.goto(URL, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1500));

const frames = await page.evaluate(async () => {
  const times = [];
  let last = performance.now();
  let running = true;

  const tick = (now) => {
    times.push(now - last);
    last = now;
    if (running) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  // Scroll the whole document in realistic increments.
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const steps = 90;
  for (let i = 0; i <= steps; i++) {
    window.scrollTo(0, Math.round((total * i) / steps));
    await new Promise((r) => requestAnimationFrame(() => r()));
    await new Promise((r) => setTimeout(r, 16));
  }
  running = false;
  return times.slice(2);
});

const sorted = [...frames].sort((a, b) => a - b);
const pct = (p) => sorted[Math.floor((sorted.length - 1) * p)];
const long = frames.filter((f) => f > 50).length;
const over16 = frames.filter((f) => f > 16.7).length;

console.log(`\n=== scroll frame times @ 390px, 4x CPU throttle ===`);
console.log(`frames sampled:  ${frames.length}`);
console.log(`median:          ${pct(0.5).toFixed(1)} ms`);
console.log(`p75:             ${pct(0.75).toFixed(1)} ms`);
console.log(`p95:             ${pct(0.95).toFixed(1)} ms`);
console.log(`worst:           ${sorted[sorted.length - 1].toFixed(1)} ms`);
console.log(`over 16.7ms:     ${((over16 / frames.length) * 100).toFixed(1)}%`);
console.log(`long (>50ms):    ${long} (${((long / frames.length) * 100).toFixed(1)}%)`);

await browser.close();
