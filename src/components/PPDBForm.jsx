import React, { useState } from 'react';

const PPDBForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nama: '',
    email: '',
    nohp: '',
    alamat: '',
    asalSekolah: '',
    pesan: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Ganti URL_SHEETDB di bawah dengan endpoint SheetDB/NoCodeAPI Anda
      const endpoint = "https://sheetdb.io/api/v1/YOUR_SHEETDB_ID";
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: form }),
      });
      setSubmitted(true);
    } catch (err) {
      alert("Gagal mengirim data. Silakan coba lagi.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-300 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-green-700 mb-2">Pendaftaran Berhasil!</h3>
        <p className="text-green-700">Terima kasih telah mendaftar. Kami akan menghubungi Anda segera.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 flex flex-col gap-4">
      <input name="nama" value={form.nama} onChange={handleChange} required type="text" placeholder="Nama Lengkap" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      <input name="nohp" value={form.nohp} onChange={handleChange} required type="tel" placeholder="No. HP" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      <input name="asalSekolah" value={form.asalSekolah} onChange={handleChange} required type="text" placeholder="Asal Sekolah" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      <input name="alamat" value={form.alamat} onChange={handleChange} required type="text" placeholder="Alamat" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      <textarea name="pesan" value={form.pesan} onChange={handleChange} placeholder="Pesan (opsional)" rows="3" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
      <button type="submit" className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition" disabled={loading}>
        {loading ? 'Mengirim...' : 'Daftar Sekarang'}
      </button>
    </form>
  );
};

export default PPDBForm;
