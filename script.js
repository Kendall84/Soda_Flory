/* ==========================================================
   SODA FLORY - LÓGICA DE LA PÁGINA
   ----------------------------------------------------------
   Para modificar el menú NO hace falta tocar el HTML.
   Solo editá las tres listas de la sección 2:
     - PRODUCTOS       (menú general)
     - CAJAS           (cajas económicas)
     - MIERCOLES_MIL   (productos de la promoción)
   Cada elemento con  demo: true  es un dato de demostración.
   Cuando tengás el dato real, cambialo y quitá esa línea.
   ========================================================== */


/* ==========================================================
   1. CONFIGURACIÓN
   ========================================================== */

const CONFIG = {
  // Número de WhatsApp de Soda Flory en formato internacional (Costa Rica = 506)
  numeroWhatsApp: "50663783156",
  simboloMoneda: "₡",
  carpetaImagenes: "imagenes/",   // ruta relativa: funciona en cualquier alojamiento
  precioMiercolesDeMil: 1000
};


/* ==========================================================
   2. DATOS (editá aquí)
   ----------------------------------------------------------
   Campos de cada elemento:
     id           identificador único, sin espacios ni tildes
     nombre       nombre que ve el cliente
     descripcion  texto breve
     precio       número en colones, sin símbolo ni puntos (ej. 3500)
     categoria    solo para PRODUCTOS (debe estar en CATEGORIAS)
     imagen       nombre del archivo dentro de /imagenes (o "" si no hay foto)
     demo         true = dato de demostración (mostrar etiqueta)
   ========================================================== */

// Categorías del menú (el orden aquí es el orden en pantalla)
const CATEGORIAS = [
  "Platos fuertes",
  "Comidas rápidas",
  "Acompañamientos",
  "Bebidas"
];

// ---- Menú general (DEMOSTRACIÓN: reemplazar con el menú real) ----
const PRODUCTOS = [
  { id: "demo-plato-1", nombre: "Plato fuerte de ejemplo 1", descripcion: "Producto de demostración. Reemplazar con un plato real.", precio: 3000, categoria: "Platos fuertes", imagen: "", demo: true },
  { id: "demo-plato-2", nombre: "Plato fuerte de ejemplo 2", descripcion: "Producto de demostración. Reemplazar con un plato real.", precio: 3500, categoria: "Platos fuertes", imagen: "", demo: true },
  { id: "demo-rapida-1", nombre: "Comida rápida de ejemplo 1", descripcion: "Producto de demostración. Reemplazar con un producto real.", precio: 2000, categoria: "Comidas rápidas", imagen: "", demo: true },
  { id: "demo-rapida-2", nombre: "Comida rápida de ejemplo 2", descripcion: "Producto de demostración. Reemplazar con un producto real.", precio: 2500, categoria: "Comidas rápidas", imagen: "", demo: true },
  { id: "demo-acomp-1", nombre: "Acompañamiento de ejemplo", descripcion: "Producto de demostración. Reemplazar con un acompañamiento real.", precio: 1000, categoria: "Acompañamientos", imagen: "", demo: true },
  { id: "demo-bebida-1", nombre: "Bebida de ejemplo 1", descripcion: "Producto de demostración. Reemplazar con una bebida real.", precio: 800, categoria: "Bebidas", imagen: "", demo: true },
  { id: "demo-bebida-2", nombre: "Bebida de ejemplo 2", descripcion: "Producto de demostración. Reemplazar con una bebida real.", precio: 1200, categoria: "Bebidas", imagen: "", demo: true }
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
   3. FUNCIONES AUXILIARES (no necesitan modificarse)
   ========================================================== */

// Prepara todos los elementos con un formato común. "tipo" puede ser:
// "producto", "caja" o "promo".
function crearCatalogo() {
  const catalogo = [];

  PRODUCTOS.forEach(function (p) {
    catalogo.push({ ...p, tipo: "producto", precioNormal: null });
  });
  CAJAS.forEach(function (c) {
    catalogo.push({ ...c, tipo: "caja", precioNormal: null });
  });
  MIERCOLES_MIL.forEach(function (m) {
    catalogo.push({ ...m, tipo: "promo", precio: CONFIG.precioMiercolesDeMil, descripcion: m.descripcion });
  });

  return catalogo;
}

// Un precio es válido si es un número finito mayor o igual a cero.
function esPrecioValido(precio) {
  return typeof precio === "number" && Number.isFinite(precio) && precio >= 0;
}

// Una cantidad es válida si es un entero mayor que cero.
function esCantidadValida(cantidad) {
  return Number.isInteger(cantidad) && cantidad > 0;
}

// 12500 -> "₡12.500"
function formatearColones(monto) {
  const entero = Math.round(monto);
  const conPuntos = String(entero).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return CONFIG.simboloMoneda + conPuntos;
}

function escaparHtml(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const ETIQUETA_TIPO = { producto: "", caja: "Caja", promo: "Miércoles de mil" };


/* ==========================================================
   4. CARRITO (datos y cálculos, sin tocar la pantalla)
   ========================================================== */

// El carrito guarda: { id: cantidad }
let carrito = {};
let catalogo = [];

function buscarEnCatalogo(id) {
  return catalogo.find(function (item) { return item.id === id; });
}

function agregarAlCarrito(id, cantidad) {
  const item = buscarEnCatalogo(id);
  if (!item) return { ok: false, mensaje: "No encontramos ese producto." };
  if (!esPrecioValido(item.precio)) return { ok: false, mensaje: "Este producto no tiene un precio válido." };
  if (!esCantidadValida(cantidad)) return { ok: false, mensaje: "La cantidad debe ser al menos 1." };

  carrito[id] = (carrito[id] || 0) + cantidad;
  return { ok: true };
}

function cambiarCantidad(id, cambio) {
  if (!carrito[id]) return;
  const nueva = carrito[id] + cambio;
  if (nueva <= 0) {
    delete carrito[id];   // nunca se guardan cantidades en cero o negativas
  } else {
    carrito[id] = nueva;
  }
}

function eliminarDelCarrito(id) {
  delete carrito[id];
}

function vaciarCarrito() {
  carrito = {};
}

// Devuelve las líneas del pedido con sus subtotales.
function obtenerLineasDelPedido() {
  return Object.keys(carrito)
    .map(function (id) {
      const item = buscarEnCatalogo(id);
      const cantidad = carrito[id];
      if (!item || !esPrecioValido(item.precio) || !esCantidadValida(cantidad)) return null;
      return { item: item, cantidad: cantidad, subtotal: item.precio * cantidad };
    })
    .filter(Boolean);
}

function calcularTotal() {
  return obtenerLineasDelPedido().reduce(function (suma, linea) { return suma + linea.subtotal; }, 0);
}

function contarUnidades() {
  return obtenerLineasDelPedido().reduce(function (suma, linea) { return suma + linea.cantidad; }, 0);
}


/* ==========================================================
   5. MENSAJE Y ENLACE DE WHATSAPP
   ========================================================== */

function construirMensajePedido() {
  const lineas = obtenerLineasDelPedido();
  const partes = [];

  partes.push("Hola, Soda Flory. Quiero realizar el siguiente pedido:");
  partes.push("");

  lineas.forEach(function (linea, indice) {
    const etiqueta = ETIQUETA_TIPO[linea.item.tipo];
    const nombre = etiqueta ? linea.item.nombre + " (" + etiqueta + ")" : linea.item.nombre;
    partes.push((indice + 1) + ". " + nombre + " x " + linea.cantidad);
    partes.push("   Precio unitario: " + formatearColones(linea.item.precio));
    partes.push("   Subtotal: " + formatearColones(linea.subtotal));
    partes.push("");
  });

  partes.push("Total del pedido: " + formatearColones(calcularTotal()));
  partes.push("");
  partes.push("¿Me pueden confirmar la disponibilidad y los detalles para recibir mi pedido? Muchas gracias.");

  return partes.join("\n");
}

function construirEnlaceWhatsApp(mensaje) {
  const base = "https://wa.me/" + CONFIG.numeroWhatsApp;
  if (!mensaje) return base;
  // encodeURIComponent codifica espacios, tildes, saltos de línea y el símbolo ₡
  return base + "?text=" + encodeURIComponent(mensaje);
}


/* ==========================================================
   6. PANTALLA (solo se ejecuta en el navegador)
   ========================================================== */

function crearZonaFoto(item) {
  if (!item.imagen) {
    return '<div class="photo-placeholder">Foto próximamente</div>';
  }
  // Si el archivo no existe, onerror lo cambia por el espacio provisional.
  const ruta = escaparHtml(CONFIG.carpetaImagenes + item.imagen);
  return '<img src="' + ruta + '" alt="' + escaparHtml(item.nombre) + '" loading="lazy" ' +
    'onerror="this.outerHTML=\'<div class=&quot;photo-placeholder&quot;>Foto próximamente</div>\'">';
}

function crearTarjeta(item) {
  const esPromo = item.tipo === "promo";
  const insignias = [];
  if (esPromo) insignias.push('<span class="badge badge-promo">Miércoles de mil</span>');
  else if (item.demo) insignias.push('<span class="badge badge-pending">Demostración</span>');

  let precioHtml;
  if (esPromo) {
    const viejo = esPrecioValido(item.precioNormal) && item.precioNormal > 0
      ? '<span class="price-old">' + formatearColones(item.precioNormal) + '</span>' : "";
    precioHtml = '<span class="price price-promo">' + formatearColones(item.precio) + '</span>' + viejo;
  } else {
    precioHtml = '<span class="price">' + formatearColones(item.precio) + '</span>';
  }

  const incluye = item.incluye
    ? '<ul class="product-includes">' + item.incluye.map(function (x) { return "<li>" + escaparHtml(x) + "</li>"; }).join("") + "</ul>"
    : "";

  const demoPromo = esPromo && item.demo ? '<p class="product-desc"><strong>Demostración:</strong> producto pendiente de confirmar.</p>' : "";

  return '' +
    '<article class="product-card" data-id="' + escaparHtml(item.id) + '">' +
      '<div class="product-media">' + crearZonaFoto(item) + insignias.join("") + '</div>' +
      '<div class="product-body">' +
        '<h3 class="product-name">' + escaparHtml(item.nombre) + '</h3>' +
        '<p class="product-desc">' + escaparHtml(item.descripcion) + '</p>' +
        incluye + demoPromo +
        '<div class="price-row">' + precioHtml + '</div>' +
        '<div class="card-actions">' +
          '<div class="qty" role="group" aria-label="Cantidad de ' + escaparHtml(item.nombre) + '">' +
            '<button type="button" data-action="card-minus" aria-label="Disminuir cantidad">−</button>' +
            '<span class="qty-value" aria-live="polite">1</span>' +
            '<button type="button" data-action="card-plus" aria-label="Aumentar cantidad">+</button>' +
          '</div>' +
          '<button type="button" class="btn btn-primary" data-action="add">Agregar al pedido</button>' +
        '</div>' +
      '</div>' +
    '</article>';
}

let categoriaActiva = "Todos";

function dibujarFiltroCategorias() {
  const contenedor = document.getElementById("category-filter");
  const nombres = ["Todos"].concat(CATEGORIAS);
  contenedor.innerHTML = nombres.map(function (nombre) {
    return '<button type="button" class="chip" data-categoria="' + escaparHtml(nombre) + '" aria-pressed="' +
      (nombre === categoriaActiva) + '">' + escaparHtml(nombre) + '</button>';
  }).join("");
}

function dibujarMenu() {
  const contenedor = document.getElementById("product-grid");
  const visibles = catalogo.filter(function (item) {
    return item.tipo === "producto" && (categoriaActiva === "Todos" || item.categoria === categoriaActiva);
  });
  contenedor.innerHTML = visibles.length
    ? visibles.map(crearTarjeta).join("")
    : '<p>Todavía no hay productos en esta categoría.</p>';
}

function dibujarCajas() {
  const items = catalogo.filter(function (i) { return i.tipo === "caja"; });
  document.getElementById("cajas-grid").innerHTML = items.length
    ? items.map(crearTarjeta).join("")
    : '<p>Pronto vamos a publicar nuestras cajas.</p>';
}

function dibujarMiercoles() {
  const items = catalogo.filter(function (i) { return i.tipo === "promo"; });
  document.getElementById("miercoles-grid").innerHTML = items.length
    ? items.map(crearTarjeta).join("")
    : '<p>Pronto vamos a publicar los productos de la promoción.</p>';
}

function mostrarMensajeCarrito(texto, esOk) {
  const caja = document.getElementById("cart-message");
  caja.textContent = texto || "";
  caja.classList.toggle("is-ok", Boolean(esOk));
}

function dibujarCarrito() {
  const lineas = obtenerLineasDelPedido();
  const vacio = lineas.length === 0;
  const total = calcularTotal();
  const unidades = contarUnidades();

  document.getElementById("cart-empty").hidden = !vacio;
  document.getElementById("cart-total-row").hidden = vacio;
  document.getElementById("cart-note").hidden = vacio;
  document.getElementById("clear-cart").hidden = vacio;
  document.getElementById("send-order").disabled = vacio;
  document.getElementById("cart-total").textContent = formatearColones(total);

  document.getElementById("cart-list").innerHTML = lineas.map(function (linea) {
    const item = linea.item;
    const esPromo = item.tipo === "promo";
    const etiqueta = ETIQUETA_TIPO[item.tipo];
    const kind = etiqueta ? '<span class="cart-item-kind' + (esPromo ? " is-promo" : "") + '">' + etiqueta + '</span>' : "";
    const precioTexto = esPromo
      ? 'Precio promocional: <span class="is-promo">' + formatearColones(item.precio) + '</span> c/u'
      : 'Precio: ' + formatearColones(item.precio) + ' c/u';

    return '' +
      '<li class="cart-item" data-id="' + escaparHtml(item.id) + '">' +
        '<div class="cart-item-top">' +
          '<span class="cart-item-name">' + escaparHtml(item.nombre) + kind + '</span>' +
        '</div>' +
        '<div class="cart-item-prices">' + precioTexto + '</div>' +
        '<div class="cart-item-bottom">' +
          '<div class="qty" role="group" aria-label="Cantidad de ' + escaparHtml(item.nombre) + '">' +
            '<button type="button" data-action="cart-minus" aria-label="Disminuir cantidad">−</button>' +
            '<span class="qty-value">' + linea.cantidad + '</span>' +
            '<button type="button" data-action="cart-plus" aria-label="Aumentar cantidad">+</button>' +
          '</div>' +
          '<span class="cart-subtotal">Subtotal: ' + formatearColones(linea.subtotal) + '</span>' +
          '<button type="button" class="btn-remove" data-action="cart-remove">Eliminar</button>' +
        '</div>' +
      '</li>';
  }).join("");

  // Contadores en la navegación y en el botón flotante
  const navCount = document.getElementById("nav-count");
  navCount.hidden = vacio;
  navCount.textContent = unidades;
  const flotante = document.getElementById("floating-cart");
  flotante.hidden = vacio;
  document.getElementById("floating-count").textContent = unidades;
  document.getElementById("floating-total").textContent = formatearColones(total);
}

function manejarClicEnTarjeta(evento) {
  const boton = evento.target.closest("button[data-action]");
  if (!boton) return;
  const tarjeta = boton.closest(".product-card");
  if (!tarjeta) return;

  const valor = tarjeta.querySelector(".qty-value");
  let cantidad = parseInt(valor.textContent, 10) || 1;

  if (boton.dataset.action === "card-plus") {
    cantidad = Math.min(cantidad + 1, 99);
    valor.textContent = cantidad;
  } else if (boton.dataset.action === "card-minus") {
    cantidad = Math.max(cantidad - 1, 1);   // nunca baja de 1
    valor.textContent = cantidad;
  } else if (boton.dataset.action === "add") {
    const resultado = agregarAlCarrito(tarjeta.dataset.id, cantidad);
    if (resultado.ok) {
      valor.textContent = 1;
      mostrarMensajeCarrito("", false);
      dibujarCarrito();
      const textoOriginal = boton.textContent;
      boton.textContent = "Agregado";
      setTimeout(function () { boton.textContent = textoOriginal; }, 1200);
    } else {
      mostrarMensajeCarrito(resultado.mensaje, false);
    }
  }
}

function manejarClicEnCarrito(evento) {
  const boton = evento.target.closest("button[data-action]");
  if (!boton) return;
  const fila = boton.closest(".cart-item");
  if (!fila) return;
  const id = fila.dataset.id;

  if (boton.dataset.action === "cart-plus") cambiarCantidad(id, 1);
  if (boton.dataset.action === "cart-minus") cambiarCantidad(id, -1);
  if (boton.dataset.action === "cart-remove") eliminarDelCarrito(id);
  dibujarCarrito();
}

function enviarPedidoPorWhatsApp() {
  if (obtenerLineasDelPedido().length === 0) {
    mostrarMensajeCarrito("Tu pedido está vacío. Agregá al menos un producto.", false);
    return;
  }
  const enlace = construirEnlaceWhatsApp(construirMensajePedido());
  // Se abre mediante un enlace temporal: funciona bien en celulares y no lo bloquean los navegadores.
  const enlaceTemporal = document.createElement("a");
  enlaceTemporal.href = enlace;
  enlaceTemporal.target = "_blank";
  enlaceTemporal.rel = "noopener";
  document.body.appendChild(enlaceTemporal);
  enlaceTemporal.click();
  document.body.removeChild(enlaceTemporal);
  mostrarMensajeCarrito("Abrimos WhatsApp con tu pedido escrito. Todavía no se ha enviado: presioná enviar en WhatsApp y esperá la confirmación de Soda Flory.", true);
}

function iniciarPagina() {
  catalogo = crearCatalogo();

  // Enlaces generales de WhatsApp (encabezado y pie)
  const enlaceGeneral = construirEnlaceWhatsApp("Hola, Soda Flory. Quisiera hacer una consulta.");
  document.getElementById("header-whatsapp").href = enlaceGeneral;
  document.getElementById("footer-whatsapp").href = enlaceGeneral;

  dibujarFiltroCategorias();
  dibujarMenu();
  dibujarCajas();
  dibujarMiercoles();
  dibujarCarrito();

  document.getElementById("category-filter").addEventListener("click", function (evento) {
    const boton = evento.target.closest("button[data-categoria]");
    if (!boton) return;
    categoriaActiva = boton.dataset.categoria;
    dibujarFiltroCategorias();
    dibujarMenu();
  });

  ["product-grid", "cajas-grid", "miercoles-grid"].forEach(function (idContenedor) {
    document.getElementById(idContenedor).addEventListener("click", manejarClicEnTarjeta);
  });
  document.getElementById("cart-list").addEventListener("click", manejarClicEnCarrito);
  document.getElementById("send-order").addEventListener("click", enviarPedidoPorWhatsApp);
  document.getElementById("clear-cart").addEventListener("click", function () {
    vaciarCarrito();
    mostrarMensajeCarrito("", false);
    dibujarCarrito();
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", iniciarPagina);
}

// Permite probar la lógica con Node (no afecta al navegador).
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    crearCatalogo, agregarAlCarrito, cambiarCantidad, eliminarDelCarrito, obtenerLineasDelPedido,
    calcularTotal, construirMensajePedido, construirEnlaceWhatsApp, formatearColones,
    setCatalogo: function () { catalogo = crearCatalogo(); }, vaciarCarrito
  };
}
