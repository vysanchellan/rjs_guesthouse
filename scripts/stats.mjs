import sharp from "sharp";
import { readdirSync } from "fs";
for (const f of readdirSync("public/images/_raw")) {
  const img = sharp(`public/images/_raw/${f}`);
  const m = await img.metadata();
  const s = await img.stats();
  const [r,g,b] = s.channels;
  console.log(f.padEnd(16), `${m.width}x${m.height}`.padEnd(11),
    "mean R/G/B:", r.mean.toFixed(0).padStart(3), g.mean.toFixed(0).padStart(3), b.mean.toFixed(0).padStart(3),
    " max:", r.max, g.max, b.max);
}
