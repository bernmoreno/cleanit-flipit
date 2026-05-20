// ============================================================
//  Clean It Flip It — Navbar Component
//  Injects the navbar + mobile drawer and handles all nav
//  interactions. Works on every mobile browser/device.
// ============================================================

(function () {
  'use strict';

  // ---- 1. Inject Navbar HTML --------------------------------
  var navbarHTML = '' +
    '<nav class="navbar" role="navigation" aria-label="Main navigation">' +
      '<div class="container">' +

        '<div class="navbar__inner">' +

          '<a href="index.html" class="navbar__logo" aria-label="Clean It Flip It home">' +
            '<div class="navbar__logo-icon" aria-hidden="true">' +
              '<img src="images/logo_nobg.png" alt="Clean It Flip It" style="width:100%;height:100%;object-fit:contain;" />' +
            '</div>' +
          '</a>' +

          '<ul class="navbar__links" role="list">' +
            '<li><a href="index.html">Home</a></li>' +
            '<li><a href="services.html">Services</a></li>' +
            '<li><a href="gallery.html">Gallery</a></li>' +
            '<li><a href="about.html">About Us</a></li>' +
            '<li><a href="contact.html">Contact Us</a></li>' +
          '</ul>' +

          '<a href="contact.html" class="btn btn--primary navbar__cta" style="padding:10px 20px;font-size:.88rem;" aria-label="Get a free quote">Get a Quote</a>' +

          '<button class="navbar__burger" id="navbar-burger" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-drawer">' +
            '<span class="navbar__burger-bar"></span>' +
            '<span class="navbar__burger-bar"></span>' +
            '<span class="navbar__burger-bar"></span>' +
          '</button>' +

        '</div>' +

        '<ul class="navbar__mobile-links" role="list" aria-label="Quick navigation">' +
          '<li><a href="index.html">Home</a></li>' +
          '<li><a href="services.html">Services</a></li>' +
          '<li><a href="contact.html">Contact Us</a></li>' +
        '</ul>' +

      '</div>' +
    '</nav>';

  var root = document.getElementById('navbar-root');
  if (root) {
    root.innerHTML = navbarHTML;
  } else {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = navbarHTML;
    document.body.insertBefore(wrapper.firstElementChild, document.body.firstChild);
  }

  // ---- 2. Inject Drawer + Overlay directly into <body> -----
  //  Keeping these OUTSIDE the navbar avoids every stacking-
  //  context / z-index / overflow bug on iOS Safari, Android
  //  Chrome, Samsung Internet, UC Browser, etc.

  var overlay = document.createElement('div');
  overlay.id        = 'mobile-overlay';
  overlay.className = 'mobile-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  var drawer = document.createElement('div');
  drawer.id        = 'mobile-drawer';
  drawer.className = 'mobile-drawer';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');
  drawer.setAttribute('aria-label', 'Navigation menu');
  drawer.innerHTML =
    '<div class="mobile-drawer__header">' +
      '<span class="mobile-drawer__title">Menu</span>' +
      '<button class="mobile-drawer__close" id="drawer-close" type="button" aria-label="Close menu">&#10005;</button>' +
    '</div>' +
    '<ul class="mobile-drawer__links" role="list">' +
      '<li><a href="index.html">Home</a></li>' +
      '<li><a href="services.html">Services</a></li>' +
      '<li><a href="gallery.html">Gallery</a></li>' +
      '<li><a href="about.html">About Us</a></li>' +
      '<li><a href="contact.html">Contact Us</a></li>' +
      '<li><a href="contact.html" class="mobile-drawer__cta-link">Get a Free Quote</a></li>' +
    '</ul>';
  document.body.appendChild(drawer);

  // ---- 3. Mark active link ---------------------------------
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  var allLinks = document.querySelectorAll(
    '.navbar__links a, .navbar__mobile-links a, .mobile-drawer__links a'
  );
  for (var i = 0; i < allLinks.length; i++) {
    var link = allLinks[i];
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.className += ' active';
      link.setAttribute('aria-current', 'page');
    }
  }

  // ---- 4. Open / close helpers -----------------------------
  var burger   = document.getElementById('navbar-burger');
  var closeBtn = document.getElementById('drawer-close');

  function openDrawer() {
    drawer.className  = 'mobile-drawer is-open';
    overlay.className = 'mobile-overlay is-open';
    burger.setAttribute('aria-expanded', 'true');
    burger.className = 'navbar__burger is-active';
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.className  = 'mobile-drawer';
    overlay.className = 'mobile-overlay';
    burger.setAttribute('aria-expanded', 'false');
    burger.className = 'navbar__burger';
    document.body.style.overflow = '';
  }

  // Hamburger tap
  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    if (drawer.className.indexOf('is-open') !== -1) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Close button inside drawer
  closeBtn.addEventListener('click', function () {
    closeDrawer();
    burger.focus();
  });

  // Overlay tap
  overlay.addEventListener('click', closeDrawer);

  // Tapping any link inside the drawer closes it
  var drawerLinks = drawer.querySelectorAll('a');
  for (var j = 0; j < drawerLinks.length; j++) {
    drawerLinks[j].addEventListener('click', closeDrawer);
  }

  // Escape key
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.keyCode === 27) &&
        drawer.className.indexOf('is-open') !== -1) {
      closeDrawer();
      burger.focus();
    }
  });

  // ---- 5. Sticky shadow on scroll -------------------------
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 4px 20px rgba(0,0,0,.1)'
        : '';
    }, { passive: true });
  }

})();
