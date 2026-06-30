import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const deployDir = join(root, 'deploy');
mkdirSync(deployDir, { recursive: true });
copyFileSync(join(root, 'dist', 'bundle.js'), join(deployDir, 'bundle.js'));
copyFileSync(join(root, 'public', '_headers'), join(deployDir, '_headers'));
console.log('Copied → deploy/bundle.js + deploy/_headers');
