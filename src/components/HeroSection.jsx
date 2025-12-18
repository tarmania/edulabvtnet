import React, { useState, useEffect } from 'react';
import image1 from '../assets/edit gambar web.png';
import image2 from '../assets/rapat.png';
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: image1,
      title: 'Selamat Datang di EduLab School',
      subtitle: 'Membangun generasi cerdas, kreatif, dan berkarakter'
    },
    {
      image: image2,
      title: 'Pendidikan Berkualitas',
      subtitle: 'Fasilitas modern dan tenaga pengajar profesional'
    },
    {
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&h=900&fit=crop',
      title: 'Prestasi Gemilang',
      subtitle: 'Raih kesuksesan bersama kami'
    }
  ];

  // Auto slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Slideshow Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {slides[currentSlide].title}
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          {slides[currentSlide].subtitle}
        </p>
        <a
          href="#ppdb"
          className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-50 transition transform hover:scale-105"
        >
          Daftar Sekarang
        </a>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;