/* ========================================================================
   NEGINBOX - SCRIPTS & INTERACTION LOGIC
   Features: Sticky Navigation, Mobile Menu, Filter & Search, Modal Quick-View
   ======================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 25) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  });

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-item");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      navMenu.classList.toggle("show");
    });
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("open");
        navMenu.classList.remove("show");
      });
    });
  }

  const filterPills = document.querySelectorAll(".filter-pill");
  const productCards = document.querySelectorAll(".product-card");
  const searchInput = document.querySelector("#productSearch");
  const noResultsMessage = document.getElementById("noResultsMessage");
  const resetSearchBtn = document.getElementById("resetSearchBtn");

  function filterCatalog() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const activeFilterEl = document.querySelector(".filter-pill.active");
    const activeFilter = activeFilterEl ? activeFilterEl.dataset.filter : "all";
    let matchCount = 0;

    productCards.forEach((card) => {
      const cardText = card.textContent.toLowerCase();
      const category = card.dataset.category || "";
      const matchesSearch = query === "" || cardText.includes(query);
      const matchesCategory = activeFilter === "all" || category === activeFilter;

      if (matchesSearch && matchesCategory) {
        card.style.display = "flex";
        matchCount++;
      } else card.style.display = "none";
    });

    if (noResultsMessage) noResultsMessage.style.display = matchCount === 0 ? "block" : "none";
  }

  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      filterCatalog();
    });
  });

  if (searchInput) searchInput.addEventListener("input", filterCatalog);

  if (resetSearchBtn) {
    resetSearchBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      const allFilterPill = document.querySelector('.filter-pill[data-filter="all"]');
      if (allFilterPill) {
        filterPills.forEach((p) => p.classList.remove("active"));
        allFilterPill.classList.add("active");
      }
      filterCatalog();
    });
  }

  const modal = document.getElementById("productModal");
  const modalDismiss = document.querySelector(".modal-dismiss");
  const modalScrim = document.querySelector(".modal-scrim");
  const modalImage = document.querySelector(".modal-image");
  const modalTitle = document.querySelector(".modal-title");
  const modalDescription = document.querySelector(".modal-description");
  const modalWhatsapp = document.querySelector(".modal-whatsapp");

  productCards.forEach((card) => {
    const directCta = card.querySelector(".card-cta-btn");
    if (directCta) directCta.addEventListener("click", (e) => e.stopPropagation());

    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const title = card.querySelector(".card-heading") || card.querySelector("h3");
      const desc = card.querySelector(".card-summary") || card.querySelector("p");

      if (modalImage && img) {
        modalImage.src = img.src;
        modalImage.alt = title ? title.textContent : "تخت خواب نگین‌باکس";
      }
      if (modalTitle && title) modalTitle.textContent = title.textContent;
      if (modalDescription && desc) modalDescription.textContent = desc.textContent;

      if (modalWhatsapp && title) {
        const prodName = title.textContent.trim();
        const msg = `سلام، درباره ${prodName} نگین‌باکس مایل به دریافت مشاوره و استعلام قیمت هستم.`;
        modalWhatsapp.href = "https://wa.me/989123261810?text=" + encodeURIComponent(msg);
      }

      if (modal) {
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
    });
  });

  function dismissModal() {
    if (modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  if (modalDismiss) modalDismiss.addEventListener("click", dismissModal);
  if (modalScrim) modalScrim.addEventListener("click", dismissModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") dismissModal();
  });

  const telegramIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M21.8 3.3 18.7 20c-.2 1.2-.9 1.5-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.2L6.1 13.6l-5-1.6c-1.1-.3-1.1-1 .2-1.5L20.8 3c.8-.3 1.5.2 1 1.3Z" />
    </svg>`;

  const baleIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 2.2c-5.5 0-9.9 4-9.9 9 0 3 1.7 5.7 4.4 7.3v2.4c0 .6.6 1 1.1.7l2.2-1.1c.7.1 1.4.2 2.2.2 5.5 0 9.9-4 9.9-9s-4.4-9.5-9.9-9.5Zm-3.5 9.2c.5-.6 1.1-1.1 1.8-1.5  .6-.3 1.3-.5 1.9-.5.8 0 1.5.2 2.1.5.7.4 1.3.9 1.8 1.5.2.3.2.6-.1.8-.3.2-.6.2-.8-.1-.4-.5-.8-.8-1.3-1.1-.5-.3-1.1-.4-1.7-.4s-1.1.1-1.6.4c-.5.3-1 .6-1.3 1.1-.2.3-.5.3-.8.1-.2-.2-.2-.5 0-.8Zm7.1 3.4c-.2.2-.5.2-.8 0-.8-.7-1.7-1.1-2.8-1.1s-2 .4-2.8 1.1c-.3.2-.6.2-.8 0-.2-.3-.2-.6.1-.8 1-.9 2.2-1.4 3.5-1.4s2.5.5 3.5 1.4c.3.2.3.5.1.8Z" />
    </svg>`;

  const createIconLink = ({ href, icon, label, ariaLabel, className }) => {
    const link = document.createElement("a");
    link.href = href;
    link.className = className;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", ariaLabel);
    link.title = label;
    link.innerHTML = icon;
    return link;
  };

  const socialWrapper = document.querySelector(".social-wrapper");
  if (socialWrapper) {
    const contactLinks = [
      { href: "https://t.me/aliamiri4020", icon: telegramIcon, label: "تلگرام", ariaLabel: "پیام در تلگرام نگین‌باکس", color: "#229ED9" },
      { href: "https://ble.ir/+989123261810", icon: baleIcon, label: "بله", ariaLabel: "پیام در بله نگین‌باکس", color: "#79D99A" },
    ];

    contactLinks.forEach((item) => {
      const link = createIconLink({ ...item, className: "instagram-btn" });
      link.style.color = item.color;
      link.style.display = "inline-flex";
      link.style.alignItems = "center";
      link.style.gap = "8px";

      const svg = link.querySelector("svg");
      if (svg) {
        svg.style.width = "20px";
        svg.style.height = "20px";
        svg.style.display = "block";
        svg.style.flexShrink = "0";
      }

      const text = document.createElement("span");
      text.textContent = item.label;
      link.appendChild(text);
      socialWrapper.appendChild(link);
    });
  }

  const navCtaGroup = document.querySelector(".nav-cta-group");
  if (navCtaGroup) {
    const navSocialLinks = [
      { href: "https://t.me/aliamiri4020", icon: telegramIcon, label: "تلگرام", ariaLabel: "پیام در تلگرام", color: "#229ED9" },
      { href: "https://ble.ir/+989123261810", icon: baleIcon, label: "بله", ariaLabel: "پیام در بله", color: "#79D99A" },
    ];

    navSocialLinks.forEach((item) => {
      const link = createIconLink({ ...item, className: "btn-pill-dark nav-social-link" });
      link.style.color = item.color;
      link.style.display = window.matchMedia("(max-width: 768px)").matches ? "none" : "inline-flex";
      link.style.alignItems = "center";
      link.style.gap = "7px";

      const svg = link.querySelector("svg");
      if (svg) {
        svg.style.width = "16px";
        svg.style.height = "16px";
        svg.style.display = "block";
        svg.style.flexShrink = "0";
      }

      const text = document.createElement("span");
      text.textContent = item.label;
      link.appendChild(text);
      navCtaGroup.insertBefore(link, menuToggle || null);
    });
  }

  const floatingWhatsapp = document.querySelector(".floating-whatsapp");
  if (floatingWhatsapp) {
    const floatingGroup = document.createElement("div");
    floatingGroup.style.position = "fixed";
    floatingGroup.style.right = "24px";
    floatingGroup.style.bottom = "24px";
    floatingGroup.style.zIndex = "1000";
    floatingGroup.style.display = "flex";
    floatingGroup.style.flexDirection = "column";
    floatingGroup.style.gap = "10px";
    floatingGroup.style.alignItems = "center";

    const floatingLinks = [
      { href: "https://t.me/aliamiri4020", icon: telegramIcon, label: "تلگرام", title: "پیام در تلگرام", color: "#229ED9" },
      { href: "https://ble.ir/+989123261810", icon: baleIcon, label: "بله", title: "پیام در بله", color: "#79D99A" },
    ];

    floatingWhatsapp.parentNode.insertBefore(floatingGroup, floatingWhatsapp);
    floatingGroup.appendChild(floatingWhatsapp);

    floatingLinks.forEach(({ href, icon, label, title, color }) => {
      const link = createIconLink({ href, icon, label, ariaLabel: title, className: "floating-contact-icon" });
      link.style.width = "58px";
      link.style.height = "58px";
      link.style.borderRadius = "50%";
      link.style.background = color;
      link.style.color = "#ffffff";
      link.style.display = "flex";
      link.style.alignItems = "center";
      link.style.justifyContent = "center";
      link.style.boxShadow = "var(--shadow-float)";
      link.style.transition = "var(--ease-studio)";

      const svg = link.querySelector("svg");
      if (svg) {
        svg.style.width = "29px";
        svg.style.height = "29px";
        svg.style.display = "block";
      }

      link.addEventListener("mouseenter", () => {
        link.style.filter = "brightness(0.92)";
        link.style.transform = "translateY(-3px)";
      });
      link.addEventListener("mouseleave", () => {
        link.style.filter = "none";
        link.style.transform = "translateY(0)";
      });
      floatingGroup.appendChild(link);
    });
  }

  // Reviews Category Filtering
  const reviewTabs = document.querySelectorAll(".review-tab-btn");
  const reviewCards = document.querySelectorAll(".review-card");

  if (reviewTabs.length > 0 && reviewCards.length > 0) {
    reviewTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        reviewTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const filter = tab.dataset.reviewFilter || "all";

        reviewCards.forEach((card) => {
          const category = card.dataset.reviewCategory || "";
          if (filter === "all" || category === filter) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }
});
