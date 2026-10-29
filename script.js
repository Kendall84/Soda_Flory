/* ==========================================================
   SODA FLORY - LÓGICA DE LA PÁGINA
   ----------------------------------------------------------
   Para modificar el menú NO hace falta tocar el HTML.
   Solo editá las listas de la sección 2:
     - CATEGORIAS      (categorías y su orden)
     - PRODUCTOS       (todo el menú, incluidas las cajas)
     - MIERCOLES_IMAGEN (imagen única de la promoción)
   Productos de lista con varios precios: usá  variantes: [{ etiqueta: "Solo", precio: 1300 }, …]
   Cada elemento con  demo: true  es un dato de demostración.
   Cuando tengás el dato real, cambialo y quitá esa línea.

   FOTOS: si un elemento tiene  imagen con el nombre del archivo  se muestra
   la foto; si dice  imagen: ""  simplemente no se muestra nada
   (sin espacios vacíos). Ver INSTRUCCIONES_IMAGENES.txt
   ========================================================== */


/* ==========================================================
   1. CONFIGURACIÓN
   ========================================================== */

const CONFIG = {
  // Número de WhatsApp de Soda Flory en formato internacional (Costa Rica = 506)
  numeroWhatsApp: "50689344447",
  simboloMoneda: "₡",
  carpetaImagenes: "imagenes/",   // ruta relativa: funciona en cualquier alojamiento
  precioMiercolesDeMil: 1000,
  mensajeGeneral: "Hola, Soda Flory. Quisiera hacer un pedido.",
  // Enlace de Google Maps de la soda (pegalo entre las comillas).
  // Ejemplo: "https://maps.app.goo.gl/xxxxxxxx"
  enlaceGoogleMaps: "https://maps.app.goo.gl/ZBywp7JGUyHCi57MA?g_st=ic",
  direccionTexto: ""   // opcional: dirección escrita para mostrar debajo del mapa
};


/* ==========================================================
   2. DATOS (editá aquí)
   ----------------------------------------------------------
     id           identificador único, sin espacios ni tildes
     nombre       nombre que ve el cliente
     descripcion  texto breve (opcional en el menú general)
     precio       número en colones, sin símbolo ni puntos (ej. 3500)
     categoria    solo para PRODUCTOS (debe estar en CATEGORIAS)
     imagen       nombre del archivo dentro de /imagenes ("" si no hay foto)
     demo         true = dato de demostración (mostrar etiqueta)
   ========================================================== */

// Categorías del menú, en el orden en que aparecen en pantalla.
// formato "tarjetas": nombre, descripción, precio y foto opcional
// formato "lista":    solo nombre y precio (con miniatura si hay foto)
// Todas las categorías aparecen siempre; "Todos" solo muestra las que ya tienen productos.
const CATEGORIAS = [
  { nombre: "Big Box",                formato: "tarjetas" },
  { nombre: "Cajitas y Combos Flory", formato: "tarjetas" },
  { nombre: "Especialidades",         formato: "lista",
    nota: "En nachos, papanachos, supremas y chalupona, la versión solo de carne cuesta ₡400 más." },
  { nombre: "Rapiditas",              formato: "lista",
    nota: "Cualquier empanada solo de carne cuesta ₡400 adicionales." },
  { nombre: "Extras",                 formato: "lista" },
  { nombre: "Bebidas",                formato: "lista" }
];

// ---- Menú ----
// numero: número del producto en el menú (se muestra para pedir "la número 4")
// nota:   aviso extra (por ejemplo, salsas a escoger)
const NOTA_SALSAS = "Salsa a escoger: BBQ, mostaza miel o búfalo.";

const PRODUCTOS = [
  // ===== BIG BOX =====
  { id: "bigbox-1",  numero: 1, categoria: "Big Box", nombre: "Chicken Flory", descripcion: "6 piezas de pollo con papas, doraditas y ensalada.", precio: 5500, imagen: "caja-chicken.jpg" },
  { id: "bigbox-2a", numero: 2, categoria: "Big Box", nombre: "Mega Chicken (solas)", descripcion: "10 piezas de pollo solas.", nota: NOTA_SALSAS, precio: 6500, imagen: "" },
  { id: "bigbox-2b", numero: 3, categoria: "Big Box", nombre: "Mega Chicken con mega papas", descripcion: "10 piezas de pollo con mega papas.", nota: NOTA_SALSAS, precio: 8600, imagen: "" },
  { id: "bigbox-3",  numero: 4, categoria: "Big Box", nombre: "Mini Flower", descripcion: "2 empanadas, 2 rollos de tacos, 2 burritos, 1 hamburguesa, 1 perro, papas y doraditas.", precio: 6800, imagen: "caja-mini-flower.jpg" },
  { id: "bigbox-4",  numero: 5, categoria: "Big Box", nombre: "Bomba Mixta", descripcion: "Caja pizzera con una capa de nachos con carnes mixtas, seguida de una capa de papas con más carnes mixtas, salchichas y pepperoni, con nuestras deliciosas salsas y pico de gallo.", precio: 7600, imagen: "caja-bomba.jpg" },
  { id: "bigbox-5",  numero: 6, categoria: "Big Box", nombre: "Caja 3x3", descripcion: "3 hamburguesas y 3 empanadas pequeñas.", precio: 4900, imagen: "caja-3x3.jpg" },
  { id: "bigbox-6",  numero: 7, categoria: "Big Box", nombre: "Caja Flory Empanadas", descripcion: "5 empanadas arregladas con papas y doraditas.", precio: 5000, imagen: "" },
  { id: "bigbox-7",  numero: 8, categoria: "Big Box", nombre: "Caja para Compartir", descripcion: "4 hamburguesas con 3 salchipapas.", precio: 5600, imagen: "" },
  { id: "bigbox-8",  numero: 9, categoria: "Big Box", nombre: "Caja Mixta", descripcion: "3 hamburguesas, 1 perro y 1 burrito con papas y doraditas.", precio: 5400, imagen: "" },
  { id: "bigbox-9",  numero: 10, categoria: "Big Box", nombre: "Caja Familiar", descripcion: "Un entero de cantones con 4 piezas de pollo, 4 piezas de alas, 2 tacos chinos, 1 chuleta, 1 gallo de salchichón con papas y una gaseosa de 1.5 L.", precio: 12300, imagen: "" },
  { id: "bigbox-10", numero: 11, categoria: "Big Box", nombre: "La Tóxica", descripcion: "2 hamburguesas, 2 tacos con papas y nachos medianos mixtos.", precio: 5700, imagen: "caja-la-toxica.jpg" },

  // ===== CAJITAS Y COMBOS FLORY =====
  { id: "cajita-1",  numero: 1,  categoria: "Cajitas y Combos Flory", nombre: "4 piezas de pollo con papas y doraditas", precio: 3800, imagen: "caja-4-piezas-de-pollo.jpg" },
  { id: "cajita-2",  numero: 2,  categoria: "Cajitas y Combos Flory", nombre: "2 rollos de tacos y 2 piezas de pollo con papas y doraditas", precio: 3300, imagen: "caja-flory-1.jpg" },
  { id: "cajita-3",  numero: 3,  categoria: "Cajitas y Combos Flory", nombre: "1 hamburguesa y 2 piezas de pollo con papas y doraditas", precio: 3300, imagen: "" },
  { id: "cajita-4",  numero: 4,  categoria: "Cajitas y Combos Flory", nombre: "1 hamburguesa y 2 rollos de tacos con papas y doraditas", precio: 3300, imagen: "" },
  { id: "cajita-5",  numero: 5,  categoria: "Cajitas y Combos Flory", nombre: "2 hamburguesas con salchipapas", precio: 3600, imagen: "" },
  { id: "cajita-6",  numero: 6,  categoria: "Cajitas y Combos Flory", nombre: "2 burros grandes con papas y doraditas", precio: 4300, imagen: "" },
  { id: "cajita-7",  numero: 7,  categoria: "Cajitas y Combos Flory", nombre: "1 hamburguesa, 1 burrito y 1 empanada con papas y doraditas", precio: 3700, imagen: "" },
  { id: "cajita-8",  numero: 8,  categoria: "Cajitas y Combos Flory", nombre: "4 piezas de alas con chicharrón, papas, doraditas y ensalada", precio: 3600, imagen: "" },
  { id: "cajita-9",  numero: 9,  categoria: "Cajitas y Combos Flory", nombre: "2 hamburguesas y 2 burros con papas y doraditas", precio: 4400, imagen: "" },
  { id: "cajita-10", numero: 10, categoria: "Cajitas y Combos Flory", nombre: "2 burritos y 2 tacos con salchipapas", precio: 3400, imagen: "" },
  { id: "cajita-11", numero: 11, categoria: "Cajitas y Combos Flory", nombre: "Salchipapas grandes con 3 tacos de carne mexicana, pico de gallo y salsas", precio: 3800, imagen: "caja-de-tacos.jpg" },

  // ===== ESPECIALIDADES =====
  { id: "esp-nachos", numero: 1, categoria: "Especialidades", nombre: "Nachos mixtos", precio: 3200 },
  { id: "esp-papanachos", numero: 2, categoria: "Especialidades", nombre: "Papanachos mixtos", precio: 3800 },
  { id: "esp-supremas", numero: 3, categoria: "Especialidades", nombre: "Supremas", precio: 3500 },
  { id: "esp-chalupona", numero: 4, categoria: "Especialidades", nombre: "Chalupona", variantes: [{ etiqueta: "Sola", precio: 2500 }, { etiqueta: "Con papas", precio: 3000 }] },
  { id: "esp-patacon", numero: 5, categoria: "Especialidades", nombre: "Patacón", descripcion: "Carne desmechada, pico de gallo, salsas y queso.", precio: 2800 },
  { id: "esp-alas", numero: 6, categoria: "Especialidades", nombre: "Alas de pollo", descripcion: "Todas incluyen papas y doraditas.", nota: "Salsa a escoger: búfalo, barbacoa o mostaza miel (₡300 adicional).", variantes: [{ etiqueta: "4 piezas", precio: 1500 }, { etiqueta: "8 piezas", precio: 3000 }, { etiqueta: "12 piezas", precio: 4000 }] },
  { id: "esp-pollo", numero: 7, categoria: "Especialidades", nombre: "Pollo", variantes: [{ etiqueta: "Porción, 2 piezas", precio: 1400 }, { etiqueta: "Con ensalada y papas, 2 piezas", precio: 2500 }] },
  { id: "esp-costilla", numero: 8, categoria: "Especialidades", nombre: "Costilla", descripcion: "Con yuca, papas o tajadas a escoger.", precio: 3800 },
  { id: "esp-vigoron", numero: 9, categoria: "Especialidades", nombre: "Vigorón con chicharrón", descripcion: "Con yuca, tajada y ensalada.", variantes: [{ etiqueta: "Pequeño", precio: 2900 }, { etiqueta: "Grande", precio: 3300 }] },
  { id: "esp-chuleta", numero: 10, categoria: "Especialidades", nombre: "Chuleta", variantes: [{ etiqueta: "Sola con ensalada", precio: 1200 }, { etiqueta: "Con papas y ensalada", precio: 1700 }] },
  { id: "esp-canton", numero: 11, categoria: "Especialidades", nombre: "Cantonés", variantes: [{ etiqueta: "Medio", precio: 2200 }, { etiqueta: "Entero", precio: 2800 }] },
  { id: "esp-combo-canton", numero: 12, categoria: "Especialidades", nombre: "Combo cantonés con papas y ensalada", descripcion: "A escoger: chuleta, pollo, pescado o taco chino.", precio: 3500 },
  { id: "esp-quesadilla", numero: 13, categoria: "Especialidades", nombre: "Quesadilla", precio: 2500 },

  // ===== RAPIDITAS =====
  { id: "rap-taco", numero: 1, categoria: "Rapiditas", nombre: "Taco", variantes: [{ etiqueta: "Solo", precio: 1300 }, { etiqueta: "Con papas", precio: 1800 }] },
  { id: "rap-hamb", numero: 2, categoria: "Rapiditas", nombre: "Hamburguesa", variantes: [{ etiqueta: "Sola", precio: 1300 }, { etiqueta: "Con papas", precio: 2000 }] },
  { id: "rap-hamb-esp", numero: 3, categoria: "Rapiditas", nombre: "Hamburguesa especial", variantes: [{ etiqueta: "Sola", precio: 1800 }, { etiqueta: "Con papas", precio: 2400 }] },
  { id: "rap-hamb-deluxe", numero: 4, categoria: "Rapiditas", nombre: "Hamburguesa deluxe", descripcion: "Doble torta, jamón, tocino y carne desmechada.", variantes: [{ etiqueta: "Sola", precio: 2400 }, { etiqueta: "Con papas", precio: 3000 }] },
  { id: "rap-perro", numero: 5, categoria: "Rapiditas", nombre: "Perro", variantes: [{ etiqueta: "Solo", precio: 750 }, { etiqueta: "Con papas", precio: 1500 }] },
  { id: "rap-burro", numero: 6, categoria: "Rapiditas", nombre: "Burro", variantes: [{ etiqueta: "Solo", precio: 750 }, { etiqueta: "Con papas", precio: 1500 }] },
  { id: "rap-burro-g", numero: 7, categoria: "Rapiditas", nombre: "Burro grande", variantes: [{ etiqueta: "Solo", precio: 1800 }, { etiqueta: "Con papas", precio: 3000 }] },
  { id: "rap-doraditas", numero: 8, categoria: "Rapiditas", nombre: "Doraditas", variantes: [{ etiqueta: "Pequeñas", precio: 1000 }, { etiqueta: "Medianas", precio: 1500 }, { etiqueta: "Grandes", precio: 2000 }] },
  { id: "rap-papas", numero: 9, categoria: "Rapiditas", nombre: "Papas", variantes: [{ etiqueta: "Pequeñas", precio: 1000 }, { etiqueta: "Medianas", precio: 1500 }, { etiqueta: "Grandes", precio: 2000 }] },
  { id: "rap-salchipapas", numero: 10, categoria: "Rapiditas", nombre: "Salchipapas", variantes: [{ etiqueta: "Pequeña", precio: 1300 }, { etiqueta: "Mediana", precio: 1700 }, { etiqueta: "Extra grande", precio: 2300 }] },
  { id: "rap-gallo", numero: 11, categoria: "Rapiditas", nombre: "Gallo de salchichón", variantes: [{ etiqueta: "Sencillo", precio: 1000 }, { etiqueta: "Doble", precio: 1800 }] },
  { id: "rap-emp-peq", numero: 12, categoria: "Rapiditas", nombre: "Empanada pequeña", variantes: [{ etiqueta: "Sola", precio: 750 }, { etiqueta: "Con papas", precio: 1200 }] },
  { id: "rap-emp-gde", numero: 13, categoria: "Rapiditas", nombre: "Empanada grande", variantes: [{ etiqueta: "Sola", precio: 1200 }, { etiqueta: "Arreglada", precio: 1600 }] },
  { id: "rap-mega-emp", numero: 14, categoria: "Rapiditas", nombre: "Mega empanada", descripcion: "Arreglada con papas.", precio: 2600 },
  { id: "rap-maduro", numero: 15, categoria: "Rapiditas", nombre: "Maduro con queso", precio: 1000 },
  { id: "rap-tacos-chinos", numero: 16, categoria: "Rapiditas", nombre: "Tacos chinos", descripcion: "2 unidades.", precio: 1700 },

  // ===== EXTRAS =====
  { id: "ext-salsa", categoria: "Extras", nombre: "Salsa adicional", descripcion: "Cualquier salsa, mayonesa con tomate.", precio: 400 },
  { id: "ext-flan", categoria: "Extras", nombre: "Flan", precio: 500 },
  { id: "ext-arroz", categoria: "Extras", nombre: "Arroz con leche", descripcion: "Solo fines de semana.", precio: 500 },
  { id: "ext-gelatina", categoria: "Extras", nombre: "Gelatina tricolor", precio: 500 },

  // ===== BEBIDAS =====
  { id: "beb-gaseosa", categoria: "Bebidas", nombre: "Gaseosa", variantes: [{ etiqueta: "Pequeña", precio: 400 }, { etiqueta: "355 ml", precio: 450 }, { etiqueta: "Litro y medio", precio: 1500 }, { etiqueta: "Grande", precio: 1550 }] },
  { id: "beb-fresco", categoria: "Bebidas", nombre: "Fresco natural", precio: 500 }
];

// ---- Miércoles de mil ----
// Una sola imagen con los productos de la promoción.
// Cuando tengás la foto: guardala en imagenes/ y escribí su nombre en  imagen
// (por ejemplo "miercoles-mil.jpg"). Mientras esté vacío se muestra el espacio reservado.
const MIERCOLES_IMAGEN = {
  imagen: "",
  nombre: "Productos del Miércoles de mil en Soda Flory"
};


/* ==========================================================
   3. FUNCIONES AUXILIARES
   ========================================================== */

function esPrecioValido(precio) {
  return typeof precio === "number" && Number.isFinite(precio) && precio >= 0;
}

// 12500 -> "₡12.500"
function formatearColones(monto) {
  const entero = Math.round(monto);
  return CONFIG.simboloMoneda + String(entero).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function escaparHtml(texto) {
  return String(texto)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function construirEnlaceWhatsApp(mensaje) {
  const base = "https://wa.me/" + CONFIG.numeroWhatsApp;
  return mensaje ? base + "?text=" + encodeURIComponent(mensaje) : base;
}

// Foto solo si existe el nombre del archivo; si no, no se dibuja nada.
// Si el archivo no se encuentra, la foto se quita sin dejar un hueco.
const MARCADOR_FOTO = '<div class="photo-reservada" aria-hidden="true">' +
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>' +
  '<span>Soda Flory</span></div>';

function crearFoto(item, clase) {
  if (!item.imagen) return "";
  const ruta = escaparHtml(CONFIG.carpetaImagenes + item.imagen);
  return '<img class="' + clase + '" src="' + ruta + '" alt="' + escaparHtml(item.nombre) +
    '" loading="lazy" data-quitar-si-falla>';
}

// Si un archivo de foto no existe, se quita la imagen sin dejar un hueco.
// (Se usa un listener en vez de onerror="..." para poder aplicar una CSP estricta.)
document.addEventListener("error", function (evento) {
  const el = evento.target;
  if (el && el.tagName === "IMG" && el.hasAttribute("data-quitar-si-falla")) {
    const contenedor = el.parentElement;
    if (contenedor && contenedor.classList.contains("is-reservada")) {
      contenedor.innerHTML = MARCADOR_FOTO;   // se mantiene el espacio de la foto
      return;
    }
    el.remove();
    if (contenedor && contenedor.classList.contains("product-media") && !contenedor.children.length) contenedor.remove();
  }
}, true);

function crearEtiquetaDemo(item) {
  return item.demo ? '<span class="badge badge-pending">Demostración</span>' : "";
}


/* ==========================================================
   4. PANTALLA
   ========================================================== */

let categoriaActiva = "Todos";

// Todas las categorías se muestran siempre en los botones de filtro.
function categoriasConProductos() {
  return CATEGORIAS;
}

function dibujarFiltroCategorias() {
  const nombres = ["Todos"].concat(categoriasConProductos().map(function (c) { return c.nombre; }));
  document.getElementById("category-filter").innerHTML = nombres.map(function (nombre) {
    return '<button type="button" class="chip" data-categoria="' + escaparHtml(nombre) +
      '" aria-pressed="' + (nombre === categoriaActiva) + '">' + escaparHtml(nombre) + '</button>';
  }).join("");
}

function crearFilaMenu(item) {
  const variantes = Array.isArray(item.variantes) ? item.variantes.filter(function (x) { return esPrecioValido(x.precio); }) : [];
  if (!esPrecioValido(item.precio) && variantes.length === 0) return "";
  const numero = item.numero ? '<span class="menu-row-num">Nº ' + escaparHtml(item.numero) + '</span>' : "";
  const descripcion = item.descripcion ? '<div class="menu-row-desc">' + escaparHtml(item.descripcion) + '</div>' : "";
  const nota = item.nota ? '<div class="menu-row-nota">' + escaparHtml(item.nota) + '</div>' : "";
  const precios = variantes.length
    ? '<ul class="menu-variantes">' + variantes.map(function (x) {
        return '<li><span>' + escaparHtml(x.etiqueta) + '</span><strong>' + formatearColones(x.precio) + '</strong></li>';
      }).join("") + '</ul>'
    : '<span class="menu-row-price">' + formatearColones(item.precio) + '</span>';
  return '<li class="menu-row' + (variantes.length ? ' tiene-variantes' : '') + '">' +
    '<div class="menu-row-text"><div class="menu-row-name">' + numero + escaparHtml(item.nombre) + '</div>' + descripcion + nota + '</div>' +
    precios +
  '</li>';
}

function dibujarMenu() {
  const contenedor = document.getElementById("menu-list");
  const categoriasAMostrar = categoriaActiva === "Todos"
    ? categoriasConProductos()
    : categoriasConProductos().filter(function (c) { return c.nombre === categoriaActiva; });

  const grupos = categoriasAMostrar.map(function (categoria) {
    const items = PRODUCTOS.filter(function (p) { return p.categoria === categoria.nombre; });
    if (items.length === 0) return "";
    const contenido = categoria.formato === "tarjetas"
      ? '<div class="product-grid">' + items.map(function (i) { return crearTarjeta(i, false); }).join("") + '</div>'
      : '<ul class="menu-list">' + items.map(crearFilaMenu).join("") + '</ul>';
    return '<section class="menu-group" aria-label="' + escaparHtml(categoria.nombre) + '">' +
      '<h3 class="menu-group-title">' + escaparHtml(categoria.nombre) + '</h3>' +
      (categoria.nota ? '<p class="menu-group-nota">' + escaparHtml(categoria.nota) + '</p>' : "") + contenido + '</section>';
  }).join("");

  contenedor.innerHTML = grupos || '<p>Pronto vamos a publicar los productos de esta categoría.</p>';
}

// Tarjeta para cajas y Miércoles de mil: con foto solo si existe.
function crearTarjeta(item, esPromo) {
  if (!esPrecioValido(item.precio)) return "";
  const precioHtml = esPromo
    ? '<span class="price price-promo">' + formatearColones(item.precio) + '</span>' +
      (esPrecioValido(item.precioNormal) && item.precioNormal > 0
        ? '<span class="price-old">' + formatearColones(item.precioNormal) + '</span>' : "")
    : '<span class="price">' + formatearColones(item.precio) + '</span>';

  const incluye = item.incluye
    ? '<ul class="product-includes">' + item.incluye.map(function (x) { return "<li>" + escaparHtml(x) + "</li>"; }).join("") + "</ul>"
    : "";
  // Cajas: el espacio de la foto siempre está reservado. Miércoles de mil: solo si hay foto.
  const reservar = !esPromo;
  const foto = (item.imagen || reservar)
    ? '<div class="product-media' + (reservar ? ' is-reservada' : '') + '">' + (item.imagen ? crearFoto(item, "product-photo") : MARCADOR_FOTO) + '</div>'
    : "";
  const numero = item.numero ? '<span class="badge badge-num">Nº ' + escaparHtml(item.numero) + '</span>' : "";
  const insignia = esPromo ? '<span class="badge badge-promo">Miércoles de mil</span>' : crearEtiquetaDemo(item);
  const nota = item.nota ? '<p class="product-note">' + escaparHtml(item.nota) + '</p>' : "";

  return '<article class="product-card">' + foto +
    '<div class="product-body">' +
      '<div class="product-tags">' + numero + insignia + (esPromo ? crearEtiquetaDemo(item) : "") + '</div>' +
      '<h3 class="product-name">' + escaparHtml(item.nombre) + '</h3>' +
      (item.descripcion ? '<p class="product-desc">' + escaparHtml(item.descripcion) + '</p>' : "") +
      incluye + nota +
      '<div class="price-row">' + precioHtml + '</div>' +
    '</div></article>';
}

function dibujarMiercoles() {
  const hayFoto = Boolean(MIERCOLES_IMAGEN.imagen);
  document.getElementById("miercoles-grid").innerHTML =
    '<figure class="miercoles-foto' + (hayFoto ? "" : " is-reservada") + '">' +
    (hayFoto ? crearFoto(MIERCOLES_IMAGEN, "miercoles-img") : MARCADOR_FOTO) +
    '</figure>';
}

function dibujarUbicacion() {
  const contenedor = document.getElementById("ubicacion-contenido");
  if (!CONFIG.enlaceGoogleMaps) {
    contenedor.innerHTML = '<p class="ubicacion-pendiente">Pronto vamos a publicar nuestra ubicación.</p>';
    return;
  }
  const direccion = CONFIG.direccionTexto
    ? '<span class="mapa-direccion">' + escaparHtml(CONFIG.direccionTexto) + '</span>' : "";
  contenedor.innerHTML =
    '<a class="mapa-card" href="' + escaparHtml(CONFIG.enlaceGoogleMaps) + '" target="_blank" rel="noopener" aria-label="Abrir la ubicación de Soda Flory en Google Maps">' +
      '<span class="mapa-fondo" aria-hidden="true"></span>' +
      '<span class="mapa-pin" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s7.500-6.600 7.500-12A7.500 7.500 0 0 0 4.500 10C4.500 15.400 12 22 12 22zm0-9.500a2.500 2.500 0 1 1 0-5 2.500 2.500 0 0 1 0 5z"/></svg></span>' +
      '<span class="mapa-texto"><strong>Soda Flory</strong>' + direccion + '<span class="mapa-boton">Cómo llegar en Google Maps</span></span>' +
    '</a>';
}

// Marca en la navegación la sección que se está viendo.
function activarNavegacionActiva() {
  const enlaces = Array.from(document.querySelectorAll(".main-nav a"));
  function marcar(hash) {
    enlaces.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === hash && !a.dataset.categoriaNav); });
  }
  if (!("IntersectionObserver" in window)) return;
  const secciones = ["inicio", "menu", "miercoles", "ubicacion", "pedidos"]
    .map(function (id) { return document.getElementById(id); }).filter(Boolean);
  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) { if (e.isIntersecting) marcar("#" + e.target.id); });
  }, { rootMargin: "-35% 0px -55% 0px" });
  secciones.forEach(function (sec) { observador.observe(sec); });
}

function mostrarAvisoDeDemostracion() {
  const hayDemo = PRODUCTOS.some(function (p) { return p.demo; });
  const aviso = document.getElementById("demo-notice");
  if (aviso) aviso.hidden = !hayDemo;
}

function iniciarPagina() {
  // Todos los botones de WhatsApp llevan directo al número configurado
  const enlace = construirEnlaceWhatsApp(CONFIG.mensajeGeneral);
  ["header-whatsapp", "pedidos-whatsapp", "footer-whatsapp", "floating-whatsapp"].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.href = enlace;
  });

  mostrarAvisoDeDemostracion();
  dibujarFiltroCategorias();
  dibujarMenu();
  dibujarMiercoles();
  dibujarUbicacion();
  activarNavegacionActiva();

  // "Inicio" y el logo llevan directo arriba del todo (sin deslizar poco a poco).
  document.querySelectorAll('a[href="#inicio"]').forEach(function (enlaceInicio) {
    enlaceInicio.addEventListener("click", function (evento) {
      evento.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
    });
  });

  // "Cajas económicas" en la navegación abre el menú en las cajas
  document.querySelectorAll("[data-categoria-nav]").forEach(function (enlaceNav) {
    enlaceNav.addEventListener("click", function () {
      categoriaActiva = "Todos";   // las cajas van primero en "Todos"
      dibujarFiltroCategorias();
      dibujarMenu();
    });
  });

  document.getElementById("category-filter").addEventListener("click", function (evento) {
    const boton = evento.target.closest("button[data-categoria]");
    if (!boton) return;
    categoriaActiva = boton.dataset.categoria;
    dibujarFiltroCategorias();
    dibujarMenu();
  });
}

document.addEventListener("DOMContentLoaded", iniciarPagina);
