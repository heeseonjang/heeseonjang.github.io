const projectOrder = ["project-1", "project-2", "project-3"];

const indexView = document.querySelector(".index-view");
const infoView = document.querySelector(".info-view");
const detailView = document.querySelector(".detail-view");
const detailTrack = document.querySelector(".detail-track");
const detailPanels = document.querySelectorAll(".detail-panel");
const projectCards = document.querySelectorAll("[data-open-project]");
const projectMenuItems = document.querySelectorAll("[data-project-target]");
const backButton = document.querySelector("[data-back-to-grid]");
const homeButtons = document.querySelectorAll("[data-go-home]");
const infoButton = document.querySelector("[data-open-info]");
const infoNavButton = document.querySelector("[data-nav-info]");
const menuToggleButton = document.querySelector("[data-menu-toggle]");
const sidebar = document.querySelector(".sidebar");
const clock = document.querySelector("[data-clock]");
const galleryImages = document.querySelectorAll(".gallery-card img");
const customCursor = document.querySelector(".custom-cursor");

let currentIndex = 0;

function showView(viewName) {
  indexView.classList.toggle("is-active", viewName === "index");
  infoView.classList.toggle("is-active", viewName === "info");
  detailView.classList.toggle("is-active", viewName === "detail");
  if (infoNavButton) {
    infoNavButton.classList.toggle("is-active", viewName === "info");
  }
}

function setActiveMenu(projectId) {
  projectMenuItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.projectTarget === projectId);
  });
}

function moveTrack(index) {
  const projectId = projectOrder[index];

  detailPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.projectId === projectId);
  });
}

function openProject(projectId) {
  const nextIndex = projectOrder.indexOf(projectId);

  if (nextIndex === -1) return;

  currentIndex = nextIndex;
  setActiveMenu(projectId);
  moveTrack(currentIndex);
  showView("detail");
}

function closeProject() {
  setActiveMenu("");
  detailPanels.forEach((panel) => {
    panel.classList.remove("is-active");
  });
  showView("index");
}

function openInfo() {
  setActiveMenu("");
  showView("info");
}

function closeMobileMenu() {
  if (!sidebar || !menuToggleButton) return;

  sidebar.classList.remove("is-menu-open");
  menuToggleButton.setAttribute("aria-expanded", "false");
}

function toggleMobileMenu() {
  if (!sidebar || !menuToggleButton) return;

  const isOpen = sidebar.classList.toggle("is-menu-open");
  menuToggleButton.setAttribute("aria-expanded", String(isOpen));
}

function updateClock() {
  if (!clock) return;

  const time = new Date().toLocaleTimeString("en-GB", {
    hour12: false,
    timeZone: "Asia/Seoul",
  });

  clock.textContent = time;
}

function moveCursor(event) {
  if (!customCursor || window.innerWidth <= 820) return;

  customCursor.style.opacity = "1";
  customCursor.style.transform = `translate3d(${event.clientX + 8}px, ${event.clientY + 8}px, 0)`;
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    closeMobileMenu();
    openProject(card.dataset.openProject);
  });
});

projectMenuItems.forEach((item) => {
  item.addEventListener("click", () => {
    closeMobileMenu();
    openProject(item.dataset.projectTarget);
  });
});

backButton.addEventListener("click", closeProject);
infoButton.addEventListener("click", () => {
  closeMobileMenu();
  openInfo();
});
homeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeMobileMenu();
    closeProject();
  });
});

if (menuToggleButton) {
  menuToggleButton.addEventListener("click", toggleMobileMenu);
}

galleryImages.forEach((image) => {
  image.addEventListener("error", () => {
    const fallback = document.createElement("div");
    fallback.className = "gallery-fallback";
    fallback.innerHTML = `<span>${image.getAttribute("alt")}</span>`;
    image.replaceWith(fallback);
  });
});

window.addEventListener("mousemove", moveCursor);
window.addEventListener("mouseleave", () => {
  if (!customCursor) return;
  customCursor.style.opacity = "0";
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 820) {
    closeMobileMenu();
  }
});

setActiveMenu("");
showView("index");
updateClock();
window.setInterval(updateClock, 1000);
