(function () {
  "use strict";

  const config = {
    siteName: "Astrofoxx",
    teacherName: "Umashankar",
    tagline: "Vedic Astrology & Teaching",
    description:
      "Classical Vedic astrology consultations, muhurtha guidance, and structured courses led by Umashankar.",
    siteUrl: "https://www.astrofoxx.in/",
    whatsappPhone: "918073527454",
    callNumber: "+91 80735 27454",
    email: "u.umashankar1@gmail.com",
    city: "Chennai, India",
    officeHours: "Mon-Sat • 10:00 AM to 7:00 PM IST",
    responseWindowHours: 4,
    yearsExperience: 14,
    languages: ["English", "Tamil", "Hindi"],
    social: [
      { label: "Instagram", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "LinkedIn", href: "#" }
    ],
    navLinks: [
      { label: "Home", href: "", route: "" },
      { label: "About", href: "about/", route: "about" },
      { label: "Services", href: "services/", route: "services" },
      { label: "Courses", href: "courses/", route: "courses" },
      { label: "Tools", href: "tools/", route: "tools" },
      { label: "Contact", href: "contact/", route: "contact" }
    ]
  };

  const BASE_PATH = window.__BASE_PATH__ || "";

  function normalizePath() {
    let path = window.location.pathname;

    if (BASE_PATH && path === BASE_PATH) {
      return "";
    }

    if (BASE_PATH && path.startsWith(`${BASE_PATH}/`)) {
      path = path.slice(BASE_PATH.length + 1);
    }

    return path.replace(/^\/+|\/+$/g, "");
  }

  function getTopRoute() {
    const normalized = normalizePath();
    return normalized.split("/")[0] || "";
  }

  function formatDate(dateInput) {
    if (!dateInput) {
      return "On request";
    }

    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) {
      return "On request";
    }

    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function cleanPhone(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function createWhatsAppLink(message, phone) {
    const recipient = cleanPhone(phone || config.whatsappPhone);
    return `https://wa.me/${recipient}?text=${encodeURIComponent(String(message || "").trim())}`;
  }

  function serviceMessageTemplate(serviceTitle) {
    return [
      `Namaste ${config.teacherName} ji,`,
      `I would like to book the \"${serviceTitle}\" service.`,
      "Please share available slots and next steps.",
      "Thank you."
    ].join("\n");
  }

  function courseMessageTemplate(courseTitle) {
    return [
      `Pranam ${config.teacherName} ji,`,
      `I want to register for the \"${courseTitle}\" course.`,
      "Please share batch details, prerequisites, and payment process.",
      "Thank you."
    ].join("\n");
  }

  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  function createHeader() {
    const headerRoot = document.querySelector("[data-site-header]");
    if (!headerRoot) {
      return;
    }

    const current = getTopRoute();
    const bookingUrl = createWhatsAppLink(serviceMessageTemplate("Consultation"));

    const desktopLinks = config.navLinks
      .map((link) => {
        const active = link.route === "" ? current === "" : current === link.route;
        return `<a href="${link.href}"${active ? ' class="is-active" aria-current="page"' : ""}>${link.label}</a>`;
      })
      .join("");

    const mobileLinks = config.navLinks
      .map((link) => {
        const active = link.route === "" ? current === "" : current === link.route;
        return `<a href="${link.href}"${active ? ' class="is-active" aria-current="page"' : ""}>${link.label}</a>`;
      })
      .join("");

    headerRoot.innerHTML = `
      <header class="site-header">
        <div class="top-strip">
          Consultations by appointment • WhatsApp response in ${config.responseWindowHours} hours
        </div>
        <div class="container">
          <div class="site-nav">
            <a href="" class="brand" aria-label="${escapeHtml(config.siteName)} homepage">
              <span class="brand-badge" aria-hidden="true">
                <svg class="brand-mark" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5.6 9.4 8.2 5.1 11 8.3h2l2.8-3.2 2.6 4.3-1.5 6.1L12 19.2 7.1 15.5 5.6 9.4Z"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linejoin="round"
                  />
                  <circle cx="10.1" cy="12.1" r="0.75" fill="currentColor" />
                  <circle cx="13.9" cy="12.1" r="0.75" fill="currentColor" />
                  <path d="M12 13.8 11.2 14.8h1.6L12 13.8Z" fill="currentColor" />
                  <path
                    d="M12 14.8v1.3m0 0c-.6 0-1.1-.2-1.5-.6m1.5.6c.6 0 1.1-.2 1.5-.6"
                    stroke="currentColor"
                    stroke-width="1.35"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span>
                <span class="brand-title">${escapeHtml(config.siteName)}</span>
                <span class="brand-sub">${escapeHtml(config.tagline)}</span>
              </span>
            </a>

            <nav class="nav-links" aria-label="Primary navigation">
              ${desktopLinks}
            </nav>

            <div class="nav-actions">
              <a class="btn btn-primary desktop-only" href="${bookingUrl}" target="_blank" rel="noreferrer">
                <i data-lucide="message-circle"></i>
                Book on WhatsApp
              </a>
              <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav-panel" data-menu-toggle>
                <i data-lucide="menu"></i>
                <span class="sr-only">Toggle mobile menu</span>
              </button>
            </div>
          </div>
        </div>

        <div class="mobile-panel" id="mobile-nav-panel" data-mobile-panel aria-hidden="true">
          <div class="container">
            <nav aria-label="Mobile navigation">
              ${mobileLinks}
              <a class="btn btn-primary" href="${bookingUrl}" target="_blank" rel="noreferrer">
                <i data-lucide="message-circle"></i>
                Book on WhatsApp
              </a>
            </nav>
          </div>
        </div>
      </header>
    `;

    const desktopOnly = headerRoot.querySelector(".desktop-only");
    if (desktopOnly instanceof HTMLElement && window.matchMedia("(max-width: 849px)").matches) {
      desktopOnly.style.display = "none";
    }

    setupMobileMenu();
    refreshIcons();
  }

  function setupMobileMenu() {
    const toggle = document.querySelector("[data-menu-toggle]");
    const panel = document.querySelector("[data-mobile-panel]");

    if (!(toggle instanceof HTMLButtonElement) || !(panel instanceof HTMLElement)) {
      return;
    }

    const icon = toggle.querySelector("i");
    let isOpen = false;

    function setOpen(nextState) {
      isOpen = nextState;
      toggle.setAttribute("aria-expanded", String(nextState));
      panel.setAttribute("aria-hidden", String(!nextState));

      if (nextState) {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
        panel.classList.add("is-open");
        if (icon) {
          icon.setAttribute("data-lucide", "x");
        }
      } else {
        panel.style.maxHeight = "0px";
        panel.classList.remove("is-open");
        if (icon) {
          icon.setAttribute("data-lucide", "menu");
        }
      }

      refreshIcons();
    }

    toggle.addEventListener("click", function () {
      setOpen(!isOpen);
    });

    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 850) {
        setOpen(false);
      }
    });
  }

  function createFooter() {
    const footerRoot = document.querySelector("[data-site-footer]");
    if (!footerRoot) {
      return;
    }

    footerRoot.innerHTML = `
      <footer class="footer">
        <div class="container footer-grid">
          <section>
            <h2 style="font-size:1.8rem; margin-bottom:10px;">${escapeHtml(config.siteName)}</h2>
            <p class="muted" style="max-width:380px;">
              Traditional Vedic astrology guidance with modern clarity. Sessions and learning programs are offered by appointment.
            </p>
            <p class="muted" style="margin-top:10px; font-size:0.78rem; max-width:420px;">
              Consultation outcomes are guidance-oriented and not a substitute for legal, medical, or financial advice.
            </p>
          </section>

          <section>
            <h4>Quick Links</h4>
            <div class="footer-links">
              ${config.navLinks.map((link) => `<a href="${link.href}">${link.label}</a>`).join("")}
            </div>
          </section>

          <section>
            <h4>Contact</h4>
            <div class="footer-contact muted">
              <span>${escapeHtml(config.city)}</span>
              <span>${escapeHtml(config.callNumber)}</span>
              <span>${escapeHtml(config.email)}</span>
              <span>${escapeHtml(config.officeHours)}</span>
            </div>
            <div class="social-row">
              ${config.social
                .map(
                  (item) => `<a href="${item.href}" target="_blank" rel="noreferrer">${escapeHtml(item.label)}</a>`
                )
                .join("")}
            </div>
          </section>
        </div>

        <div class="container copyright">
          © ${new Date().getFullYear()} ${escapeHtml(config.siteName)}. All rights reserved.
        </div>
      </footer>
    `;
  }

  function createMobileActions() {
    const mobileRoot = document.querySelector("[data-mobile-actions]");
    if (!mobileRoot) {
      return;
    }

    const bookingUrl = createWhatsAppLink(serviceMessageTemplate("Consultation"));
    const tel = `tel:${cleanPhone(config.callNumber)}`;
    const mail = `mailto:${config.email}`;

    mobileRoot.innerHTML = `
      <div class="mobile-actions">
        <div class="row">
          <a href="${bookingUrl}" target="_blank" rel="noreferrer"><i data-lucide="message-circle"></i>WhatsApp</a>
          <a href="${tel}"><i data-lucide="phone"></i>Call</a>
          <a href="${mail}"><i data-lucide="mail"></i>Email</a>
        </div>
      </div>
    `;

    refreshIcons();
  }

  function applySeoDefaults() {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!(canonical instanceof HTMLLinkElement)) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.href = window.location.href.split("#")[0].split("?")[0];

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl instanceof HTMLMetaElement) {
      ogUrl.content = canonical.href;
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage instanceof HTMLMetaElement && !ogImage.content) {
      ogImage.content = "og-default.png";
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage instanceof HTMLMetaElement && !twitterImage.content) {
      twitterImage.content = ogImage instanceof HTMLMetaElement && ogImage.content ? ogImage.content : "og-default.png";
    }

    if (!document.querySelector("script[data-schema='global']")) {
      const schema = [
        {
          "@context": "https://schema.org",
          "@type": "Person",
          name: config.teacherName,
          url: config.siteUrl,
          email: config.email,
          telephone: config.callNumber,
          jobTitle: "Vedic Astrologer and Teacher",
          knowsLanguage: config.languages
        },
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: config.siteName,
          image: "og-default.png",
          url: config.siteUrl,
          telephone: config.callNumber,
          email: config.email,
          address: {
            "@type": "PostalAddress",
            addressLocality: config.city,
            addressCountry: "IN"
          },
          openingHours: "Mo-Sa 10:00-19:00",
          priceRange: "₹₹"
        }
      ];

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.schema = "global";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }

  function setupRevealOnScroll() {
    const targets = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!targets.length) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      targets.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8%"
      }
    );

    targets.forEach((target, index) => {
      if (target instanceof HTMLElement) {
        target.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
      }
      observer.observe(target);
    });
  }

  function initHomeNavagraha() {
    if (document.body.dataset.page !== "home") {
      return;
    }

    const canvas = document.querySelector("[data-navagraha-canvas]");
    if (!(canvas instanceof HTMLCanvasElement)) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const planets = [
      { name: "Sun", orbit: 0.12, size: 5.2, speed: 0.00029, phase: 0.16, color: "#c68434" },
      { name: "Moon", orbit: 0.17, size: 4.5, speed: 0.00042, phase: 0.94, color: "#e0e3ea" },
      { name: "Mars", orbit: 0.22, size: 4.6, speed: 0.00026, phase: 1.66, color: "#b35a47" },
      { name: "Mercury", orbit: 0.27, size: 4.2, speed: 0.00038, phase: 2.31, color: "#4f7c57" },
      { name: "Jupiter", orbit: 0.32, size: 5.1, speed: 0.00022, phase: 3.03, color: "#bc9646" },
      { name: "Venus", orbit: 0.37, size: 4.6, speed: 0.0002, phase: 3.68, color: "#d8c2b3" },
      { name: "Saturn", orbit: 0.41, size: 4.9, speed: 0.00014, phase: 4.44, color: "#4c5a73" },
      { name: "Rahu", orbit: 0.45, size: 4.3, speed: 0.00011, phase: 5.1, color: "#6d647f" },
      { name: "Ketu", orbit: 0.48, size: 4.3, speed: 0.00009, phase: 5.84, color: "#8a5f4e" }
    ];

    let size = 0;
    let rafId = 0;
    let isVisible = true;
    let resizeTimer = 0;

    function setCanvasSize() {
      const rect = canvas.getBoundingClientRect();
      const nextSize = Math.max(220, Math.floor(Math.min(rect.width, rect.height)));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(nextSize * dpr);
      canvas.height = Math.floor(nextSize * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      size = nextSize;
    }

    function drawFrame(time) {
      if (!size) {
        return;
      }

      const t = time || 0;
      const c = size / 2;

      ctx.clearRect(0, 0, size, size);

      const glow = ctx.createRadialGradient(c, c, size * 0.06, c, c, size * 0.5);
      glow.addColorStop(0, "rgba(247, 232, 206, 0.62)");
      glow.addColorStop(1, "rgba(247, 232, 206, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);

      for (let i = 0; i < 18; i += 1) {
        const angle = i * 1.19;
        const radius = size * (0.14 + ((i * 17) % 100) / 330);
        const x = c + Math.cos(angle) * radius;
        const y = c + Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.arc(x, y, i % 4 === 0 ? 1.5 : 1.1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(183, 142, 77, 0.26)";
        ctx.fill();
      }

      ctx.save();
      ctx.translate(c, c);

      const sway = reduceMotion ? 0 : Math.sin(t * 0.00012) * 0.04;
      ctx.rotate(Math.PI / 4 + sway);
      const outerSquare = size * 0.48;
      ctx.strokeStyle = "rgba(122, 64, 59, 0.28)";
      ctx.lineWidth = 1.2;
      ctx.strokeRect(-outerSquare / 2, -outerSquare / 2, outerSquare, outerSquare);

      ctx.rotate(Math.PI / 4);
      const innerSquare = size * 0.3;
      ctx.strokeStyle = "rgba(31, 58, 48, 0.2)";
      ctx.strokeRect(-innerSquare / 2, -innerSquare / 2, innerSquare, innerSquare);

      ctx.restore();

      ctx.save();
      ctx.translate(c, c);

      for (let i = 1; i <= 4; i += 1) {
        const radius = size * (0.1 + i * 0.11);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0 ? "rgba(31, 58, 48, 0.16)" : "rgba(183, 142, 77, 0.22)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(-size * 0.35, 0);
      ctx.lineTo(size * 0.35, 0);
      ctx.moveTo(0, -size * 0.35);
      ctx.lineTo(0, size * 0.35);
      ctx.strokeStyle = "rgba(183, 142, 77, 0.22)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i < 12; i += 1) {
        const angle = (Math.PI * 2 * i) / 12;
        const x = Math.cos(angle) * size * 0.34;
        const y = Math.sin(angle) * size * 0.34;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "rgba(183, 142, 77, 0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      planets.forEach((planet, index) => {
        const orbitRadius = size * planet.orbit;
        const direction = index % 2 === 0 ? 1 : -1;
        const angle = direction * (reduceMotion ? planet.phase : t * planet.speed + planet.phase);
        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius;

        ctx.beginPath();
        ctx.arc(x, y, planet.size, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, planet.size * 2.2, 0, Math.PI * 2);
        const halo = ctx.createRadialGradient(x, y, planet.size * 0.4, x, y, planet.size * 2.2);
        halo.addColorStop(0, "rgba(255, 255, 255, 0.38)");
        halo.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = halo;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, planet.size + 2.8, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.58)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      ctx.beginPath();
      ctx.arc(0, 0, size * 0.06, 0, Math.PI * 2);
      const centerGlow = ctx.createRadialGradient(0, 0, size * 0.01, 0, 0, size * 0.07);
      centerGlow.addColorStop(0, "rgba(255, 251, 240, 0.95)");
      centerGlow.addColorStop(1, "rgba(183, 142, 77, 0.82)");
      ctx.fillStyle = centerGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, size * 0.015, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(31, 58, 48, 0.9)";
      ctx.fill();

      ctx.restore();
    }

    function render(time) {
      if (!isVisible) {
        rafId = 0;
        return;
      }

      drawFrame(time);
      rafId = window.requestAnimationFrame(render);
    }

    setCanvasSize();
    drawFrame(window.performance.now());

    if (!reduceMotion) {
      rafId = window.requestAnimationFrame(render);
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
            if (isVisible && !reduceMotion && rafId === 0) {
              rafId = window.requestAnimationFrame(render);
            }
          });
        },
        { threshold: 0.25 }
      );

      observer.observe(canvas);
    }

    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        setCanvasSize();
        drawFrame(window.performance.now());
      }, 120);
    });
  }

  async function fetchJson(path) {
    try {
      const response = await fetch(path, { headers: { Accept: "application/json" } });
      if (!response.ok) {
        throw new Error(`Failed to load ${path}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function parseCsv(csvText) {
    const rows = [];
    let current = "";
    let row = [];
    let inQuotes = false;

    for (let i = 0; i < csvText.length; i += 1) {
      const char = csvText[i];
      const next = csvText[i + 1];

      if (char === '"') {
        if (inQuotes && next === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }

      if (char === "," && !inQuotes) {
        row.push(current.trim());
        current = "";
        continue;
      }

      if ((char === "\n" || char === "\r") && !inQuotes) {
        if (char === "\r" && next === "\n") {
          i += 1;
        }

        if (current.length > 0 || row.length > 0) {
          row.push(current.trim());
          rows.push(row);
          row = [];
          current = "";
        }
        continue;
      }

      current += char;
    }

    if (current.length > 0 || row.length > 0) {
      row.push(current.trim());
      rows.push(row);
    }

    if (!rows.length) {
      return [];
    }

    const header = rows[0].map((value) => value.trim());
    return rows.slice(1).map((cells) => {
      const record = {};
      header.forEach((key, index) => {
        record[key] = (cells[index] || "").trim();
      });
      return record;
    });
  }

  async function fetchCsv(path) {
    try {
      const response = await fetch(path, { headers: { Accept: "text/csv" } });
      if (!response.ok) {
        throw new Error(`Failed to load ${path}`);
      }
      const text = await response.text();
      return parseCsv(text);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function parseBoolean(value) {
    const normalized = String(value || "").toLowerCase();
    return normalized === "true" || normalized === "yes" || normalized === "1";
  }

  async function fetchCoursesData() {
    const rows = await fetchCsv("data/courses.csv");
    return rows
      .map((row) => ({
        title: row.title || "",
        description: row.description || "",
        price: row.price || "",
        featured: parseBoolean(row.featured)
      }))
      .filter((row) => row.title || row.description || row.price);
  }

  async function fetchAboutTimelineData() {
    const rows = await fetchCsv("data/about_timeline.csv");
    return rows
      .map((row) => ({
        year: row.year || "",
        description: row.description || ""
      }))
      .filter((row) => row.year || row.description);
  }

  async function fetchCoursesPricingNoteData() {
    const rows = await fetchCsv("data/courses_pricing_note.csv");
    return rows
      .map((row) => ({
        note: row.note || ""
      }))
      .filter((row) => row.note);
  }

  async function fetchCoursesFlowData() {
    const rows = await fetchCsv("data/courses_flow.csv");
    return rows
      .map((row) => ({
        step: row.step || "",
        title: row.title || "",
        description: row.description || ""
      }))
      .filter((row) => row.step || row.title || row.description);
  }

  function renderAboutTimeline(rows) {
    const mount = document.querySelector("[data-about-timeline]");
    if (!(mount instanceof HTMLElement)) {
      return;
    }

    mount.innerHTML = rows
      .map(
        (item) => `
          <article class="card card-tight" data-reveal>
            <span class="year">${escapeHtml(item.year)}</span>
            <p class="muted">${escapeHtml(item.description)}</p>
          </article>
        `
      )
      .join("");
  }

  function renderCoursesPricingNote(rows) {
    const mount = document.querySelector("[data-courses-pricing-note]");
    if (!(mount instanceof HTMLElement)) {
      return;
    }

    if (!rows.length) {
      mount.hidden = true;
      mount.textContent = "";
      return;
    }

    mount.hidden = false;
    mount.textContent = rows[0].note || "";
  }

  function renderCoursesFlow(rows) {
    const mount = document.querySelector("[data-courses-flow]");
    if (!(mount instanceof HTMLElement)) {
      return;
    }

    mount.innerHTML = rows
      .map(
        (item) => `
          <article class="card card-pad" data-reveal>
            <p class="chip" style="width:fit-content; margin-bottom:10px;">${escapeHtml(item.step)}</p>
            <h3>${escapeHtml(item.title)}</h3>
            <p class="muted" style="margin-top:8px;">
              ${escapeHtml(item.description)}
            </p>
          </article>
        `
      )
      .join("");
  }

  function renderServiceCard(service) {
    return `
      <article class="card card-pad card-lift service-meta" data-service-card data-category="${escapeHtml(service.category)}" data-reveal>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
          <h3 style="margin:0;">${escapeHtml(service.title)}</h3>
          <span class="service-price">${escapeHtml(service.startingPrice)}</span>
        </div>

        <p class="muted">${escapeHtml(service.description)}</p>
      </article>
    `;
  }

  function renderCourseCard(course) {
    return `
      <article class="card card-pad card-lift course-meta" data-reveal>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
          <h3 style="margin:0;">${escapeHtml(course.title)}</h3>
          <span class="course-price">${escapeHtml(course.price)}</span>
        </div>

        <p class="muted">${escapeHtml(course.description)}</p>
      </article>
    `;
  }

  function renderToolCard(tool) {
    const statusClass = tool.status === "Live" ? "background:var(--primary-soft); color:var(--primary);" : "background:var(--accent-soft); color:var(--accent);";
    const tagList = (tool.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
    const actionLink = tool.link
      ? `<a class="btn btn-secondary tool-action" href="${escapeHtml(tool.link)}" target="_blank" rel="noreferrer"><i data-lucide="arrow-up-right"></i>Open tool</a>`
      : `<a class="btn btn-secondary tool-action" href="${createWhatsAppLink(`Namaste ${config.teacherName} ji, I would like access to the tool: ${tool.title}. Please share details.`)}" target="_blank" rel="noreferrer"><i data-lucide="message-circle"></i>Request access</a>`;

    return `
      <article class="card card-tight card-lift tool-card" data-tool-card data-category="${escapeHtml(tool.category)}" data-search-text="${escapeHtml(
        `${tool.title} ${tool.description} ${tool.category} ${(tool.tags || []).join(" ")}`.toLowerCase()
      )}" data-reveal>
        <div class="tool-head">
          <span class="chip">${escapeHtml(tool.category)}</span>
          <span class="tag" style="${statusClass}">${escapeHtml(tool.status)}</span>
        </div>

        <h3 class="tool-title">${escapeHtml(tool.title)}</h3>
        <p class="muted tool-copy">${escapeHtml(tool.description)}</p>

        <div class="tool-tags">
          ${tagList}
        </div>

        ${actionLink}
      </article>
    `;
  }

  function setupTestimonials(section) {
    if (!(section instanceof HTMLElement)) {
      return;
    }

    const track = section.querySelector("[data-slider-track]");
    const prev = section.querySelector("[data-slider-prev]");
    const next = section.querySelector("[data-slider-next]");

    if (!(track instanceof HTMLElement) || !(prev instanceof HTMLButtonElement) || !(next instanceof HTMLButtonElement)) {
      return;
    }

    const slide = function (direction) {
      const first = track.querySelector("article");
      if (!(first instanceof HTMLElement)) {
        return;
      }

      const amount = first.getBoundingClientRect().width + 14;
      track.scrollBy({ left: amount * direction, behavior: "smooth" });
    };

    prev.addEventListener("click", function () {
      slide(-1);
    });

    next.addEventListener("click", function () {
      slide(1);
    });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let timer = window.setInterval(function () {
        slide(1);
      }, 7000);

      section.addEventListener("mouseenter", function () {
        window.clearInterval(timer);
      });

      section.addEventListener("mouseleave", function () {
        timer = window.setInterval(function () {
          slide(1);
        }, 7000);
      });
    }
  }

  async function initHomePage() {
    if (document.body.dataset.page !== "home") {
      return;
    }

    const [services, courses, tools, testimonials] = await Promise.all([
      fetchJson("data/services.json"),
      fetchCoursesData(),
      fetchJson("data/tools.json"),
      fetchJson("data/testimonials.json")
    ]);

    const serviceMount = document.querySelector("#home-services");
    const courseMount = document.querySelector("#home-courses");
    const toolMount = document.querySelector("#home-tools");
    const testimonialsTrack = document.querySelector("#home-testimonials-track");

    if (serviceMount) {
      const featured = services.filter((item) => item.featured).slice(0, 4);
      serviceMount.innerHTML = featured.map((item) => renderServiceCard(item)).join("");
    }

    if (courseMount) {
      const featured = courses.filter((item) => item.featured).slice(0, 3);
      courseMount.innerHTML = featured.map((item) => renderCourseCard(item)).join("");
    }

    if (toolMount) {
      toolMount.innerHTML = tools.slice(0, 6).map((item) => renderToolCard(item)).join("");
    }

    if (testimonialsTrack) {
      testimonialsTrack.innerHTML = testimonials
        .map(
          (item) => `
            <article class="card card-pad slider-card" data-reveal>
              <p style="font-size:1.08rem; line-height:1.7;">“${escapeHtml(item.text)}”</p>
              <p class="muted" style="margin-top:14px; font-weight:600; font-size:0.86rem;">${escapeHtml(
                `${item.nameInitials} • ${item.city}`
              )}</p>
            </article>
          `
        )
        .join("");
    }

    setupTestimonials(document.querySelector("#home-testimonials"));
    setupRevealOnScroll();
    refreshIcons();
  }

  async function initServicesPage() {
    if (document.body.dataset.page !== "services") {
      return;
    }

    const services = await fetchJson("data/services.json");
    const grid = document.querySelector("#services-grid");
    const filters = document.querySelector("#services-filters");
    const empty = document.querySelector("#services-empty");

    if (!grid || !filters) {
      return;
    }

    grid.innerHTML = services.map((item) => renderServiceCard(item)).join("");

    const categories = ["All"].concat(
      Array.from(
        new Set(
          services
            .map((item) => item.category)
            .filter(Boolean)
            .sort((a, b) => String(a).localeCompare(String(b)))
        )
      )
    );

    filters.innerHTML = categories
      .map(
        (category, index) =>
          `<button class="pill-filter${index === 0 ? " is-active" : ""}" data-service-filter="${escapeHtml(category)}" type="button" aria-pressed="${
            index === 0 ? "true" : "false"
          }">${escapeHtml(category)}</button>`
      )
      .join("");

    const buttons = filters.querySelectorAll("[data-service-filter]");
    const cards = grid.querySelectorAll("[data-service-card]");

    const applyFilter = function (value) {
      let visible = 0;
      cards.forEach((card) => {
        if (!(card instanceof HTMLElement)) {
          return;
        }

        const category = card.dataset.category || "";
        const show = value === "All" || category === value;
        card.style.display = show ? "grid" : "none";
        if (show) {
          visible += 1;
        }
      });

      if (empty instanceof HTMLElement) {
        empty.classList.toggle("hidden", visible !== 0);
      }

      buttons.forEach((button) => {
        if (!(button instanceof HTMLButtonElement)) {
          return;
        }
        const active = button.dataset.serviceFilter === value;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        applyFilter(button.getAttribute("data-service-filter") || "All");
      });
    });

    setupRevealOnScroll();
    refreshIcons();
  }

  async function initCoursesPage() {
    if (document.body.dataset.page !== "courses") {
      return;
    }

    const [courses, pricingNotes, coursesFlow] = await Promise.all([
      fetchCoursesData(),
      fetchCoursesPricingNoteData(),
      fetchCoursesFlowData()
    ]);

    const grid = document.querySelector("#courses-grid");

    if (grid) {
      const featuredFirst = courses
        .filter((course) => course.featured)
        .concat(courses.filter((course) => !course.featured));
      grid.innerHTML = featuredFirst.map((course) => renderCourseCard(course)).join("");
    }

    renderCoursesPricingNote(pricingNotes);
    renderCoursesFlow(coursesFlow);

    setupRevealOnScroll();
    refreshIcons();
  }

  async function initAboutPage() {
    if (document.body.dataset.page !== "about") {
      return;
    }

    const timelineRows = await fetchAboutTimelineData();
    renderAboutTimeline(timelineRows);

    setupRevealOnScroll();
    refreshIcons();
  }

  async function initToolsPage() {
    if (document.body.dataset.page !== "tools") {
      return;
    }

    const tools = await fetchJson("data/tools.json");
    const grid = document.querySelector("#tools-grid");
    const filters = document.querySelector("#tools-filters");
    const search = document.querySelector("#tools-search");
    const empty = document.querySelector("#tools-empty");

    if (!(grid instanceof HTMLElement) || !(filters instanceof HTMLElement) || !(search instanceof HTMLInputElement)) {
      return;
    }

    grid.innerHTML = tools.map((tool) => renderToolCard(tool)).join("");

    const categories = ["All"].concat(
      Array.from(
        new Set(
          tools
            .map((item) => item.category)
            .filter(Boolean)
            .sort((a, b) => String(a).localeCompare(String(b)))
        )
      )
    );

    filters.innerHTML = categories
      .map(
        (category, index) =>
          `<button class="pill-filter${index === 0 ? " is-active" : ""}" data-tool-filter="${escapeHtml(category)}" type="button" aria-pressed="${
            index === 0 ? "true" : "false"
          }">${escapeHtml(category)}</button>`
      )
      .join("");

    let activeCategory = "All";

    const applyFilters = function () {
      const query = search.value.trim().toLowerCase();
      let visible = 0;

      grid.querySelectorAll("[data-tool-card]").forEach((card) => {
        if (!(card instanceof HTMLElement)) {
          return;
        }

        const category = card.dataset.category || "";
        const text = card.dataset.searchText || "";
        const categoryMatch = activeCategory === "All" || category === activeCategory;
        const searchMatch = !query || text.includes(query);
        const show = categoryMatch && searchMatch;

        card.style.display = show ? "grid" : "none";

        if (show) {
          visible += 1;
        }
      });

      if (empty instanceof HTMLElement) {
        empty.classList.toggle("hidden", visible !== 0);
      }
    };

    filters.querySelectorAll("[data-tool-filter]").forEach((button) => {
      button.addEventListener("click", function () {
        activeCategory = button.getAttribute("data-tool-filter") || "All";

        filters.querySelectorAll("[data-tool-filter]").forEach((peer) => {
          const active = peer.getAttribute("data-tool-filter") === activeCategory;
          peer.classList.toggle("is-active", active);
          peer.setAttribute("aria-pressed", String(active));
        });

        applyFilters();
      });
    });

    search.addEventListener("input", applyFilters);

    applyFilters();
    setupRevealOnScroll();
    refreshIcons();
  }

  function initContactPage() {
    if (document.body.dataset.page !== "contact") {
      return;
    }

    document.querySelectorAll("[data-bind='call-number']").forEach((el) => {
      el.textContent = config.callNumber;
    });

    document.querySelectorAll("[data-bind='email']").forEach((el) => {
      el.textContent = config.email;
    });

    document.querySelectorAll("[data-bind='city']").forEach((el) => {
      el.textContent = config.city;
    });

    document.querySelectorAll("[data-bind='hours']").forEach((el) => {
      el.textContent = config.officeHours;
    });

    const waPrimary = document.querySelector("[data-contact-wa]");
    if (waPrimary instanceof HTMLAnchorElement) {
      waPrimary.href = createWhatsAppLink(serviceMessageTemplate("Consultation"));
    }

    const callLink = document.querySelector("[data-contact-call]");
    if (callLink instanceof HTMLAnchorElement) {
      callLink.href = `tel:${cleanPhone(config.callNumber)}`;
    }

    const mailLink = document.querySelector("[data-contact-mail]");
    if (mailLink instanceof HTMLAnchorElement) {
      mailLink.href = `mailto:${config.email}`;
    }

    const form = document.querySelector("#contact-form");
    const feedback = document.querySelector("#contact-feedback");

    if (form instanceof HTMLFormElement && feedback instanceof HTMLElement) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const name = String(formData.get("name") || "").trim();
        const reason = String(formData.get("reason") || "").trim();
        const preferredTime = String(formData.get("preferredTime") || "").trim();
        const notes = String(formData.get("notes") || "").trim();

        if (!name || !reason || !preferredTime) {
          feedback.textContent = "Please fill name, reason, and preferred time before submitting.";
          feedback.classList.add("error-text");
          return;
        }

        const lines = [
          `Namaste ${config.teacherName} ji,`,
          `My name is ${name}.`,
          `Reason: ${reason}`,
          `Preferred time: ${preferredTime}`
        ];

        if (notes) {
          lines.push(`Notes: ${notes}`);
        }

        lines.push("Please guide me on the next step. Thank you.");

        feedback.textContent = "Opening WhatsApp in a new tab...";
        feedback.classList.remove("error-text");

        window.open(createWhatsAppLink(lines.join("\n")), "_blank", "noopener,noreferrer");
      });
    }

    setupRevealOnScroll();
    refreshIcons();
  }

  function initGlobalBindings() {
    document.querySelectorAll("[data-bind='teacher-name']").forEach((el) => {
      el.textContent = config.teacherName;
    });

    document.querySelectorAll("[data-bind='site-name']").forEach((el) => {
      el.textContent = config.siteName;
    });

    document.querySelectorAll("[data-bind='years-experience']").forEach((el) => {
      el.textContent = String(config.yearsExperience);
    });

    document.querySelectorAll("[data-bind='languages']").forEach((el) => {
      el.textContent = config.languages.join(" • ");
    });

    document.querySelectorAll("[data-bind='response-hours']").forEach((el) => {
      el.textContent = String(config.responseWindowHours);
    });

    document.querySelectorAll("[data-wa-consultation]").forEach((el) => {
      if (el instanceof HTMLAnchorElement) {
        el.href = createWhatsAppLink(serviceMessageTemplate("Consultation"));
      }
    });
  }

  function init() {
    createHeader();
    createFooter();
    createMobileActions();
    applySeoDefaults();
    initGlobalBindings();
    initHomeNavagraha();
    Promise.all([
      initHomePage(),
      initServicesPage(),
      initCoursesPage(),
      initAboutPage(),
      initToolsPage(),
      initContactPage()
    ]).finally(function () {
      setupRevealOnScroll();
      refreshIcons();
    });
  }

  window.AstrofoxxSite = {
    config,
    createWhatsAppLink,
    serviceMessageTemplate,
    courseMessageTemplate,
    normalizePath,
    getTopRoute,
    formatDate,
    fetchJson,
    fetchCsv
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
