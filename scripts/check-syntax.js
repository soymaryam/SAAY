#!/usr/bin/env node
// Compiles all scripts listed in index.html as ONE program (they share a global scope), so
// syntax errors and duplicate top-level declarations are caught without running a browser.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);
let code = '';
for (const f of files) {
  if (!fs.existsSync(path.join(root, f))) { console.error('Missing script: ' + f); process.exit(1); }
  code += fs.readFileSync(path.join(root, f), 'utf8') + '\n';
}
try { new vm.Script(code, { filename: 'saay-bundle.js' }); console.log(`OK: ${files.length} scripts compile together`); }
catch (e) { console.error(e.stack); process.exit(1); }
