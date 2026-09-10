(function () {
  "use strict";

  /* Activar ENG más adelante:
   *  1) Rellenar STRINGS.en con las mismas claves que es/ca
   *  2) Añadir "en" a ENABLED_LANGS
   *  3) Quitar hidden del botón ENG y de su separador en index.html
   */
  var ENABLED_LANGS = ["es", "ca"];
  var STORAGE_KEY = "dp-lang";
  var DEFAULT_LANG = "es";
  var HTML_LANG = { es: "es", ca: "ca", en: "en" };
  var SECTION_SLUGS = ["somos", "talento", "aportamos", "clientes", "contacto"];
  var SITE_ORIGIN = "https://www.dataplanning.es";

  var STRINGS = {
    es: {
      meta: {
        title: "Dataplanning · Agencia de medios en Barcelona · Pure Accuracy",
        description: "Dataplanning es una agencia de medios independiente en Barcelona. Desde 2001 aportamos soluciones integrales de comunicación con un enfoque estratégico y altamente personalizado. Pure Accuracy.",
        keywords: "agencia de medios, agencia de medios Barcelona, planificación de medios, comunicación, publicidad, Dataplanning",
        ogTitle: "Dataplanning · Agencia de medios en Barcelona · Pure Accuracy",
        ogDescription: "Mucho más que una agencia de medios. Personas que marcan la diferencia. 25 años conectando marcas y audiencias.",
        sections: {
          somos: {
            title: "Somos · Dataplanning",
            description: "Mucho más que una agencia de medios. Agencia independiente en Barcelona desde 2001. Soluciones integrales de comunicación. Pure Accuracy."
          },
          talento: {
            title: "Talento · Dataplanning",
            description: "Personas que marcan la diferencia. El equipo de Dataplanning, agencia de medios en Barcelona especializada en estrategia y planificación."
          },
          aportamos: {
            title: "Aportamos · Dataplanning",
            description: "La fuerza de la experiencia. Estrategia de medios crossmedia para conectar marcas con una audiencia fragmentada y multiplataforma."
          },
          clientes: {
            title: "Clientes · Dataplanning",
            description: "Marcas que crecen junto a nosotros. Más de 80 clientes confían en Dataplanning para evolucionar y descubrir nuevas oportunidades."
          },
          contacto: {
            title: "Contacto · Dataplanning",
            description: "Contacta con Dataplanning. Beethoven 15, 08021 Barcelona. Teléfono +34 93 241 19 98. hola@dataplanning.es."
          }
        }
      },
      skip: "Saltar al contenido",
      lang: { label: "Idioma" },
      logo: { home: "Dataplanning, inicio" },
      nav: {
        main: "Navegación principal",
        somos: "Somos",
        talento: "Talento",
        aportamos: "Aportamos",
        clientes: "Clientes",
        contacto: "Contacto",
        open: "Abrir menú",
        close: "Cerrar menú"
      },
      hero: {
        presentacion: "Presentación",
        welcome: "Bienvenidos",
        years: "25 años",
        connecting: "conectando",
        brands: "marcas",
        audiences: "y audiencias",
        discover: "Descubre todo",
        weCan: "lo que podemos",
        forYou: "hacer por ti",
        slides: "Selector de diapositivas",
        goToSlide: "Ir a la diapositiva {n}",
        scroll: "Ir al contenido"
      },
      somos: {
        title1: "Mucho más",
        title2: "que una agencia de medios",
        p1: "Somos una agencia de medios independiente que aportamos soluciones integrales de comunicación con un enfoque estratégico y altamente personalizado.",
        p2: "Desde nuestra llegada a Barcelona en el año 2001, nuestro eslogan sintetiza nuestra razón de ser: <strong>PURE ACCURACY</strong>.",
        p3: "Creemos en una forma de trabajar cercana, proactiva y honesta, en la que cada cliente se siente escuchado, entendido y cuidado.",
        p4: "Nuestro compromiso es ofrecer siempre un servicio excelente y totalmente personalizado, adaptándonos a cada necesidad, proyecto y presupuesto. Aportando valor real y tangible en el proceso de construcción y crecimiento de nuestros clientes."
      },
      talento: {
        title1: "Personas que marcan",
        title2: "la diferencia",
        p1: "Detrás de cada estrategia hay un equipo que escucha, analiza y piensa.",
        p2: "Unimos experiencia, especialización y una curiosidad constante por entender cómo evolucionan las marcas, los consumidores y los medios.",
        p3: "La pasión por nuestro trabajo y la vocación de servicio están en nuestro ADN para satisfacer a los clientes más exigentes.",
        prev: "Persona anterior",
        next: "Siguiente persona",
        albert: {
          bio: [
            "Licenciado en Publicidad y RRPP (UAB)",
            "Máster en comunicación digital (INITEC)",
            "31 años de experiencia.",
            "“Diploma IA aplicada a la planificación de medios” (Imagina)"
          ]
        },
        pedro: {
          role: "Director Expansión y Planificación",
          bio: [
            "Comunicación Audiovisual (UOC)",
            "Máster en publicidad digital (Seeway)",
            "21 años de experiencia.",
            "“Diploma IA aplicada a la planificación de medios” (Imagina)"
          ]
        }
      },
      aportamos: {
        title1: "La fuerza",
        title2: "de la experiencia",
        p1: "En este apasionante, complejo y cambiante mundo de la comunicación, aportamos la visión global necesaria en la estrategia de medios para la consecución de los objetivos.",
        p2: "Nos sumergimos en una atmósfera de pensamiento global para desarrollar la mejor estrategia crossmedia para <strong>conectar</strong> de manera eficaz <strong>con</strong> una audiencia fragmentada, multiplataforma y dispersa ante los impactos publicitarios.",
        p3: "Combinamos el conocimiento del ecosistema tradicional con una visión digital para transformar la complejidad en nuevas oportunidades de crecimiento."
      },
      clientes: {
        title1: "Marcas que crecen",
        title2: "junto a nosotros",
        p1: "Las relaciones sólidas se construyen con resultados.",
        p2: "Más de 80 clientes confían en Dataplanning para seguir evolucionando, afrontar nuevos retos y descubrir nuevas oportunidades.",
        prev: "Logos anteriores",
        next: "Logos siguientes"
      },
      contacto: {
        title: "Contacto",
        name: "Nombre",
        email: "Email",
        message: "Mensaje",
        cv: "¿Quieres trabajar con nosotros? Adjunta CV",
        file: "Seleccionar archivo",
        noFile: "Ningún archivo seleccionado",
        honeypot: "No rellenar",
        submit: "Enviar",
        sending: "Enviando…",
        success: "¡Gracias! Hemos recibido tu mensaje y te responderemos lo antes posible.",
        error: "No se ha podido enviar el mensaje. Prueba de nuevo o escríbenos a hola@dataplanning.es."
      },
      footer: {
        social: "Redes sociales",
        rights: "Todos los derechos reservados."
      }
    },
    ca: {
      meta: {
        title: "Dataplanning · Agència de mitjans a Barcelona · Pure Accuracy",
        description: "Dataplanning és una agència de mitjans independent a Barcelona. Des del 2001 aportem solucions integrals de comunicació amb un enfocament estratègic i altament personalitzat. Pure Accuracy.",
        keywords: "agència de mitjans, agència de mitjans Barcelona, planificació de mitjans, comunicació, publicitat, Dataplanning",
        ogTitle: "Dataplanning · Agència de mitjans a Barcelona · Pure Accuracy",
        ogDescription: "Molt més que una agència de mitjans. Persones que marquen la diferència. 25 anys connectant marques i audiències.",
        sections: {
          somos: {
            title: "Som · Dataplanning",
            description: "Molt més que una agència de mitjans. Agència independent a Barcelona des del 2001. Solucions integrals de comunicació. Pure Accuracy."
          },
          talento: {
            title: "Talent · Dataplanning",
            description: "Persones que marquen la diferència. L’equip de Dataplanning, agència de mitjans a Barcelona especialitzada en estratègia i planificació."
          },
          aportamos: {
            title: "Aportem · Dataplanning",
            description: "La força de l’experiència. Estratègia de mitjans crossmedia per connectar marques amb una audiència fragmentada i multiplataforma."
          },
          clientes: {
            title: "Clients · Dataplanning",
            description: "Marques que creixem amb nosaltres. Més de 80 clients confien en Dataplanning per continuar evolucionant i descobrir noves oportunitats."
          },
          contacto: {
            title: "Contacte · Dataplanning",
            description: "Contacta amb Dataplanning. Beethoven 15, 08021 Barcelona. Telèfon +34 93 241 19 98. hola@dataplanning.es."
          }
        }
      },
      skip: "Salta al contingut",
      lang: { label: "Idioma" },
      logo: { home: "Dataplanning, inici" },
      nav: {
        main: "Navegació principal",
        somos: "Som",
        talento: "Talent",
        aportamos: "Aportem",
        clientes: "Clients",
        contacto: "Contacte",
        open: "Obre menú",
        close: "Tanca menú"
      },
      hero: {
        presentacion: "Presentació",
        welcome: "Benvinguts",
        years: "25 anys",
        connecting: "connectant",
        brands: "marques",
        audiences: "i audiències",
        discover: "Descobreix tot",
        weCan: "el que podem",
        forYou: "fer per tu",
        slides: "Selector de diapositives",
        goToSlide: "Ves a la diapositiva {n}",
        scroll: "Ves al contingut"
      },
      somos: {
        title1: "Molt més",
        title2: "que una agència de mitjans",
        p1: "Som una agència de mitjans independent que aportem solucions integrals de comunicació amb un enfocament estratègic i altament personalitzat.",
        p2: "Des de la nostra arribada a Barcelona l'any 2001, el nostre eslògan sintetitza la nostra raó de ser: <strong>PURE ACCURACY</strong>.",
        p3: "Creiem en una forma de treballar propera, proactiva i honesta, en que cada client se sent escoltat, entès i cuidat.",
        p4: "El nostre compromís és oferir sempre un servei excel·lent i totalment personalitzat, adaptant-nos a cada necessitat, projecte i pressupost. Aportant valor real i tangible al procés de construcció i creixement dels nostres clients."
      },
      talento: {
        title1: "Persones que marquen",
        title2: "la diferència",
        p1: "Darrere de cada estratègia hi ha un equip que escolta, analitza i pensa.",
        p2: "Unim experiència, especialització i una curiositat constant per entendre com evolucionen les marques, els consumidors i els mitjans.",
        p3: "La passió pel nostre treball i la vocació de servei són dins el nostre ADN per satisfer els clients més exigents.",
        prev: "Persona anterior",
        next: "Persona següent",
        albert: {
          bio: [
            "Llicenciat en Publicitat i RRPP (UAB)",
            "Màster en comunicació digital (INITEC)",
            "31 anys d'experiència.",
            "“Diploma IA aplicada a la planificació de mitjans” (Imagina)"
          ]
        },
        pedro: {
          role: "Director d'Expansió i Planificació",
          bio: [
            "Llicenciat en Comunicació Audiovisual (UOC)",
            "Màster en publicitat digital (Seeway)",
            "21 anys d'experiència.",
            "“Diploma IA aplicada a la planificació de mitjans” (Imagina)"
          ]
        }
      },
      aportamos: {
        title1: "La força",
        title2: "de l’experiència",
        p1: "En aquest apassionant, complex i canviant món de la comunicació, aportem la visió global necessària en l'estratègia de mitjans per a la consecució dels objectius.",
        p2: "Ens submergim en una atmosfera de pensament global per desenvolupar la millor estratègia crossmedia per <strong>connectar</strong> de manera eficaç <strong>amb</strong> una audiència fragmentada, multiplataforma i dispersa davant els impactes publicitaris.",
        p3: "Combinem el coneixement de l’ecosistema tradicional amb una visió digital per transformar la complexitat en noves oportunitats de creixement."
      },
      clientes: {
        title1: "Marques que creixem",
        title2: "amb nosaltres",
        p1: "Les relacions sòlides es construeixen amb resultats.",
        p2: "Més de 80 clients confien en Dataplanning per continuar evolucionant, afrontar nous reptes i descobrir noves oportunitats.",
        prev: "Logos anteriors",
        next: "Logos següents"
      },
      contacto: {
        title: "Contacte",
        name: "Nom",
        email: "Email",
        message: "Missatge",
        cv: "Vols treballar amb nosaltres? Adjunta el CV",
        file: "Seleccionar arxiu",
        noFile: "Cap arxiu seleccionat",
        honeypot: "No omplir",
        submit: "Envia",
        sending: "S’està enviant…",
        success: "Gràcies! Hem rebut el teu missatge i et respondrem tan aviat com sigui possible.",
        error: "No s’ha pogut enviar el missatge. Torna-ho a provar o escriu-nos a hola@dataplanning.es."
      },
      footer: {
        social: "Xarxes socials",
        rights: "Tots els drets reservats."
      }
    },
    en: {
      /* Pegar aquí la traducción inglesa con las mismas claves que es/ca */
    }
  };

  var currentLang = DEFAULT_LANG;
  var changeListeners = [];

  function lookup(dict, key) {
    if (!dict) return undefined;
    var parts = key.split(".");
    var cur = dict;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function t(key, vars) {
    var val = lookup(STRINGS[currentLang], key);
    if (val == null || val === "") val = lookup(STRINGS[DEFAULT_LANG], key);
    if (val == null) return key;
    if (typeof val !== "string") return key;
    if (vars) {
      Object.keys(vars).forEach(function (name) {
        val = val.replace(new RegExp("\\{" + name + "\\}", "g"), vars[name]);
      });
    }
    return val;
  }

  function tList(key) {
    var val = lookup(STRINGS[currentLang], key);
    if (!Array.isArray(val) || !val.length) val = lookup(STRINGS[DEFAULT_LANG], key);
    return Array.isArray(val) ? val : [];
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function isEnabled(lang) {
    return ENABLED_LANGS.indexOf(lang) !== -1;
  }

  function resolveLang() {
    try {
      var fromQuery = new URLSearchParams(window.location.search).get("lang");
      if (fromQuery && isEnabled(fromQuery)) return fromQuery;
    } catch (e) { /* ignore */ }
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && isEnabled(stored)) return stored;
    } catch (e2) { /* ignore */ }
    return DEFAULT_LANG;
  }

  function persistLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* ignore */ }
    try {
      var url = new URL(window.location.href);
      if (lang === DEFAULT_LANG) {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", lang);
      }
      var next = url.pathname + url.search + url.hash;
      if (next !== window.location.pathname + window.location.search + window.location.hash) {
        history.replaceState(null, "", next);
      }
    } catch (e2) { /* ignore */ }
  }

  function currentSection() {
    try {
      var slug = window.location.pathname.replace(/^\/+|\/+$/g, "");
      return SECTION_SLUGS.indexOf(slug) !== -1 ? slug : "";
    } catch (e) {
      return "";
    }
  }

  function setMetaContent(selector, value) {
    var el = document.querySelector(selector);
    if (el && value) el.setAttribute("content", value);
  }

  function applySeo() {
    var section = currentSection();
    var title = section ? t("meta.sections." + section + ".title") : t("meta.title");
    var description = section ? t("meta.sections." + section + ".description") : t("meta.description");
    var canonical = SITE_ORIGIN + (section ? "/" + section + "/" : "/");
    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', section ? title : t("meta.ogTitle"));
    setMetaContent('meta[property="og:description"]', section ? description : t("meta.ogDescription"));
    setMetaContent('meta[property="og:url"]', canonical);
    var link = document.querySelector('link[rel="canonical"]');
    if (link) link.setAttribute("href", canonical);
    document.documentElement.setAttribute("data-section", section || "");
  }

  function applyDom() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length < 2) return;
        var attr = parts[0].trim();
        var key = parts.slice(1).join(":").trim();
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });
    document.querySelectorAll("[data-i18n-list]").forEach(function (el) {
      var items = tList(el.getAttribute("data-i18n-list"));
      if (!items.length) return;
      el.innerHTML = items.map(function (text) {
        var cls = /Diploma/.test(text) ? ' class="team-bio-diploma"' : "";
        return "<li" + cls + ">" + escapeHtml(text) + "</li>";
      }).join("");
    });
  }

  function updateSwitcher() {
    document.querySelectorAll(".lang-switch [data-lang]").forEach(function (btn) {
      var on = btn.getAttribute("data-lang") === currentLang;
      btn.setAttribute("aria-pressed", String(on));
      btn.classList.toggle("is-active", on);
    });
  }

  function applyLang(lang, persist) {
    if (!isEnabled(lang)) lang = DEFAULT_LANG;
    currentLang = lang;
    document.documentElement.lang = HTML_LANG[lang] || lang;
    applyDom();
    applySeo();
    updateSwitcher();
    if (persist !== false) persistLang(lang);
    changeListeners.forEach(function (fn) {
      try { fn(currentLang); } catch (e) { /* ignore */ }
    });
  }

  function onChange(fn) {
    if (typeof fn === "function") changeListeners.push(fn);
  }

  function bindSwitcher() {
    var switcher = document.querySelector(".lang-switch");
    if (!switcher) return;
    switcher.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-lang]");
      if (!btn || btn.hasAttribute("hidden")) return;
      var lang = btn.getAttribute("data-lang");
      if (!isEnabled(lang) || lang === currentLang) return;
      applyLang(lang);
    });
  }

  window.DP_I18N = {
    t: t,
    applyLang: applyLang,
    applySeo: applySeo,
    currentSection: currentSection,
    SECTION_SLUGS: SECTION_SLUGS,
    getLang: function () { return currentLang; },
    onChange: onChange,
    ENABLED_LANGS: ENABLED_LANGS
  };

  applyLang(resolveLang(), true);
  bindSwitcher();
})();
