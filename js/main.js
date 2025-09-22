// 🌐 Mobile menu toggle
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


// 📨 Contact form submission with modal popup
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Create success modal
  const modal = document.createElement("div");
  modal.className = "modal success-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <h3>✅ Message Sent!</h3>
      <p>Thank you for reaching out. We’ll get back to you soon.</p>
      <button class="btn close-modal">Close</button>
    </div>
  `;
  document.body.appendChild(modal);

  // Close modal
  modal.querySelector(".close-modal").addEventListener("click", () => {
    modal.remove();
  });

  // Auto close in 3s
  setTimeout(() => modal.remove(), 3000);

  this.reset();
});

// Scroll animations using custom data-anim instead of CSS classes
const animElements = document.querySelectorAll("[data-anim]");

const animObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;

      // Optional: read delay/duration from data attributes
      const delay = el.getAttribute("data-anim-delay");
      const duration = el.getAttribute("data-anim-duration");

      if (delay) {
        el.style.setProperty("--anim-delay", delay);
      }
      if (duration) {
        el.style.setProperty("--anim-duration", duration);
      }

      el.classList.add("anim-show");
      observer.unobserve(el);
    }
  });
}, { threshold: 0.2 });

animElements.forEach(el => animObserver.observe(el));

// Hero Carousel Logic
const slides = document.querySelectorAll(".carousel-slide");
const container = document.querySelector(".carousel-container");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
let autoPlayInterval;

function showSlide(index) {
  // Ensure index loops around
  if (index >= slides.length) currentIndex = 0;
  if (index < 0) currentIndex = slides.length - 1;

  // Shift the container
  container.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  currentIndex++;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex--;
  showSlide(currentIndex);
}

// Auto-play function
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000); // change every 5s
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
  startAutoPlay(); // restart autoplay
}

// Event listeners (reset autoplay when user interacts)
nextBtn.addEventListener("click", () => {
  nextSlide();
  stopAutoPlay();
});
prevBtn.addEventListener("click", () => {
  prevSlide();
  stopAutoPlay();
});

// Initialize
showSlide(currentIndex);
startAutoPlay();

