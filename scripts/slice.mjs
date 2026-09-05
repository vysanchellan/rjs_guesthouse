import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH, headless: "new", args: ["--no-sandbox","--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:4474", { waitUntil: "networkidle0" });
await page.evaluate(async () => {
  const step = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80));
  }
});
await new Promise(r => setTimeout(r, 900));
for (const [name, id, offset] of [
  ["ledger", "ledger", 700], ["rooms", "rooms", 0], ["guests", "guests", 0], ["rates", "rates", 0],
]) {
  await page.evaluate((i, o) => {
    document.getElementById(i).scrollIntoView(); window.scrollBy(0, o);
  }, id, offset);
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: `shots/sec-${name}.png` });
}
await browser.close();
console.log("sections written");
