/* ================= PRELOADER ================= */
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

/* ================= THEME TOGGLE ================= */
const toggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

toggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light",
  );
};

/* ================= HERO SLIDER ================= */
const slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 5000);

/* ================= SCROLL REVEAL ================= */
const reveals = document.querySelectorAll(".reveal");

function reveal() {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add("show");
  });
}
window.addEventListener("scroll", reveal);
reveal();

/* ================= COUNTERS ================= */
const counters = document.querySelectorAll(".counter");

const runCounter = (counter) => {
  const target = +counter.dataset.target;
  let count = 0;

  const update = () => {
    count += target / 120;
    if (count < target) {
      counter.textContent = Math.floor(count);
      requestAnimationFrame(update);
    } else {
      counter.textContent = target;
    }
  };
  update();
};

counters.forEach(runCounter);

/* ================= FAQ ================= */
document.querySelectorAll(".faq-item button").forEach((btn) => {
  btn.onclick = () => {
    const p = btn.nextElementSibling;
    p.style.display = p.style.display === "block" ? "none" : "block";
  };
});

/* ================= BACK TO TOP ================= */
const topBtn = document.getElementById("backToTop");
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

/* ================= FORM VALIDATION ================= */
const modal = document.getElementById("bookingModal");
const openBtn = document.getElementById("openBooking");
const closeBtn = document.getElementById("closeModal");
const overlay = document.querySelector(".modal-overlay");

const steps = document.querySelectorAll(".form-step");
const stepper = document.querySelectorAll(".step");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const successScreen = document.querySelector(".success-screen");

let current = 0;

/* ===== MODAL OPEN/CLOSE ===== */
function openModal() {
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
  resetForm();
}

openBtn.onclick = openModal;
closeBtn.onclick = closeModal;
overlay.onclick = closeModal;

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ===== STEPS ===== */
function showStep(i) {
  steps.forEach((s) => s.classList.remove("active"));
  stepper.forEach((s) => s.classList.remove("active"));

  steps[i].classList.add("active");
  stepper[i].classList.add("active");

  prevBtn.style.display = i === 0 ? "none" : "inline-block";
  nextBtn.textContent = i === steps.length - 1 ? "Confirm" : "Next";
}

nextBtn.onclick = () => {
  if (current < steps.length - 1) {
    current++;
    showStep(current);
  } else {
    finish();
  }
};

prevBtn.onclick = () => {
  if (current > 0) {
    current--;
    showStep(current);
  }
};

function finish() {
  steps.forEach((s) => (s.style.display = "none"));
  document.querySelector(".actions").style.display = "none";
  successScreen.classList.add("show");
}

function resetForm() {
  current = 0;
  successScreen.classList.remove("show");
  steps.forEach((s) => {
    s.style.display = "";
  });
  document.querySelector(".actions").style.display = "flex";
  showStep(0);
}

showStep(0);

/* ================= MOBILE MENU ================= */
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("navMenu");

/* ================= IMAGE ZOOM MODAL ================= */
document.querySelectorAll(".zoomable").forEach((img) => {
  img.onclick = () => {
    const modal = document.createElement("div");
    modal.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,.85);
      display:flex;align-items:center;justify-content:center;
      z-index:9999
    `;
    const big = document.createElement("img");
    big.src = img.src;
    big.style.maxWidth = "90%";
    big.style.borderRadius = "20px";
    modal.appendChild(big);
    document.body.appendChild(modal);
    modal.onclick = () => modal.remove();
  };
});

/* ================= RIPPLE EFFECT ================= */
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    const d = Math.max(this.clientWidth, this.clientHeight);
    circle.style.cssText = `
      position:absolute;border-radius:50%;
      background:rgba(255,255,255,.4);
      width:${d}px;height:${d}px;
      left:${e.offsetX - d / 2}px;top:${e.offsetY - d / 2}px;
      animation:ripple .6s linear
    `;
    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});

/* ripple animation */
const style = document.createElement("style");
style.innerHTML = `@keyframes ripple{from{transform:scale(0);opacity:1}to{transform:scale(2);opacity:0}}`;
document.head.appendChild(style);

/* ================= NEWSLETTER ================= */
document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Subscribed successfully. Thank you!");
});

/* ================= PARALLAX BLOBS ================= */
window.addEventListener("mousemove", (e) => {
  const x = e.clientX / 50;
  const y = e.clientY / 50;

  document.querySelector(".blob1").style.transform =
    `translate(${x}px, ${y}px)`;

  document.querySelector(".blob2").style.transform =
    `translate(-${x}px, -${y}px)`;
});

/* ================= NAV SMOOTH SCROLL ================= */
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});
/* ================= NAVBAR SHADOW ON SCROLL ================= */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

/* ================= LIGHTBOX GALLERY ================= */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".gallery-img, .zoomable").forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

/* ================= ACCESSIBLE ESC CLOSE ================= */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.style.display = "none";
});

/* ================= BACK TO TOP VISIBILITY ================= */
const backBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backBtn.style.display = window.scrollY > 400 ? "flex" : "none";
});

/* ================= MOBILE MENU ANIMATION ================= */
const menuBtn = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

menuBtn?.addEventListener("click", () => {
  if (navMenu.style.display === "flex") {
    navMenu.style.display = "none";
  } else {
    navMenu.style.display = "flex";
  }
});

/* ================= LAZY REVEAL TRIGGER INITIAL ================= */
window.dispatchEvent(new Event("scroll"));
/* ================= LIVE SEARCH (Doctors + Services) ================= */
const items = [
  "Laboratory Testing",
  "Radiology",
  "Pharmacy",
  "Cardiology",
  "Emergency Care",
  "Pediatrics",
  "Dr. Sarah Cole",
  "Dr. Ahmed Musa",
  "Dr. Anita Roy",
  "Dr. James Brown",
];

const searchInput = document.getElementById("liveSearch");
const resultsBox = document.getElementById("searchResults");

searchInput?.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  resultsBox.innerHTML = "";

  if (!value) return;

  items
    .filter((item) => item.toLowerCase().includes(value))
    .forEach((match) => {
      const span = document.createElement("span");
      span.className = "search-pill";
      span.textContent = match;
      resultsBox.appendChild(span);
    });
});

/* ================= COOKIE CONSENT ================= */
const cookie = document.getElementById("cookieBanner");
const accept = document.getElementById("acceptCookies");

if (localStorage.getItem("cookieAccepted")) {
  cookie.style.display = "none";
}

accept?.addEventListener("click", () => {
  localStorage.setItem("cookieAccepted", "yes");
  cookie.style.display = "none";
});

/* ================= SMOOTH SECTION FADE ================= */
const sections = document.querySelectorAll(".section");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "none";
      }
    });
  },
  { threshold: 0.1 },
);

sections.forEach((sec) => {
  sec.style.opacity = 0;
  sec.style.transform = "translateY(30px)";
  sec.style.transition = ".7s ease";
  sectionObserver.observe(sec);
});
/* ================= FLOATING CHAT WIDGET ================= */
const chatWidget = document.getElementById("chatWidget");
const chatClose = document.getElementById("chatClose");

setTimeout(() => {
  chatWidget?.classList.add("show");
}, 3000); // appear after 9s

chatClose?.addEventListener("click", () => {
  chatWidget.classList.remove("show");
});

const track = document.querySelector(".testimonial-track");
const dotss = document.querySelectorAll(".dot");
const wrapper = document.querySelector(".testimonial-wrapper");

let indexs = 0;
let interval;

const cardsPerView = () => {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
};

function updateSlider() {
  const card = track.children[0];
  const gap = 20;
  const moveX = indexs * (card.offsetWidth + gap);

  track.style.transform = `translateX(-${moveX}px)`;

  dotss.forEach((d) => d.classList.remove("active"));
  dotss[indexs]?.classList.add("active");
}

function startAutoSlide() {
  stopAutoSlide();
  interval = setInterval(() => {
    const maxIndexs = track.children.length - cardsPerView();
    indexs = indexs >= maxIndexs ? 0 : indexs + 1;
    updateSlider();
  }, 3500);
}

function stopAutoSlide() {
  clearInterval(interval);
}

dotss.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    indexs = i;
    updateSlider();
    startAutoSlide();
  });
});

wrapper.addEventListener("mouseenter", stopAutoSlide);
wrapper.addEventListener("mouseleave", startAutoSlide);

window.addEventListener("resize", updateSlider);

startAutoSlide();
