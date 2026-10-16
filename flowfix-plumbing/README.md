# FlowFix Plumbing Co. — Website

A complete, responsive, multi-page marketing website for a plumbing and pipe repair business.

**Tagline:** Fast Response. Reliable Repairs. Peace of Mind.

## Tech Stack

- HTML5
- Tailwind CSS (via CDN with custom theme config — no build step required)
- Vanilla JavaScript
- Custom CSS (`css/style.css`)

No frontend frameworks (React, Vue, Angular, Bootstrap, jQuery) are used.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home 1 — Classic homepage |
| `home2.html` | Home 2 — Alternate, booking-focused homepage |
| `about.html` | About us, principles, team |
| `services.html` | Core plumbing services detail |
| `pricing.html` | Pricing guide and cost factors |
| `emergency.html` | Emergency plumbing guidance |
| `contact.html` | Contact info and demo booking form |

## Project Structure

```text
flowfix-plumbing/
├── index.html
├── home2.html
├── about.html
├── services.html
├── pricing.html
├── emergency.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── navbar.js      # Shared navbar markup + injection only
│   ├── footer.js      # Shared footer markup + injection only
│   └── main.js        # Theme, RTL, menu, FAQ, form, helpers
└── images/            # Local HD photographs (hero, services, team, etc.)
```

## Running Locally

This site runs with any static file server. From the `flowfix-plumbing/` folder:

### Option A — Python

```bash
python -m http.server 8080
```

### Option B — Node (npx)

```bash
npx serve .
```

### Option C — PHP

```bash
php -S localhost:8080
```

Then open `http://localhost:8080` in your browser.

> Note: Tailwind is loaded from the CDN (`cdn.tailwindcss.com`), so an internet connection is needed the first time pages load (the CDN script is cached by the browser afterwards). Fonts also load from Google Fonts.

## Build Process

**There is no build step.** Tailwind is used via the Play CDN with an inline `tailwind.config` on each page defining the brand palette:

- Primary: `#0F766E`
- Secondary: `#F59E0B`
- Surface: `#F8FAFC`
- Ink: `#1E293B`
- Accent: `#DCEFEA`
- Dark bg / surface / text: `#102A2A` / `#193B3A` / `#F8FAFC`

Custom components, animations, dark-mode refinements, RTL adjustments, FAQ, forms, and toasts live in `css/style.css`.

If you later prefer a compiled Tailwind build, replace the CDN script tags with a compiled `css/tailwind.css` generated from a Tailwind CLI config that mirrors the palette above.

## Features

- Sticky shared navbar with Home dropdown (Home 1 / Home 2), About, Services, Pricing, Emergency, Contact
- Active page highlighting
- Theme toggle (light/dark) persisted in `localStorage` (`site-theme`)
- RTL toggle persisted in `localStorage` (`site-direction`) with logical CSS properties
- Mobile hamburger menu (accessible, Escape/outside-click close)
- FAQ accordions
- Demo booking form with validation and honest success messaging (no backend)
- Service selector on Home 2
- Back-to-top button, smooth scroll, toast notifications
- Reduced-motion support and keyboard focus styles

## Placeholder Content (Replace Before Launch)

The following are intentionally marked placeholders:

- **Phone:** `(555) 010-PLUMB` / `tel:+15550100000` — in `js/navbar.js`, `js/footer.js`, and page CTAs
- **Email:** `hello@flowfixplumbing.example`
- **Address / service areas:** `[Business Address Placeholder]`, `[Area Placeholder N]`
- **Pricing:** `From ₹[amount]` and similar — demo figures only
- **Team names/bios and testimonials:** demonstration content, clearly badged
- **Social links:** placeholder `#` hrefs in the footer
- **Privacy Policy / Terms of Service:** placeholder links in the footer bottom bar

Update these in HTML, `js/navbar.js`, and `js/footer.js` with real business details before publishing.

## Images

All photographs are stored locally under `images/` (sourced from Unsplash for demo use). No remote hotlinks are used in page markup. Replace with your own licensed photography for production.

## Browser Support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses CSS logical properties, IntersectionObserver, and `localStorage`.
