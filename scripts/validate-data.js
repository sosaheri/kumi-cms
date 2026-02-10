#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true, strict: false });

// Mapping of data files to their schemas
const schemaMap = {
  'proyectos.json': '../schemas/projects.schema.json',
  'talleres.json': '../schemas/workshops.schema.json'
};

const dataDir = path.join(__dirname, '..', 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  console.log('--- Creating data/ directory to initialize ---');
  fs.mkdirSync(dataDir, { recursive: true });
}

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

if (files.length === 0) {
  console.warn('⚠️ No JSON files found in data/.');
  console.log('Tip: Create a proyectos.json file in data/ to validate.');
  process.exit(0);
}

let hadErrors = false;

for (const file of files) {
  const fullPath = path.join(dataDir, file);
  console.log(`🔍 Validando ${file}...`);
  
  try {
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const schemaRelativePath = schemaMap[file];

    if (!schemaRelativePath) {
      console.warn(`  ⚠️ No schema defined for ${file}, skipping validation.`);
      continue;
    }

    const schemaPath = path.join(__dirname, schemaRelativePath);
    if (!fs.existsSync(schemaPath)) {
      console.error(`  ❌ Schema file not found at: ${schemaPath}`);
      continue;
    }

    const schema = require(schemaPath);
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      hadErrors = true;
      console.error(`  ❌ Errors in ${file}:`);
      validate.errors.forEach(err => {
        console.error(`     - ${err.instancePath} ${err.message}`);
      });
    } else {
      console.log(`  ✅ ${file} is valid.`);
    }
  } catch (e) {
    hadErrors = true;
    console.error(`  ❌ Critical error reading ${file}: ${e.message}`);
  }
}

if (hadErrors) {
  process.exit(1);
} else {
  console.log('\n🐦 All data files are valid and ready.');
}