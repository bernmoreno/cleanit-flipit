# Clean It Flip It 🧹

Professional cleaning and property transformation website — built with plain HTML, CSS, and vanilla JavaScript. No frameworks or build tools required.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `services.html` | Services |
| `gallery.html` | Gallery |
| `about.html` | About Us |
| `contact.html` | Contact |
| `terms.html` | Terms & Conditions |

## Project Structure

```
cleanit_flipit/
├── index.html
├── about.html
├── contact.html
├── gallery.html
├── services.html
├── terms.html
├── css/
│   ├── style.css       # Global styles & CSS variables
│   ├── navbar.css      # Navigation styles
│   └── footer.css      # Footer styles
├── js/
│   ├── navbar.js       # Injects navbar into every page
│   ├── footer.js       # Injects footer into every page
│   └── main.js         # Shared page interactions
└── images/
    ├── logo_nobg.png
    ├── pricing.png
    └── gallery/        # Before & after gallery photos
```

## Running Locally

No build step needed. Open any HTML file directly in your browser, or use a local server:

```bash
# Using VS Code Live Server extension (recommended)
# Right-click index.html → Open with Live Server

# Or with Python
python -m http.server 8000
# Then open http://localhost:8000
```

## Deploying to GitHub Pages

See the **GitHub Pages** section below for full steps.

## License

© 2026 Clean It Flip It. All rights reserved.
