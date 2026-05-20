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

  // ---- 2. Mark active link ----------------------------------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.navbar__links a, .navbar__drawer a').forEach(link => {
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
    burger.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(isOpen));
      // Prevent body scroll when drawer is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close drawer on link click
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
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
        document.body.style.overflow = '';
      }
    });

    // Close drawer on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
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
