//NavbarFixed
window.onscroll = function() {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;

    if(window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
    } else {
        header.classList.remove('navbar-fixed');
    }
}


//Hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

// Scroll Smooth
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

// Carousel Feature
 // Optional: Adjust animation duration based on container size
 document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelector(".carousel-track");
    const slideCount = slides.children.length;
    const slideWidth = slides.children[0].offsetWidth;

    // Calculate animation duration for smooth scrolling
    const totalWidth = slideWidth * slideCount;
    const animationDuration = (totalWidth / 100) * 1; // Adjust speed factor

    slides.style.animationDuration = `${animationDuration}s`;
});

  