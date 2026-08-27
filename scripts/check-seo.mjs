import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:3000";
const paths = ["/", "/shop", "/thoothukudi-macroons", "/bakery-in-thoothukudi", "/product/macroon-1kg", "/faq", "/cart"];

const browser = await chromium.launch();
const page = await browser.newPage();

for (const p of paths) {
  await page.goto(base + p, { waitUntil: "networkidle" });
  const title = await page.title();
  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href").catch(() => null);
  const robots = await page.locator('meta[name="robots"]').getAttribute("content").catch(() => null);
  const h1Count = await page.locator("h1").count();
  const h1Text = h1Count > 0 ? await page.locator("h1").first().innerText() : "(none)";
  const ldJsonEls = await page.locator('script[type="application/ld+json"]').allTextContents();
  const types = ldJsonEls.map((t) => {
    try {
      return JSON.parse(t)["@type"];
    } catch {
      return "PARSE_ERROR";
    }
  });

  console.log(`\n=== ${p} ===`);
  console.log("title:", title);
  console.log("canonical:", canonical);
  console.log("robots meta:", robots);
  console.log("h1 count:", h1Count, "| h1:", h1Text);
  console.log("json-ld @types:", types);
}

await browser.close();
