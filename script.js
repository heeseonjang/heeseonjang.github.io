const projectOrder = ["project-1", "project-2", "project-3"];

const indexView = document.querySelector(".index-view");
const infoView = document.querySelector(".info-view");
const detailView = document.querySelector(".detail-view");
const detailTrack = document.querySelector(".detail-track");
const projectCards = document.querySelectorAll("[data-open-project]");
const projectMenuItems = document.querySelectorAll("[data-project-target]");
const backButton = document.querySelector("[data-back-to-grid]");
const homeButtons = document.querySelectorAll("[data-go-home]");
const infoButton = document.querySelector("[data-open-info]");
const clock = document.querySelector("[data-clock]");
const galleryImages = document.querySelectorAll(".gallery-card img");
const customCursor = document.querySelector(".custom-cursor");

let currentIndex = 0;

function showView(viewName) {
  indexView.classList.toggle("is-active", viewName === "index");
  infoView.classList.toggle("is-active", viewName === "info");
  detailView.classList.toggle("is-active", viewName === "detail");
}

function setActiveMenu(projectId) {
  projectMenuItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.projectTarget === projectId);
  });
}

function moveTrack(index) {
  detailTrack.style.transform = `translateX(-${index * 33.3333}%)`;
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
  showView("index");
}

function openInfo() {
  showView("info");
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
  card.addEventListener("click", () => openProject(card.dataset.openProject));
});

projectMenuItems.forEach((item) => {
  item.addEventListener("click", () => openProject(item.dataset.projectTarget));
});

backButton.addEventListener("click", closeProject);
infoButton.addEventListener("click", openInfo);
homeButtons.forEach((button) => {
  button.addEventListener("click", closeProject);
});

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

setActiveMenu(projectOrder[0]);
showView("index");
updateClock();
window.setInterval(updateClock, 1000);
