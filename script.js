  // === Scroll-funktion för pilen ===
  const scrollIndicator = document.querySelector(".scroll-down-indicator");
  const scrollText = document.querySelector(".scroll-text");
  
  function scrollToProjects() {
    const target = document.getElementById("my-project-scroll");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", scrollToProjects);
  }
  
  if (scrollText) {
    scrollText.addEventListener("click", scrollToProjects);
  }
// === Hamburgermeny ===
const hamburger = document.getElementById("hamburger");
const mobileLinks = document.getElementById("mobileLinks");

if (hamburger && mobileLinks) {
  hamburger.addEventListener("click", () => {
    mobileLinks.classList.toggle("active");
    });
}

const links = mobileLinks.querySelectorAll("a");
links.forEach(link => {
  link.addEventListener("click", () => {
    mobileLinks.classList.remove("active");
  });
});
const quoteTrack = document.getElementById("quoteTrack");

if (quoteTrack) {
  const quotes = Array.from(document.querySelectorAll(".quote"));
  const visibleCount = Math.min(3, quotes.length);
  const totalQuotes = quotes.length;

  // Klona de första 'visibleCount' citaten för loop-effekt
  for (let i = 0; i < visibleCount; i++) {
    const clone = quotes[i].cloneNode(true);
    quoteTrack.appendChild(clone);
  }

  let currentIndex = 0;
  let isTransitioning = false;
  const slidePercent = 100 / visibleCount;

  function updateFocus() {
    const allQuotes = quoteTrack.querySelectorAll(".quote");
    allQuotes.forEach((q, i) => {
      if (i === currentIndex + 1) {
        q.classList.add("focus");
      } else {
        q.classList.remove("focus");
      }
    });
  }

  function slideNext() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex++;
    quoteTrack.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    quoteTrack.style.transform = `translateX(-${slidePercent * currentIndex}%)`;

    updateFocus();

    if (currentIndex === totalQuotes) {
      setTimeout(() => {
        quoteTrack.style.transition = 'none';
        quoteTrack.style.transform = 'translateX(0)';
        currentIndex = 0;
        updateFocus();
        isTransitioning = false;
      }, 500);
    } else {
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }
  }

  updateFocus();
  setInterval(slideNext, 5000);
}

// FORMULÄR
const form = document.querySelector(".contact-form");
const confirmation = document.getElementById("confirmationMessage");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  confirmation.classList.remove("hide");
  confirmation.classList.add("show");

  form.reset();

  setTimeout(() => {
    confirmation.classList.remove("show");
    confirmation.classList.add("hide");

    confirmation.addEventListener("animationend", function handler() {
      confirmation.classList.remove("hide");
      confirmation.removeEventListener("animationend", handler);
    });
  }, 5000);
});


