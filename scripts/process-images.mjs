import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "photos";
const OUT = "public/img";

const PHOTOS = {
  "505394281_122103657338900167_8486645875641448880_n.jpg": "lawn-sod-yard",
  "505171170_122103670532900167_9039599832350033909_n.jpg": "rock-fence-line",
  "505234985_122103673538900167_593238394875445898_n.jpg": "rock-bed-curve",
  "505411700_122103662174900167_1153466243342687060_n.jpg": "sod-side-yard-alt",
  "728937229_122193114560900167_5419145237890468924_n.jpg": "sign-bed-after",
  "731736247_122193114524900167_7769229582191650419_n.jpg": "sign-bed-before",
  "before.jpg": "tree-ring-before",
  "after.jpg": "tree-ring-after",
  "before1.jpg": "strip-before",
  "after1.jpg": "sod-strip",
  "before2.jpg": "bed-before",
  "after2.jpg": "rock-bed-house",
  "before3.jpg": "side-yard-before",
  "after3.jpg": "side-yard-after",
  "before4.jpg": "retaining-wall-before",
  "after4.jpg": "retaining-wall-after",
};

const SIZES = [
  { suffix: "", width: 1400, quality: 70 },
  { suffix: "-sm", width: 720, quality: 68 },
];

const CROPS = {
  "sign-bed-after": { left: 0, top: 120, width: 615, height: 1060 },
};

await mkdir(OUT, { recursive: true });

for (const [file, name] of Object.entries(PHOTOS)) {
  for (const { suffix, width, quality } of SIZES) {
    let img = sharp(`${SRC}/${file}`).rotate();
    if (CROPS[name]) img = sharp(await img.extract(CROPS[name]).toBuffer());
    await img
      .resize({ width, height: width, fit: "inside", withoutEnlargement: true })
      .modulate({ brightness: 1.02, saturation: 1.04 })
      .linear(1.03, -3)
      .sharpen({ sigma: 0.6 })
      .webp({ quality, effort: 5 })
      .toFile(`${OUT}/${name}${suffix}.webp`);
  }
  console.log("ok", name);
}

const LOGO = "assets-src/Logo.jpg";
const cx = 357, cy = 214, r = 186;
const size = r * 2;
const mask = Buffer.from(
  `<svg width="${size}" height="${size}"><defs><radialGradient id="g">` +
    `<stop offset="88%" stop-color="#fff"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/>` +
    `</radialGradient></defs><circle cx="${r}" cy="${r}" r="${r}" fill="url(#g)"/></svg>`
);
await sharp(LOGO)
  .extract({ left: cx - r, top: cy - r, width: size, height: size })
  .resize(size * 2, size * 2, { kernel: "lanczos3" })
  .composite([{ input: await sharp(mask).resize(size * 2, size * 2).png().toBuffer(), blend: "dest-in" }])
  .sharpen({ sigma: 0.8 })
  .png()
  .toFile("public/img/logo.png");
console.log("ok logo");

const { data, info } = await sharp("public/img/logo.png").ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const gold = Buffer.alloc(data.length);
for (let i = 0; i < data.length; i += 4) {
  const [rr, gg, bb, aa] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
  const k = Math.max(0, Math.min(1, (rr - bb - 32) / 70)) * (aa / 255);
  gold[i] = Math.min(255, rr * 1.05 + 10);
  gold[i + 1] = Math.min(255, gg * 1.05 + 6);
  gold[i + 2] = bb;
  gold[i + 3] = Math.round(k * 255);
}

await sharp(gold, { raw: info }).resize(420).webp({ quality: 88, alphaQuality: 90 }).toFile("public/img/logo-gold.webp");
await sharp("public/img/logo.png").resize(96).png().toFile("public/favicon.png");
console.log("ok logo-gold");
