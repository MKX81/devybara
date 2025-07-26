document.addEventListener("DOMContentLoaded", () => {
  const knapp = document.getElementById("kontaktKnapp");
  const info = document.getElementById("kontaktInfo");

  knapp.addEventListener("click", () => {
    if (info.style.display === "none") {
      info.style.display = "block";
      knapp.textContent = "Dölj kontaktinfo";
    } else {
      info.style.display = "none";
      knapp.textContent = "Visa kontaktinfo";
    }
  });
});

const track = document.getElementById('quoteTrack');
const visibleCount = 3;
let quotes = Array.from(document.querySelectorAll('.quote'));
let currentIndex = 0;

// Steg 1: Klona de första citaten och lägg dem i slutet
for (let i = 0; i < visibleCount; i++) {
  const clone = quotes[i].cloneNode(true);
  track.appendChild(clone);
}

// Uppdatera listan efter kloning
quotes = Array.from(document.querySelectorAll('.quote'));

function updateCarousel(animated = true) {
  if (animated) {
    track.style.transition = 'transform 0.5s ease-in-out';
  } else {
    track.style.transition = 'none';
  }

  track.style.transform = `translateX(-${currentIndex * (100 / visibleCount)}%)`;

  // Uppdatera fokusklass
  quotes.forEach((quote, index) => {
    quote.classList.remove('focus');
    if (index === currentIndex +1) {
      quote.classList.add('focus');
    }
  });
}

//Hamburgermeny
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


// Starta karusell (citat)
updateCarousel();

setInterval(() => {
  currentIndex++;

  // När vi når det sista *klonade* citatet
  if (currentIndex > quotes.length - visibleCount) {
    updateCarousel(true); // animera sista hoppet

    // Efter att animationen är klar (0.5s), hoppa tillbaka utan animation
    setTimeout(() => {
      currentIndex = 0;
      updateCarousel(false);
    }, 500);
  } else {
    updateCarousel(true);
  }
}, 5000);
