// ============================================================
//  Clean It Flip It — Main JavaScript
// ============================================================

// ---- Active nav link ----------------------------------------
(function markActive() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a, .navbar__drawer a').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === page ||
      (page === '' && href === 'index.html') ||
      (page === 'index.html' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });
})();

// ---- Mobile hamburger / drawer ------------------------------
const burger = document.getElementById('navbar-burger');
const drawer = document.getElementById('navbar-drawer');

if (burger && drawer) {
  burger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close drawer when a link is clicked
  drawer.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    })
  );
}

// ---- Toast notification helper ------------------------------
function showToast(message, type = 'success') {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast toast--${type}`;
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ---- Contact form validation --------------------------------
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    contactForm.querySelectorAll('.form-error').forEach(el => {
      el.classList.remove('visible');
      el.previousElementSibling?.classList.remove('error');
    });

    // Validate each required field
    contactForm.querySelectorAll('[required]').forEach(field => {
      const value = field.value.trim();
      const errorEl = field.nextElementSibling;
      if (!value) {
        valid = false;
        field.classList.add('error');
        if (errorEl && errorEl.classList.contains('form-error')) {
          errorEl.textContent = 'This field is required.';
          errorEl.classList.add('visible');
        }
      }
    });

    // Email format check
    const emailField = document.getElementById('email');
    if (emailField) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const errorEl = emailField.nextElementSibling;
      if (emailField.value && !emailPattern.test(emailField.value.trim())) {
        valid = false;
        emailField.classList.add('error');
        if (errorEl && errorEl.classList.contains('form-error')) {
          errorEl.textContent = 'Please enter a valid email address.';
          errorEl.classList.add('visible');
        }
      }
    }

    // Phone format (US) — optional but if filled must be valid
    const phoneField = document.getElementById('phone');
    if (phoneField && phoneField.value.trim()) {
      const phonePattern = /^[\d\s\-().+]{7,20}$/;
      const errorEl = phoneField.nextElementSibling;
      if (!phonePattern.test(phoneField.value.trim())) {
        valid = false;
        phoneField.classList.add('error');
        if (errorEl && errorEl.classList.contains('form-error')) {
          errorEl.textContent = 'Please enter a valid phone number.';
          errorEl.classList.add('visible');
        }
      }
    }

    if (!valid) {
      showToast('Please fix the errors below.', 'error');
      return;
    }

    // Show success message
    const successEl = document.getElementById('form-success');
    if (successEl) successEl.classList.add('visible');
    contactForm.reset();
    showToast('Message sent! We\'ll be in touch soon.', 'success');
  });
}

// ---- Smooth scroll for in-page anchor links -----------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h'), 10) || 80;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth',
      });
    }
  });
});

// ---- Scroll-reveal: fade-in on scroll -----------------------
if ('IntersectionObserver' in window) {
  const revealEls = document.querySelectorAll(
    '.card, .service-card, .feature, .testimonial, .team-card, .pricing-card'
  );
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    observer.observe(el);
  });
}
