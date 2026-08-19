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

  /* ---------------- Hero text: alineado con el enlace "Talento" de la navbar ---------------- */
  function syncHeroTextAlign() {
    var talentoLink = mainNav.querySelector('a[href="#talento"]');
    if (!talentoLink || window.innerWidth <= 780) {
      document.documentElement.style.removeProperty("--hero-align-left");
      return;
    }
    var x = Math.round(talentoLink.getBoundingClientRect().left);
    document.documentElement.style.setProperty("--hero-align-left", x + "px");
  }
  window.addEventListener("resize", syncHeroTextAlign);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncHeroTextAlign);
  }
  syncHeroTextAlign();

  /* ---------------- Talento: team carousel ---------------- */
  var teamTrackList = document.getElementById("team-track-list");
  if (teamTrackList) {
    var teamCards = Array.prototype.slice.call(teamTrackList.querySelectorAll(".team-card"));
    var teamPrev = document.querySelector(".team-arrow--prev");
    var teamNext = document.querySelector(".team-arrow--next");
    var teamDots = Array.prototype.slice.call(document.querySelectorAll(".team-dot"));
    var teamIndex = 0;

    function updateTeamCarousel() {
      teamTrackList.style.transform = "translateX(-" + teamIndex * 100 + "%)";
      teamCards.forEach(function (card, i) {
        card.classList.toggle("is-active", i === teamIndex);
      });
      teamDots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === teamIndex);
      });
      teamPrev.disabled = teamCards.length < 2;
      teamNext.disabled = teamCards.length < 2;
    }

    teamPrev.addEventListener("click", function () {
      teamIndex = (teamIndex - 1 + teamCards.length) % teamCards.length;
      updateTeamCarousel();
    });
    teamNext.addEventListener("click", function () {
      teamIndex = (teamIndex + 1) % teamCards.length;
      updateTeamCarousel();
    });

    updateTeamCarousel();
  }

  /* ---------------- Fotos destacadas: efecto "pop" al hacer scroll ---------------- */
  var featurePhotos = Array.prototype.slice.call(
    document.querySelectorAll(".feature-photo, .team-carousel")
  );
  if (featurePhotos.length && "IntersectionObserver" in window) {
    var photoObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    featurePhotos.forEach(function (photo) { photoObserver.observe(photo); });
  } else {
    featurePhotos.forEach(function (photo) { photo.classList.add("is-visible"); });
  }

  /* ---------------- Clientes: logos carousel ---------------- */
  var clientLogos = [
    /* Página 1 — 5×2 según PDF de diseño */
    ["arquia.png", "Arquia Banca"],
    ["bluespace.png", "Bluespace"],
    ["bra.png", "BRA"],
    ["catalonia-hotels.png", "Catalonia Hotels & Resorts"],
    ["diba.png", "Diputació de Barcelona"],
    ["efpa.png", "EFPA European Financial Planning Association"],
    ["fgc.png", "FGC"],
    ["fira-bcn.png", "Fira Barcelona"],
    ["fluidra.png", "Fluidra"],
    ["generalitat-catalunya.png", "Generalitat de Catalunya"],
    /* Página 2 */
    ["grandvoyage.png", "GrandVoyage"],
    ["logotip-hospital.png", "Hospital de la Santa Creu i Sant Pau"],
    ["lagranjafoods.png", "La Granja Foods"],
    ["la-selva.png", "La Selva"],
    ["lletera-campllong.png", "Lletera Campllong"],
    ["mgs.png", "MGS Seguros"],
    ["maheso.png", "Maheso"],
    ["miro.png", "Miró"],
    ["monei.png", "MONEI"],
    ["naturland.png", "Naturland"],
    /* Página 3 */
    ["nieves.png", "Nieves"],
    ["picart.png", "Picart"],
    ["proactive.png", "Proactive"],
    ["protegim.png", "Protegim"],
    ["roncato.png", "Roncato"],
    ["staedtler.png", "Staedtler"],
    ["torras.png", "Torras"],
    ["upower.png", "Upower"],
    ["vaillant.png", "Vaillant"],
    ["logovichycatalan.png", "Vichy Catalan"],
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
    if (w < 600) return 4;  /* 2 columnas × 2 filas */
    if (w < 1000) return 6; /* 3 columnas × 2 filas */
    return 10;              /* 5 columnas × 2 filas */
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

  /* ---------------- Navbar: ocultar líneas que se solapan con logo o links ---------------- */
  var navCollisionTargets = [];
  var navCollisionRaf = 0;

  function collectNavCollisionTargets() {
    navCollisionTargets = Array.prototype.slice.call(document.querySelectorAll([
      ".page-content h2",
      ".page-content h3",
      ".page-content p",
      ".page-content li",
      ".page-content label",
      ".page-content .feature-photo-caption",
      ".page-content .file-input-name",
      ".page-content .btn-submit",
      ".page-content .client-logo",
      ".page-content .divider",
      ".hero-title",
      ".site-footer .footer-line",
      ".site-footer .footer-bottom p"
    ].join(",")));
  }

  function rectsOverlap(a, b) {
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  }

  function getNavObstacleRects() {
    var nodes = [];
    var logo = header.querySelector(".logo-img") || header.querySelector(".logo");
    if (logo) nodes.push(logo);
    if (window.innerWidth > 780) {
      Array.prototype.push.apply(nodes, mainNav.querySelectorAll("a"));
    } else if (navToggle) {
      nodes.push(navToggle);
    }
    var pad = 8;
    var rects = [];
    for (var i = 0; i < nodes.length; i++) {
      var r = nodes[i].getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      rects.push({
        left: r.left - pad,
        right: r.right + pad,
        top: r.top - pad,
        bottom: r.bottom + pad
      });
    }
    return rects;
  }

  function getTextLines(el) {
    var groups = [];
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      if (!/\S/.test(node.nodeValue)) continue;
      var range = document.createRange();
      range.selectNodeContents(node);
      var rects = range.getClientRects();
      for (var i = 0; i < rects.length; i++) {
        var r = rects[i];
        if (r.width < 1 || r.height < 1) continue;
        var placed = false;
        for (var g = 0; g < groups.length; g++) {
          if (Math.abs(groups[g].top - r.top) < Math.max(4, r.height * 0.4)) {
            groups[g].top = Math.min(groups[g].top, r.top);
            groups[g].bottom = Math.max(groups[g].bottom, r.bottom);
            groups[g].left = Math.min(groups[g].left, r.left);
            groups[g].right = Math.max(groups[g].right, r.right);
            placed = true;
            break;
          }
        }
        if (!placed) {
          groups.push({ top: r.top, bottom: r.bottom, left: r.left, right: r.right });
        }
      }
    }
    groups.sort(function (a, b) { return a.top - b.top; });
    return groups;
  }

  function clearNavOcclusion(el) {
    el.classList.remove("is-nav-occluded");
    el.style.maskImage = "";
    el.style.webkitMaskImage = "";
  }

  function getDividerLineRect(el) {
    var box = el.getBoundingClientRect();
    var lineHeight = 3;
    return {
      top: box.top,
      bottom: box.top + lineHeight,
      left: box.left,
      right: box.right,
      width: box.width
    };
  }

  function updateNavCollisions() {
    var obstacles = getNavObstacleRects();
    var headerBox = header.getBoundingClientRect();
    var bandTop = -16;
    var bandBottom = headerBox.bottom + 16;

    for (var t = 0; t < navCollisionTargets.length; t++) {
      var el = navCollisionTargets[t];
      var box = el.getBoundingClientRect();

      if (el.classList.contains("divider")) {
        var dividerLine = getDividerLineRect(el);
        if (dividerLine.bottom < bandTop || dividerLine.top > bandBottom || dividerLine.width < 1) {
          clearNavOcclusion(el);
        } else {
          el.style.maskImage = "";
          el.style.webkitMaskImage = "";
          el.classList.add("is-nav-occluded");
        }
        continue;
      }

      if (box.bottom < bandTop || box.top > bandBottom || box.width < 1 || box.height < 1) {
        clearNavOcclusion(el);
        continue;
      }

      var lines = getTextLines(el);
      if (!lines.length) {
        if (obstacles.some(function (o) { return rectsOverlap(box, o); })) {
          el.classList.add("is-nav-occluded");
        } else {
          clearNavOcclusion(el);
        }
        continue;
      }

      var hiddenFlags = [];
      var anyHidden = false;
      for (var i = 0; i < lines.length; i++) {
        var hit = false;
        for (var o = 0; o < obstacles.length; o++) {
          if (rectsOverlap(lines[i], obstacles[o])) {
            hit = true;
            break;
          }
        }
        hiddenFlags.push(hit);
        if (hit) anyHidden = true;
      }

      if (!anyHidden) {
        clearNavOcclusion(el);
        continue;
      }

      if (lines.length === 1) {
        el.style.maskImage = "";
        el.style.webkitMaskImage = "";
        el.classList.add("is-nav-occluded");
        continue;
      }

      el.classList.remove("is-nav-occluded");
      var stops = [];
      for (var n = 0; n < hiddenFlags.length; n++) {
        var start = Math.max(0, (lines[n].top - box.top) / box.height * 100);
        var end = Math.min(100, (lines[n].bottom - box.top) / box.height * 100);
        if (n === 0 && start > 0.4) {
          stops.push("#000 0%", "#000 " + start + "%");
        }
        var color = hiddenFlags[n] ? "transparent" : "#000";
        stops.push(color + " " + start + "%", color + " " + end + "%");
        if (n < hiddenFlags.length - 1) {
          var nextStart = Math.max(0, (lines[n + 1].top - box.top) / box.height * 100);
          if (nextStart > end + 0.2) {
            stops.push("#000 " + end + "%", "#000 " + nextStart + "%");
          }
        } else if (end < 99.5) {
          stops.push("#000 " + end + "%", "#000 100%");
        }
      }
      var gradient = "linear-gradient(to bottom, " + stops.join(", ") + ")";
      el.style.maskImage = gradient;
      el.style.webkitMaskImage = gradient;
    }
  }

  function requestNavCollisionCheck() {
    if (navCollisionRaf) return;
    navCollisionRaf = requestAnimationFrame(function () {
      navCollisionRaf = 0;
      updateNavCollisions();
    });
  }

  collectNavCollisionTargets();
  window.addEventListener("scroll", requestNavCollisionCheck, { passive: true });
  window.addEventListener("resize", function () {
    collectNavCollisionTargets();
    requestNavCollisionCheck();
  });
  header.addEventListener("transitionend", requestNavCollisionCheck);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(requestNavCollisionCheck);
  }
  requestNavCollisionCheck();
})();
