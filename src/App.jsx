
import NewsPortal from './components/NewsPortal';
import HeroSection from './components/HeroSection';
import React from 'react';
import Navbar from './components/Navbar';
import PPDBForm from './components/PPDBForm';
import TestimonialCarousel from './components/TestimonialCarousel';
import Gallery from './components/Gallery';
import Stats from './components/Stats';
import FAQ from './components/FAQ';
import ProfileVideo from './components/ProfileVideo';
import FloatingWAButton from './components/FloatingWAButton';


function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <HeroSection />

      {/* News Portal Section */}
      <NewsPortal />

      {/* Animated Stats Section */}
      <Stats />

      {/* About Section */}
      <section id="about" className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-700">Tentang Kami</h2>
        <p className="text-gray-700 text-lg mb-6">EduLabVtnet School adalah sekolah modern yang berfokus pada pengembangan akademik dan karakter siswa melalui kurikulum inovatif, fasilitas lengkap, dan tenaga pengajar profesional.</p>
      </section>


      {/* Features Section */}
      <section id="features" className="bg-blue-50 py-16 px-4">
  <div className="max-w-6xl mx-auto">
    {/* First Row - 4 Cards */}
    <div className="grid md:grid-cols-4 gap-8 text-center mb-8">
      <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
        <div className="text-5xl mb-4">🎓</div>
        <h3 className="font-bold text-xl mb-2 text-blue-700">Kurikulum Inovatif</h3>
        <p className="text-gray-600">Menggabungkan pembelajaran akademik dan pengembangan karakter.</p>
      </div>
      
      <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
        <div className="text-5xl mb-4">🏫</div>
        <h3 className="font-bold text-xl mb-2 text-blue-700">Fasilitas Lengkap</h3>
        <p className="text-gray-600">Ruang kelas modern, laboratorium, perpustakaan, dan area olahraga.</p>
      </div>
      
      <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
        <div className="text-5xl mb-4">👩‍🏫</div>
        <h3 className="font-bold text-xl mb-2 text-blue-700">Guru Profesional</h3>
        <p className="text-gray-600">Tenaga pengajar berpengalaman dan berdedikasi tinggi.</p>
      </div>
      
      <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
        <div className="text-5xl mb-4">🤝</div>
        <h3 className="font-bold text-xl mb-2 text-blue-700">Ekstrakurikuler & Prestasi</h3>
        <p className="text-gray-600">Beragam kegiatan ekstrakurikuler dan prestasi siswa di tingkat nasional.</p>
      </div>
    </div>

    {/* Second Row - 3 Cards */}
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-100">
        <div className="text-4xl mb-3">🎓</div>
        <h3 className="font-bold text-xl text-blue-700 mb-2">Kualitas Terbaik</h3>
        <p className="text-gray-600">Pendidikan berkelas internasional</p>
      </div>
      
      <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-100">
        <div className="text-4xl mb-3">🏆</div>
        <h3 className="font-bold text-xl text-blue-700 mb-2">Prestasi Gemilang</h3>
        <p className="text-gray-600">Ratusan penghargaan nasional</p>
      </div>
      
      <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-100">
        <div className="text-4xl mb-3">👨‍🏫</div>
        <h3 className="font-bold text-xl text-blue-700 mb-2">Guru Profesional</h3>
        <p className="text-gray-600">Tenaga pengajar bersertifikat</p>
      </div>
    </div>
  </div>
</section>

      {/* Video Profile Section */}
      <ProfileVideo />

      {/* Gallery Section */}
      <Gallery />

      {/* Testimonial Section */}
      <TestimonialCarousel />

      {/* FAQ Section */}
      <FAQ />

      {/* PPDB Section */}
      <section id="ppdb" className="py-16 px-4 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-blue-700 text-center">Pendaftaran Peserta Didik Baru (PPDB)</h2>
        <PPDBForm />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-blue-700 text-center">Hubungi Kami</h2>
        <form className="bg-white rounded-lg shadow p-8 flex flex-col gap-4">
          <input type="text" placeholder="Nama" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="email" placeholder="Email" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <textarea placeholder="Pesan" rows="4" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
          <button type="submit" className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition">Kirim Pesan</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white text-center py-4 mt-auto">
        &copy; {new Date().getFullYear()} EduLabvtnet School. All rights reserved.
      </footer>

      {/* Floating WhatsApp Button */}
      <FloatingWAButton />
    </div>
  );
}

export default App;
