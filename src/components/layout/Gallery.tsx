import React, { useState } from 'react';

interface GalleryProps {
  images: string[];
  title?: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, title = "Gallery" }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!images || images.length === 0) return null;

  const handlePrev = () => setSelectedIdx(selectedIdx === 0 ? images.length - 1 : selectedIdx - 1);
  const handleNext = () => setSelectedIdx(selectedIdx === images.length - 1 ? 0 : selectedIdx + 1);

  return (
    <div className="w-full flex flex-col items-center my-12">
      {/* Stylish Gallery Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-black drop-shadow-lg mb-6 tracking-tight uppercase relative">
        <span className="relative z-10">{title}</span>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-1.5 bg-gradient-to-r from-black/70 via-black/40 to-black/70 rounded-full blur-sm z-0"></span>
        </h2>
      {/* Main Image with background blur and shadow */}
    <div className="relative w-full max-w-4xl aspect-square flex items-center justify-center mb-6">
    {/* Blurred background */}
    <div
        className="absolute inset-0 rounded-3xl"
        style={{
        backgroundImage: `url(${images[selectedIdx]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(40px) brightness(0.5) saturate(1.2)',
        zIndex: 0,
        }}
    />
    {/* Fully rounded frame */}
    <div className="absolute inset-0 z-20 pointer-events-none rounded-3xl border-8 border-black/20"
        style={{
        boxShadow: '0 8px 48px 0 rgba(0,0,0,0.18), 0 0 0 8px #fff'
        }}
    />
    {/* Main image fills frame */}
    <img
        src={images[selectedIdx]}
        alt={`Gallery photo ${selectedIdx + 1}`}
        className="relative z-10 rounded-3xl shadow-2xl object-cover w-full h-full max-h-[900px] border-8 border-white transition-all duration-500"
        style={{ background: 'rgba(0,0,0,0.2)' }}
    />
    {/* Chevron left */}
    <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-black hover:text-white text-black rounded-full p-4 shadow-xl transition-all duration-200"
        aria-label="Previous image"
    >
        <span style={{ fontSize: 40, fontWeight: 700 }}>{'‹'}</span>
    </button>
    {/* Chevron right */}
    <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-black hover:text-white text-black rounded-full p-4 shadow-xl transition-all duration-200"
        aria-label="Next image"
    >
        <span style={{ fontSize: 40, fontWeight: 700 }}>{'›'}</span>
    </button>
    {/* Overlay for subtle glass effect */}
    <div className="absolute inset-0 rounded-3xl z-10 pointer-events-none"
        style={{
        background: 'linear-gradient(180deg,rgba(255,255,255,0.10) 0%,rgba(0,0,0,0.10) 100%)'
        }}
    />
    </div>
      {/* Thumbnails */}
      <div className="flex gap-3 flex-wrap justify-center mt-4">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            className={`rounded-xl cursor-pointer object-cover w-28 h-20 border-4 transition-all duration-200 shadow-md ${
              idx === selectedIdx
                ? 'border-primary scale-110 ring-4 ring-primary/30'
                : 'border-white opacity-70 hover:opacity-100'
            }`}
            style={{ boxShadow: idx === selectedIdx ? '0 4px 32px 0 rgba(0,0,0,0.18)' : undefined }}
            onClick={() => setSelectedIdx(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;