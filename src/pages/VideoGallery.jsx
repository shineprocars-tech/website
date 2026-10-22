import { useState } from 'react';
import { Link } from 'react-router-dom';
import { serviceVideos, getAllServiceSlugs } from '../data/serviceVideos';
import ServiceVideoCard from '../components/ServiceVideoCard';

const VideoGallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...serviceVideos.map(c => c.category)];

  const filteredServices = getAllServiceSlugs().filter(({ service_name, category }) => {
    const matchesCategory = activeCategory === 'all' || category === activeCategory;
    const matchesSearch = service_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryServices = (categoryName) => {
    if (categoryName === 'all') return filteredServices;
    return filteredServices.filter(s => s.category === categoryName);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ============ HERO ============ */}
      <section className="relative h-[50vh] min-h-[350px] max-h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-700 to-red-700" />
        <div className="absolute inset-0 bg-[url('/images/pattern-noise.png')] opacity-5" />
        <img
          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&auto=format&fit=crop"
          alt="Service videos"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <p className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Shine Pro · Video Library
            </p>
            <h1 className="font-light uppercase leading-[0.9] tracking-tighter text-[7vw] md:text-[4.5rem] mb-6">
              Service Videos
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl">
              Watch detailed videos explaining each service — what it is, why your vehicle needs it, and what to expect.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SEARCH & FILTERS ============ */}
      <section className="max-w-7xl mx-auto px-6 py-8 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="relative w-full md:w-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat === 'all' ? 'All Services' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ VIDEO GRID ============ */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        {serviceVideos.map((categoryData) => {
          const categoryServices = getCategoryServices(categoryData.category);
          if (categoryServices.length === 0) return null;

          return (
            <div key={categoryData.category} className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-light">
                    {categoryData.category}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {categoryServices.length} service{categoryServices.length !== 1 ? 's' : ''} available
                  </p>
                </div>
                <Link
                  to={`/services/${categoryData.category.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-')}`}
                  className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center gap-1"
                >
                  View all
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="5 12 19 12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryServices.map(({ slug, category }) => {
                  const service = categoryData.services.find(s => s.slug === slug);
                  if (!service) return null;
                  return (
                    <ServiceVideoCard key={slug} service={service} category={category} />
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto text-gray-300 mb-4"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="8" x2="14" y2="14" />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </div>
        )}
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-4">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="text-gray-600 mb-8">
            Contact us for custom services or book a consultation to discuss your vehicle&apos;s specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/916361291895?text=Hi%20Shine%20Pro!%20I%27d%20like%20a%20quote%20for%20a%20custom%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-semibold px-8 py-3 rounded-full transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.466-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.57-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 2.632 1.03 5.084 2.75 6.897v-2.161h-1.956v-2.194h1.956V9.545c0-1.935 1.177-3.015 2.89-3.015.821 0 1.527.064 1.731.094v2.06h-1.185c-.948 0-1.136.546-1.136 1.238v1.509h2.219l-.294 2.194h-1.925V22c3.031-1.62 5.5-5.22 5.5-9.438C22 6.477 17.523 2 12 2z" />
              </svg>
              WhatsApp Us
            </a>
            <a
              href="tel:+916361291895"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoGallery;