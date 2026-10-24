// src/routes-list.js
//
// Flat list of every publicly indexable URL on the site.
// Used by vite-plugin-seo-files to generate sitemap.xml + robots.txt at build time.
//
// Rules:
//  - Only list REAL, fully-expanded paths (no ":params").
//  - Every path must start with "/".
//  - Keep this in sync when you add a new category or service.

// ---- Static pages ----
const STATIC_ROUTES = [
  '/',
  
];

// ---- Category landing pages (matches App.jsx: services/:service) ----
const CATEGORY_ROUTES = [
  '/services/paint-protection',
  '/services/detailing-restoration',
];

// ---- Specific service pages (matches App.jsx: services/:category/:service) ----
// These mirror CAR_SERVICES[].route from Home.jsx
const SERVICE_ROUTES = [
  '/services/paint-protection/ppf-wrapping',
  '/services/detailing-restoration/paint-correction',
  '/services/detailing-restoration/interior-detail',
];

const routesList = [
  ...STATIC_ROUTES,
  ...CATEGORY_ROUTES,
  ...SERVICE_ROUTES,
];

export default routesList;