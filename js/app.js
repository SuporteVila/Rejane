(function () {
  "use strict";

  const phoneE164 = "5565999964842";
  const phoneDisplay = "(65) 99996-4842";
  const email = "rejanesilva.advocacia@hotmail.com";
  const address = "Av. Desembargador J.P.F. Mendes, nº 544, Centro, Diamantino-MT";
  const LANG_KEY = "rs_lang";

  let currentLang = localStorage.getItem(LANG_KEY) || "pt";

  window.SITE = {
    phoneE164,
    waLink: (message) => `https://wa.me/${phoneE164}?text=${encodeURIComponent(message)}`,
  };
  window.SITE_PHONE_E164 = phoneE164;

  const siteContent = document.getElementById("siteContent");
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  function t(key) {
    return (window.I18N?.[currentLang]?.[key]) || key;
  }
  function tf(key, fallback) {
    const value = t(key);
    return value === key ? fallback : value;
  }

  function applyI18n(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      el.textContent = t(k);
    });
  }

  function syncLangButtons() {
    document.querySelectorAll(".lang__btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === currentLang);
    });
    document.documentElement.setAttribute("lang", currentLang === "pt" ? "pt-BR" : currentLang);
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    syncLangButtons();
    renderPage();
  }

  document.querySelectorAll(".lang__btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  function serviceCard(title, items, accent) {
    return `
      <article class="card ${accent ? "card--accent" : ""} reveal">
        <h4>${title}</h4>
        <ul class="list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
    `;
  }

  function planCard(key, featured = false) {
    return `
      <article class="card plan ${featured ? "card--accent" : ""} reveal">
        <span class="tag">${tf("plans." + key + ".title", key)}</span>
        <h4>${t("plans." + key + ".title")}</h4>
        <ul class="list">
          ${t("plans." + key + ".items").split("|").map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <a class="btn ${featured ? "btn--gold" : "btn--soft"}" target="_blank" rel="noopener"
           href="${window.SITE.waLink(tf("plans.whats", "Olá! Tenho interesse no plano") + " " + t("plans." + key + ".title"))}">
          ${tf("plans.choose", "Escolher no WhatsApp")}
        </a>
      </article>
    `;
  }

  function renderPage() {
    siteContent.innerHTML = `
      <section class="section section--light" id="autoridade">
        <div class="container">
          <div class="section__head reveal">
            <div>
              <span class="kicker">Autoridade e confiança</span>
              <h2 class="section__title">Presença profissional para transmitir segurança desde o primeiro contato</h2>
            </div>
            <p class="section__lead">Visual sofisticado, linguagem clara e estrutura pensada para facilitar o agendamento e valorizar a imagem do escritório.</p>
          </div>
          <div class="grid grid--3">
            <div class="metric reveal"><strong>OAB/MT 29.296</strong><span>Identidade profissional destacada com acabamento premium.</span></div>
            <div class="metric reveal"><strong>UFMT + ESA</strong><span>Formação e qualificação exibidas com mais peso comercial e institucional.</span></div>
            <div class="metric reveal"><strong>Online + presencial</strong><span>Experiência mais intuitiva para captar clientes em diferentes formatos de atendimento.</span></div>
          </div>
        </div>
      </section>

      <section class="section section--paper" id="quem-sou">
        <div class="container">
          <div class="section__head reveal">
            <div>
              <span class="kicker">${t("nav.about")}</span>
              <h2 class="section__title">${t("nav.about")}</h2>
            </div>
            <p class="section__lead">${t("about.p1")}</p>
          </div>
          <div class="aboutGrid">
            <div class="aboutPhoto reveal">
              <img src="./assets/perfil.jpeg" class="aboutImg" alt="Rejane Maria Barros Silva" />
            </div>
            <div class="aboutText">
              <article class="card reveal">
                <h4>${t("brand.nameFull")}</h4>
                <p>${t("about.trajText")}</p>
                <div class="badgeRow mt">
                  <span class="badgeMini">${t("brand.chip1")}</span>
                  <span class="badgeMini">${t("brand.chip2")}</span>
                  <span class="badgeMini">${t("home.meta3")}</span>
                </div>
              </article>
              <div class="grid grid--2">
                <article class="card reveal">
                  <h4>${t("about.trajTitle")}</h4>
                  <p>${t("about.trajText")}</p>
                </article>
                <article class="card reveal">
                  <h4>${t("about.commitTitle")}</h4>
                  <p>${t("about.commitText")}</p>
                </article>
              </div>
              <article class="card card--accent reveal">
                <h4>${t("about.onlineTitle")}</h4>
                <p>${t("about.onlineText")}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="section section--split" id="atuacao">
        <div class="container">
          <div class="section__head reveal">
            <div>
              <span class="kicker">${t("nav.areas")}</span>
              <h2 class="section__title">Áreas de atuação com apresentação mais elegante e comercial</h2>
            </div>
            <p class="section__lead">${t("areas.lead")}</p>
          </div>
          <div class="grid grid--2">
            ${serviceCard(t("areas.prevTitle"), [1,2,3,4,5,6,7].map(i => t("areas.prev." + i)), false)}
            ${serviceCard(t("areas.tribTitle"), [1,2,3,4,5,6].map(i => t("areas.trib." + i)), false)}
          </div>
          <article class="card card--dark mt reveal">
            <h4>${t("strategy.title")}</h4>
            <p>${t("strategy.text")}</p>
          </article>
        </div>
      </section>

      <section class="section section--light" id="servicos">
        <div class="container">
          <div class="section__head reveal">
            <div>
              <span class="kicker">${t("nav.services")}</span>
              <h2 class="section__title">Serviços organizados para vender melhor</h2>
            </div>
            <p class="section__lead">${t("services.lead")}</p>
          </div>
          <div class="grid grid--3 process">
            <article class="card reveal">
              <h4>Diagnóstico do caso</h4>
              <p>Entendimento inicial da demanda, documentos e cenário jurídico para definir o melhor caminho.</p>
            </article>
            <article class="card reveal">
              <h4>Estratégia e orientação</h4>
              <p>Explicação objetiva dos próximos passos, riscos, oportunidades e viabilidade da atuação.</p>
            </article>
            <article class="card reveal">
              <h4>Execução com acompanhamento</h4>
              <p>Condução do atendimento com organização, comunicação transparente e foco em segurança jurídica.</p>
            </article>
          </div>
          <div class="grid grid--3 mt">
            <article class="card reveal"><span class="tag">${t("packages.p1.tag")}</span><h4>${t("packages.p1.title")}</h4><p>${t("packages.p1.text")}</p></article>
            <article class="card reveal"><span class="tag">${t("packages.p2.tag")}</span><h4>${t("packages.p2.title")}</h4><p>${t("packages.p2.text")}</p></article>
            <article class="card reveal"><span class="tag">${t("packages.p3.tag")}</span><h4>${t("packages.p3.title")}</h4><p>${t("packages.p3.text")}</p></article>
            <article class="card reveal"><span class="tag">${t("packages.p4.tag")}</span><h4>${t("packages.p4.title")}</h4><p>${t("packages.p4.text")}</p></article>
            <article class="card reveal"><span class="tag">${t("packages.p5.tag")}</span><h4>${t("packages.p5.title")}</h4><p>${t("packages.p5.text")}</p></article>
            <article class="card card--accent reveal"><span class="tag">Premium</span><h4>Atendimento com foco em conversão</h4><p>Chamadas para ação distribuídas de forma estratégica para facilitar o contato e o fechamento.</p></article>
          </div>
        </div>
      </section>

      <section class="section section--paper" id="planos">
        <div class="container">
          <div class="section__head reveal">
            <div>
              <span class="kicker">${t("nav.subscription")}</span>
              <h2 class="section__title">Planos e acompanhamento</h2>
            </div>
            <p class="section__lead">${t("plans.lead")}</p>
          </div>
          <div class="grid grid--4">
            ${planCard("normal")}
            ${planCard("plus")}
            ${planCard("premium", true)}
            ${planCard("emp")}
          </div>
        </div>
      </section>

      <section class="section section--light" id="faq">
        <div class="container">
          <div class="section__head reveal">
            <div>
              <span class="kicker">${t("nav.faq")}</span>
              <h2 class="section__title">Perguntas frequentes</h2>
            </div>
            <p class="section__lead">Uma área de objeções para aumentar confiança e ajudar o visitante a tomar decisão mais rápido.</p>
          </div>
          <div class="grid">
            <details class="faqItem reveal" open>
              <summary>Como funciona o primeiro atendimento?<span>+</span></summary>
              <p>O primeiro contato serve para entender a demanda, organizar documentos e indicar os caminhos jurídicos possíveis de forma clara e objetiva.</p>
            </details>
            <details class="faqItem reveal">
              <summary>O atendimento pode ser online?<span>+</span></summary>
              <p>Sim. O site agora valoriza o atendimento online e presencial, facilitando o acesso de clientes de diferentes localidades.</p>
            </details>
            <details class="faqItem reveal">
              <summary>Quais áreas o escritório atende?<span>+</span></summary>
              <p>Atuação voltada principalmente ao Direito Tributário e Previdenciário, com estratégia, técnica e orientação individualizada.</p>
            </details>
          </div>
        </div>
      </section>

      <section class="section section--paper" id="contato">
        <div class="container">
          <div class="ctaPanel reveal">
            <div>
              <span class="kicker">Contato e conversão</span>
              <h2 class="section__title">Pronto para transformar visitantes em clientes com mais autoridade visual</h2>
              <p>O site foi reorganizado em scroll contínuo, com narrativa mais profissional, melhor hierarquia de informações e botões estratégicos para WhatsApp e agendamento.</p>
              <div class="hero__cta mt">
                <a class="btn btn--gold" href="#agendamento">${t("home.ctaSchedule")}</a>
                <a class="btn btn--ghost" href="${window.SITE.waLink(tf("whats.contact", "Olá! Gostaria de entrar em contato."))}" target="_blank" rel="noopener">${t("contact.whats")}</a>
              </div>
            </div>
            <div class="card card--dark contactCard">
              <h4>${t("nav.contact")}</h4>
              <div class="contactLine"><span class="contactDot"></span><div><strong>${t("contact.phone")}</strong><br>${phoneDisplay}</div></div>
              <div class="contactLine"><span class="contactDot"></span><div><strong>${t("contact.email")}</strong><br>${email}</div></div>
              <div class="contactLine"><span class="contactDot"></span><div><strong>${t("contact.addr")}</strong><br>${address}</div></div>
            </div>
          </div>
        </div>
      </section>

      <section class="section section--light" id="agendamento">
        <div class="container">
          <div class="section__head reveal">
            <div>
              <span class="kicker">${t("nav.schedule")}</span>
              <h2 class="section__title">${t("agenda.title")}</h2>
            </div>
            <p class="section__lead">${t("agenda.lead")}</p>
          </div>
          <div class="grid grid--2">
            <div class="calendarShell reveal">
              <div id="calendar"></div>
              <div class="mt"><strong>${t("agenda.selected")}:</strong> <span id="selectedLabel">—</span></div>
              <button id="confirmBtn" class="btn btn--gold mt" disabled>${t("agenda.confirm")}</button>
              <p class="note">${t("agenda.text")}</p>
            </div>
            <article class="card reveal">
              <h4>Por que esse layout ajuda mais na venda?</h4>
              <ul class="list">
                <li>Seções organizadas em ordem lógica de confiança, autoridade, serviço e conversão.</li>
                <li>Paleta azul profissional com transição elegante para o verde e dourado refinado.</li>
                <li>Animações suaves para sensação premium sem poluir a experiência.</li>
                <li>Botões e CTAs repetidos nos pontos certos para aumentar contato.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    `;

    applyI18n(document);

    const wf = document.getElementById("whatsFloat");
    if (wf) wf.href = window.SITE.waLink(tf("whats.float", "WhatsApp"));
    const heroWhats = document.getElementById("heroWhats");
    if (heroWhats) heroWhats.href = window.SITE.waLink(tf("whats.home", "Olá! Gostaria de falar sobre atendimento jurídico."));

    if (window.initCalendar) {
      window.initCalendar(currentLang, t);
    }

    initReveal();
    initActiveNav();
    bindSmoothAnchorOffset();
  }

  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.12 });
    items.forEach((item) => io.observe(item));
  }

  function initActiveNav() {
    const sections = [...document.querySelectorAll("main section[id], header.hero[id]")];
    const navLinks = [...document.querySelectorAll(".nav__link[data-nav-target]")];
    const obs = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.navTarget === visible.target.id);
      });
    }, { rootMargin: "-35% 0px -50% 0px", threshold: [0.12, 0.3, 0.6] });
    sections.forEach((section) => obs.observe(section));
  }

  function bindSmoothAnchorOffset() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href").slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  }

  syncLangButtons();
  renderPage();
})();
