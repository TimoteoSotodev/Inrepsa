# INREPSA — Sitio web

Sitio web estático (HTML5, CSS3 y JavaScript vanilla, sin frameworks), bilingüe español/inglés, con SEO técnico, para **INREPSA**: partner oficial de **Priva** (equipo de invernadero de alta tecnología) y distribuidor en México de las compostadoras industriales **Iruña Composting**.

## Estructura del proyecto

```
/                                   → Home (español)
/nosotros, /invernaderos, /compostaje, /casos-de-exito, /blog, /contacto
/en/                                → Home (inglés)
/en/about, /en/greenhouses, /en/composting, /en/success-stories, /en/blog, /en/contact
/blog/<slug>/                       → Posts del blog (ES)
/en/blog/<slug>/                    → Posts del blog (EN)
/404.html                           → 404 personalizada (bilingüe, una sola página)
/assets/logo/                       → Logo (placeholder)
/assets/img/                        → Imágenes por sección (placeholders)
/assets/fichas/                     → Fichas técnicas PDF de las compostadoras (placeholders)
/assets/favicon/                    → Favicon SVG + manifest
/css/variables.css                  → Paleta de colores y tipografía (editar aquí)
/css/styles.css                     → Resto de los estilos
/js/main.js                         → Menú móvil + WhatsApp flotante
/js/form.js                         → Envío del formulario de contacto
/sitemap.xml, /robots.txt, /vercel.json
```

Cada página existe como `carpeta/index.html`, de forma que las URLs quedan limpias (`/invernaderos`, `/en/greenhouses`, etc.) sin necesidad de configuración adicional en Vercel.

No hay sistema de "includes": el header, footer y botón de WhatsApp están duplicados en cada página en HTML plano (sin bundler ni build step), tal como se pidió. Si cambias el menú o el footer, actualízalo en cada archivo (usa buscar y reemplazar en tu editor con la cadena exacta del bloque `<header class="site-header">` o `<footer class="site-footer">`).

## Desplegar en Vercel

1. Sube este repositorio a GitHub/GitLab/Bitbucket (o usa `vercel` CLI directo desde esta carpeta).
2. En [vercel.com](https://vercel.com), importa el repositorio.
3. Framework Preset: **Other** (sitio estático, no requiere build command).
4. Output directory: la raíz del proyecto (déjalo vacío o `.`).
5. Deploy. El archivo `vercel.json` ya incluye URLs limpias (`cleanUrls`) y cache headers para CSS/JS/imágenes.

También puedes desplegar con la CLI:

```bash
npm i -g vercel
vercel
```

**Antes de publicar**, reemplaza el dominio `https://www.inrepsa.mx` por el dominio real en:
- Todas las etiquetas `<link rel="canonical">` y `hreflang`
- Las etiquetas Open Graph / Twitter (`og:url`, `og:image`, etc.)
- Los JSON-LD (`url`, `mainEntityOfPage`, etc.)
- `sitemap.xml` y `robots.txt`

(Un buscar-y-reemplazar global de `https://www.inrepsa.mx` por tu dominio final cubre todos los casos.)

## Cambiar la paleta de colores

Toda la paleta y tipografía vive en `/css/variables.css`. No se tocan más archivos:

```css
:root {
  --color-primary: #1f7a54;   /* Verde tecnológico / sustentable */
  --color-secondary: #1c2b3a; /* Azul-gris oscuro / tecnología */
  --color-accent: #e8862e;    /* Ámbar cálido, usado en CTAs */
  ...
}
```

Paleta propuesta (documentada porque el cliente no tenía una definida):

| Variable | Color | Uso |
|---|---|---|
| `--color-primary` | `#1f7a54` | Marca, pilar "Invernaderos", acentos verdes |
| `--color-secondary` | `#1c2b3a` | Header oscuro, pilar "Compostaje", footer |
| `--color-accent` | `#e8862e` | Botones de CTA ("Solicita tu cotización") |
| `--color-bg` / `--color-bg-alt` | blancos | Fondos de sección |

Tipografía: **Sora** (títulos) + **Inter** (texto), cargadas desde Google Fonts con `preconnect` y `font-display: swap`.

## Reemplazar el logo

El logo actual es un placeholder en `/assets/logo/inrepsa-logo.svg`. Sustitúyelo por el archivo real del cliente (SVG recomendado; si es PNG, actualiza las referencias `<img src="/assets/logo/inrepsa-logo.svg">` en cada página al nuevo nombre de archivo, o simplemente reemplaza el contenido del SVG).

## Reemplazar imágenes placeholder

Cada `<img>` con comentario `<!-- REEMPLAZAR: ... -->` indica qué foto real debe ir ahí. Rutas por sección:

- `/assets/img/hero/hero-invernadero.jpg` — foto hero de invernadero
- `/assets/img/invernaderos/{climatizacion,riego,monitoreo,mano-de-obra}.jpg`
- `/assets/img/compostaje/{ic-10,ic-30,ic-50,ic-100}.jpg`
- `/assets/img/blog/*.jpg` — imágenes de portada de cada post

**⚠️ Importante — derechos de imagen:** las fotos de invernaderos/soluciones que se usen como referencia visual del sitio de **Priva (priva.com)** son propiedad de Priva. Antes de publicar el sitio, **verifica con Priva/INREPSA que tienes permiso de uso** de cualquier imagen tomada de su sitio o material de marca. Si no hay autorización, usa fotografía propia o stock con licencia.

## Fichas técnicas de las compostadoras (PDF)

Los botones "Descargar ficha técnica" en `/compostaje` y `/en/composting` apuntan a:

```
/assets/fichas/IC-10.pdf
/assets/fichas/IC-30.pdf
/assets/fichas/IC-50.pdf
/assets/fichas/IC-100.pdf
```

Descarga las fichas reales desde [irunacomposting.com](https://irunacomposting.com) y colócalas con esos nombres exactos en `/assets/fichas/`.

Las especificaciones (capacidad diaria/anual y dimensiones) que aparecen en las tarjetas de cada máquina ya son datos reales tomados de irunacomposting.com al momento de construir el sitio; verifica que sigan vigentes antes de publicar.

## Conectar el formulario de contacto

El sitio es HTML/CSS/JS puro sin backend propio, así que el `<form id="quote-form">` en `/contacto` y `/en/contact` necesita conectarse a un servicio externo:

**Opción recomendada — Formspree:**
1. Crea una cuenta gratuita en [formspree.io](https://formspree.io).
2. Crea un formulario nuevo y copia tu endpoint (algo como `https://formspree.io/f/abcDEFgh`).
3. Reemplaza `https://formspree.io/f/YOUR_FORM_ID` en el atributo `action` del `<form>` en ambos archivos de contacto.

**Alternativa — función serverless de Vercel:** crea `/api/contact.js` (Vercel Function) que reciba el `POST` del formulario y envíe el correo (por ejemplo con Resend, SendGrid o Nodemailer + SMTP), y apunta el `action` del formulario a `/api/contact`.

La lógica de envío/validación ya está en `/js/form.js`, con mensajes de éxito/error en ambos idiomas.

## Favicon

Se incluye un favicon SVG temporal (`/assets/favicon/favicon.svg`) generado a partir de la paleta de marca. Para producción, genera el set completo (favicon.ico, tamaños PNG, apple-touch-icon) a partir del logo real con una herramienta como [realfavicongenerator.net](https://realfavicongenerator.net) y actualiza los `<link rel="icon">` de cada página si cambias los nombres de archivo.

## SEO implementado

- Meta title/description únicos por página (ES/EN), Open Graph y Twitter Cards.
- `hreflang` recíproco ES↔EN + `x-default` en cada página, y `canonical`.
- JSON-LD: `LocalBusiness` (home), `Product` (cada compostadora IC), `BreadcrumbList` (páginas internas), `Article` (posts del blog).
- `sitemap.xml` con las 20 URLs (ES+EN) y anotaciones `hreflang`, más `robots.txt`.
- HTML semántico (`header`, `nav`, `main`, `section`, `article`, `footer`), jerarquía H1→H2→H3 sin saltos.
- Imágenes con `alt` descriptivo bilingüe, `loading="lazy"` (excepto el hero, que usa `eager` + `fetchpriority="high"`), y `width`/`height` explícitos para evitar CLS.
- 404 personalizada bilingüe con `noindex`.

## Notas finales

- No hay build step: puedes abrir cualquier archivo `.html` directamente o servir la carpeta con cualquier servidor estático (`npx serve`, `python -m http.server`, etc.) para probar localmente.
- El diseño está optimizado mobile-first y usa CSS Grid/Flexbox sin dependencias externas de CSS.
- Antes de lanzar: revisa el dominio placeholder, sube el logo real, sube imágenes reales de Priva (con permiso) y de las compostadoras, sube las fichas PDF, y conecta el formulario.
