import { Link } from 'react-router-dom';

const ServiceVideoCard = ({ service, category }) => {
  return (
    <Link
      to={`/services/${category.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-')}/${service.slug}`}
      className="block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1 group"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        {service.thumbnail && (
          <img
            src={service.thumbnail}
            alt={service.service_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">
          {service.duration}
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="w-14 h-14 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
            aria-label={`Watch ${service.service_name} video`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-6">
        <span className="inline-block text-orange-500 text-xs font-semibold uppercase tracking-wider mb-2">
          {category}
        </span>
        <h4 className="text-lg font-bold mb-2 group-hover:text-orange-500 transition-colors">
          {service.service_name}
        </h4>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {service.description}
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          <span>Watch video</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto group-hover:translate-x-1 transition-transform">
            <polyline points="5 12 19 12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ServiceVideoCard;