const fs = require('fs');

try {
  function extractLegacyFields(filePath, newFilePath, arrayName) {
    const code = fs.readFileSync(filePath, 'utf8');
    const legacyContent = code.replace(/export default defineType\(\{/, `export const ${arrayName} = {`)
                              .replace(/export default \{/, `export const ${arrayName} = {`);
    fs.writeFileSync(newFilePath, legacyContent);
  }

  extractLegacyFields('./sanity/schemas/mainPage.ts', './sanity/schemas/mainPageLegacyFields.ts', 'mainPageLegacyData');
  extractLegacyFields('./sanity/schemas/koolitusPage.ts', './sanity/schemas/koolitusPageLegacyFields.ts', 'koolitusPageLegacyData');
  extractLegacyFields('./sanity/schemas/opstarProfit.ts', './sanity/schemas/opstarProfitLegacyFields.ts', 'opstarProfitLegacyData');
  fs.writeFileSync('log.txt', 'Success!');
} catch (e) {
  fs.writeFileSync('log.txt', e.toString());
}
