import React, { useState } from 'react';

const data = [
  { q: 'Bagaimana cara mendaftar?', a: 'Klik tombol Daftar Sekarang di halaman utama atau pada bagian PPDB.' },
  { q: 'Apakah ada biaya pendaftaran?', a: 'Pendaftaran gratis tanpa dipungut biaya.' },
  { q: 'Apa saja syarat pendaftaran?', a: 'Mengisi formulir, melampirkan fotokopi rapor, dan pas foto.' },
  { q: 'Apakah ada asrama?', a: 'Saat ini belum tersedia asrama.' },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">FAQ</h2>
      <div className="space-y-4">
        {data.map((item, i) => (
          <div key={i} className="border rounded-lg">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left px-6 py-4 font-semibold text-blue-700 focus:outline-none flex justify-between items-center">
              {item.q}
              <span>{open === i ? '-' : '+'}</span>
            </button>
            {open === i && <div className="px-6 pb-4 text-gray-700">{item.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
