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

   FOTOS: si un elemento tiene  imagen: "archivo.jpg"  se muestra
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
  enlaceGoogleMaps: "",
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
// formato "tarjetas": nombre, contenido, precio y foto opcional (cajas)
// formato "lista":    solo nombre y precio (con miniatura si hay foto)
const CATEGORIAS = [
  { nombre: "Cajas grandes",   formato: "tarjetas" },
  { nombre: "Cajas pequeñas",  formato: "tarjetas" },
  { nombre: "Especialidades",  formato: "lista" },
  { nombre: "Rapiditas",       formato: "lista" },
  { nombre: "Extras",          formato: "lista" },
  { nombre: "Bebidas",         formato: "lista" }
];

// ---- Menú (DEMOSTRACIÓN: reemplazar con el menú real) ----
// Para las cajas podés agregar  incluye: ["producto 1", "producto 2"]  y  descripcion.
const PRODUCTOS = [
  { id: "demo-caja-grande-1", nombre: "Caja grande de ejemplo 1", descripcion: "Caja de demostración. Contenido y precio pendientes de confirmar.", incluye: ["Producto 1 (por confirmar)", "Producto 2 (por confirmar)", "Producto 3 (por confirmar)"], precio: 6500, categoria: "Cajas grandes", imagen: "", demo: true },
  { id: "demo-caja-grande-2", nombre: "Caja grande de ejemplo 2", descripcion: "Caja de demostración. Contenido y precio pendientes de confirmar.", incluye: ["Producto 1 (por confirmar)", "Producto 2 (por confirmar)"], precio: 5500, categoria: "Cajas grandes", imagen: "", demo: true },
  { id: "demo-caja-pequena-1", nombre: "Caja pequeña de ejemplo 1", descripcion: "Caja de demostración. Contenido y precio pendientes de confirmar.", incluye: ["Producto 1 (por confirmar)", "Producto 2 (por confirmar)"], precio: 3500, categoria: "Cajas pequeñas", imagen: "", demo: true },
  { id: "demo-caja-pequena-2", nombre: "Caja pequeña de ejemplo 2", descripcion: "Caja de demostración. Contenido y precio pendientes de confirmar.", incluye: ["Producto 1 (por confirmar)"], precio: 2800, categoria: "Cajas pequeñas", imagen: "", demo: true },
  { id: "demo-especialidad-1", nombre: "Especialidad de ejemplo 1", precio: 4000, categoria: "Especialidades", imagen: "", demo: true },
  { id: "demo-especialidad-2", nombre: "Especialidad de ejemplo 2", precio: 4500, categoria: "Especialidades", imagen: "", demo: true },
  { id: "demo-rapidita-1", nombre: "Rapidita de ejemplo 1", precio: 2000, categoria: "Rapiditas", imagen: "", demo: true },
  { id: "demo-rapidita-2", nombre: "Rapidita de ejemplo 2", precio: 2500, categoria: "Rapiditas", imagen: "", demo: true },
  { id: "demo-extra-1", nombre: "Extra de ejemplo", precio: 1000, categoria: "Extras", imagen: "", demo: true },
  { id: "demo-bebida-1", nombre: "Bebida de ejemplo 1", precio: 800, categoria: "Bebidas", imagen: "", demo: true },
  { id: "demo-bebida-2", nombre: "Bebida de ejemplo 2", precio: 1200, categoria: "Bebidas", imagen: "", demo: true }
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
function crearFoto(item, clase) {
  if (!item.imagen) return "";
  const ruta = escaparHtml(CONFIG.carpetaImagenes + item.imagen);
  return '<img class="' + clase + '" src="' + ruta + '" alt="' + escaparHtml(item.nombre) +
    '" loading="lazy" onerror="this.remove()">';
}

function crearEtiquetaDemo(item) {
  return item.demo ? '<span class="badge badge-pending">Demostración</span>' : "";
}


/* ==========================================================
   4. PANTALLA
   ========================================================== */

let categoriaActiva = "Todos";

function dibujarFiltroCategorias() {
  const nombres = ["Todos"].concat(CATEGORIAS.map(function (c) { return c.nombre; }));
  document.getElementById("category-filter").innerHTML = nombres.map(function (nombre) {
    return '<button type="button" class="chip" data-categoria="' + escaparHtml(nombre) +
      '" aria-pressed="' + (nombre === categoriaActiva) + '">' + escaparHtml(nombre) + '</button>';
  }).join("");
}

function crearFilaMenu(item) {
  if (!esPrecioValido(item.precio)) return "";
  const descripcion = item.descripcion ? '<div class="menu-row-desc">' + escaparHtml(item.descripcion) + '</div>' : "";
  return '<li class="menu-row">' +
    crearFoto(item, "menu-row-photo") +
    '<div class="menu-row-text"><div class="menu-row-name">' + escaparHtml(item.nombre) + '</div>' + descripcion + '</div>' +
    '<span class="menu-row-price">' + formatearColones(item.precio) + '</span>' +
  '</li>';
}

function dibujarMenu() {
  const contenedor = document.getElementById("menu-list");
  const categoriasAMostrar = categoriaActiva === "Todos"
    ? CATEGORIAS
    : CATEGORIAS.filter(function (c) { return c.nombre === categoriaActiva; });

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
  const foto = item.imagen ? '<div class="product-media">' + crearFoto(item, "product-photo") + '</div>' : "";
  const insignia = esPromo ? '<span class="badge badge-promo">Miércoles de mil</span>' : crearEtiquetaDemo(item);

  return '<article class="product-card">' + foto +
    '<div class="product-body">' +
      '<div class="product-tags">' + insignia + (esPromo ? crearEtiquetaDemo(item) : "") + '</div>' +
      '<h3 class="product-name">' + escaparHtml(item.nombre) + '</h3>' +
      (item.descripcion ? '<p class="product-desc">' + escaparHtml(item.descripcion) + '</p>' : "") +
      incluye +
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

function iniciarPagina() {
  // Todos los botones de WhatsApp llevan directo al número configurado
  const enlace = construirEnlaceWhatsApp(CONFIG.mensajeGeneral);
  ["header-whatsapp", "pedidos-whatsapp", "footer-whatsapp", "floating-whatsapp"].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.href = enlace;
  });

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
