// ============================================================
//  Clean It Flip It — Footer Component
//  Injects the footer HTML into every page.
//  Include this script BEFORE </body> on every page.
// ============================================================

(function () {
  'use strict';

  const year = new Date().getFullYear();

  const footerHTML = /* html */`
    <footer class="footer" role="contentinfo">
      <div class="container">

        <!-- Main grid -->
        <div class="footer__inner">

          <!-- Brand column -->
          <div class="footer__brand-col">
            <a href="index.html" class="footer__brand" aria-label="Clean It Flip It home">
            </a>
            <p class="footer__tagline">
              Professional cleaning &amp; property transformation services.
              We make your space shine — inside and out.
            </p>
            <div class="footer__social" role="list" aria-label="Social media links">

              <!-- Facebook -->
              <a href="https://www.facebook.com" role="listitem" aria-label="Facebook" rel="noopener noreferrer" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>

              <!-- Instagram -->
              <a href="https://www.instagram.com" role="listitem" aria-label="Instagram" rel="noopener noreferrer" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              <!-- TikTok -->
              <a href="https://www.tiktok.com" role="listitem" aria-label="TikTok" rel="noopener noreferrer" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.83 1.54V6.76a4.85 4.85 0 0 1-1.06-.07z"/>
                </svg>
              </a>

            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <p class="footer__col-title">Quick Links</p>
            <ul class="footer__links">
              <li><a href="index.html">Home</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="gallery.html">Gallery</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>

          <!-- Services -->
          <div>
            <p class="footer__col-title">Services</p>
            <ul class="footer__links">
              <li><a href="services.html">House Cleaning</a></li>
              <li><a href="services.html">Deep Clean</a></li>
              <li><a href="services.html">Move-In / Move-Out</a></li>
              <li><a href="services.html">Post-Renovation</a></li>
              <li><a href="services.html">Property Staging</a></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <p class="footer__col-title">Get in Touch</p>
            <ul class="footer__links">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                (555) 123-4567
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                hello@cleanitflipit.com
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Your City, State 00000
              </li>
            </ul>
          </div>

        </div>

        <!-- Bottom bar -->
        <div class="footer__bottom">
          <span>&copy; ${year} Clean It Flip It. All rights reserved.</span>
          <span>
            <a href="#">Privacy Policy</a>
            &nbsp;&middot;&nbsp;
            <a href="terms.html">Terms of Service</a>
          </span>
        </div>

      </div>
    </footer>
  `;

  // Mount into #footer-root if it exists, otherwise append to body
  const root = document.getElementById('footer-root');
  if (root) {
    root.innerHTML = footerHTML;
  } else {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = footerHTML;
    document.body.appendChild(wrapper);
  }

})();
