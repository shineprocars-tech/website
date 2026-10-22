import PatternWaves from './PatternWaves';

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
            className="text-white/75 hover:text-white transition-colors duration-200 font-commissioner"
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
    
    {/* ============ 1. VIBRANT RED TO DEEP BLACK GRADIENT ============ */}
    {/* This creates the bright red top fading smoothly into the deep, dark bottom */}
    <div
      className="absolute inset-0 -z-30 pointer-events-none"
      style={{
        background: `
          radial-gradient(circle at 50% -20%, #ff1a3c 0%, #b3001b 30%, #4a000a 70%, #0a0002 100%)
        `,
      }}
    />

    {/* ============ 2. MOSAIC PATTERN (Screenshot Style) ============ */}
    <div className="absolute inset-0 -z-20 pointer-events-none opacity-40">
      <PatternWaves
        preset="mesh"
        color="#ffffff"          // White squares for contrast
        backgroundColor="transparent"
        fade="edges"             // Fades beautifully at the edges
        interactive={true}
        cursorSize={60}
        cursorStrength={0.8}
        pattern="square"
        wave="ripple"
        spacing={12}             // Tighter grid like the screenshot
        markSize={0.6}           // Small, sharp squares
        depth={0.3}              // Flatter texture
        light={0}
        shine={1}
        contrast={1.2}
        speed={0.5}
        scale={1}
        direction={45}
        opacity={1}
        fadeSize={0.6}
        characters="■"           // Solid squares
        intro
        paused={false}
      />
    </div>

    {/* ============ 3. SOFT LIGHT SWEEP ============ */}
    {/* Adds the glossy, moving-light effect over the pattern */}
    <div
      className="absolute -top-1/2 -left-1/4 w-[80%] h-[200%] pointer-events-none opacity-30 z-0"
      style={{
        background:
          'linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0) 100%)',
        transform: 'rotate(-15deg)',
        filter: 'blur(10px)',
      }}
    />

    {/* ============ 4. CONTENT ============ */}
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-2 md:grid-cols-[1.2fr_repeat(4,1fr)] gap-8 sm:gap-10 text-sm">
      
      {/* Brand block */}
      <div className="col-span-2 md:col-span-1">
        <div className="mb-4">
  <img
    src="https://res.cloudinary.com/djpfw1goz/image/upload/v1792641507/Shine_Pro_Cars_Racing_Logo_s7jrbd.png"
    alt="Shine Pro Cars"
    className="h-12 md:h-16 w-auto object-contain"
    loading="lazy"
    draggable={false}
  />
</div>
        <p className="text-xs text-white/70 mb-6 max-w-xs leading-relaxed font-commissioner">
          Showroom finish. Studio protection. A premium car care studio in Hosapete trusted
          across Ballari district.
        </p>
        <div className="space-y-3 mb-6">
          <a
            href="tel:+916361291895"
            className="flex items-center gap-3 text-white/90 hover:text-white transition-colors font-commissioner"
          >
            <span className="text-white/50">✆</span> +91 6361291895
          </a>
          <p className="flex items-center gap-3 text-white/90 font-commissioner">
            <span className="text-white/50">✉</span> support@shineprocars.com
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

    {/* ============ 5. BOTTOM STRIP ============ */}
    <div className="relative z-20 border-t border-white/10 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-xs text-white/50 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left font-commissioner">
        <p>© 2026 Shine Pro Car Care &amp; Spa. Hosapete.</p>
        <p>
          <span className="text-white/80">Paint protection</span> ·{' '}
          <span className="text-white/80">Detailing</span> ·{' '}
          <span className="text-white/80">Studio upgrades</span>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;