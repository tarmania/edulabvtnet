import React, { useState } from 'react';
import logo from '../assets/logoedulab.jpeg';
import logoMou from '../assets/logoMou.jpeg';
import logo5 from'../assets/logo5.jpeg';
import logoKelas from '../assets/logoKelas.jpg';
import tekno5 from '../assets/tekno5.png';
import alhurryah1 from '../assets/alhurryah1.jpg';
import kurikulum from '../assets/kurikulum.jpeg';
import kurikulum2 from '../assets/kurikulum2.jpeg';
import kurikulum3 from '../assets/kurikulum3.jpeg';
import meetroom from '../assets/meetroom.jpeg';
import pkl from '../assets/pkl.jpeg';
const images = [
  logo,
  logoMou,
  logo5,
  logoKelas,
  tekno5,
  alhurryah1,
  kurikulum,
  kurikulum2,
  kurikulum3,
  meetroom,
  pkl,

];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Generate snowflakes
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDuration: 3 + Math.random() * 7,
    animationDelay: Math.random() * 5,
    size: 2 + Math.random() * 4,
  }));

  return (
    <div className="relative max-w-6xl mx-auto py-16 px-4 overflow-hidden">
      {/* Snowfall Effect */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute pointer-events-none"
          style={{
            left: `${flake.left}%`,
            top: '-10px',
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            backgroundColor: 'white',
            borderRadius: '50%',
            opacity: 0.8,
            animation: `snowfall ${flake.animationDuration}s linear infinite`,
            animationDelay: `${flake.animationDelay}s`,
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
          }}
        />
      ))}

      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item:hover {
          transform: translateY(-15px) scale(1.02);
          z-index: 10;
        }

        .gallery-item::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 70%
          );
          animation: shimmer 3s infinite;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .gallery-item:hover::before {
          opacity: 1;
        }

        .frost-overlay {
          background: linear-gradient(
            135deg,
            rgba(174, 214, 241, 0.2) 0%,
            rgba(255, 255, 255, 0.1) 100%
          );
          backdrop-filter: blur(2px);
        }

        .modal-backdrop {
          backdrop-filter: blur(10px);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Header with Frost Effect */}
      <div className="relative text-center mb-12">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent mb-2" 
            style={{ textShadow: '0 0 20px rgba(174, 214, 241, 0.5)' }}>
          Galeri Kegiatan
        </h2>
        <p className="text-blue-200 text-lg">✨ Momen Berharga Kami ❄️</p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, i) => (
          <div
            key={i}
            className="gallery-item cursor-pointer group"
            style={{
              animationDelay: `${i * 0.1}s`,
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedImage(src)}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30"
                 style={{
                   boxShadow: hoveredIndex === i 
                     ? '0 25px 50px -12px rgba(59, 130, 246, 0.5), 0 0 30px rgba(174, 214, 241, 0.4)' 
                     : '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                 }}>
              <img
                src={src}
                alt={`Galeri ${i + 1}`}
                className="w-full h-56 md:h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Frost Overlay */}
              <div className="absolute inset-0 frost-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Hover Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <span className="text-white font-semibold text-lg px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
                  🔍 Lihat Foto
                </span>
              </div>

              {/* Snowflake Corner */}
              <div className="absolute top-3 right-3 text-3xl opacity-70 group-hover:opacity-100 transition-opacity"
                   style={{ 
                     animation: hoveredIndex === i ? 'float 2s ease-in-out infinite' : 'none',
                     filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))'
                   }}>
                ❄️
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 modal-backdrop z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden border-4 border-white/50 shadow-2xl"
               style={{ boxShadow: '0 0 100px rgba(174, 214, 241, 0.6)' }}
               onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-blue-600 rounded-full p-3 shadow-lg transition-all hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;