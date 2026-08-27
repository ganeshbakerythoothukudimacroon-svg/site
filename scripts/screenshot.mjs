import { chromium } from "playwright";
import fs from "node:fs";

const url = process.argv[2] || "http://localhost:3000";
const outDir = process.argv[3] || "screenshots";
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const errors = [];

for (const [label, viewport] of [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 375, height: 812 }],
]) {
  const page = await browser.newPage({ viewport });
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`[${label}] ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`[${label}] pageerror: ${err.message}`));
  page.on("response", (res) => {
    if (!res.ok() && res.status() !== 304) errors.push(`[${label}] ${res.status()} ${res.url()}`);
  });

  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.screenshot({ path: `${outDir}/${label}.png`, fullPage: true });
  await page.close();
}

await browser.close();

console.log("Screenshots saved to", outDir);
if (errors.length) {
  console.log("\n--- Console/Network issues ---");
  errors.forEach((e) => console.log(e));
} else {
  console.log("No console errors or failed requests detected.");
}
