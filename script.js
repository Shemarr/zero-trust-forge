// =============================================
// ZERO TRUST FORGE — SCRIPTS
// =============================================

// NAV: scroll shadow
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// NAV: mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// NAV: active section highlight
const navLinks = document.querySelectorAll('.nav__links a');
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// SCROLL ANIMATIONS: fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .tool-card, .pillar, .about__badge-card, .testimonial-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Inject fade-in CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
  .service-card:nth-child(2).fade-in { transition-delay: 0.07s; }
  .service-card:nth-child(3).fade-in { transition-delay: 0.14s; }
  .service-card:nth-child(4).fade-in { transition-delay: 0.21s; }
  .service-card:nth-child(5).fade-in { transition-delay: 0.28s; }
  .service-card:nth-child(6).fade-in { transition-delay: 0.35s; }
`;
document.head.appendChild(style);
