// Comprueba que cada imagen referenciada en index.html (assets/...) exista en la carpeta assets/.
// Uso: npm run check-assets   (termina con error si falta alguna)
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export function findMissingAssets(htmlPath = resolve(root, 'index.html')) {
  const html = readFileSync(htmlPath, 'utf8');
  const refs = [...new Set(html.match(/assets\/[A-Za-z0-9_.\-\/]+/g) ?? [])];
  return refs.filter((ref) => !existsSync(resolve(root, ref))).sort();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const missing = findMissingAssets();
  if (missing.length === 0) {
    console.log('OK: todas las imágenes referenciadas en index.html existen.');
  } else {
    console.error(`\nFALTAN ${missing.length} imagen(es) en la carpeta assets/:\n`);
    missing.forEach((m) => console.error('  - ' + m));
    console.error('\nCópialas desde tu carpeta de imágenes original a assets/ con exactamente estos nombres.\n');
    process.exit(1);
  }
}
