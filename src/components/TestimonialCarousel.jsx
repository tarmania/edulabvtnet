import React from 'react';

const testimonials = [
  {
    name: 'Ayu, Siswa',
    text: 'Belajar di EduLab sangat menyenangkan, gurunya ramah dan fasilitasnya lengkap!',
    img: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Budi, Orangtua',
    text: 'Anak saya berkembang pesat di EduLab. Kurikulumnya inovatif dan banyak kegiatan positif.',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Citra, Alumni',
    text: 'Saya bangga menjadi alumni EduLab. Banyak pengalaman berharga yang saya dapatkan.',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

const TestimonialCarousel = () => {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);
  const t = testimonials[idx];
  return (
    <div className="max-w-xl mx-auto text-center py-12">
      <div className="flex flex-col items-center gap-4">
        <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full object-cover border-4 border-blue-200" />
        <p className="text-lg italic text-gray-700">"{t.text}"</p>
        <span className="font-bold text-blue-700">{t.name}</span>
        <div className="flex gap-2 justify-center mt-2">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`w-3 h-3 rounded-full ${i === idx ? 'bg-blue-600' : 'bg-blue-200'}`}></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
