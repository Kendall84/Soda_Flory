# Soda Flory – Menú digital

Sitio estático (HTML, CSS y JavaScript sin frameworks) publicado con GitHub Pages.
Menú con fotos y pedidos por WhatsApp.

## Estructura

```
index.html                  Página principal
style.css                   Estilos (tema navideño opcional: body.navidad)
script.js                   Menú, precios y configuración (CONFIG, CATEGORIAS, PRODUCTOS)
imagenes/                   Todas las fotos (JPG, 4:3 las de cajas)
_headers                    Cabeceras de seguridad (solo las usa Cloudflare)
.nojekyll                   Evita que GitHub procese el sitio con Jekyll
INSTRUCCIONES_IMAGENES.txt  Cómo agregar fotos y productos
LISTA_DE_FOTOS_CAJAS.txt    Qué foto va en cada caja
```

## Cambios frecuentes (en `script.js`)

- Número de WhatsApp: `CONFIG.numeroWhatsApp` (formato internacional, sin `+`).
- Precios y productos: lista `PRODUCTOS`.
- Fotos: guardar en `imagenes/` y escribir el nombre en el campo `imagen`.
- Después de cambiar `script.js` o `style.css`, subir también el número de versión
  (`?v=`) en `index.html` para que los celulares descarguen la versión nueva.

## Fotos livianas

Las fotos de cajas van en 900 px de ancho, formato 4:3 y menos de 150 KB.
