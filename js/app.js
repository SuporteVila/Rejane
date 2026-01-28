// js/app.js
(function () {
  // ===== CONTATOS FIXOS =====
  const phoneE164 = "5565999964842";
  const phoneDisplay = "(65) 99996-4842";
  const email = "rejanesilva.advocacia@hotmail.com";
  const address = "Av. Desembargador J.P.F. Mendes, nº 544, Centro, Diamantino-MT";
  const oab = "OAB/MT 29.296";

  // ===== ELEMENTOS =====
  const pageEl = document.getElementById("page");
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== IDIOMAS =====
  const LANG_KEY = "rs_lang";
  let currentLang = localStorage.getItem(LANG_KEY) || "pt";

  function t(key) {
    const dict = (window.I18N && window.I18N[currentLang]) ? window.I18N[currentLang] : (window.I18N ? window.I18N.pt : {});
    return dict?.[key] ?? (window.I18N?.pt?.[key] ?? key);
  }

  function applyI18n(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });

    const footerCopy = document.querySelector('[data-i18n="footer.copy"]');
    if (footerCopy) footerCopy.innerHTML = t("footer.copy").replace("{year}", String(new Date().getFullYear()));

    document.documentElement.lang = currentLang === "pt" ? "pt-BR" : currentLang;
  }

  function setActiveLangBtn() {
    document.querySelectorAll(".lang__btn").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.lang === currentLang);
    });
  }

  document.querySelectorAll(".lang__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentLang = btn.dataset.lang;
      localStorage.setItem(LANG_KEY, currentLang);
      setActiveLangBtn();
      applyI18n(document);
      configureWhatsAppLinks();
      renderRoute();
    });
  });

  setActiveLangBtn();
  applyI18n(document);

  // ===== WHATSAPP =====
  function encodeWhats(text) { return encodeURIComponent(text); }
  function whatsappLink(message) { return `https://wa.me/${phoneE164}?text=${encodeWhats(message)}`; }

  function baseWhatsMessage() {
    if (currentLang === "en") return "Hello! I would like to schedule a consultation. Could you please share the available times?";
    if (currentLang === "es") return "¡Hola! Me gustaría agendar una consulta. ¿Podría informarme los horarios disponibles?";
    return "Olá! Gostaria de agendar um atendimento. Pode me informar os horários disponíveis?";
  }

  function configureWhatsAppLinks() {
    const floatBtn = document.getElementById("whatsFloat");
    if (floatBtn) floatBtn.href = whatsappLink(baseWhatsMessage());

    const heroWhats = document.getElementById("heroWhats");
    if (heroWhats) heroWhats.href = whatsappLink(baseWhatsMessage());
  }
  configureWhatsAppLinks();

  // ===== DROPDOWN "CONTEÚDOS" =====
  const btnConteudos = document.getElementById("btnConteudos");
  const menuConteudos = document.getElementById("menuConteudos");

  function closeDropdown() {
    if (!menuConteudos) return;
    menuConteudos.setAttribute("aria-hidden", "true");
    menuConteudos.classList.remove("is-open");
  }
  function toggleDropdown() {
    if (!menuConteudos) return;
    const hidden = menuConteudos.getAttribute("aria-hidden") === "true";
    if (hidden) {
      menuConteudos.setAttribute("aria-hidden", "false");
      menuConteudos.classList.add("is-open");
    } else {
      closeDropdown();
    }
  }

  if (btnConteudos && menuConteudos) {
    btnConteudos.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleDropdown();
    });

    document.addEventListener("click", (e) => {
      if (!menuConteudos.classList.contains("is-open")) return;
      const clickedInside = menuConteudos.contains(e.target) || btnConteudos.contains(e.target);
      if (!clickedInside) closeDropdown();
    });

    menuConteudos.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => closeDropdown());
    });
  }

  // ===== HELPERS HTML =====
  function ul(items) {
    return `<ul class="list">${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
  }

  function divider() { return `<div class="divider"></div>`; }

  // ===== PÁGINAS =====
  function pageInicio() {
    return `
      <div class="section">
        <h3 class="section__title">${t("nav.home")}</h3>

        <div class="heroCard">
          <div class="heroCard__kicker"><span class="badge">${t("home.kicker")}</span></div>
          <h4 class="heroCard__name">${t("brand.nameFull")}</h4>
          <div class="heroCard__meta">
            <span>${t("home.meta1")}</span>
            <span>•</span>
            <span>${t("home.meta2")}</span>
            <span>•</span>
            <span>${t("home.meta3")}</span>
          </div>

          <p class="heroCard__lead">${t("home.lead")}</p>

          <div class="heroCard__cta">
            <a class="btn btn--gold" href="#/agendamento">${t("home.ctaSchedule")}</a>
            <a class="btn btn--ghost" href="${whatsappLink(baseWhatsMessage())}" target="_blank" rel="noopener">${t("home.ctaWhats")}</a>
          </div>
        </div>

        ${divider()}

        <h4 class="section__subtitle">${t("home.helpTitle")}</h4>
        <div class="grid grid--2">
          <div class="card">
            <h4 class="card__title">${t("home.prevTitle")}</h4>
            ${ul([
              t("home.prev.1"),
              t("home.prev.2"),
              t("home.prev.3"),
              t("home.prev.4"),
              t("home.prev.5"),
              t("home.prev.6"),
              t("home.prev.7")
            ])}
          </div>

          <div class="card">
            <h4 class="card__title">${t("home.tribTitle")}</h4>
            ${ul([
              t("home.trib.1"),
              t("home.trib.2"),
              t("home.trib.3"),
              t("home.trib.4"),
              t("home.trib.5"),
              t("home.trib.6")
            ])}
          </div>
        </div>

        ${divider()}

        <h4 class="section__subtitle">${t("home.diffTitle")}</h4>
        <div class="grid">
          <div class="card">
            ${ul([
              t("home.diff.1"),
              t("home.diff.2"),
              t("home.diff.3"),
              t("home.diff.4"),
              t("home.diff.5")
            ])}
          </div>
        </div>
      </div>
    `;
  }

  function pageQuemSou() {
  return `
    <div class="section">
      <h3 class="section__title">${t("nav.about")}</h3>

      <div class="aboutGrid">
        <div class="aboutPhoto">
          <img src="./assets/perfil.jpeg" alt="Rejane Maria Barros Silva - Advogada">
        </div>

        <div class="aboutText">
          <p>
            Sou advogada regularmente inscrita na OAB/MT sob o nº 29.296, com atuação nas áreas
            de Direito Tributário e Direito Previdenciário.
          </p>

          <p>
            Sou Mestre em Economia pela Universidade Federal de Mato Grosso (UFMT) e possuo
            pós-graduação em Direito Tributário e Direito Previdenciário pela Escola Superior de Advocacia Nacional.
          </p>

          <p>
            Minha atuação profissional é pautada pela análise técnica rigorosa, responsabilidade ética
            e busca por soluções jurídicas sustentáveis. Ao longo da minha trajetória, atuei no Tribunal
            de Justiça, Justiça Federal e em escritório de advocacia, além de experiência em docência universitária.
          </p>

          <p>
            Acredito em uma advocacia séria, estratégica e comprometida com a proteção dos direitos
            dos clientes, sempre com clareza, responsabilidade e ética.
          </p>
        </div>
      </div>

      ${divider()}

      <div class="card">
        <h4 class="card__title">${t("about.onlineTitle")}</h4>
        <p class="card__text">${t("about.onlineText")}</p>
      </div>
    </div>
  `;
}


  function pageAtuacao() {
    return `
      <div class="section">
        <h3 class="section__title">${t("nav.areas")}</h3>
        <p class="section__lead">${t("areas.lead")}</p>

        <div class="grid grid--2">
          <div class="card">
            <h4 class="card__title">${t("areas.prevTitle")}</h4>
            ${ul([
              t("areas.prev.1"),
              t("areas.prev.2"),
              t("areas.prev.3"),
              t("areas.prev.4"),
              t("areas.prev.5"),
              t("areas.prev.6"),
              t("areas.prev.7")
            ])}
          </div>

          <div class="card">
            <h4 class="card__title">${t("areas.tribTitle")}</h4>
            ${ul([
              t("areas.trib.1"),
              t("areas.trib.2"),
              t("areas.trib.3"),
              t("areas.trib.4"),
              t("areas.trib.5"),
              t("areas.trib.6")
            ])}
          </div>
        </div>

        ${divider()}

        <div class="grid">
          <div class="card">
            <h4 class="card__title">${t("strategy.title")}</h4>
            <p class="card__text">${t("strategy.text")}</p>
          </div>

          <div class="card">
            <h4 class="card__title">${t("partners.title")}</h4>
            <p class="card__text">${t("partners.text")}</p>
          </div>
        </div>
      </div>
    `;
  }

  function pageServicos() {
    return `
      <div class="section">
        <h3 class="section__title">${t("nav.services")}</h3>
        <p class="section__lead" style="max-width:980px;">${t("services.lead")}</p>

        <h4 class="section__subtitle">${t("packages.title")}</h4>
        <div class="grid grid--2">
          <div class="card">
            <span class="badge">${t("packages.tagPrev")}</span>
            <h4 class="card__title" style="margin-top:10px;">${t("packages.p1.title")}</h4>
            <p class="card__text">${t("packages.p1.text")}</p>
          </div>
          <div class="card">
            <span class="badge">${t("packages.tagPrev")}</span>
            <h4 class="card__title" style="margin-top:10px;">${t("packages.p2.title")}</h4>
            <p class="card__text">${t("packages.p2.text")}</p>
          </div>
          <div class="card">
            <span class="badge">${t("packages.tagTrib")}</span>
            <h4 class="card__title" style="margin-top:10px;">${t("packages.p3.title")}</h4>
            <p class="card__text">${t("packages.p3.text")}</p>
          </div>
          <div class="card">
            <span class="badge">${t("packages.tagTrib")}</span>
            <h4 class="card__title" style="margin-top:10px;">${t("packages.p4.title")}</h4>
            <p class="card__text">${t("packages.p4.text")}</p>
          </div>
          <div class="card">
            <span class="badge">${t("packages.tagSub")}</span>
            <h4 class="card__title" style="margin-top:10px;">${t("packages.p5.title")}</h4>
            <p class="card__text">${t("packages.p5.text")}</p>
          </div>
        </div>

        ${divider()}

        <h4 class="section__subtitle">${t("services.peopleTitle")}</h4>
n        <div class="grid">
          <div class="card">
            ${ul([
              t("services.people.1"), t("services.people.2"), t("services.people.3"), t("services.people.4"),
              t("services.people.5"), t("services.people.6"), t("services.people.7"), t("services.people.8"),
              t("services.people.9"), t("services.people.10"), t("services.people.11"), t("services.people.12"),
              t("services.people.13"), t("services.people.14"), t("services.people.15"), t("services.people.16"),
              t("services.people.17"), t("services.people.18")
            ])}
          </div>
        </div>

        ${divider()}

        <h4 class="section__subtitle">${t("services.bizTitle")}</h4>
        <div class="grid">
          <div class="card">
            ${ul([
              t("services.biz.1"), t("services.biz.2"), t("services.biz.3"), t("services.biz.4"),
              t("services.biz.5"), t("services.biz.6"), t("services.biz.7"), t("services.biz.8"),
              t("services.biz.9"), t("services.biz.10"), t("services.biz.11"), t("services.biz.12"),
              t("services.biz.13"), t("services.biz.14"), t("services.biz.15"), t("services.biz.16"),
              t("services.biz.17"), t("services.biz.18")
            ])}
          </div>
        </div>

        ${divider()}

        <h4 class="section__subtitle">${t("fees.title")}</h4>
        <div class="grid">
          <div class="card"><p class="card__text">${t("fees.text")}</p></div>
        </div>
      </div>
    `;
  }

  function pageAtendimento() {
    return `
      <div class="section">
        <h3 class="section__title">${t("nav.care")}</h3>

        <h4 class="section__subtitle">${t("care.howTitle")}</h4>
        <div class="grid grid--2">
          <div class="card"><h4 class="card__title">${t("care.s1.t")}</h4><p class="card__text">${t("care.s1.p")}</p></div>
          <div class="card"><h4 class="card__title">${t("care.s2.t")}</h4><p class="card__text">${t("care.s2.p")}</p></div>
          <div class="card"><h4 class="card__title">${t("care.s3.t")}</h4><p class="card__text">${t("care.s3.p")}</p></div>
          <div class="card"><h4 class="card__title">${t("care.s4.t")}</h4><p class="card__text">${t("care.s4.p")}</p></div>
        </div>

        ${divider()}

        <div class="grid">
          <div class="card">
            <h4 class="card__title">${t("care.onlineTitle")}</h4>
            <p class="card__text">${t("care.onlineText")}</p>
          </div>
        </div>

        ${divider()}

        <div class="grid">
          <div class="card">
            <h4 class="card__title">${t("contact.channels")}</h4>
            <div class="contact">
              <a href="tel:+${phoneE164}"><strong>${t("contact.phone")}:</strong><span>${phoneDisplay}</span></a>
              <a href="mailto:${email}"><strong>${t("contact.email")}:</strong><span>${email}</span></a>
              <span><strong>${t("contact.addr")}:</strong><span>${address}</span></span>
            </div>
            <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
              <a class="btn btn--gold" href="#/agendamento">${t("nav.schedule")}</a>
              <a class="btn btn--ghost" href="${whatsappLink(baseWhatsMessage())}" target="_blank" rel="noopener">${t("home.ctaWhats")}</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Conteúdos (Hub) + páginas separadas
  function pageConteudosHub() {
    return `
      <div class="section">
        <h3 class="section__title">${t("nav.contents")}</h3>
        <p class="section__lead">${t("contents.lead")}</p>

        <div class="grid grid--2">
          <div class="card">
            <h4 class="card__title">${t("nav.articles")}</h4>
            ${ul([t("articles.1"), t("articles.2"), t("articles.3"), t("articles.4")])}
            <div style="margin-top:12px"><a class="btn btn--ghost" href="#/artigos">${t("contents.open")}</a></div>
          </div>
          <div class="card">
            <h4 class="card__title">${t("nav.updates")}</h4>
            ${ul([t("updates.1"), t("updates.2"), t("updates.3"), t("updates.4")])}
            <div style="margin-top:12px"><a class="btn btn--ghost" href="#/atualizacoes">${t("contents.open")}</a></div>
          </div>
          <div class="card">
            <h4 class="card__title">${t("nav.materials")}</h4>
            ${ul([t("materials.1"), t("materials.2"), t("materials.3"), t("materials.4"), t("materials.5")])}
            <div style="margin-top:12px"><a class="btn btn--ghost" href="#/materiais">${t("contents.open")}</a></div>
          </div>
          <div class="card">
            <h4 class="card__title">${t("nav.faq")}</h4>
            ${ul([t("faq.1"), t("faq.2"), t("faq.3"), t("faq.4"), t("faq.5"), t("faq.6")])}
            <div style="margin-top:12px"><a class="btn btn--ghost" href="#/faq">${t("contents.open")}</a></div>
          </div>
        </div>
      </div>
    `;
  }

  function pageArtigos() {
    return `
      <div class="section">
        <h3 class="section__title">${t("nav.articles")}</h3>
        <p class="section__lead">${t("articles.lead")}</p>
        <div class="grid">
          <div class="card">${ul([t("articles.1"), t("articles.2"), t("articles.3"), t("articles.4")])}</div>
        </div>
      </div>
    `;
  }

  function pageAtualizacoes() {
    return `
      <div class="section">
        <h3 class="section__title">${t("nav.updates")}</h3>
        <p class="section__lead">${t("updates.lead")}</p>
        <div class="grid">
          <div class="card">${ul([t("updates.1"), t("updates.2"), t("updates.3"), t("updates.4")])}</div>
        </div>
      </div>
    `;
  }

  function pageMateriais() {
    return `
      <div class="section">
        <h3 class="section__title">${t("nav.materials")}</h3>
        <p class="section__lead">${t("materials.lead")}</p>
        <div class="grid">
          <div class="card">
            <p class="card__text">${t("materials.hint")}</p>
            ${ul([t("materials.1"), t("materials.2"), t("materials.3"), t("materials.4"), t("materials.5")])}
          </div>
        </div>
      </div>
    `;
  }

  function pageFAQ() {
    return `
      <div class="section">
        <h3 class="section__title">${t("nav.faq")}</h3>
        <p class="section__lead">${t("faq.lead")}</p>
        <div class="grid">
          <div class="card">${ul([t("faq.1"), t("faq.2"), t("faq.3"), t("faq.4"), t("faq.5"), t("faq.6")])}</div>
        </div>
      </div>
    `;
  }

  function pageContato() {
    const whUrl = whatsappLink(baseWhatsMessage());
    return `
      <div class="section">
        <h3 class="section__title">${t("nav.contact")}</h3>
        <p class="section__lead">${t("contact.lead")}</p>

        <div class="grid grid--2">
          <div class="card">
            <h4 class="card__title">${t("contact.channels")}</h4>
            <div class="contact">
              <a href="tel:+${phoneE164}"><strong>${t("contact.phone")}:</strong><span>${phoneDisplay}</span></a>
              <a href="mailto:${email}"><strong>${t("contact.email")}:</strong><span>${email}</span></a>
              <span><strong>${t("contact.addr")}:</strong><span>${address}</span></span>
            </div>
            <div style="margin-top:14px">
              <a class="btn btn--gold" href="${whUrl}" target="_blank" rel="noopener">${t("home.ctaWhats")}</a>
            </div>
          </div>

          <div class="card">
            <h4 class="card__title">${t("footer.disclaimerTitle")}</h4>
            <p class="card__text">${t("footer.disclaimer")}</p>
            <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
              <a class="btn btn--ghost" href="#/agendamento">${t("nav.schedule")}</a>
              <a class="btn btn--ghost" href="#/atendimento">${t("nav.care")}</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // AGENDAMENTO
  let selectedISO = null;

  function pageAgendamento() {
    return `
      <div class="section">
        <h3 class="section__title">${t("nav.schedule")}</h3>
        <p class="section__lead">${t("schedule.lead")}</p>

        <div class="calendarWrap">
          <div class="calendar" id="calendar"></div>

          <div class="note" id="selectedNote">${t("schedule.pick")}</div>

          <a id="confirmBtn" class="btn btn--gold" href="#" target="_blank" rel="noopener" style="pointer-events:none; opacity:.55">
            ${t("schedule.confirm")}
          </a>

          <div class="note">${t("schedule.hint")}</div>
        </div>
      </div>
    `;
  }

  function pagePrivacidade() {
    return `
      <div class="section">
        <h3 class="section__title">${t("footer.privacy")}</h3>
        <p class="section__lead">${t("privacy.lead")}</p>
        <div class="grid">
          <div class="card"><p class="card__text">${t("privacy.text")}</p></div>
        </div>
      </div>
    `;
  }

  function pageTermos() {
    return `
      <div class="section">
        <h3 class="section__title">${t("footer.terms")}</h3>
        <p class="section__lead">${t("terms.lead")}</p>
        <div class="grid">
          <div class="card"><p class="card__text">${t("terms.text")}</p></div>
        </div>
      </div>
    `;
  }

  // ===== ROUTER (aceita AS ROTAS do seu index.html) =====
  // Seu index usa:
  // #/inicio
  // #/quem-sou
  // #/atuacao
  // #/servicos
  // #/atendimento
  // #/artigos | #/atualizacoes | #/materiais | #/faq
  // #/contato
  // #/agendamento
  // #/privacidade
  // #/termos

  const routes = {
    "inicio": pageInicio,

    "quem-sou": pageQuemSou,
    "quem_sou": pageQuemSou,
    "quemsou": pageQuemSou,

    "atuacao": pageAtuacao,

    "servicos": pageServicos,

    "atendimento": pageAtendimento,

    // Conteúdos
    "conteudos": pageConteudosHub,
    "artigos": pageArtigos,
    "atualizacoes": pageAtualizacoes,
    "materiais": pageMateriais,
    "faq": pageFAQ,

    "contato": pageContato,

    "agendamento": pageAgendamento,

    "privacidade": pagePrivacidade,
    "termos": pageTermos
  };

  function setActiveNav(route) {
    document.querySelectorAll(".nav__link").forEach((a) => {
      const href = a.getAttribute("href") || "";
      const is = href === `#/${route}`;
      a.classList.toggle("is-active", is);
    });
  }

  function withTransition(html) {
    if (!pageEl) return;
    pageEl.classList.remove("page--enter");
    pageEl.classList.add("page--leave");

    window.setTimeout(() => {
      pageEl.innerHTML = html;
      applyI18n(pageEl);
      pageEl.classList.remove("page--leave");
      pageEl.classList.add("page--enter");
    }, 170);
  }

  function getRoute() {
    const hash = (location.hash || "#/inicio").replace("#/", "");
    return routes[hash] ? hash : "inicio";
  }

  function renderRoute() {
    const r = getRoute();
    setActiveNav(r);
    withTransition(routes[r]());

    window.setTimeout(() => {
      if (r === "agendamento") initCalendar();
      configureWhatsAppLinks();
      closeDropdown();
    }, 220);
  }

  window.addEventListener("hashchange", renderRoute);

  // ===== CALENDÁRIO (SÓ DIAS DISPONÍVEIS) =====
  function initCalendar() {
    selectedISO = null;

    const calHost = document.getElementById("calendar");
    if (!calHost) return;

    const avail = new Set(window.AVAILABLE_DATES || []);
    const today = new Date();
    let viewYear = today.getFullYear();
    let viewMonth = today.getMonth();

    function monthName(m) {
      const pt = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
      const en = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      const es = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
      if (currentLang === "en") return en[m];
      if (currentLang === "es") return es[m];
      return pt[m];
    }

    function dowName(i) {
      const pt = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
      const en = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      const es = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
      if (currentLang === "en") return en[i];
      if (currentLang === "es") return es[i];
      return pt[i];
    }

    function toISO(date) {
      if (window.CalendarHelpers?.toISODate) return window.CalendarHelpers.toISODate(date);
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }

    function build() {
      calHost.innerHTML = `
        <div class="calendar__head">
          <button id="prevMonth" aria-label="Previous month">‹</button>
          <div class="calendar__title">${monthName(viewMonth)} ${viewYear}</div>
          <button id="nextMonth" aria-label="Next month">›</button>
        </div>
        <div class="calendar__grid" id="calGrid"></div>
      `;

      const grid = document.getElementById("calGrid");

      for (let i = 0; i < 7; i++) {
        const el = document.createElement("div");
        el.className = "calendar__dow";
        el.textContent = dowName(i);
        grid.appendChild(el);
      }

      const first = new Date(viewYear, viewMonth, 1);
      const startDow = first.getDay();
      const lastDay = new Date(viewYear, viewMonth + 1, 0).getDate();

      for (let i = 0; i < startDow; i++) {
        const b = document.createElement("div");
        b.className = "day day--blank";
        grid.appendChild(b);
      }

      for (let d = 1; d <= lastDay; d++) {
        const date = new Date(viewYear, viewMonth, d);
        const iso = toISO(date);

        if (avail.has(iso)) {
          const dayEl = document.createElement("div");
          dayEl.className = "day day--available";
          dayEl.textContent = String(d);
          dayEl.dataset.iso = iso;

          dayEl.addEventListener("click", () => {
            selectedISO = iso;
            grid.querySelectorAll(".day--selected").forEach((x) => x.classList.remove("day--selected"));
            dayEl.classList.add("day--selected");
            onSelect(iso);
          });

          grid.appendChild(dayEl);
        } else {
          const blank = document.createElement("div");
          blank.className = "day day--blank";
          blank.setAttribute("aria-hidden", "true");
          grid.appendChild(blank);
        }
      }

      document.getElementById("prevMonth").onclick = () => {
        viewMonth--;
        if (viewMonth < 0) { viewMonth = 11; viewYear--; }
        build();
      };

      document.getElementById("nextMonth").onclick = () => {
        viewMonth++;
        if (viewMonth > 11) { viewMonth = 0; viewYear++; }
        build();
      };
    }

    function onSelect(iso) {
      const note = document.getElementById("selectedNote");
      const btn = document.getElementById("confirmBtn");

      const dt = window.CalendarHelpers?.fromISO ? window.CalendarHelpers.fromISO(iso) : new Date(iso);
      const dd = String(dt.getDate()).padStart(2, "0");
      const mm = String(dt.getMonth() + 1).padStart(2, "0");
      const yyyy = dt.getFullYear();
      const formatted = `${dd}/${mm}/${yyyy}`;

      const msg =
        currentLang === "en"
          ? `Hello! I would like to schedule a consultation on ${formatted}. Could you please confirm the available time?`
          : currentLang === "es"
            ? `¡Hola! Me gustaría agendar una consulta el ${formatted}. ¿Podría confirmarme el horario disponible?`
            : `Olá! Gostaria de agendar um atendimento no dia ${formatted}. Pode confirmar o horário disponível?`;

      if (note) note.textContent = `${t("schedule.selected")}: ${formatted}`;
      if (btn) {
        btn.href = whatsappLink(msg);
        btn.style.pointerEvents = "auto";
        btn.style.opacity = "1";
      }
    }

    build();
  }

  // ===== START =====
  renderRoute();
})();
