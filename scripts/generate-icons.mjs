import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

mkdirSync(publicDir, { recursive: true });

function createIconSvg(size) {
  // Scale factor based on 512 as base
  const s = size / 512;

  // Blue background matching app's surface-deep color
  // Pink text (#ff007f) matching the loading splash
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#0d1630"/>
      <stop offset="100%" stop-color="#0a1128"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff007f" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="0" ry="0" fill="url(#bg)"/>
  <rect width="512" height="512" fill="url(#glow)"/>
  <text x="256" y="160" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="900" font-size="88" fill="#ff007f" letter-spacing="-3">IS IT</text>
  <text x="256" y="290" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="900" font-size="140" fill="#ff007f" letter-spacing="-5">A</text>
  <text x="256" y="420" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="900" font-size="88" fill="#ff007f" letter-spacing="-3">BUY?</text>
</svg>`;
}

function createMaskableIconSvg(size) {
  // Maskable icons need safe zone (inner 80%) - make content smaller
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#0d1630"/>
      <stop offset="100%" stop-color="#0a1128"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff007f" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <rect width="512" height="512" fill="url(#glow)"/>
  <text x="256" y="185" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="900" font-size="68" fill="#ff007f" letter-spacing="-2">IS IT</text>
  <text x="256" y="295" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="900" font-size="110" fill="#ff007f" letter-spacing="-4">A</text>
  <text x="256" y="395" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="900" font-size="68" fill="#ff007f" letter-spacing="-2">BUY?</text>
</svg>`;
}

function createFaviconSvg() {
  // Simplified for small sizes
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#0a1128"/>
  <text x="16" y="13" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="7" fill="#ff007f">IS IT</text>
  <text x="16" y="22" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="7" fill="#ff007f">A BUY</text>
  <text x="16" y="30" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="5" fill="#ff007f">?</text>
</svg>`;
}

const sizes = [
  { name: 'pwa-192x192.png', size: 192, maskable: false },
  { name: 'pwa-512x512.png', size: 512, maskable: false },
  { name: 'maskable-icon-512x512.png', size: 512, maskable: true },
  { name: 'apple-touch-icon-180x180.png', size: 180, maskable: false },
  { name: 'favicon-32x32.png', size: 32, maskable: false },
  { name: 'favicon-16x16.png', size: 16, maskable: false },
];

async function generate() {
  // Generate the SVG favicon
  writeFileSync(join(publicDir, 'favicon.svg'), createFaviconSvg());
  console.log('Created favicon.svg');

  for (const { name, size, maskable } of sizes) {
    const svg = maskable ? createMaskableIconSvg(size) : createIconSvg(size);
    const buffer = Buffer.from(svg);

    await sharp(buffer)
      .resize(size, size)
      .png()
      .toFile(join(publicDir, name));

    console.log(`Created ${name}`);
  }

  console.log('\nAll icons generated in public/');
}

generate().catch(console.error);
