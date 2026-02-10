#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true, strict: false });

// Mapeo de archivos a sus esquemas
const schemaMap = {
  'proyectos.json': '../schemas/projects.schema.json',
  'talleres.json': '../schemas/workshops.schema.json'
};

const dataDir = path.join(__dirname, '..', 'data');

// 1. Verificar/Crear carpeta data
if (!fs.existsSync(dataDir)) {
  console.log('--- Creando carpeta data/ para inicializar ---');
  fs.mkdirSync(dataDir, { recursive: true });
}

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

if (files.length === 0) {
  console.warn('⚠️ No se encontraron archivos JSON en la carpeta data/.');
  console.log('Tip: Crea un archivo proyectos.json en la carpeta data/ para validar.');
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
      console.warn(`  ⚠️ No hay un esquema definido para ${file}, saltando validación.`);
      continue;
    }

    const schemaPath = path.join(__dirname, schemaRelativePath);
    if (!fs.existsSync(schemaPath)) {
      console.error(`  ❌ Archivo de esquema no encontrado en: ${schemaPath}`);
      continue;
    }

    const schema = require(schemaPath);
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      hadErrors = true;
      console.error(`  ❌ Errores en ${file}:`);
      validate.errors.forEach(err => {
        console.error(`     - ${err.instancePath} ${err.message}`);
      });
    } else {
      console.log(`  ✅ ${file} es válido.`);
    }
  } catch (e) {
    hadErrors = true;
    console.error(`  ❌ Error crítico leyendo ${file}: ${e.message}`);
  }
}

if (hadErrors) {
  process.exit(1);
} else {
  console.log('\n🐦 ¡Todos los datos están listos para volar!');
}