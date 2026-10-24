import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const BRAND = {
  indigo: '#4f6bff',
  royalBlue: '#0504aa',
  deepBlue: '#031273',
  yellow: '#f59e0b',
  orange: '#ff4800',
  white: '#d7f2fa',
};

// Main categories -> sub-services
const SERVICE_CATALOG = [
  {
    category: 'PPF / Coatings',
    services: [
      'PPF (Paint Protection Film)',
      'Dual Tone',
      'Graphene Coating',
      'Ceramic Coating',
      'Sunfilm',
      'Front Windshield Sunfilm',
      'Front Windshield Protection Shield',
    ],
  },
  {
    category: 'Interior / Exterior Detailing',
    services: [
      'Leather / PU Seat Cover Enhancement',
      'Rat Mesh',
      'Floor Mat',
      '3D Mat / 7D Mat / Luxury Mat',
      'Seat Cushion',
      'Lumbar Support',
      'Neck Rest',
      'ECO Mat',
      'Underbody Coat',
      'Silencer Coat',
      'Cavity Coat',
      'Windshield Protection',
      'Sunroof Protection Film',
    ],
  },
  {
    category: 'Premium Accessories',
    services: [
      'Infotech System',
      'Speakers',
      'Damping',
      'Amplifier / Woofer',
      'LED Projector Fog Lamp',
      'Ambient Light',
      'Alloy Rims',
      'CarPlay / Portable USB Plug Solution',
      'Power Window',
      'Auto-Fold Mirror',
      'Cruise Control',
      'Ray Light',
      'Steering Control / Cruise Control',
      'Door Visor',
      'Door Guard',
      'Wipers',
      'Front / Rear Cam - 2CH / 3CH',
      'Dash Cam',
    ],
  },
];

const BookingModal = ({ onClose, selectedPackage }) => {
  const initialCategory = selectedPackage
    ? SERVICE_CATALOG.find((c) =>
        c.services.includes(selectedPackage)
      )?.category || null
    : null;

  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: selectedPackage ? [selectedPackage] : [],
    vehicle: '',
    date: '',
    notes: '',
  });

  const [activeCategories, setActiveCategories] = useState(
    initialCategory ? [initialCategory] : []
  );

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Toggle a main category. When removing, also drop its sub-services.
  const toggleCategory = (category) => {
    setActiveCategories((prev) => {
      const isRemoving = prev.includes(category);

      if (isRemoving) {
        const catServices =
          SERVICE_CATALOG.find((c) => c.category === category)?.services || [];
        // Remove any sub-services belonging to this category
        setForm((f) => ({
          ...f,
          service: f.service.filter((s) => !catServices.includes(s)),
        }));
        return prev.filter((c) => c !== category);
      }

      return [...prev, category];
    });
  };

  const toggleService = (srv) => {
    setForm((prev) => {
      const isSelected = prev.service.includes(srv);
      return {
        ...prev,
        service: isSelected
          ? prev.service.filter((s) => s !== srv)
          : [...prev.service, srv],
      };
    });
  };

  // Only count services whose parent category is still selected
  const getFinalServices = () => {
    const allowed = SERVICE_CATALOG.filter((c) =>
      activeCategories.includes(c.category)
    ).flatMap((c) => c.services);

    return form.service.filter((s) => allowed.includes(s));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const finalServices = getFinalServices();

    const templateParams = {
      name: form.name,
      phone: form.phone,
      vehicle: form.vehicle,
      // Only services from active categories are sent
      service:
        finalServices.length > 0
          ? finalServices.join(', ')
          : 'No service selected',
      date: form.date,
      notes: form.notes || 'No additional notes',
      to_email: 'support@shineprocars.com',
    };

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setIsSending(false);
        setSubmitted(true);
        setTimeout(() => onClose(), 3000);
      })
      .catch((error) => {
        setIsSending(false);
        console.error('Email send failed:', error);
        alert(
          'Failed to send enquiry. Please try again or contact us via WhatsApp.'
        );
      });
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const visibleCategories = SERVICE_CATALOG.filter((c) =>
    activeCategories.includes(c.category)
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto border bg-[#031273]"
        style={{ borderColor: `${BRAND.yellow}33` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(circle at 50% -20%, ${BRAND.indigo} 0%, transparent 70%)`,
          }}
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#f59e0b] hover:text-[#031273] transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-12 relative z-10">
            <div className="text-5xl mb-4" style={{ color: BRAND.yellow }}>
              ✅
            </div>
            <h3
              id="booking-modal-title"
              className="text-2xl font-black mb-2 text-white"
            >
              Enquiry Sent!
            </h3>
            <p className="text-sm text-white/70">
              We've received your details and will call you shortly to confirm
              and share a quote.
            </p>
          </div>
        ) : (
          <div className="relative z-10">
            <h3
              id="booking-modal-title"
              className="text-2xl font-black mb-1 text-white"
            >
              Get a Quote
            </h3>
            <p className="text-sm text-white/70 mb-6">
              Share a few details and we'll get back to you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border bg-black/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-colors"
                style={{ borderColor: `${BRAND.yellow}33` }}
                onFocus={(e) => (e.target.style.borderColor = BRAND.yellow)}
                onBlur={(e) =>
                  (e.target.style.borderColor = `${BRAND.yellow}33`)
                }
              />
              <input
                required
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border bg-black/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-colors"
                style={{ borderColor: `${BRAND.yellow}33` }}
                onFocus={(e) => (e.target.style.borderColor = BRAND.yellow)}
                onBlur={(e) =>
                  (e.target.style.borderColor = `${BRAND.yellow}33`)
                }
              />
              <input
                type="text"
                placeholder="Vehicle (e.g. Thar Roxx, Fortuner)"
                value={form.vehicle}
                onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                className="w-full border bg-black/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-colors"
                style={{ borderColor: `${BRAND.yellow}33` }}
                onFocus={(e) => (e.target.style.borderColor = BRAND.yellow)}
                onBlur={(e) =>
                  (e.target.style.borderColor = `${BRAND.yellow}33`)
                }
              />

              {/* STEP 1: MAIN CATEGORIES (MULTI-SELECT) */}
              <div className="space-y-2">
                <p className="text-xs text-white/70 font-commissioner ml-1">
                  Select Categories (Multi-select)
                </p>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_CATALOG.map((cat) => {
                    const isActive = activeCategories.includes(cat.category);
                    return (
                      <button
                        key={cat.category}
                        type="button"
                        onClick={() => toggleCategory(cat.category)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold font-commissioner transition-all duration-200 border ${
                          isActive
                            ? 'scale-[1.02] shadow-md'
                            : 'bg-black/20 text-white/70 border-white/20 hover:border-white/40 hover:bg-white/5'
                        }`}
                        style={
                          isActive
                            ? {
                                backgroundColor: BRAND.yellow,
                                color: BRAND.deepBlue,
                                borderColor: BRAND.yellow,
                              }
                            : {}
                        }
                      >
                        {isActive ? '✓ ' : ''}
                        {cat.category}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: SUB-SERVICES for every selected category */}
              {visibleCategories.length > 0 && (
                <div className="space-y-3">
                  {visibleCategories.map((cat) => (
                    <div key={cat.category} className="space-y-2">
                      <p className="text-xs text-white/70 font-commissioner ml-1">
                        {cat.category} — Services (Multi-select)
                      </p>
                      <div
                        className="flex flex-wrap gap-2 p-3 rounded-xl border bg-black/20"
                        style={{ borderColor: `${BRAND.yellow}33` }}
                      >
                        {cat.services.map((srv) => {
                          const isSelected = form.service.includes(srv);
                          return (
                            <button
                              key={srv}
                              type="button"
                              onClick={() => toggleService(srv)}
                              className={`px-3 py-1.5 rounded-full text-xs font-semibold font-commissioner transition-all duration-200 border ${
                                isSelected
                                  ? 'scale-105 shadow-md'
                                  : 'bg-transparent text-white/70 border-white/20 hover:border-white/40 hover:bg-white/5'
                              }`}
                              style={
                                isSelected
                                  ? {
                                      backgroundColor: BRAND.yellow,
                                      color: BRAND.deepBlue,
                                      borderColor: BRAND.yellow,
                                    }
                                  : {}
                              }
                            >
                              {srv}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border bg-black/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-colors"
                style={{
                  borderColor: `${BRAND.yellow}33`,
                  colorScheme: 'dark',
                }}
                onFocus={(e) => (e.target.style.borderColor = BRAND.yellow)}
                onBlur={(e) =>
                  (e.target.style.borderColor = `${BRAND.yellow}33`)
                }
              />
              <textarea
                rows="3"
                placeholder="Additional notes (optional)"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full border bg-black/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-colors resize-none"
                style={{ borderColor: `${BRAND.yellow}33` }}
                onFocus={(e) => (e.target.style.borderColor = BRAND.yellow)}
                onBlur={(e) =>
                  (e.target.style.borderColor = `${BRAND.yellow}33`)
                }
              />
              <button
                type="submit"
                disabled={isSending}
                className={`w-full font-bold py-3 rounded-full transition-all duration-200 mt-2 ${
                  isSending
                    ? 'bg-gray-500 cursor-not-allowed text-white/50'
                    : 'text-[#031273] hover:scale-[1.02] active:scale-95'
                }`}
                style={
                  !isSending
                    ? {
                        backgroundColor: BRAND.yellow,
                        boxShadow: `0 10px 15px -3px ${BRAND.yellow}33`,
                      }
                    : {}
                }
              >
                {isSending ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;