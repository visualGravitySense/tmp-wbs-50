import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const schemasDir = path.join(process.cwd(), 'sanity/schemas');
  const results: Record<string, string[]> = {};

  const files = fs.readdirSync(schemasDir);
  for (const file of files) {
    if (file.endsWith('.ts') && file !== 'index.ts' && !file.includes('Legacy')) {
      const content = fs.readFileSync(path.join(schemasDir, file), 'utf8');
      const matches = content.match(/name:\s*'([^']+)',[\s\S]{0,50}type:\s*'object'/g);
      if (matches) {
        results[file] = [];
        for (const match of matches) {
          const name = match.match(/name:\s*'([^']+)'/)?.[1];
          if (name) results[file].push(name);
        }
      }
    }
  }

  // Find duplicates across files
  const counts: Record<string, string[]> = {};
  for (const [file, names] of Object.entries(results)) {
    for (const name of names) {
      if (!counts[name]) counts[name] = [];
      counts[name].push(file);
    }
  }

  const duplicates = Object.entries(counts).filter(([name, files]) => files.length > 1);

  return NextResponse.json({ duplicates: Object.fromEntries(duplicates) });
}
