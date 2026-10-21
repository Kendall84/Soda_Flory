/* ==========================================================
   SODA FLORY - LÓGICA DE LA PÁGINA
   ----------------------------------------------------------
   Para modificar el menú NO hace falta tocar el HTML.
   Solo editá las listas de la sección 2:
     - PRODUCTOS       (menú general: nombre y precio)
     - CAJAS           (cajas económicas)
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
  mensajeGeneral: "Hola, Soda Flory. Quisiera hacer un pedido."
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

// Categorías del menú (el orden aquí es el orden en pantalla)
const CATEGORIAS = [
  "Comidas rápidas",
  "Acompañamientos",
  "Bebidas"
];

// ---- Menú general (DEMOSTRACIÓN: reemplazar con el menú real) ----
const PRODUCTOS = [
  { id: "demo-rapida-1", nombre: "Comida rápida de ejemplo 1", precio: 2000, categoria: "Comidas rápidas", imagen: "", demo: true },
  { id: "demo-rapida-2", nombre: "Comida rápida de ejemplo 2", precio: 2500, categoria: "Comidas rápidas", imagen: "", demo: true },
  { id: "demo-acomp-1", nombre: "Acompañamiento de ejemplo", precio: 1000, categoria: "Acompañamientos", imagen: "", demo: true },
  { id: "demo-bebida-1", nombre: "Bebida de ejemplo 1", precio: 800, categoria: "Bebidas", imagen: "", demo: true },
  { id: "demo-bebida-2", nombre: "Bebida de ejemplo 2", precio: 1200, categoria: "Bebidas", imagen: "", demo: true }
];

// ---- Cajas Flory (DEMOSTRACIÓN: contenido y precios pendientes de confirmar) ----
const CAJAS = [
  {
    id: "demo-caja-1",
    nombre: "Caja Flory de ejemplo 1",
    descripcion: "Caja de demostración. Contenido y precio pendientes de confirmar.",
    incluye: ["Producto 1 (por confirmar)", "Producto 2 (por confirmar)", "Producto 3 (por confirmar)"],
    precio: 4500,
    imagen: "",
    demo: true
  },
  {
    id: "demo-caja-2",
    nombre: "Caja Flory de ejemplo 2",
    descripcion: "Caja de demostración. Contenido y precio pendientes de confirmar.",
    incluye: ["Producto 1 (por confirmar)", "Producto 2 (por confirmar)"],
    precio: 3500,
    imagen: "",
    demo: true
  }
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
  const nombres = ["Todos"].concat(CATEGORIAS);
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
  const categoriasAMostrar = categoriaActiva === "Todos" ? CATEGORIAS : [categoriaActiva];

  const grupos = categoriasAMostrar.map(function (categoria) {
    const items = PRODUCTOS.filter(function (p) { return p.categoria === categoria; });
    if (items.length === 0) return "";
    return '<section class="menu-group" aria-label="' + escaparHtml(categoria) + '">' +
      '<h3 class="menu-group-title">' + escaparHtml(categoria) + '</h3>' +
      '<ul class="menu-list">' + items.map(crearFilaMenu).join("") + '</ul>' +
    '</section>';
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

function dibujarCajas() {
  document.getElementById("cajas-grid").innerHTML = CAJAS.length
    ? CAJAS.map(function (c) { return crearTarjeta(c, false); }).join("")
    : '<p>Pronto vamos a publicar nuestras cajas.</p>';
}

function dibujarMiercoles() {
  const items = MIERCOLES_MIL.map(function (m) {
    return crearTarjeta({ ...m, precio: CONFIG.precioMiercolesDeMil }, true);
  });
  document.getElementById("miercoles-grid").innerHTML = items.length
    ? items.join("")
    : '<p>Pronto vamos a publicar los productos de la promoción.</p>';
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
  dibujarCajas();
  dibujarMiercoles();

  document.getElementById("category-filter").addEventListener("click", function (evento) {
    const boton = evento.target.closest("button[data-categoria]");
    if (!boton) return;
    categoriaActiva = boton.dataset.categoria;
    dibujarFiltroCategorias();
    dibujarMenu();
  });
}

document.addEventListener("DOMContentLoaded", iniciarPagina);
