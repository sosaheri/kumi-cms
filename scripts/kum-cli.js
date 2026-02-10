#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const pkgPath = path.join(__dirname, '..', 'package.json');
let pkg;
try {
  pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
} catch (e) {
  console.error('Could not read package.json');
  process.exit(1);
}

const scripts = pkg.scripts || {};
const kumScripts = Object.keys(scripts).filter(k => k.startsWith('kumi:'));

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('kumi CLI - helper commands');
  console.log('  node scripts/kum-cli.js        # list kumi:* scripts');
  console.log('  node scripts/kum-cli.js help   # same');
  process.exit(0);
}

if (process.argv[2] === 'help' || kumScripts.length === 0) {
  console.log('Available kumi:* scripts:');
  kumScripts.forEach(k => console.log(' -', k, ':', scripts[k]));
  process.exit(0);
}

// default action: list
console.log('Available kumi:* scripts:');
kumScripts.forEach(k => console.log(' -', k, ':', scripts[k]));
