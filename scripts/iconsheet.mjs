import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1000, height: 900 });
await p.goto("http://localhost:4463/icon-sheet", { waitUntil: "networkidle0" });
await p.screenshot({ path: "shots/icons.png", fullPage: true });
await b.close(); console.log("ok");
