document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  // Desktop hover play/pause
  cards.forEach((card) => {
    const video = card.querySelector(".card-video");

    card.addEventListener("mouseenter", function () {
      video.play();
    });

    card.addEventListener("mouseleave", function () {
      video.pause();
      video.currentTime = 0; // Reset to start
    });

    // Mobile click play/pause
    video.addEventListener("click", function (e) {
      if (window.innerWidth <= 1103) {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
        e.stopPropagation();
      }
    });
  });

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav .links");
  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("open");
  });

  // Close navbar when clicking outside on small screens
  document.addEventListener("click", function (e) {
    if (
      window.innerWidth <= 1103 &&
      navLinks.classList.contains("active") &&
      !e.target.closest(".nav")
    ) {
      navLinks.classList.remove("active");
      navToggle.classList.remove("open");
    }
  });
});
