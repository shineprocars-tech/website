import PatternWaves from './PatternWaves';

// ============ BRAND COLOR TOKENS ============
const BRAND = {
  indigo: '#4f6bff',
  royalBlue: '#0504aa',
  deepBlue: '#031273',
  yellow: '#f59e0b',
  orange: '#ff4800',
  white: '#d7f2fa',
};

const FooterCol = ({ title, links }) => (
  <div>
    <h5 className="font-bold mb-4 text-white tracking-wide font-michroma">{title}</h5>
    <ul className="space-y-2.5">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-white hover:text-[#f59e0b] transition-colors duration-200 font-commissioner"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const whatsappNumber = '916361291895';
const whatsappMessage = encodeURIComponent(
  "Hi Shine Pro! I'd like a quote for PPF / ceramic coating / detailing."
);
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const Footer = () => (
  <footer className="relative mt-10 text-white overflow-hidden isolate font-commissioner bg-black">
    
    {/* 1. INDIGO TO DEEP-BLUE GRADIENT */}
    <div
      className="absolute inset-0 -z-30 pointer-events-none"
      style={{
        background: `
          radial-gradient(circle at 50% -20%, ${BRAND.indigo} 0%, ${BRAND.royalBlue} 35%, ${BRAND.deepBlue} 75%, #01081f 100%)
        `,
      }}
    />

    {/* 2. MOSAIC PATTERN */}
    <div className="absolute inset-0 -z-20 pointer-events-none opacity-40">
      <PatternWaves
        preset="mesh"
        color={BRAND.yellow}
        backgroundColor="transparent"
        fade="edges"
        interactive={true}
        cursorSize={60}
        cursorStrength={0.8}
        pattern="square"
        wave="ripple"
        spacing={12}
        markSize={0.6}
        depth={0.3}
        light={0}
        shine={1}
        contrast={1.2}
        speed={0.5}
        scale={1}
        direction={45}
        opacity={1}
        fadeSize={0.6}
        characters="■"
        intro
        paused={false}
      />
    </div>

    {/* 3. SOFT LIGHT SWEEP */}
    <div
      className="absolute -top-1/2 -left-1/4 w-[80%] h-[200%] pointer-events-none opacity-30 z-0"
      style={{
        background:
          'linear-gradient(115deg, rgba(245,158,11,0) 0%, rgba(245,158,11,0.1) 40%, rgba(245,158,11,0.25) 50%, rgba(245,158,11,0.1) 60%, rgba(245,158,11,0) 100%)',
        transform: 'rotate(-15deg)',
        filter: 'blur(10px)',
      }}
    />

    {/* 4. CONTENT */}
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-2 md:grid-cols-[1.2fr_repeat(4,1fr)] gap-8 sm:gap-10 text-sm">
      
      {/* Brand block */}
      <div className="col-span-2 md:col-span-1">
        <div className="mb-4">
          <img
            src="https://res.cloudinary.com/djpfw1goz/image/upload/v1792755135/Amber_Sports_Car_Logo_hvenck.png"
            alt="Shine Pro Cars"
            className="h-12 md:h-16 w-auto object-contain"
            loading="lazy"
            draggable={false}
          />
        </div>
        <p className="text-xs text-white mb-6 max-w-xs leading-relaxed font-commissioner">
          Showroom finish. Studio protection. A premium car care studio in Hosapete trusted
          across Ballari district.
        </p>
        <div className="space-y-3 mb-6">
          <a
            href="tel:+916361291895"
            className="flex items-center gap-3 text-white hover:text-[#f59e0b] transition-colors font-commissioner"
          >
            <span className="text-[#f59e0b]">✆</span> +91 6361291895
          </a>
          <p className="flex items-center gap-3 text-white font-commissioner">
            <span className="text-[#f59e0b]">✉</span> support@shineprocars.com
          </p>
        </div>
      </div>

      <FooterCol
        title="On this page"
        links={[
          { label: 'Services', href: '/services/paint-protection' },
          { label: 'Work', href: '/#work' },
          { label: 'Reviews', href: '/#reviews' },
          { label: 'Visit', href: '/#visit' },
        ]}
      />
      <FooterCol
        title="Contact"
        links={[
          { label: '+91 6361291895', href: 'tel:+916361291895' },
          { label: '+91 8431845633', href: 'tel:+918431845633' },
          { label: 'Saibaba Temple Road', href: '#' },
          { label: 'Hosapete, Karnataka – 583203', href: '#' },
          { label: 'Get directions', href: 'https://maps.google.com/?q=Shine+Pro+Hosapete' },
        ]}
      />
      <FooterCol
        title="Follow"
        links={[
          { label: '@shinepro_hospet', href: 'https://www.instagram.com/shinepro_hospet' },
          { label: 'WhatsApp', href: whatsappLink },
        ]}
      />
      <FooterCol
        title="Hours"
        links={[
          { label: 'Mon–Sat: 9:00 AM – 7:30 PM', href: '#' },
          { label: 'Sunday: 9:00 AM – 1:30 PM', href: '#' },
        ]}
      />
    </div>

    {/* 5. BOTTOM STRIP */}
    <div className="relative z-20 border-t border-[#f59e0b]/15 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-xs text-white flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left font-commissioner">
        <p>© 2026 Shine Pro Car Care &amp; Spa. Hosapete.</p>
        <p>
          <span className="text-white">Paint protection</span> ·{' '}
          <span className="text-white">Detailing</span> ·{' '}
          <span className="text-white">Studio upgrades</span>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;