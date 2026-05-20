// ============================================================
//  Clean It Flip It — Navbar Component
//  Injects the navbar HTML and handles all nav interactions.
//  Include this script BEFORE </body> on every page.
// ============================================================

(function () {
  'use strict';

  // ---- 1. Inject HTML ----------------------------------------
  const navbarHTML = /* html */`
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <div class="container">
        <div class="navbar__inner">

          <!-- Logo -->
          <a href="index.html" class="navbar__logo" aria-label="Clean It Flip It home">
            <div class="navbar__logo-icon" aria-hidden="true">
              <img src="images/logo_nobg.png" alt="Clean It Flip It" style="width:100%;height:100%;object-fit:contain;" />
            </div>
          </a>

          <!-- Desktop Links -->
          <ul class="navbar__links" role="list">
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>

          <!-- CTA Button -->
          <a href="contact.html" class="btn btn--primary" style="padding:10px 20px;font-size:.88rem;" aria-label="Get a free quote">
            Get a Quote
          </a>

          <!-- Hamburger -->
          <button
            class="navbar__burger"
            id="navbar-burger"
            aria-expanded="false"
            aria-controls="navbar-drawer"
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>
      </div>
    </nav>

    <!-- Mobile Drawer -->
    <div class="navbar__drawer" id="navbar-drawer" role="dialog" aria-label="Mobile navigation">
      <a href="index.html">Home</a>
      <a href="services.html">Services</a>
      <a href="gallery.html">Gallery</a>
      <a href="about.html">About Us</a>
      <a href="contact.html">Contact Us</a>
      <a href="contact.html" class="btn btn--primary" style="margin-top:8px;justify-content:center;">Get a Free Quote</a>
    </div>
  `;

  // Mount into #navbar-root if it exists, otherwise prepend to body
  const root = document.getElementById('navbar-root');
  if (root) {
    root.innerHTML = navbarHTML;
  } else {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = navbarHTML;
    document.body.insertBefore(wrapper, document.body.firstChild);
  }

  // ---- 1b. Inject Mobile Bottom Navigation ------------------
  const bottomNavHTML = /* html */`
    <nav class="mobile-bottom-nav" id="mobile-bottom-nav" aria-label="Mobile bottom navigation">
      <a href="index.html" class="mobile-bottom-nav__item" id="mbn-home">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
          <polyline points="9 21 9 12 15 12 15 21"/>
        </svg>
        <span>Home</span>
      </a>
      <a href="services.html" class="mobile-bottom-nav__item" id="mbn-services">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span>Services</span>
      </a>
      <a href="contact.html" class="mobile-bottom-nav__item" id="mbn-contact">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span>Contact</span>
      </a>
    </nav>
  `;

  const bottomNavWrapper = document.createElement('div');
  bottomNavWrapper.innerHTML = bottomNavHTML;
  document.body.appendChild(bottomNavWrapper.firstElementChild);

  // ---- 2. Mark active link ----------------------------------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.navbar__links a, .navbar__drawer a, .mobile-bottom-nav__item').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // ---- 3. Mobile burger toggle ------------------------------
  const burger = document.getElementById('navbar-burger');
  const drawer = document.getElementById('navbar-drawer');

  if (burger && drawer) {
    burger.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = drawer.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close drawer on link click
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close drawer on outside click
    document.addEventListener('click', e => {
      if (
        drawer.classList.contains('open') &&
        !drawer.contains(e.target) &&
        !burger.contains(e.target)
      ) {
        drawer.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close drawer on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  // ---- 4. Sticky navbar shadow on scroll -------------------
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 4px 20px rgba(0,0,0,.1)'
        : '0 2px 12px rgba(0,0,0,.06)';
    }, { passive: true });
  }

})();
