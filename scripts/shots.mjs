import puppeteer from "puppeteer-core";
import { mkdirSync } from "fs";

const URL = process.env.AUDIT_URL ?? "http://localhost:4399";
const OUT = process.env.SHOT_DIR ?? "shots";
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

for (const [name, width, height, mobile] of [
  ["desktop", 1440, 900, false],
  ["mobile", 390, 844, true],
]) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, isMobile: mobile, hasTouch: mobile });
  await page.goto(URL, { waitUntil: "networkidle0" });

  // Trip every reveal, then settle, so the full-page capture is the real page.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 1200));

  await page.screenshot({ path: `${OUT}/${name}-full.png`, fullPage: true });
  await page.screenshot({ path: `${OUT}/${name}-hero.png` });
  console.log(`${name}: written`);
  await page.close();
}

await browser.close();
