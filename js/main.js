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

  // Revelado sutil al hacer scroll (respeta prefers-reduced-motion)
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    var sections = document.querySelectorAll("main .section");
    if (sections.length > 1) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
      );
      sections.forEach(function (section, index) {
        if (index === 0) return; // la primera sección (hero o cabecera) se ve de inmediato
        section.classList.add("reveal");
        observer.observe(section);
      });
    }
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
