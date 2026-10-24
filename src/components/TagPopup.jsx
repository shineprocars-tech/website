

const TagPopup = ({ tag, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tag-popup-title"
    >
      <div
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-orange-500 hover:text-white flex items-center justify-center transition shadow"
          aria-label="Close popup"
        >
          ✕
        </button>

        <div className="relative">
          <img src={tag.image} alt={tag.title} className="w-full h-72 md:h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <h3 id="tag-popup-title" className="absolute bottom-5 left-6 right-6 text-white text-2xl md:text-3xl font-black">
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

export default TagPopup;