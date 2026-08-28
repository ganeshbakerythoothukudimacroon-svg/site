import sharp from "sharp";
import fs from "node:fs";

const SRC = "C:\\Users\\Gayathri Sathish\\OneDrive\\Desktop\\ganesh-bakery-logo.png";
const CROP = { left: 68, top: 38, width: 535, height: 730 };
const BG_DARK = "#150a1b"; // matches --bg-primary in the new dark-luxury theme

const outDir = "public";
fs.mkdirSync(outDir, { recursive: true });

// 1. Crop the medallion, then pad to a square canvas (transparent) at high res.
const cropped = sharp(SRC).extract(CROP);
const croppedBuf = await cropped.png().toBuffer();
const croppedMeta = await sharp(croppedBuf).metadata();

const squareSize = Math.max(croppedMeta.width, croppedMeta.height);
const padX = Math.round((squareSize - croppedMeta.width) / 2);
const padY = Math.round((squareSize - croppedMeta.height) / 2);

const squareEmblem = await sharp(croppedBuf)
  .extend({ top: padY, bottom: padY, left: padX, right: padX, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp(squareEmblem).resize(1024, 1024).toFile(`${outDir}/brand/emblem.png`);

// 2. Transparent favicons at every required size.
const transparentSizes = [
  ["favicon-16x16.png", 16],
  ["favicon-32x32.png", 32],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
];
for (const [name, size] of transparentSizes) {
  await sharp(squareEmblem).resize(size, size).png().toFile(`${outDir}/${name}`);
}

// 3. Apple touch icon — flattened onto the dark brand background (no
//    transparency; iOS fills transparent corners with white otherwise).
await sharp(squareEmblem)
  .resize(160, 160)
  .extend({ top: 10, bottom: 10, left: 10, right: 10, background: BG_DARK })
  .flatten({ background: BG_DARK })
  .png()
  .toFile(`${outDir}/apple-touch-icon.png`);

// 4. favicon.ico — hand-built single-entry PNG-in-ICO (supported by all
//    modern browsers; avoids pulling in an extra ICO-encoding dependency).
const icoPng = await sharp(squareEmblem).resize(32, 32).png().toBuffer();
const iconDir = Buffer.alloc(6);
iconDir.writeUInt16LE(0, 0); // reserved
iconDir.writeUInt16LE(1, 2); // type: icon
iconDir.writeUInt16LE(1, 4); // count

const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0); // width
entry.writeUInt8(32, 1); // height
entry.writeUInt8(0, 2); // palette
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // color planes
entry.writeUInt16LE(32, 6); // bits per pixel
entry.writeUInt32LE(icoPng.length, 8); // image data size
entry.writeUInt32LE(6 + 16, 12); // offset

fs.writeFileSync(`${outDir}/favicon.ico`, Buffer.concat([iconDir, entry, icoPng]));

// 5. Web app manifest.
fs.writeFileSync(
  `${outDir}/site.webmanifest`,
  JSON.stringify(
    {
      name: "Ganesh Bakery — Shop No. 532",
      short_name: "Ganesh Bakery",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      theme_color: BG_DARK,
      background_color: BG_DARK,
      display: "standalone",
    },
    null,
    2
  )
);

console.log("Favicons generated.");
