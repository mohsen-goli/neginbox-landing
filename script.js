const heroButton = document.querySelector(".hero-button");
const productsSection = document.querySelector("#products");

heroButton.addEventListener("click", function (event) {
  event.preventDefault();

  productsSection.scrollIntoView({
    behavior: "smooth",
  });
});
const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (button) {
      button.classList.remove("active");
    });

    button.classList.add("active");

    filterProducts();
  });
});

const searchInput = document.querySelector("#productSearch");

searchInput.addEventListener("input", function () {
  filterProducts();
});

function filterProducts() {
  const searchText = searchInput.value.toLowerCase();
  const activeFilter = document.querySelector(".filter-button.active").dataset
    .filter;

  productCards.forEach(function (card) {
    const productName = card.querySelector("h3").textContent.toLowerCase();
    const category = card.dataset.category;

    const matchesSearch = productName.includes(searchText);
    const matchesFilter = activeFilter === "all" || category === activeFilter;

    if (matchesSearch && matchesFilter) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
const modal = document.querySelector(".product-modal");
const modalClose = document.querySelector(".modal-close");
const modalImage = document.querySelector(".modal-image");
const modalTitle = document.querySelector(".modal-title");
const modalDescription = document.querySelector(".modal-description");
const modalWhatsapp = document.querySelector(".modal-whatsapp");
productCards.forEach(function (card) {
  card.addEventListener("click", function () {
    const image = card.querySelector("img");
    const title = card.querySelector("h3");
    const description = card.querySelector("p");

    modalImage.src = image.src;
    modalImage.alt = title.textContent;

    modalTitle.textContent = title.textContent;
    modalDescription.textContent = description.textContent;
    const productName = title.textContent;

    const whatsappMessage =
      "سلام، درباره " + productName + " تخت باکس نگین‌باکس مشاوره می‌خواستم.";

    modalWhatsapp.href =
      "https://wa.me/989123261810?text=" + encodeURIComponent(whatsappMessage);
    modal.classList.add("show");
  });
});
modalClose.addEventListener("click", function () {
  modal.classList.remove("show");
});
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modal.classList.remove("show");
  }
});
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".navbar nav");

menuButton.addEventListener("click", function () {
  nav.classList.toggle("show");
});
const navLinks = document.querySelectorAll(".navbar nav a");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    nav.classList.remove("show");
  });
});
