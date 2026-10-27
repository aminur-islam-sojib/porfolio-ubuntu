const sharp = require('../node_modules/sharp');
const fs = require('fs');
const path = require('path');

// Original paths:
// viewBox = "0 0 723 627"
// Center = (361.5, 313.5)
// In a square viewBox with ~10% padding:
// Width = 868, Height = 868, X = -72.5, Y = -120.5
const PADDED_VIEWBOX = "-72 -120 868 868";

const SVG_PATHS = `
  <path d="M64.5 518L0 627H558.5L398 354H284L431 115L365 0L91 461H333L367.5 518H64.5Z" />
  <path d="M723 627H595L418 322H341.5L448.5 145L723 627Z" />
`;

// 1. Adaptive SVG Icon (for modern browsers)
const adaptiveSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${PADDED_VIEWBOX}" fill="none">
  <style>
    path { fill: #111111; }
    @media (prefers-color-scheme: dark) {
      path { fill: #ffffff; }
    }
  </style>
  ${SVG_PATHS}
</svg>`;

// 2. White SVG
const whiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 723 627" fill="none">
  <path d="M64.5 518L0 627H558.5L398 354H284L431 115L365 0L91 461H333L367.5 518H64.5Z" fill="#ffffff" />
  <path d="M723 627H595L418 322H341.5L448.5 145L723 627Z" fill="#ffffff" />
</svg>`;

// 3. CurrentColor SVG (generic for React or inline)
const currentColorSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 723 627" fill="none">
  <path d="M64.5 518L0 627H558.5L398 354H284L431 115L365 0L91 461H333L367.5 518H64.5Z" fill="currentColor" />
  <path d="M723 627H595L418 322H341.5L448.5 145L723 627Z" fill="currentColor" />
</svg>`;

// Helper: create .ico buffer from PNG buffers
function createIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type 1
  header.writeUInt16LE(numImages, 4);

  let offset = 6 + 16 * numImages;
  const dirEntries = [];

  for (const img of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data
    dirEntries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map((img) => img.buffer)]);
}

async function main() {
  // Save icon.svg to src/app/icon.svg
  fs.writeFileSync('src/app/icon.svg', adaptiveSvg, 'utf8');
  console.log('Created src/app/icon.svg');

  // Also save public/avatars/brand-logo.svg (hyphenated alias)
  fs.writeFileSync('public/avatars/brand-logo.svg', adaptiveSvg, 'utf8');
  console.log('Created public/avatars/brand-logo.svg');

  // Save white SVG
  fs.writeFileSync('public/avatars/brand-logo-white.svg', whiteSvg, 'utf8');
  console.log('Created public/avatars/brand-logo-white.svg');

  // Generate 512x512 high-res white PNG
  const whitePng512 = await sharp(Buffer.from(whiteSvg))
    .resize(512, 444, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync('public/avatars/brand-logo-white.png', whitePng512);
  console.log('Created public/avatars/brand-logo-white.png');

  // Copy/ensure brand-logo.png alias
  if (fs.existsSync('public/avatars/brand logo.png')) {
    fs.copyFileSync('public/avatars/brand logo.png', 'public/avatars/brand-logo.png');
    console.log('Created public/avatars/brand-logo.png (alias)');
  }

  // Generate Apple Touch Icon (180x180) with modern rounded dark squircle / high-contrast
  const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
    <rect width="180" height="180" rx="40" fill="#18181B"/>
    <g transform="translate(90, 90) scale(0.16) translate(-361.5, -313.5)">
      <path d="M64.5 518L0 627H558.5L398 354H284L431 115L365 0L91 461H333L367.5 518H64.5Z" fill="#FFFFFF"/>
      <path d="M723 627H595L418 322H341.5L448.5 145L723 627Z" fill="#FFFFFF"/>
    </g>
  </svg>`;
  const appleIconBuffer = await sharp(Buffer.from(appleSvg)).png().toBuffer();
  fs.writeFileSync('src/app/apple-icon.png', appleIconBuffer);
  fs.writeFileSync('public/apple-touch-icon.png', appleIconBuffer);
  console.log('Created src/app/apple-icon.png & public/apple-touch-icon.png');

  // Generate raster favicon for favicon.ico
  // At 16x16, 32x32, 48x48:
  // Using an Ubuntu-styled badge or high-contrast mark so it's visible on both dark & light tabs
  const faviconSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="#1E1E1E"/>
    <g transform="translate(${size / 2}, ${size / 2}) scale(${(size * 0.72) / 723}) translate(-361.5, -313.5)">
      <path d="M64.5 518L0 627H558.5L398 354H284L431 115L365 0L91 461H333L367.5 518H64.5Z" fill="#FFFFFF"/>
      <path d="M723 627H595L418 322H341.5L448.5 145L723 627Z" fill="#FFFFFF"/>
    </g>
  </svg>`;

  const png16 = await sharp(Buffer.from(faviconSvg(16))).png().toBuffer();
  const png32 = await sharp(Buffer.from(faviconSvg(32))).png().toBuffer();
  const png48 = await sharp(Buffer.from(faviconSvg(48))).png().toBuffer();

  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);

  fs.writeFileSync('src/app/favicon.ico', icoBuffer);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  console.log('Created src/app/favicon.ico & public/favicon.ico');

  // Also create icon.png in src/app for standard Next.js icon resolution
  const icon32Buffer = await sharp(Buffer.from(adaptiveSvg)).resize(32, 32).png().toBuffer();
  const icon192Buffer = await sharp(Buffer.from(appleSvg)).resize(192, 192).png().toBuffer();
  fs.writeFileSync('src/app/icon.png', icon32Buffer);
  fs.writeFileSync('public/icon-192.png', icon192Buffer);
  console.log('Created src/app/icon.png & public/icon-192.png');
}

main().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
