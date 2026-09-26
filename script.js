const header = document.querySelector(".site-header");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const modal = document.getElementById("videoModal");
const watchBtn = document.getElementById("watchBtn");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 25);
});

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

watchBtn.addEventListener("click", () => {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
});

modal.querySelectorAll("[data-close]").forEach(el => {
  el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

const counter = document.querySelector(".counter");
let counterStarted = false;

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counterStarted) {
      counterStarted = true;
      animateCounter(counter, Number(counter.dataset.target), 1500);
    }
  });
}, { threshold: 0.5 });

if (counter) counterObserver.observe(counter);

function animateCounter(el, target, duration) {
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(target * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

document.getElementById("year").textContent = new Date().getFullYear();
