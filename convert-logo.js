const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, 'public', 'opstar-brand-logo.png');
const outputPath = path.join(__dirname, 'public', 'opstar-brand-logo.webp');

sharp(inputPath)
  .webp({ quality: 80, effort: 6 })
  .toFile(outputPath)
  .then(info => console.log('Successfully converted image:', info))
  .catch(err => console.error('Error converting image:', err));
