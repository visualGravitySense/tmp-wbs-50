import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });
dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'buc8lir0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'andres-prod',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// 1. Predefined list of page document types to export (excluding blogPost, post, siteSettings, etc.)
const PAGE_TYPES = [
  'mainPage',
  'aboutPage',
  'blogPage',
  'eduStandardsPage',
  'galleryPage',
  'juhendatudLoputoodPage',
  'kontaktPage',
  'koolitusPage',
  'opstarProfit',
  'opstarProfitBlock',
  'privacyPolicyPage',
  'testimonialsPage',
  'page',
];

// Helper to convert camelCase to Title Case for fallback labels
function camelCaseToTitleCase(str) {
  if (!str) return '';
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

// 2. Recursive schema file finder
function getTsFiles(dir) {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      files = files.concat(getTsFiles(filePath));
    } else if (filePath.endsWith('.ts') && !filePath.endsWith('.d.ts')) {
      files.push(filePath);
    }
  }
  return files;
}

// 3. Tokenizer and Object Literal Parser for schema TypeScript files
function parseSchemaFile(content) {
  // Strip multi-line comments
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  // Strip single-line comments (ignoring http:// or https:// URLs)
  content = content.replace(/(?:^|[^\s])\/\/.*$/gm, '');

  const tokens = [];
  const regex = /[{}[\]:,]|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`|[a-zA-Z0-9_$]+/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    tokens.push(match[0]);
  }

  const allObjects = [];
  const declaredVariables = {};
  let idx = 0;

  function parseValue(index) {
    const token = tokens[index];
    if (token === '{') {
      return parseObject(index);
    } else if (token === '[') {
      return parseArray(index);
    } else if (token && (token.startsWith("'") || token.startsWith('"') || token.startsWith('`'))) {
      return { value: token.slice(1, -1), nextIndex: index + 1 };
    } else {
      return { value: token, nextIndex: index + 1 };
    }
  }

  function parseObject(startIndex) {
    const obj = {};
    let currentIdx = startIndex + 1;
    while (currentIdx < tokens.length) {
      if (tokens[currentIdx] === '}') {
        return { value: obj, nextIndex: currentIdx + 1 };
      }
      const token = tokens[currentIdx];
      if (token === '{' || token === '[') {
        const { nextIndex } = parseValue(currentIdx);
        currentIdx = nextIndex;
      } else if (tokens[currentIdx + 1] === ':') {
        const { value, nextIndex } = parseValue(currentIdx + 2);
        obj[token] = value;
        currentIdx = nextIndex;
        if (tokens[currentIdx] === ',') currentIdx++;
      } else {
        currentIdx++;
      }
    }
    return { value: obj, nextIndex: currentIdx };
  }

  function parseArray(startIndex) {
    const arr = [];
    let currentIdx = startIndex + 1;
    while (currentIdx < tokens.length) {
      if (tokens[currentIdx] === ']') {
        return { value: arr, nextIndex: currentIdx + 1 };
      }
      const { value, nextIndex } = parseValue(currentIdx);
      arr.push(value);
      currentIdx = nextIndex;
      if (tokens[currentIdx] === ',') currentIdx++;
    }
    return { value: arr, nextIndex: currentIdx };
  }

  while (idx < tokens.length) {
    if (tokens[idx] === '{') {
      const { value, nextIndex } = parseObject(idx);
      allObjects.push(value);
      idx = nextIndex;
    } else if (tokens[idx + 1] === '=') {
      const varName = tokens[idx];
      const { value, nextIndex } = parseValue(idx + 2);
      declaredVariables[varName] = value;
      idx = nextIndex;
    } else {
      idx++;
    }
  }

  return { allObjects, declaredVariables };
}

// 4. Build Type Registry from schemas
const typeRegistry = {};
const globalDeclaredVariables = {};

function loadSchemas() {
  const schemaFiles = getTsFiles('sanity/schemas');
  console.log(`Found ${schemaFiles.length} schema files to parse.`);

  for (const file of schemaFiles) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const { allObjects, declaredVariables } = parseSchemaFile(content);

      // Merge declared variables
      Object.assign(globalDeclaredVariables, declaredVariables);

      // Register all object literals that define a schema type (having a name)
      for (const obj of allObjects) {
        if (obj && obj.name && typeof obj.name === 'string') {
          // Keep the definition with the fields or title if there's a conflict
          if (!typeRegistry[obj.name] || obj.fields || obj.title) {
            typeRegistry[obj.name] = {
              name: obj.name,
              title: obj.title || obj.name,
              type: obj.type,
              fields: obj.fields,
              of: obj.of,
            };
          }
        }
      }
    } catch (err) {
      console.warn(`Warning: Could not parse schema file ${file}:`, err.message);
    }
  }

  // Prepopulate standard block definition
  typeRegistry['block'] = { name: 'block', title: 'Text Block' };

  // Resolve variable references in schemas (e.g. fields: homeHeroFields)
  function resolveVariables(item) {
    if (!item || typeof item !== 'object') return;

    if (typeof item.fields === 'string') {
      if (globalDeclaredVariables[item.fields]) {
        item.fields = globalDeclaredVariables[item.fields];
      }
    }
    
    if (Array.isArray(item.fields)) {
      for (const f of item.fields) {
        resolveVariables(f);
      }
    }

    if (typeof item.of === 'string') {
      if (globalDeclaredVariables[item.of]) {
        item.of = globalDeclaredVariables[item.of];
      }
    }

    if (Array.isArray(item.of)) {
      for (const o of item.of) {
        resolveVariables(o);
      }
    }
  }

  for (const typeName of Object.keys(typeRegistry)) {
    resolveVariables(typeRegistry[typeName]);
  }
}

// Helper to look up field definitions in type registry
function getFieldDef(parentTypeName, fieldName) {
  const parentType = typeRegistry[parentTypeName];
  if (!parentType) return null;

  if (Array.isArray(parentType.fields)) {
    const field = parentType.fields.find((f) => f.name === fieldName);
    if (field) return field;
  }
  return null;
}

// 5. PortableText to Markdown Converter
function portableTextToMarkdown(blocks) {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      const text = block.children.map((child) => child.text || '').join('');
      
      // Basic formatting rules based on block style
      if (block.style === 'h1') return `### ${text}\n`;
      if (block.style === 'h2') return `#### ${text}\n`;
      if (block.style === 'h3') return `##### ${text}\n`;
      if (block.style === 'h4') return `###### ${text}\n`;
      if (block.style === 'blockquote') return `> ${text}\n`;
      return text;
    })
    .join('\n');
}

// 6. Documents and references map
const documentMap = {};

function resolveReference(ref) {
  if (!ref) return null;
  // Prioritize drafts if they exist, fallback to published
  const baseId = ref.replace(/^drafts\./, '');
  return documentMap[`drafts.${baseId}`] || documentMap[baseId];
}

// Format a single field value to text
function formatValue(val, fieldDef) {
  if (val === undefined || val === null) return '';
  if (typeof val === 'boolean') {
    return val ? 'Jah (True)' : 'Ei (False)';
  }
  if (typeof val === 'object') {
    if (val.current) return val.current; // Slug value
    if (fieldDef?.type === 'image') return '[Pilt / Image]';
    return '';
  }
  return String(val).trim();
}

// Format nested object values recursively
function formatNestedObject(obj, typeName, parentFieldName = '', indent = '') {
  let md = '';
  const keys = Object.keys(obj).filter((k) => !k.startsWith('_'));

  for (const key of keys) {
    const val = obj[key];
    if (val === undefined || val === null || val === '') continue;

    let fieldDef = getFieldDef(typeName, key);
    if (!fieldDef && parentFieldName) {
      const parentDef = getFieldDef(typeName, parentFieldName);
      if (parentDef && Array.isArray(parentDef.fields)) {
        fieldDef = parentDef.fields.find((f) => f.name === key);
      }
    }

    const label = fieldDef?.title || camelCaseToTitleCase(key);

    if (Array.isArray(val)) {
      if (val.length === 0) continue;
      
      // PortableText (array of block objects)
      if (val[0] && val[0]._type === 'block') {
        const textVal = portableTextToMarkdown(val);
        if (textVal.trim()) {
          md += `${indent}- **${label}**:\n${indent}  ${textVal.trim().replace(/\n/g, '\n' + indent + '  ')}\n\n`;
        }
      } else {
        // Array of items
        let itemsMd = '';
        val.forEach((item, index) => {
          if (item === null || item === undefined) return;
          if (typeof item === 'object') {
            if (item._ref) {
              const resolved = resolveReference(item._ref);
              if (resolved) {
                const subContent = formatNestedObject(resolved, resolved._type, '', indent + '    ');
                if (subContent.trim()) {
                  itemsMd += `${indent}  - Item ${index + 1} (${resolved._type}):\n${subContent}`;
                }
              }
            } else {
              const subContent = formatNestedObject(item, typeName, key, indent + '    ');
              if (subContent.trim()) {
                itemsMd += `${indent}  - Item ${index + 1}:\n${subContent}`;
              }
            }
          } else {
            itemsMd += `${indent}  - ${item}\n`;
          }
        });
        if (itemsMd) {
          md += `${indent}- **${label}**:\n${itemsMd}\n`;
        }
      }
    } else if (typeof val === 'object') {
      if (val._ref) {
        const resolved = resolveReference(val._ref);
        if (resolved) {
          const subContent = formatNestedObject(resolved, resolved._type, '', indent + '  ');
          if (subContent.trim()) {
            md += `${indent}- **${label}** (${resolved._type}):\n${subContent}`;
          }
        }
      } else if (fieldDef?.type === 'link') {
        const linkText = val.text || '';
        const linkUrl = val.link || val.href || val.url || '';
        if (linkText || linkUrl) {
          md += `${indent}- **${label}**: [${linkText || 'Link'}](${linkUrl || '#'})\n`;
        }
      } else {
        const subContent = formatNestedObject(val, typeName, key, indent + '  ');
        if (subContent.trim()) {
          md += `${indent}- **${label}**:\n${subContent}`;
        }
      }
    } else {
      const textVal = formatValue(val, fieldDef);
      if (textVal) {
        md += `${indent}- **${label}**: ${textVal}\n`;
      }
    }
  }
  return md;
}

// Main Document formatting function
function formatDocumentToMarkdown(doc) {
  const docType = doc._type;
  const docSchema = typeRegistry[docType];
  const docTitle = docSchema?.title || doc.title || camelCaseToTitleCase(docType);

  let md = `# Page: ${docTitle} (Type: ${docType}, ID: ${doc._id})\n\n`;

  const generalFields = [];
  const sections = [];
  const keys = Object.keys(doc).filter((k) => !k.startsWith('_'));

  for (const key of keys) {
    const val = doc[key];
    if (val === undefined || val === null || val === '') continue;

    if (key === 'sections' || key === 'content') {
      if (Array.isArray(val)) {
        sections.push(...val);
      }
      continue;
    }

    const fieldDef = getFieldDef(docType, key);
    const fieldType = fieldDef?.type || '';

    if (typeof val === 'object' && !Array.isArray(val) && !val._ref && fieldType !== 'link' && fieldType !== 'image') {
      const label = fieldDef?.title || camelCaseToTitleCase(key);
      sections.push({
        _type: 'nestedGroup',
        _label: label,
        _key: key,
        data: val,
        parentTypeName: docType,
        fieldName: key,
      });
    } else {
      generalFields.push({ key, val, fieldDef });
    }
  }

  // General fields
  if (generalFields.length > 0) {
    let generalFieldsMd = '';
    for (const { key, val, fieldDef } of generalFields) {
      const label = fieldDef?.title || camelCaseToTitleCase(key);
      const textVal = formatValue(val, fieldDef);
      if (textVal) {
        generalFieldsMd += `- **${label}**: ${textVal}\n`;
      }
    }
    if (generalFieldsMd) {
      md += `## Section: General Page Settings\n\n${generalFieldsMd}\n`;
    }
  }

  // Sections
  for (const section of sections) {
    if (section._type === 'nestedGroup') {
      const content = formatNestedObject(section.data, section.parentTypeName, section.fieldName);
      if (content.trim()) {
        md += `## Section: ${section._label}\n\n${content}`;
      }
    } else {
      const sectionType = section._type;
      const sectionSchema = typeRegistry[sectionType];
      const sectionLabel = sectionSchema?.title || camelCaseToTitleCase(sectionType);
      const content = formatNestedObject(section, sectionType);
      if (content.trim()) {
        md += `## Section: ${sectionLabel} (Type: ${sectionType})\n\n${content}`;
      }
    }
  }

  return md;
}

async function run() {
  console.log('1. Loading local schemas to parse titles and labels...');
  loadSchemas();

  console.log('2. Fetching all documents from Sanity...');
  const allDocs = await client.fetch('*[ _type != "sanity.imageAsset" && _type != "sanity.fileAsset" ]');
  console.log(`Fetched ${allDocs.length} total documents.`);

  // Populate global document Map
  for (const doc of allDocs) {
    documentMap[doc._id] = doc;
  }

  // 3. Filter page documents, prioritizing drafts
  const pageDocsMap = {};
  for (const doc of allDocs) {
    if (PAGE_TYPES.includes(doc._type)) {
      const isDraft = doc._id.startsWith('drafts.');
      const baseId = isDraft ? doc._id.substring(7) : doc._id;

      if (pageDocsMap[baseId]) {
        if (isDraft) {
          pageDocsMap[baseId] = doc;
        }
      } else {
        pageDocsMap[baseId] = doc;
      }
    }
  }

  const pageDocs = Object.values(pageDocsMap);
  console.log(`Filtered down to ${pageDocs.length} page documents (drafts prioritized, duplicates removed).`);

  // 4. Generate structured markdown
  let markdownContent = `# Sanity Content Export\n\n`;
  markdownContent += `Exported on: ${new Date().toISOString()}\n`;
  markdownContent += `Environment: ${process.env.NEXT_PUBLIC_SANITY_DATASET} (${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID})\n\n`;

  // Sort pages for predictable output
  pageDocs.sort((a, b) => a._type.localeCompare(b._type));

  for (const pageDoc of pageDocs) {
    console.log(`Processing page: ${pageDoc._id} (${pageDoc._type})`);
    markdownContent += formatDocumentToMarkdown(pageDoc);
    markdownContent += `\n---\n\n`;
  }

  const outputPath = 'sanity-text-export.md';
  fs.writeFileSync(outputPath, markdownContent, 'utf8');
  console.log(`\nSuccess! Exported structured text markdown to: ${outputPath}`);
}

run().catch((err) => {
  console.error('Error during execution:', err);
  process.exit(1);
});
