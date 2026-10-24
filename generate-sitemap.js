import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://shineprocars.com'; // Your live domain

const routes = [
  '/',
  '/videos',
  '/services/paint-protection',
  '/services/detailing-restoration',
  '/services/paint-protection/ppf-wrapping',
  '/services/detailing-restoration/paint-correction',
  '/services/detailing-restoration/interior-detail',
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

// Write it directly to the public folder
fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml generated successfully!');