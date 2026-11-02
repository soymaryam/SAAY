#!/usr/bin/env node
// Bundles index.html + css + js + logo images into one self-contained file: dist/saay.html
// Useful for sharing a single file or for hosts that only accept one HTML document.
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..');
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const read = f => fs.readFileSync(path.join(root, f));
html = html.replace(/<link rel="stylesheet" href="([^"]+)">/, (_, f) => `<style>\n${read(f)}\n</style>`);
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>\n?/g)];
let js = scripts.map(m => read(m[1]).toString()).join('\n');
js = js.replace(/assets\/[\w\/-]+\.png/g, f => `data:image/png;base64,${read(f).toString('base64')}`);
scripts.forEach(m => { html = html.replace(m[0], ''); });
html = html.replace(/<link rel="icon" href="([^"]+)">/, (_, f) => `<link rel="icon" href="data:image/png;base64,${read(f).toString('base64')}">`);
html = html.replace('</body>', `<script>\n${js}\n</script>\n</body>`);
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist', 'saay.html'), html);
console.log('Built dist/saay.html (' + Math.round(html.length / 1024) + ' KB)');
