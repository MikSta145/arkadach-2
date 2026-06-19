const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".header nav");
const navLinks = [...document.querySelectorAll(".header nav a")];

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

const filters = [...document.querySelectorAll(".filter")];
const cards = [...document.querySelectorAll(".catalog-card")];
const search = document.getElementById("search");
const emptyState = document.querySelector(".empty-state");
let group = "all";

function applyFilters() {
  const query = (search?.value || "").trim().toLowerCase();
  let visibleCards = 0;

  cards.forEach((card) => {
    const matchesGroup = group === "all" || card.dataset.group === group;
    const matchesSearch = !query || `${card.textContent} ${card.dataset.name}`.toLowerCase().includes(query);
    const isVisible = matchesGroup && matchesSearch;

    card.classList.toggle("hidden", !isVisible);
    if (isVisible) visibleCards += 1;
  });

  if (emptyState) emptyState.hidden = visibleCards > 0;
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    group = button.dataset.group;
    applyFilters();
  });
});

if (search) {
  search.addEventListener("input", applyFilters);
}

const observedTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  observedTargets.forEach((target) => observer.observe(target));
}

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");

    if (status) {
      status.textContent = "Dziękujemy. Zapytanie jest gotowe do podpięcia pod e-mail na hostingu.";
    }
  });
});
