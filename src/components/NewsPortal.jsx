import React, { useState, useEffect, useCallback, useMemo } from 'react';

const NewsPortal = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  
  const POSTS_PER_PAGE = 9;

  // Blog sources dari env atau default
  const BLOG_SOURCES = useMemo(() => {
    const envUrls = import.meta.env?.VITE_PUBLIC_BLOG_URLS;
    if (envUrls) {
      return envUrls.split(',').map(url => url.trim()).filter(url => url.startsWith('http'));
    }
    return [
      'https://smkalhuriyah1.blogspot.com',
      'https://smktecnologiterbaik.blogspot.com'
    ];
  }, []);

  const MAX_RESULTS = useMemo(() => {
    const envMax = import.meta.env?.VITE_PUBLIC_MAX_RESULTS_PER_BLOG;
    return envMax ? Math.min(parseInt(envMax), 500) : 500;
  }, []);

  // Utils functions
  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  const stripHtmlTags = useCallback((html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }, []);

  const truncateText = useCallback((text, maxLength = 150) => {
    if (!text) return '';
    const stripped = stripHtmlTags(text);
    return stripped.length > maxLength
      ? stripped.substring(0, maxLength) + '...'
      : stripped;
  }, [stripHtmlTags]);

  const getFirstImage = useCallback((content) => {
    const temp = document.createElement('div');
    temp.innerHTML = content;
    const img = temp.querySelector('img');
    let imgSrc = img ? img.src : null;
    
    if (imgSrc) {
      imgSrc = imgSrc.replace(/\/s\d+(-c)?\//, '/s800/');
    }
    
    return imgSrc || 'https://images.unsplash.com/photo-1503676382389-4809596d5290?w=800';
  }, []);

  const generateSlug = useCallback((title, url) => {
    const urlMatch = url.match(/\/(\d{4})\/(\d{2})\/([^.]+)\.html/);
    if (urlMatch) {
      return urlMatch[3];
    }
    
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }, []);

  // Get all unique labels
  const allLabels = useMemo(() => {
    const labels = new Set();
    posts.forEach(post => {
      post.labels?.forEach(label => labels.add(label));
    });
    return Array.from(labels).sort();
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;
    
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stripHtmlTags(post.content).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedLabel) {
      filtered = filtered.filter(post => 
        post.labels?.includes(selectedLabel)
      );
    }
    
    return filtered;
  }, [posts, searchQuery, selectedLabel, stripHtmlTags]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLabel]);

  // JSONP Fetch using script injection
  useEffect(() => {
    if (BLOG_SOURCES.length === 0) {
      setError('URL Blog tidak ditemukan');
      setLoading(false);
      return;
    }

    setLoading(true);
    let completed = 0;
    let allPosts = [];
    const total = BLOG_SOURCES.length;
    const scriptTags = [];

    const processResponse = (data) => {
      if (data.feed?.entry) {
        const transformed = data.feed.entry.map((entry) => {
          const postUrl = entry.link.find((link) => link.rel === 'alternate')?.href || '#';
          const title = entry.title.$t;
          const slug = generateSlug(title, postUrl);

          return {
            id: entry.id.$t,
            title: title,
            url: postUrl,
            published: entry.published.$t,
            content: entry.content?.$t || '',
            author: {
              displayName: entry.author?.[0]?.name?.$t || 'Admin',
            },
            labels: entry.category?.map((cat) => cat.term) || [],
            slug: slug,
          };
        });

        allPosts = allPosts.concat(transformed);
      }

      completed++;

      if (completed === total) {
        const sortedPosts = allPosts.sort((a, b) => new Date(b.published) - new Date(a.published));
        setPosts(sortedPosts);
        setLoading(false);
        setError(null);

        scriptTags.forEach((script) => {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
        });
      }
    };

    BLOG_SOURCES.forEach((blogUrl, index) => {
      const callbackName = `bloggerCallback${Date.now()}_${index}`;
      
      window[callbackName] = (data) => {
        processResponse(data);
        delete window[callbackName];
      };

      const script = document.createElement('script');
      const apiUrl = `${blogUrl}/feeds/posts/default?alt=json-in-script&max-results=${MAX_RESULTS}&callback=${callbackName}`;
      
      script.src = apiUrl;
      script.onerror = () => {
        console.error(`Failed to load from ${blogUrl}`);
        completed++;
        
        if (completed === total && allPosts.length === 0) {
          setError('Gagal memuat artikel');
          setLoading(false);
        }
        
        delete window[callbackName];
      };

      document.body.appendChild(script);
      scriptTags.push(script);
    });

    return () => {
      scriptTags.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [BLOG_SOURCES, MAX_RESULTS, generateSlug]);

  return (
    <section className="bg-gradient-to-br from-blue-900 to-blue-700 min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <span className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold text-lg flex items-center gap-2">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M13 2.05v2.02A7.001 7.001 0 0 1 19.93 11H21.95A9.003 9.003 0 0 0 13 2.05ZM11 2.05A9.003 9.003 0 0 0 2.05 11H4.07A7.001 7.001 0 0 1 11 4.07V2.05ZM2.05 13A9.003 9.003 0 0 0 11 21.95v-2.02A7.001 7.001 0 0 1 4.07 13H2.05ZM21.95 13H19.93A7.001 7.001 0 0 1 13 19.93v2.02A9.003 9.003 0 0 0 21.95 13Z" fill="#fff"/>
            </svg>
            PORTAL INFORMASI TEKNOLOGI
          </span>
        </div>

        <h2 className="text-5xl font-extrabold text-blue-300 mb-2 text-center">
          Semua Berita & Artikel
        </h2>
        
        <p className="text-blue-100 text-center mb-10">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Memuat artikel dari {BLOG_SOURCES.length} sumber...
            </span>
          ) : error ? (
            <span className="text-red-300">{error}</span>
          ) : (
            <>
              Menampilkan {filteredPosts.length} dari {posts.length} artikel
              <span className="text-blue-400"> • </span>
              <span className="text-green-300">Live dari Blogger</span>
            </>
          )}
        </p>

        {/* Search and Filter */}
        {!loading && posts.length > 0 && (
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-blue-200 border border-blue-400/30 focus:outline-none focus:border-blue-300"
                />
              </div>
              <div className="md:w-64">
                <select
                  value={selectedLabel}
                  onChange={(e) => setSelectedLabel(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-blue-400/30 focus:outline-none focus:border-blue-300"
                >
                  <option value="">Semua Kategori</option>
                  {allLabels.map((label) => (
                    <option key={label} value={label}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="bg-white/10 rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-56 bg-blue-800/50" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-blue-800/50 rounded w-3/4" />
                  <div className="h-6 bg-blue-800/50 rounded w-full" />
                  <div className="h-4 bg-blue-800/50 rounded w-full" />
                  <div className="h-4 bg-blue-800/50 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : currentPosts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              {currentPosts.map((post) => {
                const imageUrl = getFirstImage(post.content);
                const description = truncateText(post.content);
                
                return (
                  <div 
                    key={post.id}
                    className="bg-white/10 rounded-2xl shadow-lg overflow-hidden flex flex-col hover:bg-white/15 transition-all duration-300 hover:-translate-y-2"
                  >
                    <img 
                      src={imageUrl}
                      alt={post.title}
                      className="h-56 w-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1503676382389-4809596d5290?w=800';
                      }}
                    />
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-blue-200 text-sm mb-2 flex-wrap">
                        <span className="flex items-center gap-1">
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                          <span className="truncate max-w-[150px]">{post.author.displayName}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V8h14v13zm0-15H5V5h14v1z"/>
                          </svg>
                          {formatDate(post.published)}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-blue-100 mb-4 flex-1 line-clamp-3">
                        {description}
                      </p>
                      
                      {post.labels && post.labels.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.labels.slice(0, 3).map((label, idx) => (
                            <span 
                              key={idx}
                              className="bg-blue-600/30 text-blue-200 px-2 py-1 rounded text-xs"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <a 
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 self-start transition-colors"
                      >
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                        </svg>
                        Lihat Detail
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      if (totalPages <= 7) return true;
                      if (page === 1 || page === totalPages) return true;
                      if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                      return false;
                    })
                    .map((page, idx, arr) => {
                      if (idx > 0 && page - arr[idx - 1] > 1) {
                        return (
                          <React.Fragment key={`ellipsis-${page}`}>
                            <span className="px-4 py-2 text-blue-200">...</span>
                            <button
                              onClick={() => setCurrentPage(page)}
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                currentPage === page
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-blue-600/50 text-white hover:bg-blue-600'
                              }`}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        );
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === page
                              ? 'bg-blue-500 text-white'
                              : 'bg-blue-600/50 text-white hover:bg-blue-600'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-blue-200 py-12">
            <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl">Tidak ada artikel yang ditemukan</p>
            <p className="text-sm mt-2">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsPortal;