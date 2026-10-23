import CardNav from './CardNav';

// ============ BRAND COLOR TOKENS ============
const BRAND = {
  blue: '#375E97',
  blueDark: '#2a4a75',
  blueDeep: '#1a2f4d',
  orange: '#FB6542',
  yellow: '#FFBB00',
};

const whatsappNumber = '916361291895';
const whatsappMessage = encodeURIComponent(
  "Hi Shine Pro! I'd like a quote for PPF / ceramic coating / detailing."
);
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const brandLogo = 'https://res.cloudinary.com/djpfw1goz/image/upload/v1792755135/Amber_Sports_Car_Logo_hvenck.png';

const navItems = [
  {
    label: 'Services',
    description: 'Premium paint protection, detailing, and studio upgrades.',
    links: [
      { label: 'PPF Wrapping', href: '/services/paint-protection/ppf-wrapping' },
      { label: 'Paint Correction', href: '/services/detailing-restoration/paint-correction' },
      { label: 'Interior Detail', href: '/services/detailing-restoration/interior-detail' },
    ],
  },
  {
    label: 'Visit',
    description: 'Come see us in Hosapete. Walk-ins welcome.',
    links: [
      { label: 'Location & Hours', href: '/#visit' },
      { label: 'Get Directions', href: 'https://maps.google.com/?q=Shine+Pro+Hosapete' },
      { label: 'Call Us', href: 'tel:+916361291895' },
    ],
  },
];

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pt-4 pb-2 px-4 pointer-events-none">
      <div className="pointer-events-auto w-full flex justify-center">
        <CardNav
          logo={brandLogo}
          logoAlt="Shine Pro"
          items={navItems}
          cta={{
            label: 'WhatsApp',
            href: whatsappLink,
            target: '_blank',
            rel: 'noopener noreferrer',
            // WhatsApp green preserved (platform convention)
            className: '!bg-[#25D366] !text-white hover:!bg-[#1EBE5A] border-none',
            style: { backgroundColor: '#25D366', color: '#ffffff' },
          }}
          // ============ BRAND COLOR PROPS ============
          // Passed through to CardNav so the card surfaces / accents
          // use the brand palette instead of defaults.
          accentColor={BRAND.orange}       // link hover / active accent
          highlightColor={BRAND.yellow}    // small highlights (badges, dots)
          surfaceColor={BRAND.blueDeep}    // card background base
          surfaceBorderColor={`${BRAND.blue}66`} // subtle blue border (40% alpha)
          // ==========================================
          cardEffect="rise"
          openOn="click"
          surface="glass"
          stagger={0.12}
          bounce={0.2}
          menuLabel
          speed={1}
          cardHeight={190}
          maxWidth={1000}
          intro
        />
      </div>
    </div>
  );
};

export default Navbar;