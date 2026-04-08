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

// CONTACT FORM
// ─────────────────────────────────────────────
// Submissions are forwarded to chehine_marouani@hotmail.com via Formspree.
// Steps to activate:
//   1. Sign up at formspree.io (free)
//   2. Create a new form — Formspree gives you an ID like "xbjvkpqz"
//   3. Replace YOUR_FORM_ID below with that ID
// ─────────────────────────────────────────────
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

function setError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  const group = input.closest('.form__group');
  error.textContent = message;
  if (message) {
    group.classList.add('error');
  } else {
    group.classList.remove('error');
  }
  return !!message;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  let hasError = false;

  if (!name) {
    hasError = setError('name', 'nameError', 'Please enter your full name.') || hasError;
  } else {
    setError('name', 'nameError', '');
  }

  if (!email) {
    hasError = setError('email', 'emailError', 'Please enter your email address.') || hasError;
  } else if (!validateEmail(email)) {
    hasError = setError('email', 'emailError', 'Please enter a valid email address.') || hasError;
  } else {
    setError('email', 'emailError', '');
  }

  if (!message) {
    hasError = setError('message', 'messageError', 'Please enter a message.') || hasError;
  } else {
    setError('message', 'messageError', '');
  }

  if (hasError) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form),
    });

    if (res.ok) {
      submitBtn.style.display = 'none';
      formSuccess.classList.add('show');
      form.querySelectorAll('input, textarea, select').forEach(el => el.disabled = true);
    } else {
      const data = await res.json();
      const msg = data?.errors?.map(e => e.message).join(', ') || 'Something went wrong. Please try again.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      setError('message', 'messageError', msg);
    }
  } catch {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
    setError('message', 'messageError', 'Network error. Please check your connection and try again.');
  }
});

// Clear errors on input
['name', 'email', 'message'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    const errorEl = document.getElementById(id + 'Error');
    if (errorEl) {
      errorEl.textContent = '';
      document.getElementById(id).closest('.form__group').classList.remove('error');
    }
  });
});

// SCROLL ANIMATIONS: fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .tool-card, .pillar, .about__badge-card').forEach(el => {
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
