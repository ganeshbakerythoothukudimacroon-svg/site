import { chromium } from "playwright";
import fs from "node:fs";

const base = process.argv[2] || "http://localhost:3000";
const outDir = process.argv[3] || "screenshots";
fs.mkdirSync(outDir, { recursive: true });

const paths = [
  "/shop",
  "/shop/biscuits",
  "/product/macroon-1kg",
  "/thoothukudi-macroons",
  "/bakery-in-thoothukudi",
  "/about",
  "/contact",
  "/faq",
  "/gifting",
  "/bulk-orders",
  "/track-order",
  "/cart",
  "/checkout",
  "/nonexistent-page-xyz",
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const issues = [];

page.on("console", (msg) => {
  if (msg.type() === "error") issues.push(`[console] ${page.url()} :: ${msg.text()}`);
});
page.on("pageerror", (err) => issues.push(`[pageerror] ${page.url()} :: ${err.message}`));
page.on("response", (res) => {
  if (!res.ok() && res.status() !== 304 && res.status() !== 404) issues.push(`[${res.status()}] ${res.url()}`);
});

for (const p of paths) {
  const name = p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "_");
  try {
    const res = await page.goto(base + p, { waitUntil: "networkidle", timeout: 20000 });
    await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
    console.log(p, "->", res.status());
  } catch (e) {
    console.log(p, "-> FAILED", e.message);
  }
}

await browser.close();

console.log("\n--- Issues ---");
if (issues.length) issues.forEach((i) => console.log(i));
else console.log("None detected.");
