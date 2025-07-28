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
