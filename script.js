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
      const titleEl =
        card.querySelector(".card-heading") || card.querySelector("h3");
      const descEl =
        card.querySelector(".card-summary") || card.querySelector("p");
      const titleText = titleEl ? titleEl.textContent.toLowerCase() : "";
      const descText = descEl ? descEl.textContent.toLowerCase() : "";
      const category = card.dataset.category || "";

      const matchesSearch =
        query === "" || titleText.includes(query) || descText.includes(query);
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
    // Prevent opening modal when clicking on the direct order button
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
        document.body.style.overflow = "hidden";
      }
    });
  });

  function dismissModal() {
    if (modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  }

  if (modalDismiss) modalDismiss.addEventListener("click", dismissModal);
  if (modalScrim) modalScrim.addEventListener("click", dismissModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") dismissModal();
  });
});
