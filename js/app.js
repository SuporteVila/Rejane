// js/app.js
(function(){
  const phoneE164 = "5565999964842";
  const phoneDisplay = "(65) 99996-4842";
  const email = "rejanesilva.advocacia@hotmail.com";
  const address = "Av. Desembargador J.P.F. Mendes, n° 544, Centro, Diamantino-MT";

  const pageEl = document.getElementById("page");
  const yearEl = document.getElementById("year");
  yearEl.textContent = new Date().getFullYear();

  // Language
  const LANG_KEY = "rs_lang";
  let currentLang = localStorage.getItem(LANG_KEY) || "pt";

  function t(key){
    const dict = window.I18N[currentLang] || window.I18N.pt;
    return dict[key] ?? (window.I18N.pt[key] ?? key);
  }

  function applyI18n(root=document){
    root.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });

    // footer with {year}
    const footerCopy = root.querySelector('[data-i18n="footer.copy"]');
    if (footerCopy){
      footerCopy.innerHTML = t("footer.copy").replace("{year}", String(new Date().getFullYear()));
    }

    document.documentElement.lang = currentLang === "pt" ? "pt-BR" : currentLang;
  }

  function setActiveLangBtn(){
    document.querySelectorAll(".lang__btn").forEach(b=>{
      b.classList.toggle("is-active", b.dataset.lang === currentLang);
    });
  }

  document.querySelectorAll(".lang__btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      currentLang = btn.dataset.lang;
      localStorage.setItem(LANG_KEY, currentLang);
      setActiveLangBtn();
      applyI18n(document);
      renderRoute();
      configureWhatsAppFloat(); // update message language
    });
  });

  setActiveLangBtn();
  applyI18n(document);

  // WhatsApp float
  function encodeWhats(text){ return encodeURIComponent(text); }
  function whatsappLink(message){
    return `https://wa.me/${phoneE164}?text=${encodeWhats(message)}`;
  }

  function baseWhatsMessage(){
    if (currentLang === "en") return "Hello! I would like to schedule a consultation. Could you please share the available times?";
    if (currentLang === "es") return "¡Hola! Me gustaría agendar una consulta. ¿Podría informarme los horarios disponibles?";
    return "Olá! Gostaria de agendar um atendimento. Pode me informar os horários disponíveis?";
  }

  function configureWhatsAppFloat(){
    const a = document.getElementById("whatsFloat");
    a.href = whatsappLink(baseWhatsMessage());
  }
  configureWhatsAppFloat();

  // Pages templates
  function pageHome(){
    return `
      <div class="section">
        <h3 class="section__title" data-i18n="home.sectionTitle">${t("home.sectionTitle")}</h3>
        <p class="section__lead" data-i18n="home.lead">${t("home.lead")}</p>

        <div class="grid grid--2">
          <div class="card">
            <div class="badge">${t("home.cards.1.t")}</div>
            <h4 class="card__title" style="margin-top:10px">${t("home.cards.1.t")}</h4>
            <p class="card__text">${t("home.cards.1.p")}</p>
          </div>
          <div class="card">
            <div class="badge">${t("home.cards.2.t")}</div>
            <h4 class="card__title" style="margin-top:10px">${t("home.cards.2.t")}</h4>
            <p class="card__text">${t("home.cards.2.p")}</p>
          </div>
          <div class="card" style="grid-column: 1 / -1;">
            <div class="badge">${t("home.cards.3.t")}</div>
            <h4 class="card__title" style="margin-top:10px">${t("home.cards.3.t")}</h4>
            <p class="card__text">${t("home.cards.3.p")}</p>
          </div>
        </div>
      </div>
    `;
  }

  function pageSobre(){
    return `
      <div class="section">
        <h3 class="section__title" data-i18n="about.title">${t("about.title")}</h3>
        <p class="section__lead" data-i18n="about.lead">${t("about.lead")}</p>

        <div class="grid grid--2">
          <div class="card">
            <h4 class="card__title" data-i18n="about.card1.t">${t("about.card1.t")}</h4>
            <p class="card__text" data-i18n="about.card1.p">${t("about.card1.p")}</p>
          </div>
          <div class="card">
            <h4 class="card__title" data-i18n="about.card2.t">${t("about.card2.t")}</h4>
            <p class="card__text" data-i18n="about.card2.p">${t("about.card2.p")}</p>
          </div>
        </div>
      </div>
    `;
  }

  function pageEducacao(){
    return `
      <div class="section">
        <h3 class="section__title" data-i18n="edu.title">${t("edu.title")}</h3>
        <p class="section__lead" data-i18n="edu.lead">${t("edu.lead")}</p>

        <div class="grid">
          <div class="card">
            <h4 class="card__title">${t("edu.item1")}</h4>
            <p class="card__text">${t("footer.desc")}</p>
          </div>
          <div class="card">
            <h4 class="card__title">${t("edu.item2")}</h4>
            <p class="card__text">${t("home.lead")}</p>
          </div>
          <div class="card">
            <h4 class="card__title">${t("edu.item3")}</h4>
            <p class="card__text">${t("exp.lead")}</p>
          </div>
        </div>
      </div>
    `;
  }

  function pageExperiencia(){
    return `
      <div class="section">
        <h3 class="section__title" data-i18n="exp.title">${t("exp.title")}</h3>
        <p class="section__lead" data-i18n="exp.lead">${t("exp.lead")}</p>

        <div class="grid">
          <div class="card">
            <h4 class="card__title" data-i18n="exp.a1.t">${t("exp.a1.t")}</h4>
            <p class="card__text" data-i18n="exp.a1.p">${t("exp.a1.p")}</p>
          </div>
          <div class="card">
            <h4 class="card__title" data-i18n="exp.a2.t">${t("exp.a2.t")}</h4>
            <p class="card__text" data-i18n="exp.a2.p">${t("exp.a2.p")}</p>
          </div>
          <div class="card">
            <h4 class="card__title" data-i18n="exp.a3.t">${t("exp.a3.t")}</h4>
            <p class="card__text" data-i18n="exp.a3.p">${t("exp.a3.p")}</p>
          </div>
        </div>
      </div>
    `;
  }

  function pageContato(){
    const whMsg = baseWhatsMessage();
    const whUrl = whatsappLink(whMsg);

    return `
      <div class="section">
        <h3 class="section__title" data-i18n="contact.title">${t("contact.title")}</h3>
        <p class="section__lead" data-i18n="contact.lead">${t("contact.lead")}</p>

        <div class="grid grid--2">
          <div class="card">
            <h4 class="card__title">${t("contact.title")}</h4>
            <div class="contact">
              <a href="tel:+${phoneE164}">
                <strong>${t("contact.phone")}:</strong> <span>${phoneDisplay}</span>
              </a>
              <a href="mailto:${email}">
                <strong>${t("contact.email")}:</strong> <span>${email}</span>
              </a>
              <span>
                <strong>${t("contact.addr")}:</strong> <span>${address}</span>
              </span>
            </div>

            <div style="margin-top:14px">
              <a class="btn btn--gold" href="${whUrl}" target="_blank" rel="noopener">${t("contact.cta")}</a>
            </div>
          </div>

          <div class="card">
            <h4 class="card__title">${t("home.headline")}</h4>
            <p class="card__text">
              ${t("footer.desc")}.<br/>
              ${t("home.lead")}
            </p>
            <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap;">
              <a class="btn btn--ghost" href="#/agendar">${t("nav.schedule")}</a>
              <a class="btn btn--ghost" href="#/experiencia">${t("nav.experience")}</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Calendar page
  let selectedISO = null;

  function pageAgendar(){
    return `
      <div class="section">
        <h3 class="section__title" data-i18n="schedule.title">${t("schedule.title")}</h3>
        <p class="section__lead" data-i18n="schedule.lead">${t("schedule.lead")}</p>

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

  // Router
  const routes = {
    home: pageHome,
    sobre: pageSobre,
    educacao: pageEducacao,
    experiencia: pageExperiencia,
    contato: pageContato,
    agendar: pageAgendar
  };

  function setActiveNav(route){
    document.querySelectorAll(".nav__link").forEach(a=>{
      const href = a.getAttribute("href") || "";
      const is = href === `#/${route}`;
      a.classList.toggle("is-active", is);
    });
  }

  function withTransition(html){
    pageEl.classList.remove("page--enter");
    pageEl.classList.add("page--leave");

    window.setTimeout(()=>{
      pageEl.innerHTML = html;
      applyI18n(pageEl);
      pageEl.classList.remove("page--leave");
      pageEl.classList.add("page--enter");
    }, 170);
  }

  function getRoute(){
    const hash = (location.hash || "#/home").replace("#/","");
    return routes[hash] ? hash : "home";
  }

  function renderRoute(){
    const r = getRoute();
    setActiveNav(r);
    withTransition(routes[r]());

    // after render: init calendar if needed
    window.setTimeout(()=>{
      if (r === "agendar"){
        initCalendar();
      }
      configureWhatsAppFloat();
    }, 220);
  }

  window.addEventListener("hashchange", renderRoute);

  // Calendar renderer (shows ONLY available days)
  function initCalendar(){
    selectedISO = null;

    const calHost = document.getElementById("calendar");
    if (!calHost) return;

    const avail = new Set(window.AVAILABLE_DATES || []);
    const today = new Date();
    let viewYear = today.getFullYear();
    let viewMonth = today.getMonth();

    function monthName(m){ return t(`months.${m}`); }
    function dowName(i){ return t(`dow.${i}`); }

    function build(){
      calHost.innerHTML = `
        <div class="calendar__head">
          <button id="prevMonth" aria-label="Previous month">‹</button>
          <div class="calendar__title">${monthName(viewMonth)} ${viewYear}</div>
          <button id="nextMonth" aria-label="Next month">›</button>
        </div>
        <div class="calendar__grid" id="calGrid"></div>
      `;

      const grid = document.getElementById("calGrid");

      // DOW header
      for (let i=0;i<7;i++){
        const el = document.createElement("div");
        el.className = "calendar__dow";
        el.textContent = dowName(i);
        grid.appendChild(el);
      }

      const first = new Date(viewYear, viewMonth, 1);
      const startDow = first.getDay(); // 0..6
      const lastDay = new Date(viewYear, viewMonth+1, 0).getDate();

      // blank before first
      for (let i=0;i<startDow;i++){
        const b = document.createElement("div");
        b.className = "day day--blank";
        grid.appendChild(b);
      }

      // days: show ONLY if available; otherwise blank cell
      for (let d=1; d<=lastDay; d++){
        const date = new Date(viewYear, viewMonth, d);
        const iso = window.CalendarHelpers.toISODate(date);

        if (avail.has(iso)){
          const dayEl = document.createElement("div");
          dayEl.className = "day day--available";
          dayEl.textContent = String(d);
          dayEl.dataset.iso = iso;

          dayEl.addEventListener("click", ()=>{
            selectedISO = iso;
            grid.querySelectorAll(".day--selected").forEach(x=>x.classList.remove("day--selected"));
            dayEl.classList.add("day--selected");
            onSelect(iso);
          });

          grid.appendChild(dayEl);
        } else {
          const blank = document.createElement("div");
          blank.className = "day day--blank";
          blank.setAttribute("aria-hidden","true");
          grid.appendChild(blank);
        }
      }

      // nav buttons
      document.getElementById("prevMonth").onclick = ()=>{
        viewMonth--;
        if (viewMonth < 0){ viewMonth = 11; viewYear--; }
        build();
      };
      document.getElementById("nextMonth").onclick = ()=>{
        viewMonth++;
        if (viewMonth > 11){ viewMonth = 0; viewYear++; }
        build();
      };
    }

    function onSelect(iso){
      const note = document.getElementById("selectedNote");
      const btn = document.getElementById("confirmBtn");

      const dt = window.CalendarHelpers.fromISO(iso);
      const dd = String(dt.getDate()).padStart(2,'0');
      const mm = String(dt.getMonth()+1).padStart(2,'0');
      const yyyy = dt.getFullYear();
      const formattedBR = `${dd}/${mm}/${yyyy}`;

      const msg = (currentLang === "en")
        ? `Hello! I would like to schedule a consultation on ${formattedBR}. Could you please confirm the available time?`
        : (currentLang === "es")
          ? `¡Hola! Me gustaría agendar una consulta el ${formattedBR}. ¿Podría confirmarme el horario disponible?`
          : `Olá! Gostaria de agendar um atendimento no dia ${formattedBR}. Pode confirmar o horário disponível?`;

      note.textContent = `${t("schedule.selected")}: ${formattedBR}`;
      btn.href = whatsappLink(msg);
      btn.style.pointerEvents = "auto";
      btn.style.opacity = "1";
    }

    build();
  }

  // Initial route
  renderRoute();
})();
