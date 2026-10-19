import React, { useState, useEffect, useRef } from 'react';

/* =========================================================
   SHINE PRO — Car Care & Spa, Hosapete
   Single File React Component
   Includes Instagram Reels slider in "Our Work" section.
   Includes Featurable Google Reviews widget.
   ========================================================= */

const REELS = [
  'https://www.instagram.com/reel/DFwok7jPgJn/',
  'https://www.instagram.com/reel/DJFL3UXBTTP/',
  'https://www.instagram.com/reel/DJCphFAhShG/',
  'https://www.instagram.com/reel/DNLdI7NvhED/',
];

const CarDetail = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeService, setActiveService] = useState('Paint protection');
  const [selectedPackage, setSelectedPackage] = useState('PPF WRAPPING');
  const [statsVisible, setStatsVisible] = useState(false);
  const [tagPopup, setTagPopup] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  const statsRef = useRef(null);
  const videoRef = useRef(null);
  const sliderRef = useRef(null);
  const featurableRef = useRef(null);

  /* ---------- WhatsApp ---------- */
  const whatsappNumber = '916361291895';
  const whatsappMessage = encodeURIComponent(
    "Hi Shine Pro! I'd like a quote for PPF / ceramic coating / detailing."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  /* ---------- Load Instagram embed script once ---------- */
  useEffect(() => {
    const scriptId = 'instagram-embed-script';
    const existing = document.getElementById(scriptId);

    const tryEmbed = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    };

    if (!existing) {
      const s = document.createElement('script');
      s.id = scriptId;
      s.async = true;
      s.src = 'https://www.instagram.com/embed.js';
      s.onload = tryEmbed;
      document.body.appendChild(s);
    } else {
      tryEmbed();
    }
  }, []);

  /* Re-run embed processing when slider scrolls (for lazy-loaded embeds) */
  useEffect(() => {
    const handle = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    };
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener('scroll', handle, { passive: true });
    return () => el.removeEventListener('scroll', handle);
  }, []);

  /* ---------- Load Featurable Google Reviews widget script ---------- */
  useEffect(() => {
    const scriptId = 'featurable-embed-script';
    const existing = document.getElementById(scriptId);

    if (!existing) {
      const s = document.createElement('script');
      s.id = scriptId;
      s.async = true;
      s.defer = true;
      s.charset = 'UTF-8';
      s.src = 'https://cdn.featurable.com/widget/v2/embed.js';
      document.body.appendChild(s);
    }
  }, []);

  /* ---------- Inject Commissioner font ---------- */
  useEffect(() => {
    const id = 'commissioner-font';
    if (document.getElementById(id)) return;

    const pre1 = document.createElement('link');
    pre1.rel = 'preconnect';
    pre1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(pre1);

    const pre2 = document.createElement('link');
    pre2.rel = 'preconnect';
    pre2.href = 'https://fonts.gstatic.com';
    pre2.crossOrigin = 'anonymous';
    document.head.appendChild(pre2);

    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Commissioner:wght@100..900&display=swap';
    document.head.appendChild(link);
  }, []);

  /* ---------- Stats observer ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  /* ---------- Sync hero mute ---------- */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (!isMuted) videoRef.current.play().catch(() => {});
    }
  }, [isMuted]);

  /* ---------- Hero tags ---------- */
  const heroTags = [
    {
      label: 'PPF',
      title: 'Paint Protection Film',
      image:
        'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=900&auto=format&fit=crop',
      description:
        'Troro premium paint protection film — shields factory paint from stone chips, swirls, and UV damage.',
    },
    {
      label: 'Ceramic',
      title: 'Ceramic Coating',
      image:
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&auto=format&fit=crop',
      description:
        '9H-grade ceramic layer that locks in gloss, repels water, and keeps your car easier to clean.',
    },
    {
      label: 'Graphene',
      title: 'Graphene Coating',
      image:
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&auto=format&fit=crop',
      description:
        'Next-gen graphene coating — extra slickness, better heat resistance, long-lasting shine.',
    },
    {
      label: 'Detailing',
      title: 'Detailing & Restoration',
      image:
        'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&auto=format&fit=crop',
      description:
        'Deep interior and exterior care — premium wash, fabric/leather treatment, headlight, AC restoration.',
    },
    {
      label: 'Accessories',
      title: 'Studio Upgrades',
      image:
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&auto=format&fit=crop',
      description:
        'Infotainment, 360° camera, dash cam, speakers, 7D/3D mats, custom interiors — installed with care.',
    },
    {
      label: 'Protection',
      title: 'Protection Extras',
      image:
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=900&auto=format&fit=crop',
      description:
        'Under-chassis coat, silencer coat, sun films and rat mesh — built for Indian roads and weather.',
    },
  ];

  const topServiceCards = [
    {
      title: 'PPF WRAPPING',
      img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop',
    },
    {
      title: 'CERAMIC COATING',
      img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&auto=format&fit=crop',
    },
    {
      title: 'DETAILING & RESTORATION',
      img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&auto=format&fit=crop',
    },
    {
      title: 'STUDIO UPGRADES',
      img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop',
    },
  ];

  const serviceTabs = [
    'Paint protection',
    'Detailing & restoration',
    'Protection extras',
    'Studio upgrades',
  ];

  const serviceImages = {
    'Paint protection':
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&auto=format&fit=crop',
    'Detailing & restoration':
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1400&auto=format&fit=crop',
    'Protection extras':
      'https://images.unsplash.com/photo-1605618313023-d8bc9c9d3e91?w=1400&auto=format&fit=crop',
    'Studio upgrades':
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1400&auto=format&fit=crop',
  };

  const serviceDetails = {
    'Paint protection': [
      'PPF wrapping',
      'Ceramic coating',
      'Graphene coating',
      'Polymer coat',
    ],
    'Detailing & restoration': [
      'Premium car wash',
      'Interior enrichment',
      'Fabric & leather treatment',
      'Windshield & headlight restoration',
      'AC restoration',
    ],
    'Protection extras': [
      'Under-chassis coat',
      'Silencer coat',
      'Sun films',
      'Rat mesh',
    ],
    'Studio upgrades': [
      'Infotainment systems',
      '360° camera',
      'Dash camera',
      'Speakers & amplifiers',
      '7D & 3D mats',
      'Premium seat covers',
      'Custom interiors',
    ],
  };

  const stats = [
    { value: 218, label: 'Google Reviews', suffix: '+' },
    { value: 49, label: 'Rating (out of 50)', suffix: '' },
    { value: 1000, label: 'Cars Protected', suffix: '+' },
  ];

  const packages = [
    {
      name: 'PPF WRAPPING',
      desc: 'Troro premium paint protection film for glossy SUVs and daily-driven cars.',
      features: [
        'Self-healing top coat',
        'Stone-chip protection',
        'UV & swirl resistance',
        'Warranty-backed film',
      ],
      buttonText: 'Get a Quote',
      featured: false,
    },
    {
      name: 'CERAMIC + GRAPHENE',
      desc: 'Our most-booked protection combo — deep gloss, easy cleaning, long life.',
      features: [
        '9H ceramic layer',
        'Graphene top coat',
        'Hydrophobic finish',
        'Showroom-grade shine',
        '1–3 year protection',
      ],
      buttonText: 'Get a Quote',
      featured: true,
    },
    {
      name: 'DETAIL + UPGRADES',
      desc: 'Full detailing plus studio upgrades — infotainment, 360° cam, interiors.',
      features: [
        'Premium car wash',
        'Interior enrichment',
        '360° camera install',
        'Infotainment upgrade',
        'Custom interiors',
      ],
      buttonText: 'Get a Quote',
      featured: false,
    },
  ];

  const testimonials = [
    {
      quote:
        '"Got PPF done for my new Mahindra 3XO — attention to detail and finish were top-notch. Owner Guru was extremely friendly and professional throughout."',
      name: 'Pratham',
      role: 'Mahindra 3XO',
      avatar: 'https://i.pravatar.cc/100?img=15',
    },
    {
      quote:
        '"PPF work is nothing short of excellent. Interior work was done exceptionally well."',
      name: 'Balaji Singh',
      role: 'Scorpio',
      avatar: 'https://i.pravatar.cc/100?img=52',
    },
    {
      quote:
        '"Mr. Gururaj explained PPF vs ceramic coating clearly. Materials are branded and original."',
      name: 'Sandesh Pai',
      role: 'Customer',
      avatar: 'https://i.pravatar.cc/100?img=33',
    },
    {
      quote:
        '"Graphene coating made my Polo look like a showroom vehicle. Workmanship was really good."',
      name: 'Praveen C',
      role: 'Polo GT TSI',
      avatar: 'https://i.pravatar.cc/100?img=8',
    },
    {
      quote:
        '"360° camera with infotainment installed with precision. Very humble, dedicated team."',
      name: 'Sanath',
      role: 'Fortuner Leader',
      avatar: 'https://i.pravatar.cc/100?img=68',
    },
  ];

  const useCounter = (target, start) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!start) return;
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCount(current);
      }, 25);
      return () => clearInterval(timer);
    }, [start, target]);
    return count;
  };

  /* ---------- Slider navigation ---------- */
  const scrollSlider = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  /* ============== RENDER ============== */
  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Commissioner',sans-serif] antialiased">
      {/* ============ NAVBAR ============ */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-black tracking-tight italic">
            SHINE <span className="not-italic">PRO</span>
          </h1>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[
              { label: 'Services', href: '#services' },
              { label: 'Work', href: '#work' },
              { label: 'Reviews', href: '#reviews' },
              { label: 'Visit', href: '#visit' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-orange-500 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:+916361291895"
              className="hidden md:inline-block bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Call
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block text-sm font-medium text-gray-700 hover:text-orange-500 transition"
            >
              WhatsApp
            </a>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-0.5 bg-black mb-1.5" />
              <div className="w-6 h-0.5 bg-black mb-1.5" />
              <div className="w-6 h-0.5 bg-black" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3">
            {['Services', 'Work', 'Reviews', 'Visit'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-sm font-medium hover:text-orange-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="tel:+916361291895"
              className="block w-full text-center bg-yellow-400 text-black text-sm font-semibold py-2.5 rounded-full"
            >
              Call +91 6361291895
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#25D366] text-white text-sm font-semibold py-2.5 rounded-full"
            >
              WhatsApp
            </a>
          </div>
        )}
      </header>

      {/* ============ HERO ============ */}
      <section className="relative w-full h-[85vh] min-h-[560px] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/djpfw1goz/video/upload/v1790937156/Video_Project_7_safiwo.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

        <button
          onClick={() => setIsMuted((m) => !m)}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center shadow-lg border border-white/30 transition-all duration-200 hover:scale-110 active:scale-95"
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>

        <div className="hidden md:flex flex-col items-end gap-3 absolute right-8 top-1/2 -translate-y-1/2 z-10">
          {heroTags.map((tag) => (
            <button
              key={tag.label}
              onClick={() => setTagPopup(tag)}
              className="inline-flex items-center bg-yellow-400 hover:bg-white backdrop-blur-sm text-gray-800 hover:text-orange-600 text-xs font-semibold px-4 py-2 rounded-full shadow-lg border border-white/40 transition-all duration-200 hover:scale-105 hover:translate-x-[-4px] active:scale-95"
            >
              {tag.label}
            </button>
          ))}
        </div>

        <div className="md:hidden absolute top-4 left-0 right-0 px-4 flex flex-wrap gap-2 justify-center z-10">
          {heroTags.map((tag) => (
            <button
              key={tag.label}
              onClick={() => setTagPopup(tag)}
              className="bg-white/85 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow"
            >
              {tag.label}
            </button>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 pb-8 md:pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-yellow-400 text-xs md:text-sm font-semibold mb-3 tracking-wider uppercase">
              Hosapete · Car care & spa
            </p>
            <h2 className="text-white font-light uppercase leading-[0.85] tracking-tighter text-[18vw] md:text-[9rem]">
              Shine Pro
            </h2>
            <p className="mt-3 text-white/90 text-sm md:text-base max-w-xl">
              Showroom finish. Studio protection.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="tel:+916361291895"
                className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Call +91 6361291895
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5A] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              >
                WhatsApp
              </a>
              <a
                href="https://maps.google.com/?q=Shine+Pro+Hosapete"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 text-sm border border-white/30 rounded-full px-5 py-2.5 backdrop-blur-sm hover:bg-white/10 transition"
              >
                Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FLOATING INFO — 3 CARDS ============ */}
      <section className="relative max-w-7xl mx-auto px-6 -mt-16 md:-mt-9 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden p-6 flex flex-col justify-between min-h-[200px] transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
            <div className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
              Google rating
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-black text-gray-900">4.9</span>
              <span className="text-orange-400 text-lg">★★★★★</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">218+ reviews from real customers</p>
          </div>

          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden p-6 flex flex-col justify-between min-h-[200px] transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
            <div className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
              Location
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">Hosapete</p>
            <p className="text-sm text-gray-500 mt-2">Saibaba Temple Road, behind Gujjal Petrol Bunk</p>
          </div>

          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden p-6 flex flex-col justify-between min-h-[200px] transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
            <div className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
              Payments
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">Cards & UPI</p>
            <p className="text-sm text-gray-500 mt-2">Debit, NFC, and all major digital payments</p>
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-3">
            About the studio
          </p>
          <h3 className="text-3xl md:text-4xl font-light mb-6">
            Premium car care, built on trust
          </h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            A premium car care and accessories studio in Hosapete offering paint protection film,
            ceramic coating, detailing, and professional vehicle upgrades — trusted by motorists
            across Ballari district.
          </p>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            From paint protection film and ceramic coating to infotainment, seat covers, and custom
            interiors — customers choose Shine Pro for branded materials, careful workmanship, and
            honest guidance on what their vehicle actually needs.
          </p>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            Gururaj and the team are frequently mentioned in reviews for explaining options clearly,
            working late when needed, and delivering finishes that hold up on daily-driven cars
            across Hosapete and the wider Ballari region.
          </p>

          <ul className="space-y-3 text-sm">
            {[
              'PPF & ceramic specialists',
              'Accessories & upgrades',
              'Cars, SUVs & motorcycles',
              'Cards, debit & NFC payments',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="text-orange-500 text-lg">✦</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3 bg-gray-50 rounded-2xl p-3 w-fit">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((n) => (
                <img
                  key={n}
                  src={`https://i.pravatar.cc/40?img=${n + 10}`}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <div className="text-xs">
              <p className="font-semibold">218+ Google reviews</p>
              <p className="text-gray-500">
                Rating: <span className="text-orange-500 font-semibold">4.9 / 5</span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop"
            alt="Shine Pro studio"
            className="w-full h-[420px] object-cover"
          />
        </div>
      </section>

      {/* ============ SERVICE CARDS ============ */}
      <section id="services" className="max-w-7xl mx-auto px-6 pt-20 pb-20">
        <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-3">
          Services
        </p>
        <h3 className="text-3xl md:text-5xl font-light leading-tight max-w-3xl mb-10">
          Everything your car needs, under one roof
        </h3>
        <p className="text-gray-500 text-sm mb-10 max-w-xl">
          Protection, detailing, and studio upgrades — grouped the way customers actually book at
          Shine Pro.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_1fr] md:grid-rows-2 gap-4">
          <ReelCard
            videoSrc="https://res.cloudinary.com/djpfw1goz/video/upload/v1790937261/Video_Project_7_1_qvymjd.mp4"
            posterSrc="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop"
            title="PPF WRAPPING"
            className="md:row-span-2 aspect-[9/16] md:aspect-auto md:h-full min-h-[420px]"
          />

          {topServiceCards.slice(1).map((card, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 aspect-[4/3] md:aspect-auto md:h-full min-h-[200px]"
            >
              <img
                src={card.img}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute top-3 left-3 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full">
                Get Quote
              </span>
              <h4 className="absolute bottom-4 left-4 right-4 text-white font-black text-lg md:text-xl uppercase leading-tight">
                {card.title}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SERVICES TABS ============ */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl md:text-4xl font-light mb-3">Our services in detail</h3>
        <p className="text-gray-500 text-sm mb-8 max-w-xl">
          Tap a category to see what's included.
        </p>

        <div className="flex flex-wrap gap-6 border-b border-gray-200 mb-8">
          {serviceTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveService(tab)}
              className={`pb-3 text-sm font-semibold transition-all duration-200 border-b-2 ${
                activeService === tab
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img
              src={serviceImages[activeService]}
              alt={activeService}
              className="w-full h-[300px] md:h-[420px] object-cover transition-all duration-500"
            />
          </div>
          <div>
            <h4 className="text-2xl font-bold mb-6">{activeService}</h4>
            <ul className="space-y-3">
              {serviceDetails[activeService].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="text-orange-500 mt-0.5">✔</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
            >
              Get a Quote on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section ref={statsRef} className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y font-light md:divide-y-0 md:divide-x divide-gray-200 bg-gray-50 rounded-3xl">
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} visible={statsVisible} useCounter={useCounter} />
          ))}
        </div>
      </section>

      {/* ============ PACKAGES ============ */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p className="text-xs text-gray-500 mb-2">Choose what your car actually needs</p>
        <h3 className="text-3xl md:text-5xl font-light mb-12">Popular packages</h3>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              onClick={() => setSelectedPackage(pkg.name)}
              className={`cursor-pointer rounded-3xl p-8 text-left transition-all duration-300 ${
                pkg.featured
                  ? 'bg-gray-50 shadow-xl md:-translate-y-4 ring-2 ring-orange-100'
                  : 'bg-white border border-gray-100 hover:shadow-lg'
              } ${selectedPackage === pkg.name ? 'ring-2 ring-orange-400' : ''}`}
            >
              <h4 className="text-xl md:text-2xl font-bold mb-4 text-center">{pkg.name}</h4>
              <p className="text-sm text-gray-500 mb-6 text-center">{pkg.desc}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-orange-500 mt-0.5">✔</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setBookingOpen(true);
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {pkg.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ============ OUR WORK — INSTAGRAM REELS SLIDER ============ */}
      <section id="work" className="relative max-w-7xl mx-auto px-6 py-20 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 -left-40 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-yellow-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Our work
              </div>
              <h3 className="text-3xl md:text-5xl font-light mb-3 leading-tight">
                Results that speak <br className="hidden md:block" />
                for <span className="font-medium bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">themselves</span>
              </h3>
              <p className="text-gray-500 text-sm max-w-xl">
                Live reels from the Shine Pro studio — PPF, coatings, detailing, and upgrades.
              </p>
            </div>

            {/* Slider arrows */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => scrollSlider(-1)}
                aria-label="Scroll left"
                className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-orange-500 hover:text-white hover:border-orange-500 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:shadow-orange-500/30 hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => scrollSlider(1)}
                aria-label="Scroll right"
                className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-orange-500 hover:text-white hover:border-orange-500 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:shadow-orange-500/30 hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Reels slider */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {REELS.map((url, i) => (
              <div
                key={url}
                className="snap-start shrink-0 w-[300px] sm:w-[330px] md:w-[350px] group"
              >
                {/* Outer gradient border wrapper */}
                <div className="relative rounded-[28px] p-[2px] bg-gradient-to-br from-orange-400 via-yellow-300 to-orange-500 hover:from-orange-500 hover:via-yellow-400 hover:to-orange-600 transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/30 group-hover:-translate-y-2">

                  {/* Inner card */}
                  <div className="relative rounded-[26px] bg-white overflow-hidden">

                    {/* Top chrome bar (fake IG header) */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Avatar with gradient ring */}
                        <div className="relative w-9 h-9 shrink-0">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 animate-spin-slow" />
                          <div className="absolute inset-[2px] rounded-full bg-white flex items-center justify-center">
                            <span className="text-[10px] font-black text-gray-900">SP</span>
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate">
                            shinepro_hospet
                          </p>
                          <p className="text-[10px] text-gray-500 truncate">
                            Hosapete · Car care
                          </p>
                        </div>
                      </div>

                      {/* Three dots */}
                      <div className="flex gap-0.5 shrink-0">
                        <span className="w-1 h-1 rounded-full bg-gray-400" />
                        <span className="w-1 h-1 rounded-full bg-gray-400" />
                        <span className="w-1 h-1 rounded-full bg-gray-400" />
                      </div>
                    </div>

                    {/* Instagram embed */}
                    <div className="p-2 pt-3 bg-gradient-to-b from-white to-gray-50 min-h-[500px] flex items-start justify-center">
                      <blockquote
                        className="instagram-media"
                        data-instgrm-captioned
                        data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
                        data-instgrm-version="14"
                        style={{
                          background: '#FFF',
                          border: 0,
                          borderRadius: '16px',
                          boxShadow: 'none',
                          margin: 0,
                          maxWidth: '540px',
                          minWidth: '260px',
                          padding: 0,
                          width: '100%',
                        }}
                      >
                        <a
                          href={`${url}?utm_source=ig_embed&utm_campaign=loading`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'block',
                            background: '#FFFFFF',
                            lineHeight: 0,
                            padding: '60px 0',
                            textAlign: 'center',
                            textDecoration: 'none',
                            width: '100%',
                            color: '#3897f0',
                            fontFamily: 'Arial, sans-serif',
                            fontSize: 14,
                            borderRadius: '16px',
                          }}
                        >
                          View this post on Instagram
                        </a>
                      </blockquote>
                    </div>

                    {/* Bottom chrome bar (fake IG footer) */}
                    <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-gray-700">
                        {/* Heart */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-red-500 hover:fill-red-500 transition cursor-pointer">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        {/* Comment */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-orange-500 transition cursor-pointer">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        {/* Share */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-orange-500 transition cursor-pointer">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </div>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold uppercase tracking-wider text-orange-500 hover:text-orange-600"
                      >
                        Open →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* End card — "See more on Instagram" */}
            <a
              href="https://www.instagram.com/shinepro_hospet"
              target="_blank"
              rel="noopener noreferrer"
              className="snap-start shrink-0 w-[240px] sm:w-[260px] md:w-[280px] group"
            >
              <div className="h-full rounded-[28px] p-[2px] bg-gradient-to-br from-orange-400 via-yellow-300 to-orange-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/30 transition-all duration-500 group-hover:-translate-y-2">
                <div className="h-full rounded-[26px] bg-white flex flex-col items-center justify-center text-center p-8 gap-4 min-h-[500px]">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center p-[3px] group-hover:scale-110 transition-transform duration-500">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#igGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <defs>
                          <linearGradient id="igGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FCAF45" />
                            <stop offset="50%" stopColor="#E1306C" />
                            <stop offset="100%" stopColor="#833AB4" />
                          </linearGradient>
                        </defs>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-base font-black text-gray-900">See more</p>
                    <p className="text-xs text-gray-500 mt-1">@shinepro_hospet</p>
                  </div>
                  <span className="text-orange-500 text-sm font-bold group-hover:translate-x-1 transition-transform duration-300">
                    Follow →
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* Swipe hint (mobile) */}
          <div className="md:hidden mt-2 flex items-center justify-center gap-2 text-xs text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Swipe to see more
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[...REELS, 'more'].map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === 0 ? 'w-8 bg-orange-500' : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <section id="reviews" className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-3">
          Reviews
        </p>
        <h3 className="text-3xl md:text-5xl font-light mb-3">Loved by car owners across Hosapete</h3>
        <p className="text-gray-500 text-sm mb-4">
          4.9/5 from 218 Google reviews — real feedback from PPF, coating, and upgrade customers.
        </p>

        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="text-4xl font-black">4.9</span>
          <div className="text-left">
            <div className="text-orange-400 text-lg">★★★★★</div>
            <p className="text-xs text-gray-500">218 reviews</p>
          </div>
        </div>

        {/* Featurable Google Reviews Widget */}
        <div
          ref={featurableRef}
          id="featurable-258a4c79-d580-4efa-bf06-cbba19ab6cc8"
          data-featurable-async
        ></div>

        <a
          href="https://maps.google.com/?q=Shine+Pro+Hosapete"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block text-sm font-semibold underline hover:text-orange-500 transition"
        >
          Read more on Google Maps
        </a>
      </section>

      {/* ============ VISIT ============ */}
      <section id="visit" className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-3">Visit</p>
        <h3 className="text-3xl md:text-4xl font-light mb-3">Visit the studio</h3>
        <p className="text-gray-500 text-sm mb-10 max-w-2xl">
          Call or WhatsApp for a quote on PPF, ceramic coating, detailing, or accessories. Walk-ins
          welcome during studio hours.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-3xl p-8">
            <h4 className="text-lg font-bold mb-6">Quick contact</h4>

            <div className="space-y-5">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Call now</p>
                <a
                  href="tel:+916361291895"
                  className="text-lg font-semibold hover:text-orange-500 transition"
                >
                  +91 6361291895
                </a>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">WhatsApp</p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#25D366] hover:bg-[#1EBE5A] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
                >
                  Message us
                </a>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Instagram</p>
                <a
                  href="https://www.instagram.com/shinepro_hospet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold hover:text-orange-500 transition"
                >
                  @shinepro_hospet
                </a>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Studio hours
                </p>
                <p className="text-sm text-gray-700">Monday – Saturday: 9:00 AM – 7:30 PM</p>
                <p className="text-sm text-gray-700">Sunday: 9:00 AM – 1:30 PM</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop"
              alt="Shine Pro studio"
              className="w-full h-full min-h-[420px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-1">
                Hosapete, Karnataka
              </p>
              <p className="text-white text-sm font-medium">Saibaba Temple Road</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 rounded-3xl p-8 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h4 className="text-lg font-bold mb-3">Studio address</h4>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              Saibaba Temple Road, behind Gujjal Petrol Bunk
              <br />
              Hosapete, Karnataka – 583203
            </p>
            <p className="text-xs text-gray-500">Plus Code: 797F+P8</p>
          </div>
          <div>
            <a
              href="https://maps.google.com/?q=Shine+Pro+Hosapete"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
            >
              Get directions
            </a>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-gray-100 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-[1.2fr_repeat(4,1fr)] gap-8 text-sm">
          <div>
            <h3 className="text-xl font-black tracking-tight italic mb-3">
              SHINE <span className="not-italic">PRO</span>
            </h3>
            <p className="text-xs text-gray-600 mb-5 max-w-xs leading-relaxed">
              Showroom finish. Studio protection. A premium car care studio in Hosapete trusted
              across Ballari district.
            </p>
            <div className="space-y-2 mb-6">
              <a
                href="tel:+916361291895"
                className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition"
              >
                <span>✆</span> +91 6361291895
              </a>
              <p className="flex items-center gap-2 text-gray-700">
                <span>✉</span> @shinepro_hospet
              </p>
            </div>
            <div className="flex gap-3">
              {[
                { icon: 'f', href: '#' },
                { icon: '◎', href: 'https://www.instagram.com/shinepro_hospet' },
                { icon: 'in', href: '#' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold hover:bg-orange-500 hover:text-white transition"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="On this page"
            links={[
              { label: 'Services', href: '#services' },
              { label: 'Work', href: '#work' },
              { label: 'Reviews', href: '#reviews' },
              { label: 'Visit', href: '#visit' },
            ]}
          />
          <FooterCol
            title="Contact"
            links={[
              { label: '+91 6361291895', href: 'tel:+916361291895' },
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

        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-6 text-xs text-gray-500 flex flex-col md:flex-row items-center justify-between gap-2">
            <p>© 2026 Shine Pro Car Care & Spa. Hosapete.</p>
            <p>Paint protection · Detailing · Studio upgrades</p>
          </div>
        </div>
      </footer>

      {/* ============ FLOATING WHATSAPP BUTTON ============ */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#1EBE5A] text-white rounded-full shadow-2xl shadow-green-500/30 transition-all duration-300 hover:scale-105 active:scale-95 group"
      >
        <span className="w-14 h-14 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30" fill="currentColor">
            <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.102-.258.16-.545.16-.83 0-.115-.045-.215-.13-.315-.36-.402-1.62-1.134-1.62-1.506 0 0 0 0 0 0z" />
            <path d="M16.04 0C7.18 0 0 7.18 0 16.04c0 2.83.73 5.48 2.03 7.79L0 32l8.43-2.21a15.94 15.94 0 0 0 7.61 1.95h.01c8.86 0 16.04-7.18 16.04-16.04S24.9 0 16.04 0zm0 29.14h-.01a13.2 13.2 0 0 1-6.73-1.85l-.48-.28-5.02 1.32 1.34-4.9-.31-.5a13.17 13.17 0 0 1-2.02-7.03c0-7.29 5.93-13.22 13.23-13.22 3.53 0 6.86 1.38 9.36 3.88a13.16 13.16 0 0 1 3.87 9.35c0 7.3-5.94 13.23-13.23 13.23z" />
          </svg>
        </span>
        <span className="hidden sm:block max-w-0 group-hover:max-w-[180px] overflow-hidden whitespace-nowrap font-semibold text-sm transition-all duration-300 pr-0 group-hover:pr-6">
          Chat with us
        </span>
      </a>

      {/* ============ BOOKING MODAL ============ */}
      {bookingOpen && (
        <BookingModal onClose={() => setBookingOpen(false)} selectedPackage={selectedPackage} />
      )}

      {/* ============ TAG POPUP ============ */}
      {tagPopup && <TagPopup tag={tagPopup} onClose={() => setTagPopup(null)} />}
    </div>
  );
};

/* ============== SUB COMPONENTS ============== */

const StatItem = ({ value, label, visible, useCounter, suffix = '' }) => {
  const count = useCounter(value, visible);
  const display =
    label === 'Rating (out of 50)' ? (count / 10).toFixed(1) : count.toLocaleString();
  return (
    <div className="text-center py-8">
      <p className="text-4xl md:text-5xl font-black mb-2">
        {display}
        {suffix}
      </p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};

const FooterCol = ({ title, links }) => (
  <div>
    <h5 className="font-bold mb-4 text-gray-900">{title}</h5>
    <ul className="space-y-2">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-gray-600 hover:text-orange-500 transition"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const ReelCard = ({ videoSrc, posterSrc, title, className = '' }) => {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [hovered]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered((h) => !h)}
      className={`relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      <img
        src={posterSrc}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          hovered ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <video
        ref={videoRef}
        src={videoSrc}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <span className="absolute top-3 left-3 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full z-10">
        Get Quote
      </span>
      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full z-10">
        {hovered ? 'Playing' : 'Hover'}
      </span>

      <h4 className="absolute bottom-4 left-4 right-4 text-white font-black text-lg md:text-xl uppercase leading-tight z-10">
        {title}
      </h4>
    </div>
  );
};

const TagPopup = ({ tag, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-orange-500 hover:text-white flex items-center justify-center transition shadow"
        >
          ✕
        </button>

        <div className="relative">
          <img src={tag.image} alt={tag.title} className="w-full h-72 md:h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <h3 className="absolute bottom-5 left-6 right-6 text-white text-2xl md:text-3xl font-black">
            {tag.title}
          </h3>
        </div>

        <div className="p-6 md:p-8">
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{tag.description}</p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-full transition"
            >
              Close
            </button>
            <a
              href="https://wa.me/916361291895?text=Hi%20Shine%20Pro!%20I%27d%20like%20a%20quote%20for%20this%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingModal = ({ onClose, selectedPackage }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: selectedPackage,
    vehicle: '',
    date: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white flex items-center justify-center transition"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-black mb-2">Enquiry Sent!</h3>
            <p className="text-gray-500 text-sm">
              We'll call you shortly to confirm and share a quote.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-black mb-1">Get a Quote</h3>
            <p className="text-sm text-gray-500 mb-6">
              Share a few details and we'll get back to you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                required
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                placeholder="Vehicle (e.g. Thar Roxx, Fortuner)"
                value={form.vehicle}
                onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option>PPF WRAPPING</option>
                <option>CERAMIC + GRAPHENE</option>
                <option>DETAIL + UPGRADES</option>
                <option>PPF wrapping</option>
                <option>Ceramic coating</option>
                <option>Graphene coating</option>
                <option>Detailing & restoration</option>
                <option>Protection extras</option>
                <option>Studio upgrades</option>
              </select>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <textarea
                rows="3"
                placeholder="Additional notes (optional)"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              />
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                Send Enquiry
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CarDetail;