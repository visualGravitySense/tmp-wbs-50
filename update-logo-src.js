const fs = require('fs');
const path = require('path');

const files = [
  'src/app/blog/[slug]/page.tsx',
  'src/components/LoadingScreen.tsx',
  'src/components/LogoOpstarProfit.tsx',
  'src/components/blog/BlogCard.tsx',
  'src/components/blog/BlogPostRelatedSidebar.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\/opstar-brand-logo\.png/g, '/opstar-brand-logo.webp');
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
