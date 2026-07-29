(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- Header: solid background on scroll ---------------- */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav toggle ---------------- */
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");
  navToggle.addEventListener("click", function () {
    var isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });
  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------- Hero slider ---------------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll(".hero-slide"));
  var dotsWrap = document.getElementById("hero-dots");
  var currentSlide = 0;
  var slideTimer;

  slides.forEach(function (_, i) {
    var dot = document.createElement("button");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Ir a la diapositiva " + (i + 1));
    if (i === 0) dot.classList.add("is-active");
    dot.addEventListener("click", function () {
      goToSlide(i);
      resetTimer();
    });
    dotsWrap.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function goToSlide(index) {
    slides[currentSlide].classList.remove("is-active");
    dots[currentSlide].classList.remove("is-active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("is-active");
    dots[currentSlide].classList.add("is-active");
  }

  function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(function () { goToSlide(currentSlide + 1); }, 6500);
  }

  if (slides.length > 1) resetTimer();

  /* ---------------- Clientes: logos carousel ---------------- */
  var clientLogos = [
    ["arquia.png", "Arquia Banca"],
    ["bluespace.png", "Bluespace"],
    ["catalonia-hotels.png", "Catalonia Hotels & Resorts"],
    ["diba.png", "Diputació de Barcelona"],
    ["efpa.png", "EFPA European Financial Planning Association"],
    ["fgc.png", "FGC"],
    ["fira-bcn.png", "Fira Barcelona"],
    ["fluidra.png", "Fluidra"],
    ["grandvoyage.png", "GrandVoyage"],
    ["imatra.png", "Imatra"],
    ["la-selva.png", "La Selva"],
    ["bra.png", "BRA"],
    ["generalitat-catalunya.png", "Generalitat de Catalunya"],
    ["lagranjafoods.png", "La Granja Foods"],
    ["lletera-campllong.png", "Lletera Campllong"],
    ["monei.png", "MONEI"],
    ["picart.png", "Picart"],
    ["logotip-hospital.png", "Hospital de la Santa Creu i Sant Pau"],
    ["logovichycatalan.png", "Vichy Catalan"],
    ["maheso.png", "Maheso"],
    ["mgs.png", "MGS Seguros"],
    ["miro.png", "Miró"],
    ["naturland.png", "Naturland"],
    ["nieves.png", "Nieves"],
    ["proactive.png", "Proactive"],
    ["protegim.png", "Protegim"],
    ["roncato.png", "Roncato"],
    ["staedtler.png", "Staedtler"],
    ["torras.png", "Torras"],
    ["upower.png", "Upower"],
    ["vaillant.png", "Vaillant"],
  ];

  var track = document.getElementById("clients-track");
  clientLogos.forEach(function (logo) {
    var item = document.createElement("div");
    item.className = "client-logo";
    var img = document.createElement("img");
    img.src = "assets/images/clients/" + logo[0];
    img.alt = logo[1];
    img.loading = "lazy";
    item.appendChild(img);
    track.appendChild(item);
  });

  var visibleGroups = [];
  var groupSize = 10;
  var groupIndex = 0;

  function computeGroupSize() {
    var w = window.innerWidth;
    if (w < 600) return 4;
    if (w < 1000) return 6;
    return 10;
  }

  function renderGroup() {
    groupSize = computeGroupSize();
    visibleGroups = [];
    for (var i = 0; i < clientLogos.length; i += groupSize) {
      visibleGroups.push(clientLogos.slice(i, i + groupSize));
    }
    if (groupIndex >= visibleGroups.length) groupIndex = 0;
    showGroup(groupIndex);
  }

  function showGroup(idx) {
    var items = Array.prototype.slice.call(track.children);
    var start = idx * groupSize;
    items.forEach(function (item, i) {
      item.style.display = (i >= start && i < start + groupSize) ? "flex" : "none";
    });
  }

  document.querySelector(".clients-arrow--prev").addEventListener("click", function () {
    groupIndex = (groupIndex - 1 + visibleGroups.length) % visibleGroups.length;
    showGroup(groupIndex);
  });
  document.querySelector(".clients-arrow--next").addEventListener("click", function () {
    groupIndex = (groupIndex + 1) % visibleGroups.length;
    showGroup(groupIndex);
  });

  renderGroup();
  window.addEventListener("resize", debounce(renderGroup, 250));

  function debounce(fn, wait) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, wait);
    };
  }

  /* ---------------- Contact form: filename preview + AJAX submit ---------------- */
  var cvInput = document.getElementById("cv");
  var cvName = document.getElementById("file-input-name");
  cvInput.addEventListener("change", function () {
    cvName.textContent = cvInput.files.length ? cvInput.files[0].name : "Ningún archivo seleccionado";
  });

  var form = document.getElementById("contacto-form");
  var feedback = document.getElementById("form-feedback");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (form.website.value) return; // honeypot: bot detectado, no enviar

    var submitBtn = form.querySelector(".btn-submit");
    submitBtn.disabled = true;
    feedback.textContent = "Enviando…";
    feedback.className = "form-feedback";

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
      .then(function (res) { return res.json().catch(function () { return { ok: res.ok }; }); })
      .then(function (data) {
        if (data && data.ok) {
          feedback.textContent = "¡Gracias! Hemos recibido tu mensaje y te responderemos lo antes posible.";
          feedback.className = "form-feedback is-success";
          form.reset();
          cvName.textContent = "Ningún archivo seleccionado";
        } else {
          throw new Error((data && data.error) || "Error desconocido");
        }
      })
      .catch(function () {
        feedback.textContent = "No se ha podido enviar el mensaje. Prueba de nuevo o escríbenos a hola@dataplanning.es.";
        feedback.className = "form-feedback is-error";
      })
      .finally(function () {
        submitBtn.disabled = false;
      });
  });
})();
