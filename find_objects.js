const fs = require('fs');
const path = require('path');

const schemasDir = path.join(__dirname, 'sanity/schemas');

function findObjects(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.ts')) {
      const content = fs.readFileSync(path.join(dir, file), 'utf8');
      const matches = content.match(/name:\s*'([^']+)',[\s\S]*?type:\s*'object'/g);
      if (matches) {
        console.log(`\n--- ${file} ---`);
        for (const match of matches) {
          const name = match.match(/name:\s*'([^']+)'/)[1];
          console.log(name);
        }
      }
    }
  }
}

findObjects(schemasDir);
