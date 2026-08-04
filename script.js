document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initVideoCards();
  initScrollAnimations();
  initPortfolioFilters();
  initForms();
});

function initNavigation() {
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!nav || !navToggle || !navLinks) return;

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  });

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = navToggle.querySelector("i");
    icon.classList.toggle("bx-menu");
    icon.classList.toggle("bx-x");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const icon = navToggle.querySelector("i");
      icon.classList.add("bx-menu");
      icon.classList.remove("bx-x");
    });
  });

  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("active") &&
      !e.target.closest(".nav")
    ) {
      navLinks.classList.remove("active");
      const icon = navToggle.querySelector("i");
      icon.classList.add("bx-menu");
      icon.classList.remove("bx-x");
    }
  });
}

function initVideoCards() {
  const cards = document.querySelectorAll(
    ".service-card, .portfolio-item, .portfolio-media"
  );

  cards.forEach((card) => {
    const video = card.querySelector(".card-video");
    if (!video) return;

    const play = () => {
      video.play().catch(() => {});
    };

    const pause = () => {
      video.pause();
      video.currentTime = 0;
    };

    card.addEventListener("mouseenter", play);
    card.addEventListener("mouseleave", pause);

    video.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        video.paused ? play() : video.pause();
      }
    });
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll(".fade-in");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
  });
}

function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".portfolio-item");

  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      items.forEach((item) => {
        const category = item.dataset.category;
        const show = filter === "all" || category === filter;
        item.style.display = show ? "" : "none";
      });
    });
  });
}

function initForms() {
  const contactForm = document.getElementById("contact-form");
  const hireForm = document.getElementById("hire-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      contactForm.style.display = "none";
      document.getElementById("contact-success").classList.add("show");
    });
  }

  if (hireForm) {
    hireForm.addEventListener("submit", (e) => {
      e.preventDefault();
      hireForm.style.display = "none";
      document.querySelector(".form-tip").style.display = "none";
      document.getElementById("hire-success").classList.add("show");
    });
  }
}
