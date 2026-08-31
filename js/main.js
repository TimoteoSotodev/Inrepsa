/**
 * INREPSA — script principal (menú móvil + WhatsApp flotante)
 * Vanilla JS, sin dependencias.
 */
(function () {
  "use strict";

  // Menú móvil
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // Mensaje predeterminado de WhatsApp según la página (data-wa-message en <body>)
  var waLink = document.querySelector(".whatsapp-float");
  if (waLink) {
    var message = document.body.getAttribute("data-wa-message");
    if (message) {
      var base = waLink.getAttribute("href").split("?")[0];
      waLink.setAttribute("href", base + "?text=" + encodeURIComponent(message));
    }
  }
})();
