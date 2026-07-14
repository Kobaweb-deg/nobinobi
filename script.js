const root = document.documentElement;
const reveals = document.querySelectorAll(".reveal");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateScrollEffects() {
  const y = window.scrollY;
  const heroProgress = clamp(y / 650, 0, 1);
  root.style.setProperty("--hero-blur", `${heroProgress * 6}px`);
  root.style.setProperty("--hero-opacity", `${1 - heroProgress * .35}`);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: .22 });

reveals.forEach((el) => observer.observe(el));

const menuButton = document.querySelector(".down-caret");
const menuMore = document.querySelector("#menu-more");

menuButton?.addEventListener("click", () => {
  const shouldOpen = menuMore?.hasAttribute("hidden");
  if (!menuMore) return;
  if (shouldOpen) {
    menuMore.removeAttribute("hidden");
    menuButton.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => {
      menuMore.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  } else {
    menuMore.setAttribute("hidden", "");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", updateScrollEffects, { passive: true });
window.addEventListener("resize", updateScrollEffects);
updateScrollEffects();
