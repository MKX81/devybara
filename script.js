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

  const links = mobileLinks.querySelectorAll("a");
  if (links.length > 0) {
    links.forEach(link => {
      link.addEventListener("click", () => {
        mobileLinks.classList.remove("active");
      });
    });
  }
}

// === Citatkarusell ===
const quoteTrack = document.getElementById("quoteTrack");

if (quoteTrack) {
  const quotes = Array.from(document.querySelectorAll(".quote"));
  const visibleCount = Math.min(3, quotes.length);
  const totalQuotes = quotes.length;

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

// === FORMULÄR ===
const form = document.querySelector(".contact-form");
const confirmation = document.getElementById("confirmationMessage");

if (form && confirmation) {
  form.addEventListener("submit", (e) => {
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
}

// === Bildspelskarusell ===
(function(){
  const track = document.querySelector('.multi-carousel-track');
  const prevBtn = document.querySelector('.multi-prev');
  const nextBtn = document.querySelector('.multi-next');

  if (!track || !prevBtn || !nextBtn) return;

  const items = Array.from(track.children);
  const itemCount = items.length;
  let currentIndex = 0;

  function getVisibleCount() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  }

  function updateCarousel() {
    const visibleCount = getVisibleCount();
    const maxIndex = itemCount - visibleCount;
    if (currentIndex > maxIndex) currentIndex = maxIndex < 0 ? 0 : maxIndex;

    const itemWidth = items[0].getBoundingClientRect().width + 15;
    const moveX = -currentIndex * itemWidth;

    track.style.transform = `translateX(${moveX}px)`;
  }

  function next() {
    const visibleCount = getVisibleCount();
    const maxIndex = itemCount - visibleCount;
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateCarousel();
  }

  function prev() {
    const visibleCount = getVisibleCount();
    const maxIndex = itemCount - visibleCount;
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex -1;
    updateCarousel();
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  window.addEventListener('resize', updateCarousel);

  updateCarousel();

  // Dra med musen
  const viewport = document.querySelector('.multi-carousel-viewport');
  if (viewport) {
    let isDragging = false;
    let startX;
    let scrollLeft;

    viewport.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - viewport.offsetLeft;
      scrollLeft = viewport.scrollLeft;
      viewport.classList.add('dragging');
    });

    viewport.addEventListener('mouseleave', () => {
      isDragging = false;
      viewport.classList.remove('dragging');
    });

    viewport.addEventListener('mouseup', () => {
      isDragging = false;
      viewport.classList.remove('dragging');
    });

    viewport.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - viewport.offsetLeft;
      const walk = (x - startX) * 1.5;
      viewport.scrollLeft = scrollLeft - walk;
    });
  }

  setInterval(next, 5000);
})();



// === FADE-IN SCRIPT ===
document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in-section');

  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  faders.forEach(fader => {
    observer.observe(fader);
  });
});

// === KARUSELL FÖR MISC-GALLERY ===
(function(){
  const track = document.querySelector('.misc-gallery-grid');
  const prevBtn = document.querySelector('.misc-prev');
  const nextBtn = document.querySelector('.misc-next');

  if (!track || !prevBtn || !nextBtn) return;

  const items = Array.from(track.children);
  if (items.length === 0) return;

  const itemCount = items.length;
  let currentIndex = 0;

  function getVisibleCount() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  }

  function updateCarousel() {
    const visibleCount = getVisibleCount();
    const maxIndex = itemCount - visibleCount;
    if (currentIndex > maxIndex) currentIndex = maxIndex < 0 ? 0 : maxIndex;

    const itemWidth = items[0].getBoundingClientRect().width + 16;
    const moveX = -currentIndex * itemWidth;

    track.style.transform = `translateX(${moveX}px)`;
  }

  function next() {
    const visibleCount = getVisibleCount();
    const maxIndex = itemCount - visibleCount;
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateCarousel();
  }

  function prev() {
    const visibleCount = getVisibleCount();
    const maxIndex = itemCount - visibleCount;
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateCarousel();
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  window.addEventListener('resize', updateCarousel);

  updateCarousel();

  const viewport = document.querySelector('.misc-carousel-viewport');
  if (viewport) {
    let isDragging = false;
    let startX;
    let scrollLeft;

    viewport.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - viewport.offsetLeft;
      scrollLeft = viewport.scrollLeft;
      viewport.classList.add('dragging');
    });

    viewport.addEventListener('mouseleave', () => {
      isDragging = false;
      viewport.classList.remove('dragging');
    });

    viewport.addEventListener('mouseup', () => {
      isDragging = false;
      viewport.classList.remove('dragging');
    });

    viewport.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - viewport.offsetLeft;
      const walk = (x - startX) * 1.5;
      viewport.scrollLeft = scrollLeft - walk;
    });
  }

  setInterval(next, 5000);
})();
