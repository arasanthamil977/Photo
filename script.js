const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
});

menuToggle.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
  document.body.classList.toggle("lock", open);
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("lock");
  });
});

/* Portfolio filters */
const filters = document.querySelectorAll(".filter");
const items = document.querySelectorAll(".gallery-item");

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const value = button.dataset.filter;

    items.forEach(item => {
      const show = value === "all" || item.dataset.category === value;
      item.style.display = show ? "" : "none";
    });
  });
});

/* Full-screen gallery */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("lightboxPrev");
const nextBtn = document.getElementById("lightboxNext");
let currentIndex = 0;

function visibleImages() {
  return [...document.querySelectorAll(".gallery-item")]
    .filter(item => item.style.display !== "none")
    .map(item => item.querySelector("img"));
}

function showImage(index) {
  const images = visibleImages();
  if (!images.length) return;
  currentIndex = (index + images.length) % images.length;
  lightboxImage.src = images[currentIndex].src;
  lightboxImage.alt = images[currentIndex].alt;
}

items.forEach(item => {
  item.addEventListener("click", () => {
    const images = visibleImages();
    currentIndex = images.indexOf(item.querySelector("img"));
    showImage(currentIndex);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock");
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lock");
}

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", () => showImage(currentIndex + 1));
prevBtn.addEventListener("click", () => showImage(currentIndex - 1));

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showImage(currentIndex + 1);
  if (e.key === "ArrowLeft") showImage(currentIndex - 1);
});

/* Demo contact form */
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get("name");
  formMessage.textContent = `Thank you ${name}. THAMIL will receive your enquiry once email/backend is connected.`;
  contactForm.reset();
});

/* Smooth reveal */
const reveal = document.querySelectorAll(
  ".intro-grid, .section-head, .gallery-item, .service-grid article, .about-grid, .contact-grid"
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

reveal.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(28px)";
  el.style.transition = "opacity .8s ease, transform .8s ease";
  observer.observe(el);
});

const revealStyle = document.createElement("style");
revealStyle.textContent = `.visible{opacity:1!important;transform:translateY(0)!important}`;
document.head.appendChild(revealStyle);
