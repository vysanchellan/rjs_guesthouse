/** Drives the planner with real key events to prove it is operable without a mouse. */
import puppeteer from "puppeteer-core";

const URL = process.env.AUDIT_URL ?? "http://localhost:4399";
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH,
  headless: "new",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 800));

const read = () =>
  page.evaluate(() => ({
    nights: document.querySelector("output")?.textContent,
    focus:
      document.activeElement?.getAttribute("aria-label") ??
      document.activeElement?.textContent?.trim().slice(0, 32),
    total: document.querySelector(".font-display.text-4xl, .tabular.font-display")
      ?.textContent,
  }));

// Tab in from the top of the document.
const seen = [];
for (let i = 0; i < 6; i++) {
  await page.keyboard.press("Tab");
  seen.push((await read()).focus);
}
console.log("tab order:", seen);

// Reach the "one night more" control and press Enter.
while (!(await read()).focus?.includes("One night more")) {
  await page.keyboard.press("Tab");
}
console.log("before Enter:", await read());
await page.keyboard.press("Enter");
await new Promise((r) => setTimeout(r, 200));
console.log("after Enter on stepper:", await read());

// Into the strip: arrow along, then activate with Space.
await page.keyboard.press("Tab");
console.log("entered strip at:", (await read()).focus);
for (let i = 0; i < 5; i++) await page.keyboard.press("ArrowRight");
console.log("arrowed to:", (await read()).focus);
await page.keyboard.press(" ");
await new Promise((r) => setTimeout(r, 300));
console.log("after Space on night:", await read());

const summary = await page.evaluate(
  () => document.querySelector('[aria-live="polite"]')?.textContent
);
console.log("live region says:", summary);

await browser.close();
