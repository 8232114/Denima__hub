const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const fs = require('fs');
const path = require('path');

async function compressImages() {
  console.log('Starting image compression...');
  
  // Compress PNG images
  const pngFiles = await imagemin(['src/assets/*.png', 'public/*.png'], {
    destination: 'compressed_images',
    plugins: [
      imageminPngquant({
        quality: [0.6, 0.8]
      })
    ]
  });
  
  console.log('PNG files compressed:', pngFiles.length);
  
  // Copy compressed images back to original locations
  for (const file of pngFiles) {
    const fileName = path.basename(file.sourcePath);
    const originalPath = file.sourcePath;
    
    // Backup original
    fs.copyFileSync(originalPath, originalPath + '.backup');
    
    // Replace with compressed version
    fs.copyFileSync(file.destinationPath, originalPath);
    
    console.log(`Compressed: ${fileName}`);
  }
  
  console.log('Image compression completed!');
}

compressImages().catch(console.error);

