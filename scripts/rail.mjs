/** The rail must not be stuck open after an instant jump back to the top. */
import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH, headless: "new", args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true });
await page.goto("http://localhost:4474", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 800));

const railState = () =>
  page.evaluate(() => {
    const el = document.querySelector(".fixed.inset-x-0.bottom-0");
    return el
      ? { shown: !el.className.includes("translate-y-full"), inert: el.hasAttribute("inert") }
      : null;
  });

const at = async (y, label) => {
  await page.evaluate((n) => window.scrollTo(0, n), y);
  await new Promise((r) => setTimeout(r, 700));
  console.log(label.padEnd(34), JSON.stringify(await railState()));
};

await at(0, "top (planner in view)");
await at(3000, "mid page");
await at(0, "instant jump back to top");
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise((r) => setTimeout(r, 700));
console.log("at footer".padEnd(34), JSON.stringify(await railState()));
await at(0, "instant jump footer -> top");
await browser.close();
