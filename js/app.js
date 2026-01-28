// js/app.js
(function () {
  "use strict";

  /* =======================
     CONFIGURAÇÕES FIXAS
  ======================= */
  const phoneE164 = "5565999964842";
  const phoneDisplay = "(65) 99996-4842";
  const email = "rejanesilva.advocacia@hotmail.com";
  const address = "Av. Desembargador J.P.F. Mendes, nº 544, Centro, Diamantino-MT";

  const LANG_KEY = "rs_lang";
  let currentLang = localStorage.getItem(LANG_KEY) || "pt";

  /* =======================
     ELEMENTOS BASE
  ======================= */
  const pageEl = document.getElementById("page");
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =======================
     I18N HELPERS
  ======================= */
  function t(key) {
    return (window.I18N?.[currentLang]?.[key]) || key;
  }

  function applyI18n(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    render();
  }

  document.querySelectorAll(".lang__btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  /* =======================
     UTILIDADES
  ======================= */
  function divider() {
    return `<div class="divider"></div>`;
  }

  function waLink(message) {
    return `https://wa.me/${phoneE164}?text=${encodeURIComponent(message)}`;
  }

  function toISO(d) {
    return d.toISOString().split("T")[0];
  }

  function formatHuman(iso, lang) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(lang === "pt" ? "pt-BR" : lang);
  }

  /* =======================
     PÁGINAS
  ======================= */

  function pageInicio() {
    return `
      <div class="section">
        <h3 class="section__title">${t("home.title")}</h3>

        <span class="kicker">${t("home.kicker")}</span>

        <h4 class="h4">${t("brand.nameFull")}</h4>
        <p class="meta">${t("home.meta1")} • ${t("home.meta2")} • ${t("home.meta3")}</p>
        <p class="section__lead">${t("home.lead")}</p>

        <div class="actions">
          <a class="btn btn--gold" href="#/agendamento">${t("home.ctaSchedule")}</a>
          <a class="btn btn--ghost" href="${waLink(t("whats.home"))}" target="_blank">${t("home.ctaWhats")}</a>
          <a class="btn btn--soft" href="#/assinatura">${t("home.ctaPlans")}</a>
        </div>

        ${divider()}

        <h4 class="h4">${t("home.helpTitle")}</h4>

        <div class="grid grid--2">
          <div class="card">
            <h4 class="card__title">${t("home.prevTitle")}</h4>
            <ul class="list">
              ${[1,2,3,4,5,6,7].map(i => `<li>${t("home.prev."+i)}</li>`).join("")}
            </ul>
          </div>

          <div class="card">
            <h4 class="card__title">${t("home.tribTitle")}</h4>
            <ul class="list">
              ${[1,2,3,4,5,6].map(i => `<li>${t("home.trib."+i)}</li>`).join("")}
            </ul>
          </div>
        </div>

        ${divider()}

        <h4 class="h4">${t("home.diffTitle")}</h4>
        <ul class="list">
          ${[1,2,3,4,5].map(i => `<li>${t("home.diff."+i)}</li>`).join("")}
        </ul>
      </div>
    `;
  }

  function pageQuemSou() {
    return `
      <div class="section">
        <h3 class="section__title">${t("nav.about")}</h3>

        <div class="aboutGrid">
          <img src="./assets/rejane.jpg" class="aboutPhoto" alt="Rejane Maria Barros Silva" />

          <div>
            <p class="section__lead">${t("about.p1")}</p>

            <div class="grid grid--2">
              <div class="card">
                <h4 class="card__title">${t("about.trajTitle")}</h4>
                <p>${t("about.trajText")}</p>
              </div>

              <div class="card">
                <h4 class="card__title">${t("about.commitTitle")}</h4>
                <p>${t("about.commitText")}</p>
              </div>
            </div>

            <div class="card mt">
              <h4 class="card__title">${t("about.onlineTitle")}</h4>
              <p>${t("about.onlineText")}</p>
            </div>
          </div>
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
            <h4>${t("areas.prevTitle")}</h4>
            <ul class="list">
              ${[1,2,3,4,5,6,7].map(i => `<li>${t("areas.prev."+i)}</li>`).join("")}
            </ul>
          </div>

          <div class="card">
            <h4>${t("areas.tribTitle")}</h4>
            <ul class="list">
              ${[1,2,3,4,5,6].map(i => `<li>${t("areas.trib."+i)}</li>`).join("")}
            </ul>
          </div>
        </div>

        <div class="card mt">
          <h4>${t("strategy.title")}</h4>
          <p>${t("strategy.text")}</p>
        </div>
      </div>
    `;
  }

  function pageServicos() {
    return `
      <div class="section">
        <h3 class="section__title">${t("nav.services")}</h3>
        <p class="section__lead">${t("services.lead")}</p>

        <h4 class="h4">${t("packages.title")}</h4>

        <div class="grid grid--2">
          ${["p1","p2","p3","p4","p5"].map(p => `
            <div class="card">
              <span class="tag">${t("packages."+p+".tag")}</span>
              <h4>${t("packages."+p+".title")}</h4>
              <p>${t("packages."+p+".text")}</p>
              <a class="btn btn--soft mt" href="#/assinatura">${t("packages.choose")}</a>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function pageAssinatura() {
    return `
      <div class="section">
        <h3 class="section__title">${t("plans.title")}</h3>
        <p class="section__lead">${t("plans.lead")}</p>

        <div class="grid grid--4">
          ${["normal","plus","premium","emp"].map(p => `
            <div class="card plan">
              <h4>${t("plans."+p+".title")}</h4>
              <ul class="list">
                ${t("plans."+p+".items").split("|").map(i => `<li>${i}</li>`).join("")}
              </ul>
              <a class="btn btn--gold mt" target="_blank"
                 href="${waLink(t("plans.whats")+" "+t("plans."+p+".title"))}">
                 ${t("plans.choose")}
              </a>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function pageContato() {
    return `
      <div class="section">
        <h3 class="section__title">${t("nav.contact")}</h3>
        <p class="section__lead">${t("contact.lead")}</p>

        <div class="grid grid--2">
          <div class="card soft">
            <p><strong>${t("contact.phone")}:</strong> ${phoneDisplay}</p>
            <p><strong>${t("contact.email")}:</strong> ${email}</p>
            <p><strong>${t("contact.addr")}:</strong> ${address}</p>

            <a class="btn btn--gold mt" href="${waLink(t("whats.contact"))}" target="_blank">
              ${t("contact.whats")}
            </a>
          </div>

          <div class="card">
            <h4>${t("agenda.title")}</h4>
            <p>${t("agenda.text")}</p>
            <a class="btn btn--soft" href="#/agendamento">${t("agenda.open")}</a>
          </div>
        </div>
      </div>
    `;
  }

  function pageAgendamento() {
    return `
      <div class="section">
        <h3 class="section__title">${t("nav.schedule")}</h3>
        <p class="section__lead">${t("agenda.lead")}</p>
        <div id="calendar"></div>
        <div class="mt">
          <strong>${t("agenda.selected")}:</strong>
          <span id="selectedLabel">—</span>
        </div>
        <button id="confirmBtn" class="btn btn--gold mt" disabled>
          ${t("agenda.confirm")}
        </button>
      </div>
    `;
  }

  /* =======================
     ROTAS
  ======================= */
  const routes = {
    "/": pageInicio,
    "/inicio": pageInicio,
    "/quem-sou": pageQuemSou,
    "/atuacao": pageAtuacao,
    "/servicos": pageServicos,
    "/assinatura": pageAssinatura,
    "/contato": pageContato,
    "/agendamento": pageAgendamento,
  };

  function render() {
    const hash = location.hash.replace("#", "") || "/";
    const page = routes[hash] || pageInicio;
    pageEl.innerHTML = page();
    applyI18n(pageEl);

    // WhatsApp flutuante
    const wf = document.getElementById("whatsFloat");
    if (wf) wf.href = waLink(t("whats.float"));

    // Home Whats
    const hw = document.getElementById("homeWhatsInline");
    if (hw) hw.href = waLink(t("whats.home"));

    // Calendário
    if (hash === "/agendamento" && window.initCalendar) {
      initCalendar(currentLang);
    }
  }

  window.addEventListener("hashchange", render);
  render();
})();
