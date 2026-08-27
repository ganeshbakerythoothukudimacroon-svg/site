import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:3000";
const browser = await chromium.launch();
const errors = [];

async function run(viewport, label) {
  const page = await browser.newPage({ viewport });
  page.on("console", (msg) => { if (msg.type() === "error") errors.push(`[${label}] console: ${msg.text()}`); });
  page.on("pageerror", (err) => errors.push(`[${label}] pageerror: ${err.message}`));

  await page.goto(base, { waitUntil: "networkidle" });

  if (label === "mobile") {
    await page.click('button[aria-label="Open menu"]');
    await page.waitForTimeout(400);
    await page.screenshot({ path: "screenshots/interact-drawer.png" });
    const drawerVisible = await page.locator('[role="dialog"]').isVisible();
    console.log("drawer visible:", drawerVisible);
    await page.click('button[aria-label="Close menu"]');
    await page.waitForTimeout(400);
  }

  await page.click('button[aria-label="Search products"]');
  await page.waitForTimeout(350);
  await page.screenshot({ path: `screenshots/interact-search-${label}.png` });
  await page.keyboard.press("Escape").catch(() => {});
  await page.waitForTimeout(350);

  // Add first product to cart — this auto-opens the cart drawer.
  const addBtn = page.locator('button[aria-label^="Add"]').first();
  await addBtn.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `screenshots/interact-cart-${label}.png` });
  const cartHasItem = await page.locator("text=Tea Rusk").first().isVisible().catch(() => false);
  console.log(`[${label}] cart drawer shows item:`, cartHasItem);

  await page.close();
}

await run({ width: 390, height: 844 }, "mobile");
await run({ width: 1440, height: 900 }, "desktop");

await browser.close();

console.log("\n--- Issues ---");
console.log(errors.length ? errors.join("\n") : "None detected.");
