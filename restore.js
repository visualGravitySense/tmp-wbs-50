import fs from 'fs';

try {
  fs.copyFileSync('sanity/schemas/koolitusPage.ts.broken', 'sanity/schemas/koolitusPage.ts');
  fs.copyFileSync('sanity/schemas/mainPage.ts.backup', 'sanity/schemas/mainPage.ts');
  fs.copyFileSync('sanity/schemas/opstarProfit.ts.backup', 'sanity/schemas/opstarProfit.ts');
} catch (e) {
  console.error(e);
}
