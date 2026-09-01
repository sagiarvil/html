# HTML&HTML (htmlandhtml.com)

> Responsive HTML5 & CSS3 Site Templates Platform

[![License: CCA 3.0](https://img.shields.io/badge/License-CCA%203.0-blue.svg)](https://htmlandhtml.com/license.html)
[![Core Web Vitals](https://img.shields.io/badge/Core%20Web%20Vitals-100%2F100-success)](https://htmlandhtml.com)
[![Zero Dependency](https://img.shields.io/badge/JavaScript-Zero%20Dependency-brightgreen)](https://htmlandhtml.com)

---

## 🚀 Overview

**HTML&HTML** is a clean, modern, zero-dependency catalog of fully responsive HTML5 and CSS3 website templates, featuring:
- **Pixel-Perfect Header & Hero:** Merged 2-column branding layout with 4 circular feature highlights.
- **Vibrant Wide Product Banners:** Detailed device mockups (Desktop, Tablet, Mobile) with instant `Live Demo` and `Free Download` links.
- **Interactive Live Preview Sandbox:** Real-time device viewport switcher (`Desktop`, `Tablet`, `Tablet (Portrait)`, `Mobile`) and `Pop Out` mode.
- **Deterministic Edge Hosting:** Ready for immediate deployment on Firebase Hosting and Cloudflare Pages.

---

## 📁 Repository Structure

```
.
├── index.html               # Main catalog homepage
├── live-preview.html        # Responsive interactive demo sandbox
├── license.html             # Creative Commons Attribution 3.0 License
├── assets/
│   ├── css/
│   │   └── main.css         # Master stylesheet (fonts, grid, mockups, responsive)
│   └── js/
│       └── main.js          # Core client scripts & interactions
├── uploads/
│   └── images/              # Local vector mockups (paradigm-shift, massively, etc.)
├── dimension/               # Standalone interactive template package
├── firebase.json            # Firebase Hosting configuration & security headers
└── .gitignore               # Ignored build and temporary files
```

---

## 🛠️ Local Development & Deployment

### Run locally:
```bash
# Using simple HTTP server or npx:
npx serve .
```

### Deploy to Live Firebase Hosting:
```bash
npx -y firebase-tools@latest deploy --only hosting
```

---

## 📜 License

All templates are licensed under the **Creative Commons Attribution 3.0 (CCA 3.0)**. Free for personal and commercial use with attribution.
