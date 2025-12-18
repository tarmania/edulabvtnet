import React from 'react';
import logo from '../assets/logoedulab2.jpeg';

const Navbar = () => {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Edulab Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-blue-700">EduLabVtnet</span>
          </div>
          <div className="flex space-x-8 text-lg font-semibold">
            <a 
              href="#home" 
              className="text-blue-600 border-b-2 border-blue-600 pb-1 transition-colors"
            >
              Home
            </a>
            <a 
              href="#about" 
              className="hover:text-blue-600 transition-colors"
            >
              Tentang Kami
            </a>
            <a 
              href="#features" 
              className="hover:text-blue-600 transition-colors"
            >
              Fitur
            </a>
            <a 
              href="#ppdb" 
              className="hover:text-blue-600 transition-colors"
            >
              PPDB
            </a>
            <a 
              href="#contact" 
              className="hover:text-blue-600 transition-colors"
            >
              Kontak
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;