# Portafolio web · Tiffany Macher (UX Researcher)

Sitio estático (HTML + CSS + JavaScript, **sin framework y sin dependencias**), bilingüe ES/EN, con modo claro/oscuro.
Se navega con rutas por `#` (por ejemplo `/#/about`, `/#/case/alcancia`), así que no hace falta configurar redirecciones en Vercel.

## Estructura (lo que debe verse en la raíz del repositorio)

```
index.html          ← toda la web
assets/             ← imágenes
scripts/            ← build.mjs, dev.mjs, check-assets.mjs
package.json
package-lock.json
vercel.json
.gitignore
.nvmrc
README.md
```

> ⚠️ **Antes de subir: copia tus imágenes originales a `assets/`.**
> Esta entrega incluye las imágenes nuevas (Alcancía, capturas de la Home y la foto de la presentación),
> pero **no incluye** estas 9 que ya tenías en tu carpeta `assets/` y que `index.html` necesita:
> `benchmark.png`, `home-new.png`, `home-old.png`, `onboarding-v1.png`, `onboarding-v2.png`, `tiffany.jpg`,
> `wf-navbar.png`, `wf-operations.png`, `wf-products.png`.
> Cópialas con **exactamente esos nombres**. Para comprobarlo: `npm run check-assets`.

## 1. Requisitos (solo para probar en tu Mac)

Para publicar en Vercel **no necesitas instalar nada**: Vercel ejecuta todo en sus servidores.
Para probar en local necesitas [Node.js](https://nodejs.org) 18 o superior (recomendado la versión LTS). Comprueba con `node -v`.

## 2. Instalar dependencias

```bash
npm install
```
No hay dependencias, así que termina en un segundo y solo genera/actualiza `package-lock.json`.

## 3. Ejecutar en local

```bash
npm run dev
```
Abre http://localhost:3000. (Parar: `Ctrl + C`.)

## 4. Compilar para producción

```bash
npm run build
```
Crea la carpeta `dist/` (copia de `index.html` + `assets/`) y avisa si falta alguna imagen. Para ver el resultado:
```bash
npm run preview
```

## 5. Subir a GitHub (principiante, Terminal de macOS)

1. En https://github.com/new crea un repositorio **vacío**: nombre `portafolio`, visibilidad a tu gusto,
   **sin** marcar «Add a README», «.gitignore» ni «license».
2. En el Terminal entra en la carpeta del proyecto (la que contiene `index.html`):
   ```bash
   cd ruta/a/tiffany-portfolio
   ```
   (Truco: escribe `cd ` y arrastra la carpeta al Terminal.)
3. Ejecuta, sustituyendo `TU-USUARIO`:
   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "Portafolio inicial"
   git remote add origin https://github.com/TU-USUARIO/portafolio.git
   git push -u origin main
   ```
   - Si es la primera vez que usas Git, puede pedirte `git config --global user.name "Tu Nombre"` y `git config --global user.email "tu@email.com"`.
   - GitHub no acepta la contraseña de la cuenta en el Terminal: usa un *Personal Access Token*
     (GitHub → Settings → Developer settings → Tokens) o instala **GitHub Desktop**, que es más fácil
     (File → Add Local Repository → Publish repository).
   - Alternativa sin Terminal: en la página del repositorio, **Add file → Upload files** y arrastra
     **el contenido** de la carpeta (no la carpeta contenedora). Máximo 100 archivos por subida.
4. **Comprueba:** recarga la página del repositorio. En la raíz debes ver `index.html`, `assets`, `scripts`,
   `package.json`, `vercel.json`… y dentro de `assets` las 22 imágenes. Si solo ves el README, la subida no se hizo bien.

**No subas:** `node_modules/`, `dist/`, `.DS_Store`, `.env` (el `.gitignore` ya los excluye).

### Publicar cambios después
```bash
git add .
git commit -m "Describe el cambio"
git push
```
Vercel detecta el push y vuelve a desplegar automáticamente.

## 6. Desplegar en Vercel

1. Entra en https://vercel.com con tu cuenta de GitHub → **Add New… → Project**.
2. En «Import Git Repository» elige `portafolio` (si no aparece: *Adjust GitHub App Permissions* y dale acceso).
3. Configuración (ya viene definida en `vercel.json`, solo verifica):
   | Campo | Valor |
   |---|---|
   | Framework Preset | **Other** |
   | Root Directory | `./` (raíz del repositorio) |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | (por defecto) |
   | Production Branch | `main` (Project → Settings → Git) |
4. **Deploy.** Al terminar obtendrás una URL del tipo `https://portafolio-xxxx.vercel.app`.

### Variables de entorno
Este proyecto **no usa variables de entorno**; no necesitas configurar ninguna ni existe `.env.example`.

## 7. Errores de despliegue más probables

| Dónde ocurre | Síntoma | Causa y solución |
|---|---|---|
| **GitHub** | El repositorio solo muestra el README o aparece una única carpeta | Subiste la carpeta contenedora o el commit estaba vacío. `index.html` debe estar en la **raíz**. Repite `git add .` + `git commit` + `git push`. |
| **GitHub** | `remote: Support for password authentication was removed` | Usa token o GitHub Desktop (ver paso 5). |
| **GitHub** | `error: src refspec main does not match any` | Hiciste `push` sin commit. Ejecuta `git add .` y `git commit -m "..."` primero. |
| **Configuración Vercel** | 404 en la URL pública | Root Directory o Output Directory equivocados. Deben ser `./` y `dist`. |
| **Configuración Vercel** | «No Output Directory named "dist" found» | `npm run build` no se ejecutó: revisa que Build Command sea `npm run build` y que `scripts/` esté en GitHub. |
| **Configuración Vercel** | Despliega una rama antigua | Settings → Git → Production Branch = `main`. |
| **Compilación** | `Build OK` pero imágenes rotas en la web | Faltan imágenes en `assets/` (el build lo avisa en el log). Cópialas con el nombre exacto y haz `git push`. Distingue mayúsculas/minúsculas: `Home-new.png` ≠ `home-new.png`. |
| **Compilación** | `Cannot find module` / `ENOENT` en el log | Falta la carpeta `scripts/` o `package.json` en el repositorio. |
| **Navegador** | Tipografía distinta | Las fuentes (Inter) se cargan desde Google Fonts: necesitan conexión a internet. |

**Cómo distinguirlos:** si falla antes de aparecer en Vercel → error de **GitHub**. Si Vercel dice que no encuentra el
directorio o el comando → error de **configuración**. Si en *Deployments → (despliegue) → Build Logs* aparece una
línea roja con `ERROR` → error de **compilación**.
