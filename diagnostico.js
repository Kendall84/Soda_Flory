/* Página de diagnóstico: comprueba que los archivos de Soda Flory estén publicados.
   Se puede borrar del repositorio cuando ya no haga falta. */
(function () {
  "use strict";
  var lista = document.getElementById("diag-lista");
  var resumen = document.getElementById("diag-resumen");

  function revisar(ruta, nombre, comprobarTexto) {
    return fetch(ruta + "?v=" + Date.now(), { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) return { nombre: nombre, ruta: ruta, ok: false, detalle: "no se encontró (error " + r.status + ")" };
        if (!comprobarTexto) return { nombre: nombre, ruta: ruta, ok: true, detalle: "publicado" };
        return r.text().then(function (t) {
          var resultado = comprobarTexto(t);
          return { nombre: nombre, ruta: ruta, ok: resultado.ok, detalle: resultado.detalle, texto: t };
        });
      })
      .catch(function () { return { nombre: nombre, ruta: ruta, ok: false, detalle: "no se pudo revisar" }; });
  }

  function pintar(r) {
    var li = document.createElement("li");
    li.className = r.ok ? "diag-ok" : "diag-fallo";
    li.textContent = (r.ok ? "✔ " : "✖ ") + r.nombre + ": " + r.detalle;
    lista.appendChild(li);
  }

  lista.textContent = "";
  Promise.all([
    revisar("index.html", "index.html", function (t) {
      return t.indexOf("hero-fondo") !== -1 ? { ok: true, detalle: "versión nueva" } : { ok: false, detalle: "es una versión vieja" };
    }),
    revisar("style.css", "style.css"),
    revisar("script.js", "script.js", function (t) {
      return t.indexOf("Cajitas y Combos Flory") !== -1 ? { ok: true, detalle: "versión nueva" } : { ok: false, detalle: "es una versión vieja, hay que subir el script.js nuevo" };
    }),
    revisar("imagenes/portada.jpg", "imagenes/portada.jpg")
  ]).then(function (basicos) {
    basicos.forEach(pintar);
    var script = basicos[2];
    var nombres = [];
    if (script.texto) {
      var re = /imagen:\s*"([a-z0-9-]+\.(?:jpg|png|webp))"/g, m;
      while ((m = re.exec(script.texto))) { if (nombres.indexOf(m[1]) === -1) nombres.push(m[1]); }
    }
    return Promise.all(nombres.map(function (n) { return revisar("imagenes/" + n, "imagenes/" + n); })).then(function (fotos) {
      fotos.forEach(pintar);
      var todos = basicos.concat(fotos);
      var fallos = todos.filter(function (r) { return !r.ok; });
      resumen.textContent = fallos.length === 0
        ? "Todo está publicado (" + todos.length + " archivos). Si no ves las fotos, recargá con Ctrl + F5."
        : "Faltan " + fallos.length + " archivo(s). Subí lo que está en rojo a GitHub, respetando la carpeta imagenes.";
      resumen.className = "diag-resumen " + (fallos.length === 0 ? "diag-ok" : "diag-fallo");
    });
  });
})();
