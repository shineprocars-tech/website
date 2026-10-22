import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import {
  serviceImages,
  serviceDetails,
  whatsappLink,
  serviceRouteMap,
} from '../data/constants';

const ServiceDetail = () => {
  const { service } = useParams();
  const [bookingOpen, setBookingOpen] = useState(false);

  const serviceData = serviceRouteMap[service];
  const serviceKey = serviceData?.key;
  const image = serviceKey ? serviceImages[serviceKey] : '';
  const features = serviceKey ? serviceDetails[serviceKey] : [];

  if (!serviceData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-3xl font-black mb-4">Service not found</h1>
          <Link
            to="/services/paint-protection"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Browse Services
          </Link>
        </div>
      </div>
    );
  }

  const packageMap = {
    'Paint protection': 'PPF WRAPPING',
    'Detailing & restoration': 'DETAIL + UPGRADES',
    'Protection extras': 'PPF WRAPPING',
    'Studio upgrades': 'DETAIL + UPGRADES',
  };

  const selectedPackage = packageMap[serviceKey] || 'PPF WRAPPING';

  return (
    <div className="min-h-screen bg-white">
      {/* ============ SERVICE HERO ============ */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <img
          src={image}
          alt={serviceData.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-4 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Home
            </Link>
            <p className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Shine Pro · Services
            </p>
            <h1 className="text-white font-light uppercase leading-[0.9] tracking-tighter text-[8vw] md:text-[5rem]">
              {serviceData.title}
            </h1>
            <p className="mt-3 text-white/90 text-sm md:text-base max-w-2xl">
              {serviceData.description}
            </p>
          </div>
        </div>
      </section>

      {/* ============ SERVICE CONTENT ============ */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-light mb-6">What&apos;s included</h2>
              <ul className="space-y-4">
                {features.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <span className="text-orange-500 text-2xl mt-0.5 flex-shrink-0">✔</span>
                    <span className="text-gray-700 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-4">Why choose Shine Pro?</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="text-orange-500">✦</span>
                  Certified installers with 8+ years experience
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-orange-500">✦</span>
                  Branded, warranty-backed materials only
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-orange-500">✦</span>
                  Transparent pricing — no hidden costs
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-orange-500">✦</span>
                  218+ Google reviews, 4.9/5 rating
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-orange-500">✦</span>
                  Post-service support & maintenance guidance
                </li>
              </ul>
            </div>
          </div>

          <div className="sticky top-24 space-y-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-2">Get a Quote</h3>
              <p className="text-sm text-gray-500 mb-6">
                Share your vehicle details and we'll send a personalized quote within 2 hours.
              </p>
              <button
                onClick={() => setBookingOpen(true)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-95 mb-4"
              >
                Get a Quote
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-semibold py-3 rounded-full transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.466-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.57-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 2.632 1.03 5.084 2.75 6.897v-2.161h-1.956v-2.194h1.956V9.545c0-1.935 1.177-3.015 2.89-3.015.821 0 1.527.064 1.731.094v2.06h-1.185c-.948 0-1.136.546-1.136 1.238v1.509h2.219l-.294 2.194h-1.925V22c3.031-1.62 5.5-5.22 5.5-9.438C22 6.477 17.523 2 12 2z" />
                </svg>
                WhatsApp Us
              </a>
              <a
                href="tel:+916361291895"
                className="w-full inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-full transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call Now
              </a>
            </div>

            <div className="bg-gray-50 rounded-3xl p-6">
              <h4 className="font-bold mb-3">Quick Details</h4>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Service</dt>
                  <dd className="font-medium text-gray-900">{serviceData.title}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Location</dt>
                  <dd className="font-medium text-gray-900">Hosapete, Karnataka</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Hours</dt>
                  <dd className="font-medium text-gray-900">Mon–Sat 9AM–7:30PM</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Payment</dt>
                  <dd className="font-medium text-gray-900">Cards, UPI, Cash</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RELATED SERVICES ============ */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h3 className="text-2xl md:text-3xl font-light mb-8 text-center">Explore other services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(serviceRouteMap).map(([route, data]) => {
            if (route === service) return null;
            return (
              <Link
                key={route}
                to={`/services/${route}`}
                className="block bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
              >
                <h4 className="text-lg font-bold mb-3">{data.title}</h4>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{data.description}</p>
                <span className="text-orange-500 text-sm font-semibold">View details →</span>
              </Link>
            );
          })}
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

export default ServiceDetail;