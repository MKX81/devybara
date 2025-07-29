// === Hero bildspel ===
const hero = document.getElementById("hero");

if (hero) {
  const images = JSON.parse(hero.dataset.images);
  
  const bg1 = hero.querySelector(".hero-bg1");
  const bg2 = hero.querySelector(".hero-bg2");

  let currentIndex = 0;
  let isBg1Active = true;
  let isAnimating = false;

  // Init: visa första bilden på bg1
  bg1.style.backgroundImage = `url("${images[currentIndex]}")`;
  bg1.style.transform = 'translateX(0)';
  bg2.style.transform = 'translateX(100%)';

  function slideNext() {
    if (isAnimating) return;
    isAnimating = true;

    const nextIndex = (currentIndex + 1) % images.length;

    const incomingBg = isBg1Active ? bg2 : bg1;
    const outgoingBg = isBg1Active ? bg1 : bg2;

    incomingBg.style.backgroundImage = `url("${images[nextIndex]}")`;
    incomingBg.style.transform = 'translateX(100%)';

    // Start animation
    setTimeout(() => {
      outgoingBg.style.transform = 'translateX(-100%)';
      incomingBg.style.transform = 'translateX(0)';
    }, 20);

    incomingBg.addEventListener('transitionend', () => {
      currentIndex = nextIndex;
      isBg1Active = !isBg1Active;
      isAnimating = false;
    }, { once: true });
  }

  // Automatisk slide var 5:e sekund
  setInterval(slideNext, 5000);

  // === Scroll-funktion för pilen ===
  const scrollIndicator = document.querySelector(".scroll-down-indicator");

  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const nextSection = document.querySelector("section:nth-of-type(2)");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
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


// CITATKARUSELL

const quoteTrack = document.getElementById("quoteTrack");
const quotes = Array.from(document.querySelectorAll(".quote"));
const visibleCount = 3;
const totalQuotes = quotes.length;

// 1. Klona de första 'visibleCount' citaten och lägg i slutet för loop-effekt
for (let i = 0; i < visibleCount; i++) {
  const clone = quotes[i].cloneNode(true);
  quoteTrack.appendChild(clone);
}

let currentIndex = 0;
let isTransitioning = false;

// Bredd per "slide" i procent (eftersom flex-basis är 100% / 3)
const slidePercent = 100 / visibleCount;

function updateFocus() {
  const allQuotes = quoteTrack.querySelectorAll(".quote");
  allQuotes.forEach((q, i) => {
    // fokus på det andra synliga citatet = currentIndex + 1
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

  // När vi nått kopian (loop back)
  if (currentIndex === totalQuotes) {
    setTimeout(() => {
      // hoppa tillbaka direkt utan transition (snap)
      quoteTrack.style.transition = 'none';
      quoteTrack.style.transform = 'translateX(0)';
      currentIndex = 0;
      updateFocus();
      isTransitioning = false;
    }, 500); // vänta tills animationen är klar
  } else {
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }
}

// Starta karusellen
updateFocus();
setInterval(slideNext, 5000);



const form = document.querySelector(".contact-form");
const confirmation = document.getElementById("confirmationMessage");

if (form && confirmation) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Visa meddelandet med fadeIn
    confirmation.classList.remove("hide");
    confirmation.classList.add("show");
    confirmation.style.display = "block";

    form.reset();

    setTimeout(() => {
      // Starta fadeOut
      confirmation.classList.remove("show");
      confirmation.classList.add("hide");

      // När fadeOut är klar, göm helt
      confirmation.addEventListener("animationend", function handler() {
        confirmation.style.display = "none";
        confirmation.classList.remove("hide");
        confirmation.removeEventListener("animationend", handler);
      });
    }, 5000);
  });
}




