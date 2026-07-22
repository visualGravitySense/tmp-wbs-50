const fs = require('fs');
const ts = require('typescript');

const fileContent = fs.readFileSync('sanity/schemas/koolitusPageLegacyFields.ts', 'utf8');

const sourceFile = ts.createSourceFile(
  'koolitusPageLegacyFields.ts',
  fileContent,
  ts.ScriptTarget.Latest,
  true
);

const diagnostics = sourceFile.parseDiagnostics;

if (diagnostics.length > 0) {
  const errors = diagnostics.map(d => {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(d.start);
    return `Line ${line + 1}, Col ${character + 1}: ${d.messageText}`;
  });
  fs.writeFileSync('syntax_errors.txt', errors.join('\n'));
} else {
  fs.writeFileSync('syntax_errors.txt', 'NO SYNTAX ERRORS');
}
