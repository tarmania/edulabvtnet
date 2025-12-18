import React from 'react';

const stats = [
  { label: 'Siswa Aktif', value: 850, icon: '👨‍🎓', color: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-50' },
  { label: 'Guru', value: 45, icon: '👩‍🏫', color: 'from-purple-500 to-purple-600', bgLight: 'bg-purple-50' },
  { label: 'Alumni', value: 3200, icon: '🎓', color: 'from-cyan-500 to-cyan-600', bgLight: 'bg-cyan-50' },
  { label: 'Prestasi', value: 120, icon: '🏆', color: 'from-amber-500 to-amber-600', bgLight: 'bg-amber-50' },
];

const Stats = () => (
  <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
    <style>{`
      @keyframes countUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
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

      .stat-card {
        animation: countUp 0.6s ease-out;
      }

      .stat-icon {
        animation: float 3s ease-in-out infinite;
      }

      .shimmer-effect {
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
        background-size: 1000px 100%;
        animation: shimmer 3s infinite;
      }
    `}</style>

    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2 rounded-full mb-4">
          <span className="text-white font-semibold">📊 Statistik Sekolah</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Data & Pencapaian
          </span>
        </h2>
        <p className="text-gray-600 text-lg">
          Angka-angka yang membanggakan dari perjalanan kami
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="stat-card group"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Card Container */}
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2">
              {/* Shimmer Effect on Hover */}
              <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 pointer-events-none" />
              
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative p-6">
                {/* Icon with Background */}
                <div className={`${s.bgLight} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl stat-icon" style={{ animationDelay: `${i * 0.2}s` }}>
                    {s.icon}
                  </span>
                </div>

                {/* Value */}
                <div className="text-center mb-2">
                  <span className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent inline-block`}>
                    {s.value.toLocaleString()}
                  </span>
                  {s.label === 'Alumni' && (
                    <span className="text-2xl text-gray-400 ml-1">+</span>
                  )}
                </div>

                {/* Label */}
                <p className="text-gray-600 font-medium text-center">
                  {s.label}
                </p>

                {/* Decorative Bottom Line */}
                <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${s.color} rounded-full transition-all duration-1000 group-hover:w-full`}
                    style={{ width: '0%' }}
                  />
                </div>
              </div>

              {/* Corner Accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${s.color} opacity-10 rounded-bl-full`} />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Info */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-gray-100">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-700 font-medium">Data diperbarui: Desember 2024</span>
        </div>
      </div>
    </div>
  </div>
);

export default Stats;