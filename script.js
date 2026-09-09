/* ==========================================================================
   NEGINBOX - SCRIPTS & INTERACTION LOGIC
   Features: Sticky Navigation, Mobile Menu, Filter & Search, Modal Quick-View
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Sticky Navigation Blur Effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 25) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. Mobile Drawer Navigation
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

  // 3. Category Filter & Search
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
      const matchesCategory =
        activeFilter === "all" || category === activeFilter;

      if (matchesSearch && matchesCategory) {
        card.style.display = "flex";
        matchCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (noResultsMessage) {
      noResultsMessage.style.display = matchCount === 0 ? "block" : "none";
    }
  }

  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      filterCatalog();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", filterCatalog);
  }

  if (resetSearchBtn) {
    resetSearchBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      const allFilterPill = document.querySelector(
        '.filter-pill[data-filter="all"]',
      );
      if (allFilterPill) {
        filterPills.forEach((p) => p.classList.remove("active"));
        allFilterPill.classList.add("active");
      }
      filterCatalog();
    });
  }

  // 4. Modal Quick-View Interaction
  const modal = document.getElementById("productModal");
  const modalDismiss = document.querySelector(".modal-dismiss");
  const modalScrim = document.querySelector(".modal-scrim");
  const modalImage = document.querySelector(".modal-image");
  const modalTitle = document.querySelector(".modal-title");
  const modalDescription = document.querySelector(".modal-description");
  const modalWhatsapp = document.querySelector(".modal-whatsapp");

  productCards.forEach((card) => {
    const directCta = card.querySelector(".card-cta-btn");
    if (directCta) {
      directCta.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const title =
        card.querySelector(".card-heading") || card.querySelector("h3");
      const desc =
        card.querySelector(".card-summary") || card.querySelector("p");

      if (modalImage && img) {
        modalImage.src = img.src;
        modalImage.alt = title ? title.textContent : "تخت خواب نگین‌باکس";
      }

      if (modalTitle && title) {
        modalTitle.textContent = title.textContent;
      }

      if (modalDescription && desc) {
        modalDescription.textContent = desc.textContent;
      }

      if (modalWhatsapp && title) {
        const prodName = title.textContent.trim();
        const msg = `سلام، درباره ${prodName} نگین‌باکس مایل به دریافت مشاوره و استعلام قیمت هستم.`;
        modalWhatsapp.href =
          "https://wa.me/989123261810?text=" + encodeURIComponent(msg);
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

  // 5. Telegram & Bale Contact Links
  const socialWrapper = document.querySelector(".social-wrapper");

  if (socialWrapper) {
    const contactLinks = [
      {
        href: "https://t.me/aliamiri4020",
        label: "تلگرام: @aliamiri4020",
        ariaLabel: "پیام در تلگرام نگین‌باکس",
      },
      {
        href: "https://ble.ir/+989123261810",
        label: "بله: ۰۹۱۲۳۲۶۱۸۱۰",
        ariaLabel: "پیام در بله نگین‌باکس",
      },
    ];

    contactLinks.forEach(({ href, label, ariaLabel }) => {
      const link = document.createElement("a");
      link.href = href;
      link.className = "instagram-btn";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", ariaLabel);
      link.innerHTML = `<span>${label}</span>`;
      socialWrapper.appendChild(link);
    });
  }

  // 6. Add Telegram & Bale to Navbar
  const navCtaGroup = document.querySelector(".nav-cta-group");

  if (navCtaGroup) {
    const navSocialLinks = [
      {
        href: "https://t.me/aliamiri4020",
        label: "تلگرام",
        ariaLabel: "پیام در تلگرام",
      },
      {
        href: "https://ble.ir/+989123261810",
        label: "بله",
        ariaLabel: "پیام در بله",
      },
    ];

    navSocialLinks.forEach(({ href, label, ariaLabel }) => {
      const link = document.createElement("a");
      link.href = href;
      link.className = "btn-pill-dark";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", ariaLabel);
      link.innerHTML = `<span>${label}</span>`;
      navCtaGroup.insertBefore(link, menuToggle || null);
    });
  }

  // 7. Add Telegram & Bale beside the floating WhatsApp button
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
      {
        href: "https://t.me/aliamiri4020",
        label: "تلگرام",
        title: "پیام در تلگرام",
      },
      {
        href: "https://ble.ir/+989123261810",
        label: "بله",
        title: "پیام در بله",
      },
    ];

    floatingWhatsapp.parentNode.insertBefore(floatingGroup, floatingWhatsapp);
    floatingGroup.appendChild(floatingWhatsapp);

    floatingLinks.forEach(({ href, label, title }) => {
      const link = document.createElement("a");
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.title = title;
      link.setAttribute("aria-label", title);
      link.textContent = label;
      link.style.width = "58px";
      link.style.height = "58px";
      link.style.borderRadius = "50%";
      link.style.background = "var(--ink)";
      link.style.color = "#ffffff";
      link.style.display = "flex";
      link.style.alignItems = "center";
      link.style.justifyContent = "center";
      link.style.fontSize = "0.72rem";
      link.style.fontWeight = "700";
      link.style.boxShadow = "var(--shadow-float)";
      link.style.transition = "var(--ease-studio)";
      link.addEventListener("mouseenter", () => {
        link.style.background = "var(--bronze)";
        link.style.transform = "translateY(-3px)";
      });
      link.addEventListener("mouseleave", () => {
        link.style.background = "var(--ink)";
        link.style.transform = "translateY(0)";
      });
      floatingGroup.appendChild(link);
    });
  }
});
