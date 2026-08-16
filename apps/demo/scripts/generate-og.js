import sharp from "sharp";

const source = "public/og.svg";
const output = "public/og.jpg";

await sharp(source)
  .jpeg({ quality: 92 })
  .toFile(output);

console.log(`Generated ${output} from ${source}`);
