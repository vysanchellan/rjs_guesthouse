/**
 * One warm-dusk grade applied to every photograph.
 *
 * The source set was shot on a phone across at least three occasions: warm
 * lamplight indoors, fluorescent in the kitchenette, harsh midday sun on the
 * exterior. Left alone they read as three different properties. This pass
 * matches exposure to a common target, pulls the electric blue back, and
 * split-tones warm-in-the-highlights / teal-in-the-shadows so the set reads as
 * one evening.
 *
 * Originals are kept untouched in public/images/_raw.
 */
import sharp from "sharp";
import { readdirSync } from "fs";

const SRC = "public/images/_raw";
const OUT = "public/images";

/** Mean luma every image is pulled toward. */
const TARGET_LUMA = 134;
/** Widest any single exposure correction is allowed to swing. */
const EXPOSURE_CLAMP = [0.62, 1.3];

const luma = ([r, g, b]) => 0.2126 * r.mean + 0.7152 * g.mean + 0.0722 * b.mean;
const clamp = (v, [lo, hi]) => Math.min(hi, Math.max(lo, v));

for (const file of readdirSync(SRC).filter((f) => f.endsWith(".jpg"))) {
  const stats = await sharp(`${SRC}/${file}`).stats();
  const exposure = clamp(TARGET_LUMA / luma(stats.channels), EXPOSURE_CLAMP);

  await sharp(`${SRC}/${file}`)
    // 1. match exposure across the set
    .linear(exposure, 0)
    // 2. take the saturation out of the royal blue and the fluorescent green
    .modulate({ saturation: 0.74 })
    // 3. split-tone: gain warms the highlights, offset lifts shadows to teal
    .linear([1.07, 1.0, 0.9], [-6, -3, 10])
    .sharpen({ sigma: 0.6 })
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(`${OUT}/${file}`);

  console.log(`${file.padEnd(16)} exposure x${exposure.toFixed(2)}`);
}
