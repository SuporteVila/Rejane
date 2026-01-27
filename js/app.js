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

  // ===== IDIOMAS (usa botões PT/EN/ES do index) =====
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

    // footer copy with {year}
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
      renderRoute();
      configureWhatsAppFloat();
    });
  });

  setActiveLangBtn();
  applyI18n(document);

  // ===== WHATSAPP =====
  function encodeWhats(text) { return encodeURIComponent(text); }
  function whatsappLink(message) {
    return `https://wa.me/${phoneE164}?text=${encodeWhats(message)}`;
  }

  function baseWhatsMessage() {
    if (currentLang === "en") return "Hello! I would like to schedule a consultation. Could you please share the available times?";
    if (currentLang === "es") return "¡Hola! Me gustaría agendar una consulta. ¿Podría informarme los horarios disponibles?";
    return "Olá! Gostaria de agendar um atendimento. Pode me informar os horários disponíveis?";
  }

  function configureWhatsAppFloat() {
    const a = document.getElementById("whatsFloat");
    if (!a) return;
    a.href = whatsappLink(baseWhatsMessage());
  }
  configureWhatsAppFloat();

  // ===== HELPERS UI =====
  function badge(text) {
    return `<span class="badge">${text}</span>`;
  }

  function ul(items) {
    return `<ul class="list">${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
  }

  // ===== PÁGINAS =====

  // HOME / INÍCIO
  function pageHome() {
    return `
      <div class="section">
        <h3 class="section__title">Início</h3>

        <div class="heroCard">
          <div class="heroCard__kicker">${badge("Advocacia Tributária e Previdenciária")}</div>
          <h4 class="heroCard__name">Rejane Maria Barros Silva</h4>
          <div class="heroCard__meta">
            <span>Advogada — ${oab}</span>
            <span>•</span>
            <span>Mestre em Economia (UFMT)</span>
            <span>•</span>
            <span>Pós-graduada em Direito Tributário e Previdenciário (ESA Nacional)</span>
          </div>

          <p class="heroCard__lead">
            Atuação técnica e estratégica em Direito Tributário e Direito Previdenciário, com foco em
            segurança jurídica, análise individualizada e soluções responsáveis.
          </p>

          <div class="heroCard__cta">
            <a class="btn btn--gold" href="#/agendamento">Agendar Atendimento</a>
            <a class="btn btn--ghost" href="${whatsappLink(baseWhatsMessage())}" target="_blank" rel="noopener">Falar no WhatsApp</a>
          </div>
        </div>

        <div class="divider"></div>

        <h4 class="section__subtitle">Como posso te ajudar</h4>
        <div class="grid grid--2">
          <div class="card">
            <h4 class="card__title">Direito Previdenciário</h4>
            ${ul([
              "Planejamento previdenciário",
              "Aposentadorias",
              "BPC/LOAS",
              "Auxílio por incapacidade",
              "Revisão de benefícios",
              "Recursos administrativos no INSS",
              "Ações judiciais contra indeferimentos"
            ])}
          </div>

          <div class="card">
            <h4 class="card__title">Direito Tributário</h4>
            ${ul([
              "Regularização de débitos fiscais",
              "Parcelamentos e transação tributária",
              "Defesa em autos de infração",
              "Planejamento tributário lícito",
              "Consultoria para empresas e profissionais liberais",
              "Recuperação de créditos tributários (quando juridicamente cabível)"
            ])}
          </div>
        </div>

        <div class="divider"></div>

        <h4 class="section__subtitle">Diferenciais profissionais</h4>
        <div class="grid">
          <div class="card">
            ${ul([
              "Atendimento técnico e individualizado",
              "Atuação ética e responsável",
              "Formação acadêmica sólida",
              "Análise estratégica de riscos e viabilidade",
              "Clareza na orientação jurídica"
            ])}
          </div>
        </div>
      </div>
    `;
  }

  // QUEM SOU
  function pageQuemSou() {
    return `
      <div class="section">
        <h3 class="section__title">Quem Sou</h3>

        <p class="section__lead" style="max-width:980px;">
          Sou advogada regularmente inscrita na OAB/MT sob o nº 29.296, com atuação nas áreas de
          Direito Tributário e Direito Previdenciário.
          Sou Mestre em Economia pela Universidade Federal de Mato Grosso (UFMT) e possuo
          pós-graduação em Direito Tributário e Direito Previdenciário pela Escola Superior de Advocacia Nacional.
        </p>

        <div class="grid grid--2">
          <div class="card">
            <h4 class="card__title">Trajetória</h4>
            <p class="card__text">
              Minha atuação profissional é pautada pela análise técnica rigorosa, responsabilidade ética e
              busca por soluções jurídicas sustentáveis. Ao longo da minha trajetória, atuei no Tribunal de Justiça,
              Justiça Federal e em escritório de advocacia, além de ter experiência em docência universitária.
            </p>
          </div>
          <div class="card">
            <h4 class="card__title">Compromisso</h4>
            <p class="card__text">
              Acredito em uma advocacia séria, estratégica e comprometida com a proteção dos direitos dos clientes,
              sem promessas de resultado e com orientação clara e responsável.
            </p>
          </div>
        </div>

        <div class="divider"></div>

        <div class="grid">
          <div class="card">
            <h4 class="card__title">Atendimento Online</h4>
            <p class="card__text">Atendimento jurídico online para todo o Brasil, com segurança e sigilo.</p>
          </div>
        </div>
      </div>
    `;
  }

  // ÁREAS DE ATUAÇÃO
  function pageAtuacao() {
    return `
      <div class="section">
        <h3 class="section__title">Atuação</h3>
        <p class="section__lead">Áreas de atuação com análise detalhada de cada caso.</p>

        <div class="grid grid--2">
          <div class="card">
            <h4 class="card__title">Direito Previdenciário</h4>
            ${ul([
              "Planejamento previdenciário",
              "Aposentadorias",
              "Benefício por incapacidade",
              "BPC/LOAS",
              "Revisões de benefícios",
              "Recursos administrativos",
              "Ações judiciais"
            ])}
          </div>

          <div class="card">
            <h4 class="card__title">Direito Tributário</h4>
            ${ul([
              "Diagnóstico tributário preventivo",
              "Regularização fiscal",
              "Defesa administrativa e judicial",
              "Planejamento tributário lícito",
              "Consultoria para escolha de regime tributário",
              "Recuperação de créditos"
            ])}
          </div>
        </div>

        <div class="divider"></div>

        <div class="grid">
          <div class="card">
            <h4 class="card__title">Atuação Estratégica</h4>
            <p class="card__text">
              O escritório trabalha com análise técnica profunda, sem promessas, priorizando soluções sustentáveis
              e estudo individualizado de cada caso.
            </p>
          </div>

          <div class="card">
            <h4 class="card__title">Parcerias profissionais</h4>
            <p class="card__text">Em breve.</p>
          </div>
        </div>
      </div>
    `;
  }

  // SERVIÇOS (com pacotes)
  function pageServicos() {
    return `
      <div class="section">
        <h3 class="section__title">Serviços</h3>

        <p class="section__lead" style="max-width:980px;">
          Os serviços abaixo são prestados mediante análise individualizada do caso concreto, com atuação técnica, ética e responsável,
          observando-se as normas do Código de Ética e Disciplina da OAB.
        </p>

        <h4 class="section__subtitle">Pacotes profissionais</h4>
        <div class="grid grid--2">
          <div class="card">
            ${badge("Previdenciário")}
            <h4 class="card__title" style="margin-top:10px;">Planejamento Previdenciário Essencial</h4>
            <p class="card__text">Análise inicial, organização documental e orientação objetiva para o melhor caminho previdenciário.</p>
          </div>
          <div class="card">
            ${badge("Previdenciário")}
            <h4 class="card__title" style="margin-top:10px;">Planejamento Previdenciário Estratégico</h4>
            <p class="card__text">Análise de cenários, estratégia completa, revisão de CNIS/vínculos e plano contributivo quando necessário.</p>
          </div>

          <div class="card">
            ${badge("Tributário")}
            <h4 class="card__title" style="margin-top:10px;">Diagnóstico Tributário Preventivo</h4>
            <p class="card__text">Mapeamento de riscos e oportunidades com foco em prevenção e regularidade fiscal.</p>
          </div>
          <div class="card">
            ${badge("Tributário")}
            <h4 class="card__title" style="margin-top:10px;">Consultoria Tributária Empresarial</h4>
            <p class="card__text">Apoio técnico contínuo para empresas e profissionais liberais, com orientação prática e segurança jurídica.</p>
          </div>

          <div class="card">
            ${badge("Assinatura")}
            <h4 class="card__title" style="margin-top:10px;">Acompanhamento Jurídico Mensal</h4>
            <p class="card__text">Modelo de acompanhamento por assinatura para demandas consultivas e preventivas.</p>
          </div>
        </div>

        <div class="divider"></div>

        <h4 class="section__subtitle">Para pessoas físicas (Previdenciário e Consultivo)</h4>
        <div class="grid">
          <div class="card">
            ${ul([
              "Consulta jurídica estruturada (presencial ou online)",
              "Parecer jurídico individualizado por escrito",
              "Segunda opinião jurídica em casos complexos",
              "Planejamento previdenciário completo (análise de cenários e estratégia)",
              "Revisão técnica de CNIS e vínculos contributivos",
              "Organização e auditoria documental previdenciária",
              "Análise de indeferimentos do INSS",
              "Recursos administrativos no INSS",
              "Ações judiciais previdenciárias",
              "Revisão de benefícios (quando juridicamente cabível)",
              "Pedido de concessão e manutenção de benefícios",
              "Acompanhamento integral de processos administrativos",
              "Orientação para contribuições em atraso e regularização contributiva",
              "Planejamento contributivo para autônomos e contribuintes individuais",
              "Atendimento especializado para casos de incapacidade",
              "Orientação jurídica em casos de pensão por morte",
              "Assessoria para segurados especiais e trabalhadores rurais"
            ])}
          </div>
        </div>

        <div class="divider"></div>

        <h4 class="section__subtitle">Para empresas e profissionais liberais (Tributário e Consultoria)</h4>
        <div class="grid">
          <div class="card">
            ${ul([
              "Diagnóstico tributário preventivo",
              "Check-up fiscal periódico",
              "Regularização de débitos fiscais",
              "Parcelamentos e transação tributária",
              "Defesa em autos de infração",
              "Defesa em processos administrativos fiscais",
              "Consultoria para escolha de regime tributário",
              "Planejamento tributário lícito",
              "Consultoria tributária contínua (modelo assinatura)",
              "Análise de riscos fiscais e contingências",
              "Revisão básica de obrigações acessórias",
              "Apoio jurídico em fiscalizações",
              "Orientação para abertura e estruturação de negócios",
              "Assessoria jurídica para profissionais liberais",
              "Consultoria para clínicas, pequenos negócios e prestadores de serviço",
              "Análise jurídica de contratos empresariais simples",
              "Revisão de práticas internas com foco em prevenção de passivos"
            ])}
          </div>
        </div>

        <div class="divider"></div>

        <h4 class="section__subtitle">Serviços estratégicos e consultivos avançados</h4>
        <div class="grid">
          <div class="card">
            ${ul([
              "Análise de viabilidade jurídica de demandas",
              "Estudo estratégico de caso (preventivo ou contencioso)",
              "Estruturação de estratégia processual",
              "Elaboração de pareceres técnicos fundamentados",
              "Planejamento jurídico preventivo",
              "Organização jurídica de documentação para processos",
              "Acompanhamento jurídico estratégico de casos sensíveis"
            ])}
          </div>
        </div>

        <div class="divider"></div>

        <h4 class="section__subtitle">Serviços acadêmicos e técnicos complementares</h4>
        <div class="grid">
          <div class="card">
            ${ul([
              "Revisão técnica de textos jurídicos",
              "Orientação metodológica para artigos, TCC e pós-graduação",
              "Consultoria acadêmica jurídica",
              "Apoio técnico para elaboração de pareceres e artigos jurídicos"
            ])}
          </div>
        </div>

        <div class="divider"></div>

        <h4 class="section__subtitle">Honorários (orientativo)</h4>
        <div class="grid">
          <div class="card">
            <p class="card__text">
              Os honorários seguem a tabela da OAB e variam conforme a complexidade do caso, com contrato formal.
              Prezamos por transparência e alinhamento claro do escopo antes do início do trabalho.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // ATENDIMENTO (como funciona + online)
  function pageAtendimento() {
    return `
      <div class="section">
        <h3 class="section__title">Atendimento</h3>

        <h4 class="section__subtitle">Como funciona o atendimento</h4>
        <div class="grid grid--2">
          <div class="card">
            <h4 class="card__title">1) Agendamento</h4>
            <p class="card__text">Atendimento mediante agendamento prévio (presencial ou online).</p>
          </div>
          <div class="card">
            <h4 class="card__title">2) Primeira análise do caso</h4>
            <p class="card__text">Coleta de informações e análise inicial para compreender riscos, viabilidade e próximos passos.</p>
          </div>
          <div class="card">
            <h4 class="card__title">3) Forma de contratação</h4>
            <p class="card__text">Contratação formal por instrumento adequado, definindo escopo, prazos e honorários.</p>
          </div>
          <div class="card">
            <h4 class="card__title">4) Acompanhamento</h4>
            <p class="card__text">Acompanhamento estratégico e comunicação objetiva sobre evolução e providências.</p>
          </div>
        </div>

        <div class="divider"></div>

        <div class="grid">
          <div class="card">
            <h4 class="card__title">Atendimento Online</h4>
            <p class="card__text">Atendimento jurídico online para todo o Brasil, com segurança e sigilo.</p>
          </div>
        </div>

        <div class="divider"></div>

        <div class="grid">
          <div class="card">
            <h4 class="card__title">Canais de contato</h4>
            <div class="contact">
              <a href="tel:+${phoneE164}"><strong>Telefone:</strong><span>${phoneDisplay}</span></a>
              <a href="mailto:${email}"><strong>E-mail:</strong><span>${email}</span></a>
              <span><strong>Endereço:</strong><span>${address}</span></span>
            </div>
            <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
              <a class="btn btn--gold" href="#/agendamento">Agendar Atendimento</a>
              <a class="btn btn--ghost" href="${whatsappLink(baseWhatsMessage())}" target="_blank" rel="noopener">WhatsApp Profissional</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // CONTEÚDOS (Artigos + Atualizações + Materiais + FAQ)
  function pageConteudos() {
    return `
      <div class="section">
        <h3 class="section__title">Conteúdos</h3>
        <p class="section__lead">Artigos, atualizações jurídicas, materiais informativos e perguntas frequentes.</p>

        <div class="grid grid--2">
          <div class="card">
            <h4 class="card__title">Artigos e conteúdos</h4>
            ${ul([
              "Quem tem direito ao BPC?",
              "Planejamento previdenciário: para quem é indicado?",
              "MEI e aposentadoria: o que observar",
              "Débitos tributários: quando é possível regularizar"
            ])}
            <p class="card__text" style="margin-top:10px;">(Você pode substituir por links reais quando publicar.)</p>
          </div>

          <div class="card">
            <h4 class="card__title">Atualizações jurídicas</h4>
            ${ul([
              "Exigência de biometria pelo INSS",
              "Novos entendimentos dos tribunais",
              "Alterações em regras previdenciárias",
              "Parcelamentos e programas de regularização fiscal"
            ])}
            <p class="card__text" style="margin-top:10px;">(Você pode substituir por links reais quando publicar.)</p>
          </div>
        </div>

        <div class="divider"></div>

        <div class="grid grid--2">
          <div class="card">
            <h4 class="card__title">Materiais informativos (PDF)</h4>
            <p class="card__text">Espaço para PDFs. Quando você tiver os arquivos, eu te ajudo a ligar os links.</p>
            ${ul([
              "Checklist para aposentadoria (PDF)",
              "Guia de documentos para BPC (PDF)",
              "Como usar o Meu INSS (PDF)",
              "Guia básico de regularização fiscal (PDF)",
              "Direitos básicos do segurado (PDF)"
            ])}
          </div>

          <div class="card">
            <h4 class="card__title">Perguntas Frequentes (FAQ)</h4>
            ${ul([
              "Quem tem direito ao BPC/LOAS?",
              "Quanto tempo demora um processo previdenciário?",
              "Posso me aposentar mesmo com contribuições em atraso?",
              "Quem pode revisar aposentadoria?",
              "Tenho dívida tributária, posso abrir empresa?",
              "Posso parcelar débitos fiscais?"
            ])}
          </div>
        </div>
      </div>
    `;
  }

  // CONTATO
  function pageContato() {
    const whUrl = whatsappLink(baseWhatsMessage());
    return `
      <div class="section">
        <h3 class="section__title">Contato</h3>
        <p class="section__lead">Atendimento mediante agendamento prévio.</p>

        <div class="grid grid--2">
          <div class="card">
            <h4 class="card__title">Canais</h4>
            <div class="contact">
              <a href="tel:+${phoneE164}"><strong>Telefone/WhatsApp:</strong><span>${phoneDisplay}</span></a>
              <a href="mailto:${email}"><strong>E-mail:</strong><span>${email}</span></a>
              <span><strong>Endereço profissional:</strong><span>${address}</span></span>
            </div>

            <div style="margin-top:14px">
              <a class="btn btn--gold" href="${whUrl}" target="_blank" rel="noopener">Falar no WhatsApp</a>
            </div>
          </div>

          <div class="card">
            <h4 class="card__title">Observações</h4>
            <p class="card__text">
              Atendimento mediante agendamento prévio. Conteúdos disponibilizados possuem caráter informativo
              e não configuram promessa de resultado.
            </p>
            <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
              <a class="btn btn--ghost" href="#/agendamento">Agendar Atendimento</a>
              <a class="btn btn--ghost" href="#/atendimento">Como funciona</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // AGENDAMENTO ONLINE (calendário só dias disponíveis)
  let selectedISO = null;

  function pageAgendamento() {
    return `
      <div class="section">
        <h3 class="section__title">Agendamento Online</h3>
        <p class="section__lead">
          Selecione um dia disponível para solicitar seu atendimento via WhatsApp (mensagem pronta).
          Prazos de resposta podem variar conforme demanda.
        </p>

        <div class="calendarWrap">
          <div class="calendar" id="calendar"></div>

          <div class="note" id="selectedNote">Selecione um dia disponível:</div>

          <a id="confirmBtn" class="btn btn--gold" href="#" target="_blank" rel="noopener" style="pointer-events:none; opacity:.55">
            Confirmar no WhatsApp
          </a>

          <div class="note">
            A agenda abaixo mostra apenas os dias disponíveis. Você pode editar os dias no arquivo <b>js/calendar.js</b>.
          </div>
        </div>
      </div>
    `;
  }

  // ===== ROUTER =====
  // Menu profissional:
  // Início | Quem Sou | Atuação | Serviços | Atendimento | Conteúdos | Contato | Agendamento
  const routes = {
    inicio: pageHome,
    quemsou: pageQuemSou,
    atuacao: pageAtuacao,
    servicos: pageServicos,
    atendimento: pageAtendimento,
    conteudos: pageConteudos,
    contato: pageContato,
    agendamento: pageAgendamento
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
      configureWhatsAppFloat();
    }, 220);
  }

  window.addEventListener("hashchange", renderRoute);

  // ===== CALENDÁRIO (MOSTRA APENAS DIAS DISPONÍVEIS) =====
  function initCalendar() {
    selectedISO = null;

    const calHost = document.getElementById("calendar");
    if (!calHost) return;

    const avail = new Set(window.AVAILABLE_DATES || []);
    const today = new Date();
    let viewYear = today.getFullYear();
    let viewMonth = today.getMonth();

    function monthName(m) {
      const months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
      if (currentLang === "en") return ["January","February","March","April","May","June","July","August","September","October","November","December"][m];
      if (currentLang === "es") return ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][m];
      return months[m];
    }

    function dowName(i) {
      if (currentLang === "en") return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][i];
      if (currentLang === "es") return ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"][i];
      return ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"][i];
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

      // DOW header
      for (let i = 0; i < 7; i++) {
        const el = document.createElement("div");
        el.className = "calendar__dow";
        el.textContent = dowName(i);
        grid.appendChild(el);
      }

      const first = new Date(viewYear, viewMonth, 1);
      const startDow = first.getDay();
      const lastDay = new Date(viewYear, viewMonth + 1, 0).getDate();

      // blanks before first
      for (let i = 0; i < startDow; i++) {
        const b = document.createElement("div");
        b.className = "day day--blank";
        grid.appendChild(b);
      }

      // days: ONLY available, else blank
      for (let d = 1; d <= lastDay; d++) {
        const date = new Date(viewYear, viewMonth, d);
        const iso = window.CalendarHelpers?.toISODate
          ? window.CalendarHelpers.toISODate(date)
          : `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

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

      if (note) note.textContent = `Dia selecionado: ${formatted}`;
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
