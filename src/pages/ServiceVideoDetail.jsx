import { useState, useEffect } from 'react'; // Added useEffect here
import { useParams, Link } from 'react-router-dom';
import { getServiceVideo, serviceVideos } from '../data/serviceVideos';
import BookingModal from '../components/BookingModal';

// ============ BRAND COLOR TOKENS ============
const BRAND = {
  indigo: '#4f6bff',
  royalBlue: '#0504aa',
  deepBlue: '#031273',
  yellow: '#f59e0b',
  orange: '#ff4800',
  white: '#d7f2fa',
};

const ServiceVideoDetail = () => {
  const { category, service: serviceSlug } = useParams();
  const [bookingOpen, setBookingOpen] = useState(false);

  const service = getServiceVideo(serviceSlug);
  const categoryData = serviceVideos.find(c => 
    c.category.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-') === category
  );

  // ============ SCROLL TO TOP ON ROUTE CHANGE ============
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceSlug]);
  // ======================================================

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center p-8">
          <h1 className="text-3xl font-black mb-4 text-white">Video not found</h1>
          <Link
            to="/videos"
            className="inline-block font-bold px-6 py-3 rounded-full transition text-[#031273] hover:scale-105"
            style={{ backgroundColor: BRAND.yellow }}
          >
            Browse All Videos
          </Link>
        </div>
      </div>
    );
  }

  const packageMap = {
    'Paint protection': 'PPF',
    'Detailing & restoration': 'DETAIL + UPGRADES',
    'Protection extras': 'PPF',
    'Studio upgrades': 'DETAIL + UPGRADES',
  };

  const selectedPackage = packageMap[service.category] || 'PPF';

  // ============ RELATED SERVICES LOGIC ============
  const relatedServices = categoryData
    ? categoryData.services.filter(s => s.slug !== service.slug).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ============ VIDEO HERO ============ */}
      <section className="relative h-[55vh] min-h-[400px] max-h-[550px] overflow-hidden bg-black">
        {/* Background Image with Dark Gradient Overlay */}
        {service.thumbnail && (
          <img
            src={service.thumbnail}
            alt={service.service_name}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent" />
       
        <div className="absolute bottom-16 left-0 right-0 px-6 z-10">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2" style={{ color: BRAND.yellow }}>
              <span className="w-8 h-[2px] inline-block" style={{ backgroundColor: BRAND.yellow }}></span>
              Shine Pro Cars · {service.category}
            </p>
            <h1 className="text-white font-light uppercase leading-[0.9] tracking-tighter text-[6vw] md:text-[4rem] mb-4">
              {service.service_name}
            </h1>
          </div>
        </div>

        {/* SVG Wave Pattern at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-[60px] md:h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,115.56,192.67,104.48Z" fill="#f9fafb"></path>
          </svg>
        </div>
      </section>

      {/* ============ VIDEO CONTENT ============ */}
      <section className="max-w-7xl mx-auto px-6 pb-16 -mt-8 relative z-20">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.15)] ring-1 ring-gray-800 relative group">
              <video
                key={service.video_url} // Added key to force reload video when changing services
                src={service.video_url}
                title={service.service_name}
                autoPlay
                loop
                muted      
                poster={service.thumbnail}
                className="w-full h-full object-cover"
                preload="metadata"
              />
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-light mb-4 text-gray-900">About this Service</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{service.description}</p>
            </div>

            {/* Why Needed - Black & Yellow Combo */}
            <div className="rounded-3xl p-8 md:p-10 border relative overflow-hidden" style={{ backgroundColor: BRAND.deepBlue, borderColor: `${BRAND.yellow}33` }}>
              {/* Decorative Yellow Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" style={{ backgroundColor: `${BRAND.yellow}1A` }}></div>
              
              <h2 className="text-2xl font-light mb-6 flex items-center gap-4 text-white relative z-10">
                <span className="w-12 h-12 rounded-full flex items-center justify-center text-[#031273] shadow-lg" style={{ backgroundColor: BRAND.yellow, boxShadow: `0 10px 15px -3px ${BRAND.yellow}33` }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </span>
                Why Your Vehicle Needs This
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg relative z-10">{service.why_needed}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-light mb-6 text-gray-900">Key Features</h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4 p-5 bg-white border border-gray-100 shadow-sm rounded-2xl hover:border-[#f59e0b] hover:shadow-md transition-all">
                    <span className="text-xl mt-0.5 flex-shrink-0" style={{ color: BRAND.yellow }}>✦</span>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ============ RELATED SERVICES ============ */}
            {relatedServices.length > 0 && (
              <div className="pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-light text-gray-900">Related Services</h2>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: BRAND.yellow }}>
                    More in {service.category}
                  </span>
                </div>
                
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedServices.map((related) => (
                    <Link 
                      key={related.slug} 
                      to={`/services/${category}/${related.slug}`}
                      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative aspect-video bg-gray-100 overflow-hidden">
                        <img 
                          src={related.thumbnail} 
                          alt={related.service_name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                        
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <h4 className="font-bold text-gray-900 group-hover:text-[#f59e0b] transition-colors text-sm leading-tight mb-2">
                          {related.service_name}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1" style={{ color: BRAND.yellow }}>
                          View Service <span aria-hidden="true">&rarr;</span>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Main CTA Box - Deep Blue & Yellow Theme */}
              <div className="rounded-3xl p-8 shadow-2xl border relative overflow-hidden" style={{ backgroundColor: BRAND.deepBlue, borderColor: `${BRAND.yellow}33` }}>
                <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(to right, ${BRAND.indigo}, ${BRAND.yellow})` }}></div>
                
                <h3 className="text-2xl font-bold mb-2 text-white">Get a Quote</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  Share your vehicle details and we'll send a personalized Detailed Quote.
                </p>
                
                <button
                  onClick={() => setBookingOpen(true)}
                  className="w-full font-bold py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 mb-4 shadow-lg text-[#031273]"
                  style={{ backgroundColor: BRAND.yellow, boxShadow: `0 10px 15px -3px ${BRAND.yellow}33` }}
                >
                  Book Appointment
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://wa.me/916361291895?text=Hi%20Shine%20Pro!%20I%27d%20like%20a%20quote%20for%20a%20custom%20service."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-semibold py-3 rounded-xl transition text-sm"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="tel:+916361291895"
                    className="inline-flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition text-sm border hover:bg-white/10"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', borderColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Call
                  </a>
                </div>
              </div>

              {/* Quick Details */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-bold mb-4 text-gray-900 border-b border-gray-100 pb-3">Quick Details</h4>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Service</dt>
                    <dd className="font-semibold text-gray-900 text-right">{service.service_name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Location</dt>
                    <dd className="font-semibold text-gray-900">Hosapete, KA</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Hours</dt>
                    <dd className="font-semibold text-gray-900">Mon–Sat 9AM–7:30PM</dd>
                  </div>
                </dl>
              </div>

              {/* Why Choose Us */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-bold mb-4 text-gray-900 border-b border-gray-100 pb-3">Why Choose Shine Pro?</h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5" style={{ color: BRAND.yellow }}>✦</span>
                    Certified installers with 8+ years experience
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5" style={{ color: BRAND.yellow }}>✦</span>
                    Branded, warranty-backed materials only
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5" style={{ color: BRAND.yellow }}>✦</span>
                    Transparent pricing — no hidden costs
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5" style={{ color: BRAND.yellow }}>✦</span>
                    218+ Google reviews, 4.9/5 rating
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5" style={{ color: BRAND.yellow }}>✦</span>
                    Post-service support & maintenance guidance
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {bookingOpen && (
        <BookingModal
          onClose={() => setBookingOpen(false)}
          selectedPackage={selectedPackage}
        />
      )}
    </div>
  );
};

export default ServiceVideoDetail;