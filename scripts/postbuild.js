import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const bundlePath = join(root, 'dist', 'bundle.js');
const bundle = readFileSync(bundlePath, 'utf8');

if (bundle.includes('<!DOCTYPE html>') || bundle.includes('<html')) {
  console.error('dist/bundle.js HTML içeriyor — build hatalı.');
  process.exit(1);
}

const deployDir = join(root, 'deploy');
mkdirSync(deployDir, { recursive: true });
copyFileSync(bundlePath, join(deployDir, 'bundle.js'));

const sizeKb = Math.round(statSync(join(deployDir, 'bundle.js')).size / 1024);
console.log(`Build OK: deploy/bundle.js (${sizeKb} KB)`);
