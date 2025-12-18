import React, { useState } from 'react';

const ProfileVideo = () => {
  const [playingVideo, setPlayingVideo] = useState(null);

  const videos = [
    {
      id: 1,
      videoId: 'bSjhrcyq9CY',
      title: 'Tefa SMK Alhurryah Karawang',
      description: 'Mengenal lebih dekat EduLabVtnet School',
      views: '2.5K',
      likes: '1.2K',
      category: 'Profil'
    },
    {
      id: 2,
      videoId: 'RFaFQ4r_qxo',
      title: 'Untuk UJIKOM Fiber Optik',
      description: 'Fasilitas modern dan lengkap untuk siswa',
      views: '3.1K',
      likes: '1.5K',
      category: 'Fasilitas'
    },
    {
      id: 3,
      videoId: 'Z1initWtl3M?si',
      title: 'Prestasi Siswa',
      description: 'Segudang prestasi yang membanggakan',
      views: '4.2K',
      likes: '2.1K',
      category: 'Prestasi'
    }
  ];

  return (
    <div className="relative max-w-7xl mx-auto py-20 px-4 overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
            transform: translateY(-20px);
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

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .video-card {
          background: linear-gradient(145deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%);
          padding: 3px;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .video-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
        }

        .video-inner {
          background: #0f172a;
          border-radius: 17px;
          overflow: hidden;
        }

        .play-overlay {
          backdrop-filter: blur(8px);
          background: rgba(0, 0, 0, 0.5);
        }

        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      {/* Header */}
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2 rounded-full mb-4">
          <span className="text-white font-semibold">🎬 Video Profil</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 bg-clip-text text-transparent">
            Kenali Lebih Dekat
          </span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Saksikan perjalanan dan kehidupan di EduLabVtnet School yang penuh prestasi dan inovasi
        </p>
      </div>

      {/* Video Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {videos.map((video, index) => (
          <div 
            key={video.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="video-card">
              <div className="video-inner">
                {/* Video Container */}
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.videoId}${playingVideo === video.id ? '?autoplay=1' : ''}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  
                  {/* Play Button Overlay */}
                  {playingVideo !== video.id && (
                    <div 
                      className="absolute inset-0 play-overlay flex items-center justify-center cursor-pointer group"
                      onClick={() => setPlayingVideo(video.id)}
                    >
                      <div className="relative">
                        {/* Ripple effect */}
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                        
                        {/* Play button */}
                        <button className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full p-6 shadow-2xl transform transition-all duration-300 group-hover:scale-110">
                          <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-4">
                  {/* Category Badge */}
                  <div className="mb-2">
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {video.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-lg mb-2">{video.title}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-3">{video.description}</p>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        <span>{video.likes}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setPlayingVideo(video.id)}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors"
                    >
                      Tonton →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
     
    </div>
  );
};

export default ProfileVideo;