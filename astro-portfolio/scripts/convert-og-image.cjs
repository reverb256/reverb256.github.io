#!/usr/bin/env node

/**
 * OG Image Converter
 * Converts og-image.svg to PNG for social media compatibility
 *
 * Usage:
 *   node scripts/convert-og-image.js
 *
 * Requirements (install one):
 *   Option 1: npm install -g sharp
 *   Option 2: Use online tool: https://cloudconvert.com/svg-to-png
 *   Option 3: Open SVG in browser, screenshot at 1200x630
 */

const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/og-image.svg');
const pngPath = path.join(__dirname, '../public/og-image.png');

console.log('📸 OG Image Converter');
console.log('===================\n');

// Check if SVG exists
if (!fs.existsSync(svgPath)) {
  console.error('❌ og-image.svg not found at', svgPath);
  process.exit(1);
}

console.log('✅ Source SVG found:', svgPath);
console.log('📁 Target PNG:', pngPath);
console.log('\n📋 To convert, choose one option:\n');

console.log('Option 1: Using sharp (recommended)');
console.log('  npm install sharp');
console.log('  Then run: node scripts/convert-og-image-with-sharp.js\n');

console.log('Option 2: Using ImageMagick');
console.log('  convert -background none public/og-image.svg public/og-image.png\n');

console.log('Option 3: Online converter');
console.log('  Upload public/og-image.svg to: https://cloudconvert.com/svg-to-png');
console.log('  Download as og-image.png and save to public/\n');

console.log('Option 4: Browser screenshot');
console.log('  1. Open public/og-image.svg in browser');
console.log('  2. Take screenshot at exactly 1200x630px');
console.log('  3. Save as public/og-image.png\n');

console.log('⚠️  Social platforms require PNG/JPG. SVG alone will not display previews.');

// Try using sharp if available
try {
  const sharp = require('sharp');
  console.log('🔧 sharp detected, converting...');

  sharp(svgPath)
    .resize(1200, 630)
    .png()
    .toFile(pngPath)
    .then(() => {
      console.log('✅ Successfully created', pngPath);
      console.log('📊 File size:', (fs.statSync(pngPath).size / 1024).toFixed(2), 'KB');
    })
    .catch(err => {
      console.error('❌ Conversion failed:', err.message);
    });
} catch (e) {
  // sharp not installed, just show instructions
}
