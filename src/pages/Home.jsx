import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import StatItem from '../components/StatItem';
import TagPopup from '../components/TagPopup';
import BookingModal from '../components/BookingModal';
import PatternWaves from '../components/PatternWaves';
import {
  REELS,
  heroTags,
  stats,
  packages,
  whatsappLink,
} from '../data/constants';

const CAR_IMG =
  'https://res.cloudinary.com/djpfw1goz/image/upload/v1792500469/Top-Down_Glossy_Red_Sedan_jybtlw.png';

// Core Services (Kept exactly as you had them)
const CAR_SERVICES = [
  {
    id: 'ppf',
    title: 'PPF WRAPPING',
    route: '/services/paint-protection/ppf-wrapping',
    x: 50,
    y: 25,
    side: 'left',
    img: 'https://i.pinimg.com/236x/25/93/b0/2593b0fb3a3fea6fc05be6ad73d8285d.jpg',
  },
  {
    id: 'detailing',
    title: 'PAINT CORRECTION',
    route: '/services/detailing-restoration/paint-correction',
    x: 40,
    y: 65,
    side: 'left',
    img: 'https://i.pinimg.com/1200x/a4/cd/a1/a4cda128dd0306b0fa7df38360b63488.jpg',
  },
 
  {
    id: 'interior',
    title: 'INTERIOR DETAIL',
    route: '/services/detailing-restoration/interior-detail',
    x: 50,
    y: 40,
    side: 'right',
    img: 'https://i.pinimg.com/736x/af/d3/ac/afd3acc61d561b9bd627e78058e47f85.jpg',
  },
];

// New Product Showcase Data
const PRODUCTS = [
  {
    id: 'led',
    title: 'LED HEADLIGHTS',
    subtitle: 'NIGHT VISION PRO',
    img: 'https://res.cloudinary.com/djpfw1goz/image/upload/v1792586618/Headlight_Assembly_for_2016-2019_BMW_3_Series_F30_320i_330i_340i_Sedan_Models_NON-M_Sport_xDrive_Models_Left_Driver_Side_LED_Headlight_w_LED_DRL_uhy8z0.png',
    desc: [
      'Ultra-bright 6000K output',
      'Plug-and-play installation',
      'Long-lasting LED lifespan'
    ]
  },
  {
    id: 'infotech',
    title: 'INFO TECH',
    subtitle: 'SMART DASH SYSTEM',
    img: 'https://res.cloudinary.com/djpfw1goz/image/upload/v1792587203/Continental_s_groundbreaking_transparent_Swarovski_crystal_embedded_automotive_display_rbfk0m.png',
    desc: [
      'Apple CarPlay & Android Auto',
      'High-resolution touch display',
      'Seamless Bluetooth connectivity'
    ]
  },
  {
    id: 'speakers',
    title: 'SPEAKERS',
    subtitle: 'STUDIO SOUND',
    img: 'https://res.cloudinary.com/djpfw1goz/image/upload/v1792638425/2_BOSS_CH6CK_6_5__350W_Car_2_Way_Component_Car_Audio_Speakers_System_Red_Stereo_sl8j5y.png',
    desc: [
      'Crystal clear high frequencies',
      'Deep bass response',
      'Custom sound staging'
    ]
  },
  {
    id: 'camera',
    title: '360° CAMERA',
    subtitle: 'ALL-AROUND VIEW',
    img: 'https://res.cloudinary.com/djpfw1goz/image/upload/v1792587092/360_Degree_Bird_View_Car_Camera_3D_6CH_AHD_1080P_Wide-angle_Night_Vision_IP68_Waterproof_Surround_fttwqs.png',
    desc: [
      'Bird\'s-eye parking view',
      'HD recording front & rear',
      'Night vision sensors'
    ]
  },
];


// ============ BRAND LOGOS ============
const BRANDS = [
  { id: 'brand1', name: 'Brand 1', logo: 'https://res.cloudinary.com/djpfw1goz/image/upload/v1792640151/3M_Completes_Spin-off_of_Solventum_pemzk7.png' },
  { id: 'brand2', name: 'Brand 2', logo: 'https://i.pinimg.com/1200x/cc/4c/2f/cc4c2fb541231af83ae4308fe2c2a53d.jpg' },
  { id: 'brand3', name: 'Brand 3', logo: 'https://i.pinimg.com/736x/c0/3e/e3/c03ee3fe9c5aaa6b3c153248d82b1fc1.jpg' },
  { id: 'brand4', name: 'Brand 4', logo: 'https://i.pinimg.com/1200x/c5/8b/51/c58b519c197bb01eb2ca5a7800de1723.jpg' },
  { id: 'brand5', name: 'Brand 5', logo: 'https://www.wurthindustry.ca/media/layout_wl2bootstrap/bootstrap_system_images/wuerth_logo_big.png' },
 
];


// ============ REUSABLE CARD BACKGROUND (Footer Style) ============
const CardBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit] pointer-events-none bg-black">
    <div className="absolute inset-0 z-0" style={{ background: `radial-gradient(circle at 50% -20%, #ff1a3c 0%, #b3001b 40%, #4a000a 85%, #2a0005 100%)` }} />
    <div className="absolute inset-0 z-10 opacity-40">
      <PatternWaves preset="mesh" color="#ffffff" backgroundColor="transparent" fade="edges" interactive={true} cursorSize={60} cursorStrength={0.8} pattern="square" wave="ripple" spacing={12} markSize={0.6} depth={0.3} light={0} shine={1} contrast={1.2} speed={0.5} scale={1} direction={45} opacity={1} fadeSize={0.6} characters="■" intro paused={false} />
    </div>
    <div className="absolute -top-1/2 -left-1/4 w-[80%] h-[200%] z-10 opacity-20" style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0) 100%)', transform: 'rotate(-15deg)', filter: 'blur(12px)' }} />
    <div className="absolute inset-0 z-20 bg-black/30" />
  </div>
);

const TyreMark = ({ className }) => (
  <svg viewBox="0 0 100 400" className={`w-[60px] md:w-[100px] h-[400px] pointer-events-none opacity-[0.03] ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10,0 Q30,50 50,100 T50,200 T50,300 T50,400" stroke="black" strokeWidth="2" strokeDasharray="4 6" />
    <path d="M30,0 Q50,50 70,100 T70,200 T70,300 T70,400" stroke="black" strokeWidth="3" strokeDasharray="8 4" />
    <path d="M90,0 Q70,50 50,100 T50,200 T50,300 T50,400" stroke="black" strokeWidth="2" strokeDasharray="4 6" />
  </svg>
);

const Home = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('PPF WRAPPING');
  const [statsVisible, setStatsVisible] = useState(false);
  const [tagPopup, setTagPopup] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [carProgress, setCarProgress] = useState(0);

  const statsRef = useRef(null);
  const videoRef = useRef(null);
  const sliderRef = useRef(null);
  const featurableRef = useRef(null);
  const carSectionRef = useRef(null);

  useEffect(() => {
    const scriptId = 'instagram-embed-script';
    const existing = document.getElementById(scriptId);
    const tryEmbed = () => { if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process(); };
    if (!existing) {
      const s = document.createElement('script'); s.id = scriptId; s.async = true; s.src = 'https://www.instagram.com/embed.js'; s.onload = tryEmbed; document.body.appendChild(s);
    } else { tryEmbed(); }
  }, []);

  useEffect(() => {
    const handle = () => { if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process(); };
    const el = sliderRef.current; if (!el) return;
    el.addEventListener('scroll', handle, { passive: true });
    return () => el.removeEventListener('scroll', handle);
  }, []);

  useEffect(() => {
    const scriptId = 'featurable-embed-script';
    if (!document.getElementById(scriptId)) {
      const s = document.createElement('script'); s.id = scriptId; s.async = true; s.defer = true; s.charset = 'UTF-8'; s.src = 'https://cdn.featurable.com/widget/v2/embed.js'; document.body.appendChild(s);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (!isMuted) videoRef.current.play().catch(() => {});
    }
  }, [isMuted]);

  useEffect(() => {
    const onScroll = () => {
      const el = carSectionRef.current; if (!el) return;
      const rect = el.getBoundingClientRect(); const vh = window.innerHeight;
      const start = vh; const end = -vh * 1.0;
      setCarProgress(Math.min(1, Math.max(0, (start - rect.top) / (start - end))));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollSlider = (dir) => {
    const el = sliderRef.current; if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const carPhase = Math.min(1, carProgress / 0.3);
  const cardsPhase = Math.max(0, (carProgress - 0.3) / 0.3);
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const easedCar = ease(carPhase);
  const carY = (1 - easedCar) * 80;
  const carScale = 0.7 + easedCar * 0.3;
  const carOpacity = 0.1 + easedCar * 0.9;

  return (
    <div className="relative overflow-x-clip w-full font-commissioner">
      {/* Tyre Marks */}
      <div className="absolute inset-0 max-w-[1920px] mx-auto pointer-events-none z-0 hidden xl:block">
        <div className="absolute top-[15%] left-[2%] rotate-12 mix-blend-multiply"><TyreMark /></div>
        <div className="absolute top-[45%] left-[4%] -rotate-6 mix-blend-multiply"><TyreMark /></div>
        <div className="absolute top-[75%] left-[1%] rotate-[24deg] mix-blend-multiply"><TyreMark /></div>
        <div className="absolute top-[20%] right-[2%] -rotate-[15deg] mix-blend-multiply"><TyreMark /></div>
        <div className="absolute top-[50%] right-[5%] rotate-6 mix-blend-multiply"><TyreMark /></div>
        <div className="absolute top-[80%] right-[3%] -rotate-[30deg] mix-blend-multiply"><TyreMark /></div>
      </div>

      <div className="relative z-10">
        
        {/* ============ HERO ============ */}
        <section className="relative w-full h-[85vh] min-h-[750px] overflow-hidden bg-black">
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-80" src="https://res.cloudinary.com/djpfw1goz/video/upload/v1790937156/Video_Project_7_safiwo.mp4" autoPlay loop muted playsInline preload="auto" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-black/50 to-transparent pointer-events-none" />
          <button onClick={() => setIsMuted((m) => !m)} className="absolute top-100 right-4 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center shadow-lg border border-white/30 transition-all duration-200">
            {isMuted ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>}
          </button>
          <div className="absolute bottom-0 left-0 right-0 pb-8 md:pb-12 px-6">
            <div className="max-w-7xl mx-auto">
              <p className="text-rose-400 text-xs md:text-sm font-semibold mb-3 tracking-wider uppercase font-michroma">Hosapete · Car care & spa</p>
            <h2 className="text-white font-light uppercase leading-[0.85] tracking-tighter text-[18vw] md:text-[9rem] font-zen-dots">
  Shine Pro <span className="text-[#cc0000]">CARS</span>
  <span className="font-black text-[#cc0000] italic tracking-[-0.15em]">\\\</span>
</h2>
              <p className="mt-3 text-white/90 text-sm md:text-base max-w-xl">Showroom finish. Studio protection.</p>
              
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a href="tel:+916361291895" className="bg-gradient-to-r from-red-700 to-rose-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full font-michroma hover:scale-105 transition-transform">Call</a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white text-sm font-semibold px-5 py-2.5 rounded-full font-michroma hover:scale-105 transition-transform">WhatsApp</a>
                <a href="https://maps.google.com/?q=Shine+Pro+Hosapete" target="_blank" rel="noopener noreferrer" className="text-white text-sm border border-white/30 rounded-full px-5 py-2.5 font-michroma hover:bg-white/10 transition">Directions</a>

                {/* ============ NEW: GOOGLE REVIEW BADGE ============ */}
                <a 
                  href="https://www.google.com/maps/place/Shinepro/@15.2643485,76.3707051,828m/data=!3m1!1e3!4m8!3m7!1s0x3bb9d734f52af0a9:0xa5f36ca8284e41b5!8m2!3d15.2643485!4d76.37328!9m1!1b1!16s%2Fg%2F11mw77dt_f?entry=ttu&g_ep=EgoyMDI2MTAxOC4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300 ml-0 md:ml-2"
                >
                  <div className="flex text-orange-400 text-sm md:text-base tracking-tighter">
                    ★★★★★
                  </div>
                  <div className="flex items-center gap-1.5 text-white/90 text-xs md:text-sm font-semibold font-commissioner group-hover:text-white transition-colors">
                    4.9 <span className="text-white/50 font-normal">(218)</span>
                  </div>
                </a>
                {/* ==================================================== */}

              </div>
            </div>
          </div>
        </section>

        {/* ============ ABOUT US (GAP REDUCED ON MOBILE) ============ */}
        <section className="relative w-full bg-[#fdfdfd] overflow-hidden flex flex-col md:flex-row md:min-h-[600px] lg:min-h-[700px]">
          <div className="relative w-full md:w-[55%] p-8 md:p-16 lg:p-24 flex flex-col justify-center z-20 bg-[#0c0c0c] order-1 md:order-1">
            <div className="absolute inset-0 opacity-10 pointer-events-none -z-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
            <div className="max-w-md">
              <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-wider mb-6 md:mb-8 flex items-center gap-4 font-michroma">
                ABOUT <span className="text-[#cc0000]">US</span> <span className="text-[#cc0000] text-4xl md:text-5xl leading-none italic font-serif">///</span>
              </h2>
              <p className="text-gray-300 text-sm md:text-[15px] leading-relaxed mb-4 md:mb-6 font-commissioner">
                <strong className="text-white font-bold">EST. 2016 IN HOSAPETE.</strong> Shine Pro has risen from humble beginnings to become the certified leader in premium car care.
              </p>
              <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed mb-6 md:mb-10 font-commissioner">
                Our success is built on one singular goal and philosophy — to deliver the absolute highest quality paint protection, detailing, and studio upgrades to our customers.
              </p>
            </div>
          </div>
          <div className="relative w-full md:absolute md:top-0 md:right-0 md:w-[60%] md:h-full z-0 flex items-center justify-center order-2 md:order-2 py-8 md:py-0">
            {/* REDUCED: -translate-y-65 to -translate-y-24 for mobile to reduce gap */}
            <div className="relative w-full flex items-center justify-center md:h-full -translate-y-54 md:translate-y-0">
              <div className="relative w-[450px] md:w-[650px] max-w-[90vw] aspect-square flex items-center justify-center md:-translate-x-75">
                <img src="https://res.cloudinary.com/djpfw1goz/image/upload/v1792497673/Glossy_Red_Brixton_Performance_Wheel_yoylv5.png" alt="Premium Car Wheel" className="w-full h-full object-contain animate-spin-slow" />
              </div>
            </div>
          </div>
        </section>

        {/* ============ SERVICES (GAP REDUCED ON MOBILE) ============ */}
        {/* REDUCED: pt-20 to pt-12, pb-20 to pb-12 */}
        <section id="services" ref={carSectionRef} className="relative max-w-7xl mx-auto px-6 pt-5 md:pt-20 pb-12 md:pb-20 overflow-hidden">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6E0019] uppercase tracking-wider mb-3 font-michroma">
            <span className="font-mono text-sm font-bold animate-pulse">&gt;</span> Services
          </div>
          <h3 className="text-3xl md:text-5xl font-light leading-tight max-w-3xl mb-4 font-zen-dots">Everything your car needs, under one roof</h3>
          
          {/* REDUCED: h-[120vh] to h-[90vh] on mobile so it doesn't scroll forever */}
          <div className="relative w-full h-[90vh] md:h-[120vh]">
            <div className="sticky top-32 md:top-96 h-[105vh] md:h-screen flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `translateY(${carY}vh) scale(${carScale})`, opacity: carOpacity }}>
                <img src={CAR_IMG} alt="Car top view" className="w-[95%] md:w-[70%] max-h-[60vh] md:max-h-[80vh] object-contain pointer-events-none" draggable={false} />
              </div>
              <div className="absolute inset-0 pointer-events-none" style={{ opacity: cardsPhase }}>
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {CAR_SERVICES.map((s) => (
                    <g key={s.id}>
                      <line x1={s.x} y1={s.y} x2={s.side === 'left' ? 12 : 88} y2={s.y} stroke="#6E0019" strokeWidth="0.45" strokeDasharray="1.5 1" vectorEffect="non-scaling-stroke" />
                      <circle cx={s.x} cy={s.y} r="0.9" fill="#6E0019" />
                    </g>
                  ))}
                </svg>
                {CAR_SERVICES.map((s) => (
                  <span key={`dot-${s.id}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-[#6E0019] border-2 border-white" />
                    </span>
                  </span>
                ))}
                {CAR_SERVICES.map((s, i) => {
                  const delay = i * 0.02;
                  const local = Math.min(1, Math.max(0, (cardsPhase * 1.5 - delay) / (1 - delay)));
                  const xShift = s.side === 'left' ? -24 : 24;
                  return (
                    <Link
                      key={s.id} to={s.route}
                      className="absolute pointer-events-auto block w-[40%] md:w-[24%] max-w-[160px] md:max-w-[200px]"
                      style={{
                        left: s.side === 'left' ? '2%' : 'auto',
                        right: s.side === 'right' ? '2%' : 'auto',
                        top: `calc(${s.y}% - 40px)`,
                        opacity: local,
                        transform: `translateX(${(1 - local) * xShift}px)`,
                        transition: 'opacity 0.12s ease-out, transform 0.12s ease-out',
                      }}
                    >
                      <div className="relative rounded-xl overflow-hidden isolate shadow-lg group border border-white/10 bg-[#4B0012]">
                        <CardBackground />
                        <div className="relative z-30 aspect-[4/3] overflow-hidden">
                          <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="relative z-30 p-2 md:p-3 bg-black/40 backdrop-blur-sm">
                          <span className="inline-block bg-white text-[#6E0019] text-[8px] md:text-[10px] font-bold px-2 py-0.5 rounded-full font-michroma mb-1">Get Quote</span>
                          <h4 className="text-white font-black text-[10px] md:text-sm uppercase leading-tight font-michroma">{s.title}</h4>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============ BRAND LOGOS MARQUEE ============ */}
<section className="relative w-full bg-[#fcf7f7] py-12 md:py-16 overflow-hidden border-t border-white/5">
  <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-8">
    <div className="flex items-center gap-3 text-[10px] md:text-xs font-michroma text-gray-500 tracking-widest uppercase">
      <span className="w-8 h-px bg-gray-700"></span>
      Trusted by premium brands
    </div>
  </div>

  {/* Marquee wrapper */}
  <div className="relative overflow-hidden group">
    {/* Gradient fade edges */}
    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#f8e0e0] to-transparent z-10 pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#f5d8d8] to-transparent z-10 pointer-events-none" />

    {/* Scrolling track */}
    <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
      {/* Duplicate the list twice for seamless loop */}
      {[...BRANDS, ...BRANDS].map((brand, idx) => (
        <div
          key={`${brand.id}-${idx}`}
          className="shrink-0 mx-6 md:mx-12 flex items-center justify-center"
        >
          <img
            src={brand.logo}
            alt={brand.name}
            className="h-10 md:h-14 w-auto object-contain  transition-all duration-300"
            loading="lazy"
            draggable={false}
          />
        </div>
      ))}
    </div>
  </div>
</section>





        {/* ============ PRODUCT SHOWCASE ============ */}
        <section className="relative w-full bg-[#050505] py-20 overflow-hidden border-y border-white/5">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
              <div className="flex items-center gap-6">
                 <div>
                  <h2 className="font-michroma text-white tracking-widest text-sm md:text-4xl mb-1">PRODUCT SHOWCASE</h2>
                  <p className="text-[10px] md:text-xs text-gray-500 font-commissioner tracking-widest uppercase">
                    Engineered to perform.<br className="hidden md:block"/> Designed to stand apart.
                  </p>
                </div>
              </div>
              <div className="text-left md:text-right font-michroma text-[10px] md:text-xs text-gray-400 tracking-widest">
                SHINE PRO KIT <span className="text-gray-600 mx-2">|</span> 2026
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PRODUCTS.map((prod) => (
                <div 
                  key={prod.id} 
                  className="group relative bg-[#0a0a0a] h-[500px] lg:h-[600px] flex flex-col justify-between p-6 md:p-8 overflow-hidden transition-all duration-500 hover:bg-[#111]"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500" 
                       style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <h3 className="font-michroma text-xl md:text-2xl text-white uppercase tracking-wider mb-2">{prod.title}</h3>
                      <p className="font-commissioner text-[10px] md:text-xs text-gray-400 tracking-widest uppercase mb-6">{prod.subtitle}</p>
                      
                      {/* Features are always visible */}
                      <ul className="space-y-1.5 transition-opacity duration-500">
                        {prod.desc.map((d, i) => (
                          <li key={i} className="text-[10px] md:text-xs text-gray-500 font-commissioner flex items-center gap-2">
                            <span className="w-1 h-1 bg-white/40 rounded-full" /> {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center top-20 p-8 pointer-events-none">
                    <img 
                      src={prod.img} 
                      alt={prod.title} 
                      className="w-[120%] max-w-[300px] object-contain transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3 opacity-80 group-hover:opacity-100" 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-center gap-4 text-[10px] md:text-xs font-michroma text-gray-500 tracking-widest uppercase">
              <span className="w-8 h-px bg-gray-700"></span>
              BUILT FOR THE ONES WHO DON'T STOP.
            </div>

          </div>
        </section>

        {/* ============ OUR WORK ============ */}
        <section id="work" className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 overflow-hidden">
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-950 to-red-900 text-rose-200 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-5 border border-red-800 font-michroma">
                  <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" /></span>
                  Our work
                </div>
                <h3 className="text-4xl md:text-6xl font-light mb-4 leading-[1.1] tracking-tight font-zen-dots">
                  Results that speak <br className="hidden md:block" /> for <span className="font-semibold bg-gradient-to-r from-red-700 via-rose-600 to-red-500 bg-clip-text text-transparent">themselves</span>
                </h3>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={() => scrollSlider(-1)} className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-red-200 bg-white/80 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg></button>
                <button onClick={() => scrollSlider(1)} className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-red-200 bg-white/80 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg></button>
              </div>
            </div>

            <div ref={sliderRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-10 -mx-6 px-6 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {REELS.map((url) => (
                <div key={url} className="snap-start shrink-0 w-[300px] sm:w-[330px] md:w-[350px] group">
                  <div className="relative rounded-[28px] overflow-hidden isolate shadow-lg group-hover:-translate-y-2 transition-all duration-500 border border-white/10 bg-[#4B0012]">
                    <CardBackground />
                    <div className="relative z-30 flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/30">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative w-9 h-9 shrink-0">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 animate-spin-slow" />
                          <div className="absolute inset-[2px] rounded-full bg-[#6E0019] flex items-center justify-center"><span className="text-[10px] font-black text-white font-michroma">SP</span></div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate font-michroma">shinepro_hospet</p>
                          <p className="text-[10px] text-rose-200/70 truncate font-commissioner">Hosapete · Car care</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative z-30 p-2 pt-3 min-h-[500px] flex items-start justify-center">
                      <blockquote className="instagram-media" data-instgrm-captioned data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`} data-instgrm-version="14" style={{ background: '#FFF', border: 0, borderRadius: '16px', margin: 0, minWidth: '260px', padding: 0, width: '100%' }}>
                        <a href={`${url}?utm_source=ig_embed&utm_campaign=loading`} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: '#FFFFFF', lineHeight: 0, padding: '60px 0', textAlign: 'center', textDecoration: 'none', width: '100%', color: '#3897f0', fontSize: 14, borderRadius: '16px' }}>View this post on Instagram</a>
                      </blockquote>
                    </div>
                    <div className="relative z-30 px-4 py-3 border-t border-white/10 bg-black/40 flex items-center justify-end">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-wider text-rose-200 hover:text-white flex items-center gap-1 font-michroma">Open →</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PACKAGES ============ */}
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h3 className="text-3xl md:text-5xl font-light mb-12 font-zen-dots">Popular packages</h3>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {packages.map((pkg) => (
              <div
                key={pkg.name} onClick={() => setSelectedPackage(pkg.name)}
                className={`relative isolate overflow-hidden cursor-pointer rounded-3xl p-8 text-left transition-all duration-300 border border-white/10 shadow-xl bg-[#4B0012] ${pkg.featured ? 'md:-translate-y-4 ring-2 ring-rose-500/40' : ''} ${selectedPackage === pkg.name ? 'ring-2 ring-rose-400 shadow-2xl' : ''}`}
              >
                <CardBackground />
                <div className="relative z-30">
                  <h4 className="text-xl md:text-2xl font-bold mb-4 text-center text-white font-michroma">{pkg.name}</h4>
                  <p className="text-sm text-rose-100/70 mb-6 text-center font-commissioner">{pkg.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-rose-50/90 font-commissioner">
                        <span className="text-rose-300 mt-0.5">✔</span> {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={(e) => { e.stopPropagation(); setBookingOpen(true); }} className="w-full bg-gradient-to-r from-red-700 to-rose-600 text-white font-semibold py-3 rounded-full font-michroma hover:scale-105 transition-transform shadow-lg shadow-red-950/40">
                    {pkg.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ REVIEWS ============ */}
        <section id="reviews" className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h3 className="text-3xl md:text-5xl font-light mb-3 font-zen-dots">Loved by car owners across Hosapete</h3>
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="text-4xl font-black font-michroma">4.9</span>
            <div className="text-left">
              <div className="text-orange-400 text-lg">★★★★★</div>
              <p className="text-xs text-gray-500 font-commissioner">218 reviews</p>
            </div>
          </div>
          <div ref={featurableRef} id="featurable-258a4c79-d580-4efa-bf06-cbba19ab6cc8" data-featurable-async></div>
        </section>

        {/* ============ VISIT ============ */}
        <section id="visit" className="max-w-7xl mx-auto px-6 py-16">
          <h3 className="text-3xl md:text-4xl font-light mb-3 font-zen-dots">Visit the studio</h3>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="relative isolate overflow-hidden rounded-3xl p-8 border border-white/10 shadow-xl bg-[#4B0012]">
              <CardBackground />
              <div className="relative z-30">
                <h4 className="text-lg font-bold mb-6 text-white font-michroma">Quick contact</h4>
                <div className="space-y-5">
                  <div>
                    <p className="text-xs text-rose-300/80 mb-1 font-michroma uppercase tracking-wider">Call now</p>
                    <a href="tel:+916361291895" className="text-lg font-semibold text-white hover:text-rose-200 transition font-commissioner">+91 6361291895</a>
                  </div>
                  <div>
                    <p className="text-xs text-rose-300/80 mb-1 font-michroma uppercase tracking-wider">WhatsApp</p>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#25D366] text-white text-sm font-semibold px-5 py-2.5 rounded-full font-michroma hover:scale-105 transition-transform">Message us</a>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-rose-300/80 mb-2 font-michroma uppercase tracking-wider">Studio hours</p>
                    <p className="text-sm text-rose-100/90 font-commissioner">Mon – Sat: 9:00 AM – 7:30 PM</p>
                    <p className="text-sm text-rose-100/90 font-commissioner">Sun: 9:00 AM – 1:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-white/10">
              <img src="https://i.pinimg.com/1200x/81/e4/f2/81e4f22d507b3575386f46807e703c3c.jpg" alt="Shine Pro studio" className="w-full h-full min-h-[420px] object-cover" />
            </div>
          </div>
          <div className="relative isolate mt-8 overflow-hidden rounded-3xl p-8 grid md:grid-cols-2 gap-6 items-center border border-white/10 shadow-xl bg-[#4B0012]">
            <CardBackground />
            <div className="relative z-30">
              <h4 className="text-lg font-bold mb-3 text-white font-michroma">Studio address</h4>
              <p className="text-sm text-rose-100/90 leading-relaxed mb-3 font-commissioner">
                Saibaba Temple Road, behind Gujjal Petrol Bunk<br />Hosapete, Karnataka – 583203
              </p>
              <p className="text-xs text-rose-300/70 font-commissioner">Plus Code: 797F+P8</p>
            </div>
            <div className="relative z-30">
              <a href="https://maps.google.com/?q=Shine+Pro+Hosapete" target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-red-700 to-rose-600 text-white font-semibold px-6 py-3 rounded-full font-michroma hover:scale-105 transition-transform shadow-lg shadow-red-950/40">
                Get directions
              </a>
            </div>
          </div>
        </section>

      </div>

      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} selectedPackage={selectedPackage} />}
      {tagPopup && <TagPopup tag={tagPopup} onClose={() => setTagPopup(null)} />}
    </div>
  );
};

export default Home;