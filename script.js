/* ==========================================================
   SODA FLORY - LÓGICA DE LA PÁGINA
   ----------------------------------------------------------
   Para modificar el menú NO hace falta tocar el HTML.
   Solo editá las listas de la sección 2:
     - CATEGORIAS      (categorías y su orden)
     - PRODUCTOS       (todo el menú, incluidas las cajas)
     - MIERCOLES_MIL   (productos de la promoción)
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
  numeroWhatsApp: "50663783156",
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
  { nombre: "Especialidades",         formato: "lista" },
  { nombre: "Rapiditas",              formato: "lista" },
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

  // ===== ESPECIALIDADES (DEMOSTRACIÓN: reemplazar con el menú real) =====
  { id: "demo-especialidad-1", categoria: "Especialidades", nombre: "Especialidad de ejemplo 1", descripcion: "Descripción de ejemplo. Reemplazar con el producto real.", precio: 4000, imagen: "", demo: true },
  { id: "demo-especialidad-2", categoria: "Especialidades", nombre: "Especialidad de ejemplo 2", descripcion: "Descripción de ejemplo. Reemplazar con el producto real.", precio: 4500, imagen: "", demo: true },

  // ===== RAPIDITAS (DEMOSTRACIÓN: reemplazar con el menú real) =====
  { id: "demo-rapidita-1", categoria: "Rapiditas", nombre: "Rapidita de ejemplo 1", descripcion: "Descripción de ejemplo. Reemplazar con el producto real.", precio: 2000, imagen: "", demo: true },
  { id: "demo-rapidita-2", categoria: "Rapiditas", nombre: "Rapidita de ejemplo 2", descripcion: "Descripción de ejemplo. Reemplazar con el producto real.", precio: 2500, imagen: "", demo: true },

  // ===== EXTRAS (DEMOSTRACIÓN: reemplazar con el menú real) =====
  { id: "demo-extra-1", categoria: "Extras", nombre: "Extra de ejemplo", descripcion: "Descripción de ejemplo. Reemplazar con el producto real.", precio: 1000, imagen: "", demo: true },

  // ===== BEBIDAS (DEMOSTRACIÓN: reemplazar con el menú real) =====
  { id: "demo-bebida-1", categoria: "Bebidas", nombre: "Bebida de ejemplo 1", descripcion: "Descripción de ejemplo. Reemplazar con el producto real.", precio: 800, imagen: "", demo: true },
  { id: "demo-bebida-2", categoria: "Bebidas", nombre: "Bebida de ejemplo 2", descripcion: "Descripción de ejemplo. Reemplazar con el producto real.", precio: 1200, imagen: "", demo: true }
];

// ---- Miércoles de mil (DEMOSTRACIÓN: productos pendientes de confirmar) ----
// El precio promocional se toma de CONFIG.precioMiercolesDeMil.
// "precioNormal" es opcional: si lo ponés, se muestra tachado.
const MIERCOLES_MIL = [
  { id: "demo-miercoles-1", nombre: "Producto de miércoles de ejemplo 1", descripcion: "Producto de demostración. Reemplazar con un producto confirmado para la promoción.", precioNormal: null, imagen: "", demo: true },
  { id: "demo-miercoles-2", nombre: "Producto de miércoles de ejemplo 2", descripcion: "Producto de demostración. Reemplazar con un producto confirmado para la promoción.", precioNormal: null, imagen: "", demo: true }
];


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
  if (!esPrecioValido(item.precio)) return "";
  const descripcion = item.descripcion ? '<div class="menu-row-desc">' + escaparHtml(item.descripcion) + '</div>' : "";
  return '<li class="menu-row">' +
    '<div class="menu-row-text"><div class="menu-row-name">' + escaparHtml(item.nombre) + '</div>' + descripcion + '</div>' +
    '<span class="menu-row-price">' + formatearColones(item.precio) + '</span>' +
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
      '<h3 class="menu-group-title">' + escaparHtml(categoria.nombre) + '</h3>' + contenido + '</section>';
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
  const items = MIERCOLES_MIL.map(function (m) {
    return crearTarjeta({ ...m, precio: CONFIG.precioMiercolesDeMil }, true);
  });
  document.getElementById("miercoles-grid").innerHTML = items.length
    ? items.join("")
    : '<p>Pronto vamos a publicar los productos de la promoción.</p>';
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
  const hayDemo = PRODUCTOS.concat(MIERCOLES_MIL).some(function (p) { return p.demo; });
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
