const fs = require('fs');

const files = [
  'src/components/GrantSection.tsx',
  'src/components/GrantSectionClientForm.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace button component
  content = content.replace(/GreenButton/g, 'BrandVibrantButton');
  
  // Replace color names
  content = content.replace(/emerald/g, 'blue');
  content = content.replace(/teal/g, 'sky');
  
  // Replace Eyebrow tone green with default
  content = content.replace(/tone="green"/g, 'tone="default"');
  
  fs.writeFileSync(file, content);
});
console.log('Replacement complete.');
