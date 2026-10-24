// "Compilación" del sitio estático: copia index.html y assets/ a dist/.
// Vercel publica la carpeta dist/ (ver vercel.json).
import { rmSync, mkdirSync, cpSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { findMissingAssets } from './check-assets.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');

if (!existsSync(resolve(root, 'index.html'))) {
  console.error('ERROR: no se encuentra index.html en la raíz del proyecto.');
  process.exit(1);
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(resolve(root, 'index.html'), resolve(dist, 'index.html'));
if (existsSync(resolve(root, 'assets'))) cpSync(resolve(root, 'assets'), resolve(dist, 'assets'), { recursive: true });

const missing = findMissingAssets();
if (missing.length) {
  console.warn(`\nAVISO: faltan ${missing.length} imagen(es) referenciadas en index.html (se verán rotas en la web):`);
  missing.forEach((m) => console.warn('  - ' + m));
  console.warn('Cópialas a la carpeta assets/ y vuelve a subir los cambios. (npm run check-assets las lista de nuevo)\n');
}

const kb = Math.round(statSync(resolve(dist, 'index.html')).size / 1024);
console.log(`Build OK -> dist/ (index.html ${kb} KB)`);
