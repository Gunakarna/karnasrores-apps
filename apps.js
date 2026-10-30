const searchInput = document.getElementById("appSearch");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const appCards = [...document.querySelectorAll(".app-card")];
const resultsCount = document.getElementById("resultsCount");
const appCount = document.getElementById("appCount");
const emptyState = document.getElementById("emptyState");
const resetSearch = document.getElementById("resetSearch");
let activeFilter = "all";

function filterApps() {
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;

  appCards.forEach((card) => {
    const matchesText = card.textContent.toLowerCase().includes(term);
    const matchesCategory =
      activeFilter === "all" || card.dataset.category === activeFilter;
    const show = matchesText && matchesCategory;
    card.hidden = !show;
    if (show) visible += 1;
  });

  resultsCount.textContent = `${visible} ${visible === 1 ? "app" : "apps"}`;
  emptyState.hidden = visible !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    filterApps();
  });
});

searchInput.addEventListener("input", filterApps);

resetSearch.addEventListener("click", () => {
  searchInput.value = "";
  activeFilter = "all";
  filterButtons.forEach((button) => {
    const active = button.dataset.filter === "all";
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  filterApps();
  searchInput.focus();
});

document.addEventListener("keydown", (event) => {
  const tag = document.activeElement?.tagName;
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(tag)) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = "";
    filterApps();
    searchInput.blur();
  }
});

appCount.textContent = appCards.length;
document.getElementById("currentYear").textContent = new Date().getFullYear();
filterApps();
