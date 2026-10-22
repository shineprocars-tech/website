import { useRef, useState, useEffect } from 'react';

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

export default ReelCard;