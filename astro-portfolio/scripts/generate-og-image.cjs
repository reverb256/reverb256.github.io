#!/usr/bin/env node

/**
 * OG Image Generator
 * Converts og-image.svg to optimized PNG for social media
 * Runs during GitHub Actions deployment
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/og-image.svg');
const pngPath = path.join(__dirname, '../public/og-image.png');

async function generateOGImage() {
  console.log('📸 Generating OG image...');
  console.log('   Source:', svgPath);
  console.log('   Target:', pngPath);

  try {
    // Convert SVG to PNG at optimal size for social media
    await sharp(svgPath)
      .resize(1200, 630, {
        fit: 'cover',
        position: 'center'
      })
      .png({
        quality: 90,
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: true
      })
      .toFile(pngPath);

    const stats = fs.statSync(pngPath);
    const sizeKB = (stats.size / 1024).toFixed(2);

    console.log('✅ OG image generated successfully!');
    console.log(`   Size: ${sizeKB} KB`);
    console.log(`   Dimensions: 1200x630 (optimal for social media)`);

    return true;
  } catch (error) {
    console.error('❌ Failed to generate OG image:', error.message);
    throw error;
  }
}

// Run generation
generateOGImage()
  .then(() => {
    console.log('✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Error:', error);
    process.exit(1);
  });
