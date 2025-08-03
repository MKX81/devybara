document.addEventListener('DOMContentLoaded', () => {
  console.log("JS laddad och DOM är redo");
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
      // Klick på hamburgare: toggle meny, stoppa bubbla
      hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        hamburger.classList.toggle("open");
        mobileLinks.classList.toggle("active");
      });
  
      // Klick inne i menyn: stoppa bubbla (så klick inte stänger menyn)
      mobileLinks.addEventListener("click", (e) => {
        if (e.target !== mobileLinks) {
            e.stopPropagation();
        }
      });
  
      // Klick på meny-länk: stäng meny
      const links = mobileLinks.querySelectorAll("a");
      links.forEach(link => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("open");
          mobileLinks.classList.remove("active");
        });
      });
  
      // Klick utanför hamburgare/meny stänger menyn om den är öppen
      document.addEventListener("click", () => {
        if (mobileLinks.classList.contains("active")) {
          hamburger.classList.remove("open");
          mobileLinks.classList.remove("active");
        }
      });
    }
  
    // === Citatkarusell ===
    const quoteTrack = document.getElementById("quoteTrack");
  
    if (quoteTrack) {
      const quotes = Array.from(document.querySelectorAll(".quote"));
      const visibleCount = Math.min(3, quotes.length);
      const totalQuotes = quotes.length;
  
      // Klona för oändlig scroll
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
          }, 700);
        } else {
          setTimeout(() => {
            isTransitioning = false;
          }, 700);
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
  
    // === MULTI-CAROUSEL ===
    (function(){
      const track = document.querySelector('.multi-carousel-track');
      const prevBtn = document.querySelector('.multi-prev');
      const nextBtn = document.querySelector('.multi-next');
  
      if (!track || !prevBtn || !nextBtn) return;
  
      let items = Array.from(track.children);
      let itemCount = items.length;
      let currentIndex = 0;
  
      function getVisibleCount() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3;
      }
  
      function getItemWidth() {
        const gap = parseInt(getComputedStyle(track).gap) || 0;
        return items[0].offsetWidth + gap;
      }
  
      function cloneItems() {
        const visibleCount = getVisibleCount();
        const clones = track.querySelectorAll('.clone');
        clones.forEach(clone => clone.remove());
  
        for (let i = 0; i < visibleCount; i++) {
          const clone = items[i].cloneNode(true);
          clone.classList.add('clone');
          track.appendChild(clone);
        }
      }
  
      function updateItems() {
        items = Array.from(track.children).filter(el => !el.classList.contains('clone'));
        itemCount = items.length;
      }
  
      function updateCarousel() {
        const visibleCount = getVisibleCount();
        const maxIndex = itemCount;
  
        if (currentIndex > maxIndex) currentIndex = maxIndex;
  
        const moveX = -currentIndex * getItemWidth();
  
        track.style.transition = 'transform 0.5s ease';
        track.style.transform = `translateX(${moveX}px)`;
      }
  
      function next() {
        const visibleCount = getVisibleCount();
        const maxIndex = itemCount;
  
        currentIndex++;
  
        track.style.transition = 'transform 0.5s ease';
        const moveX = -currentIndex * getItemWidth();
        track.style.transform = `translateX(${moveX}px)`;
  
        if (currentIndex === maxIndex) {
          setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = 0;
            track.style.transform = 'translateX(0)';
          }, 500);
        }
      }
  
      function prev() {
        const visibleCount = getVisibleCount();
        const maxIndex = itemCount;
  
        if (currentIndex === 0) {
          currentIndex = maxIndex;
          track.style.transition = 'none';
          const moveX = -currentIndex * getItemWidth();
          track.style.transform = `translateX(${moveX}px)`;
  
          void track.offsetWidth;
  
          currentIndex--;
          track.style.transition = 'transform 0.5s ease';
          const moveX2 = -currentIndex * getItemWidth();
          track.style.transform = `translateX(${moveX2}px)`;
        } else {
          currentIndex--;
          updateCarousel();
        }
      }
  
      prevBtn.addEventListener('click', prev);
      nextBtn.addEventListener('click', next);
  
      window.addEventListener('resize', () => {
        cloneItems();
        updateItems();
        updateCarousel();
      });
  
      cloneItems();
      updateItems();
      updateCarousel();
  
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
  
    const images = document.querySelectorAll('.left-image img');
    let current = 0;
  
    if (images.length > 0) {
      images.forEach((img, i) => {
        if (i === 0) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });
  
      setInterval(() => {
        images[current].classList.remove('active');
        current = (current + 1) % images.length;
        images[current].classList.add('active');
      }, 4000);
    }
  
    // === MODAL BILDGALLERI ===
    const galleryImages = document.querySelectorAll('.misc-gallery-grid img');
    if (galleryImages.length > 0) {
    const modal = document.getElementById('modal');
    if (!modal) return;

    const modalImg = modal.querySelector('img');
    const modalClose = modal.querySelector('.modal-close');
    const nextBtn = modal.querySelector('.modal-next');
    const prevBtn = modal.querySelector('.modal-prev');


    let currentIndex = 0;

    function openModal(index) {
      console.log("openModal called with index:", index);  // Logga anropet med index
      currentIndex = index;
      modalImg.src = galleryImages[currentIndex].src;
      modalImg.alt = galleryImages[currentIndex].alt;
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    

    function closeModal() {
      modal.setAttribute('aria-hidden', 'true');
      modalImg.src = '';
      modalImg.alt = '';
      document.body.style.overflow = '';
    }

    function showNext() {
     currentIndex = (currentIndex + 1) % galleryImages.length;
      modalImg.src = galleryImages[currentIndex].src;
     modalImg.alt = galleryImages[currentIndex].alt;
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      modalImg.src = galleryImages[currentIndex].src;
      modalImg.alt = galleryImages[currentIndex].alt;
    }

    galleryImages.forEach((img, index) => {
     img.addEventListener('click', () => openModal(index));
    });

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
     if (e.target === modal) closeModal();
    });

    nextBtn?.addEventListener('click', showNext);
    prevBtn?.addEventListener('click', showPrev);

    document.addEventListener('keydown', (e) => {
      if (modal.getAttribute('aria-hidden') === 'false') {
       if (e.key === 'Escape') closeModal();
       if (e.key === 'ArrowRight') showNext();
       if (e.key === 'ArrowLeft') showPrev();
      }
    });
  
}
});
