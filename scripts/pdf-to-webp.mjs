import { stat, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pdf } from "pdf-to-img";
import sharp from "sharp";

const args = process.argv.slice(2);
const input = args[0];
const output = args[1];
const targetWidth = Number(args[2] ?? 512);

if (!input || !output) {
  console.error("Uso: node scripts/pdf-to-webp.mjs <entrada.pdf> <salida.webp> [ancho=512]");
  process.exit(1);
}

const inputPath = resolve(input);
const outputPath = resolve(output);

try {
  await stat(inputPath);
} catch {
  console.error(`No se encontró el archivo: ${inputPath}`);
  process.exit(1);
}

await mkdir(dirname(outputPath), { recursive: true });

const document = await pdf(inputPath, { scale: 4 });
let firstPage;
for await (const image of document) {
  firstPage = image;
  break;
}

if (!firstPage) {
  console.error("El PDF no tiene páginas.");
  process.exit(1);
}

const { data, info } = await sharp(firstPage).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

const LO = 235;
const HI = 251;

let removed = 0;
for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const maxc = Math.max(r, g, b);
  const sat = maxc - Math.min(r, g, b);

  let alpha = data[i + 3];
  if (maxc >= HI && sat <= 10) {
    alpha = 0;
    removed++;
  } else if (maxc >= LO && sat <= 28) {
    alpha = Math.min(alpha, Math.round((255 * (HI - maxc)) / (HI - LO)));
  }
  data[i + 3] = alpha;
}

const keyedPng = await sharp(data, { raw: info }).png().toBuffer();

const webp = await sharp(keyedPng)
  .resize({ width: targetWidth, fit: "inside" })
  .webp({ quality: 90, alphaQuality: 100 })
  .toBuffer({ resolveWithObject: true });

await sharp(webp.data).toFile(outputPath);

const metadata = await sharp(webp.data).metadata();
const stats = await sharp(webp.data).stats();
const hasTransparency = metadata.hasAlpha && stats.channels[3].min < 255;

console.log(`OK  ${outputPath}`);
console.log(`    ${metadata.width}x${metadata.height}px  ${(webp.data.length / 1024).toFixed(1)} KB`);
console.log(`    Fondo transparente: ${hasTransparency ? "sí" : "NO"} (${removed} px eliminados)`);
