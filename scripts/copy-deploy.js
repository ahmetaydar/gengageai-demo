import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
mkdirSync(join(root, 'deploy'), { recursive: true });
copyFileSync(join(root, 'dist', 'bundle.js'), join(root, 'deploy', 'bundle.js'));
console.log('Copied dist/bundle.js → deploy/bundle.js (jsDelivr fallback)');
