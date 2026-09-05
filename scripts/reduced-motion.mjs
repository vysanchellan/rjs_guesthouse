/**
 * With motion off, nothing may stay hidden. Reveals are forced to their end
 * state rather than disabled, so this checks every [data-reveal] is actually
 * painted before it is ever scrolled to.
 */
import puppeteer from "puppeteer-core";

const URL = process.env.AUDIT_URL ?? "http://localhost:4399";
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH,
  headless: "new",
  args: ["--no-sandbox"],
});

for (const reduce of [true, false]) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: reduce ? "reduce" : "no-preference" },
  ]);
  await page.goto(URL, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const report = await page.evaluate(() => {
    const nodes = [...document.querySelectorAll("[data-reveal]")];
    const hidden = nodes.filter((el) => {
      const cs = getComputedStyle(el);
      return Number(cs.opacity) < 0.99;
    });
    const transitions = nodes.map((el) => getComputedStyle(el).transitionDuration);
    return {
      total: nodes.length,
      hiddenBeforeScroll: hidden.length,
      sampleTransition: transitions[0],
      // Anything still animating forever?
      infinite: [...document.querySelectorAll("*")].filter(
        (el) => getComputedStyle(el).animationIterationCount === "infinite"
      ).length,
    };
  });

  console.log(
    `prefers-reduced-motion: ${reduce ? "reduce" : "no-preference"} →`,
    JSON.stringify(report)
  );
  await page.close();
}

await browser.close();
