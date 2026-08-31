/**
 * INREPSA — formulario de cotización / quote form
 *
 * IMPORTANTE (ver README):
 * Este sitio es HTML/CSS/JS puro, sin backend propio. El <form> en las
 * páginas de contacto apunta por defecto a un endpoint de ejemplo de
 * Formspree (https://formspree.io). Para recibir los mensajes de verdad:
 *   1. Crea una cuenta gratuita en https://formspree.io
 *   2. Crea un formulario y copia tu endpoint (https://formspree.io/f/XXXXXXX)
 *   3. Reemplaza el valor de "action" en el <form id="quote-form"> de
 *      /contacto/index.html y /en/contact/index.html
 * Alternativa: usar una función serverless de Vercel (/api/contact) que
 * reciba el POST y envíe el correo (ver README, sección "Formulario").
 */
(function () {
  "use strict";

  var form = document.getElementById("quote-form");
  if (!form) return;

  var status = document.getElementById("form-status");
  var submitBtn = form.querySelector('button[type="submit"]');

  var messages = {
    es: {
      sending: "Enviando...",
      success: "¡Gracias! Tu solicitud fue enviada. Te contactaremos pronto.",
      error: "Hubo un problema al enviar el formulario. Intenta de nuevo o escríbenos por WhatsApp.",
      placeholder:
        "Este formulario aún no está conectado a un servicio de envío. Consulta el README para configurarlo (Formspree o función serverless de Vercel)."
    },
    en: {
      sending: "Sending...",
      success: "Thank you! Your request was sent. We will contact you soon.",
      error: "There was a problem sending the form. Please try again or write to us on WhatsApp.",
      placeholder:
        "This form is not connected to a submission service yet. See the README to set it up (Formspree or a Vercel serverless function)."
    }
  };

  var lang = document.documentElement.lang === "en" ? "en" : "es";
  var t = messages[lang];

  form.addEventListener("submit", function (event) {
    var action = form.getAttribute("action") || "";
    var isPlaceholder = action.indexOf("YOUR_FORM_ID") !== -1 || action === "" || action === "#";

    if (isPlaceholder) {
      event.preventDefault();
      status.textContent = t.placeholder;
      status.className = "form-status error";
      return;
    }

    event.preventDefault();
    status.textContent = t.sending;
    status.className = "form-status";
    submitBtn.disabled = true;

    fetch(action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (response.ok) {
          status.textContent = t.success;
          status.className = "form-status success";
          form.reset();
        } else {
          status.textContent = t.error;
          status.className = "form-status error";
        }
      })
      .catch(function () {
        status.textContent = t.error;
        status.className = "form-status error";
      })
      .finally(function () {
        submitBtn.disabled = false;
      });
  });
})();
