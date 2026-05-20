// ============================================================
//  Clean It Flip It — Navbar Component
//  Injects the navbar HTML and handles all nav interactions.
//  Include this script BEFORE </body> on every page.
// ============================================================

(function () {
  'use strict';

  // ---- 1. Inject Navbar HTML --------------------------------
  const navbarHTML = `
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <div class="container">

        <!-- Top row: logo + desktop links + CTA -->
        <div class="navbar__inner">

          <a href="index.html" class="navbar__logo" aria-label="Clean It Flip It home">
            <div class="navbar__logo-icon" aria-hidden="true">
              <img src="images/logo_nobg.png" alt="Clean It Flip It" style="width:100%;height:100%;object-fit:contain;" />
            </div>
          </a>

          <!-- Desktop Links (hidden on mobile) -->
          <ul class="navbar__links" role="list">
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>

          <a href="contact.html" class="btn btn--primary navbar__cta" style="padding:10px 20px;font-size:.88rem;" aria-label="Get a free quote">
            Get a Quote
          </a>

        </div>

        <!-- Mobile Link Row (visible only on mobile) -->
        <ul class="navbar__mobile-links" role="list" aria-label="Quick navigation">
          <li><a href="index.html">Home</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>

      </div>
    </nav>
  `;

  const root = document.getElementById('navbar-root');
  if (root) {
    root.innerHTML = navbarHTML;
  } else {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = navbarHTML;
    document.body.insertBefore(wrapper.firstElementChild, document.body.firstChild);
  }

  // ---- 2. Mark active link on current page ------------------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.navbar__links a, .navbar__mobile-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // ---- 3. Sticky navbar shadow on scroll -------------------
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 4px 20px rgba(0,0,0,.1)'
        : '';
    }, { passive: true });
  }

})();
