import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const bundlePath = join(process.cwd(), 'dist', 'bundle.js');
const bundle = readFileSync(bundlePath, 'utf8');

if (!bundle.startsWith('(function') && !bundle.includes('function')) {
  console.error('dist/bundle.js geçerli JavaScript gibi görünmüyor.');
  process.exit(1);
}

if (bundle.includes('<!DOCTYPE html>') || bundle.includes('<html')) {
  console.error('dist/bundle.js HTML içeriyor — build hatalı.');
  process.exit(1);
}

const sizeKb = Math.round(statSync(bundlePath).size / 1024);
console.log(`Build OK: dist/bundle.js (${sizeKb} KB)`);
