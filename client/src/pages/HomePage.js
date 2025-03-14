import React, { useContext, useState } from 'react';
import { NewsContext } from '../context/NewsContext';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { articles, loading, error, pagination, fetchArticles, updateFilters, filters } = useContext(NewsContext);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    updateFilters({ keyword: searchTerm });
  };

  // Handle source filter clicks
  const handleSourceClick = (sourceId) => {
    updateFilters({ source: sourceId === filters.source ? '' : sourceId });
  };

  // Handle trending topic clicks
  const handleTopicClick = (topic) => {
    updateFilters({ keyword: topic });
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
        <p className="text-gray-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Left sidebar */}
      <div className="md:w-1/4 p-4">
        <div className="bg-gray-800 rounded-xl shadow-lg p-4 mb-4 border border-gray-700">
          <h2 className="text-xl font-bold text-gray-100 mb-3">AI News Feed</h2>
          <p className="text-gray-400 text-sm mb-4">The latest news in artificial intelligence, machine learning, and more.</p>

          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search AI news..."
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          <div className="border-t border-gray-700 pt-4">
            <h3 className="font-semibold text-gray-200 mb-2">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="flex items-center text-blue-400 font-medium">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sources" className="flex items-center text-gray-300 hover:text-blue-400">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Sources
                </Link>
              </li>
              <li>
                <Link to="/trending" className="flex items-center text-gray-300 hover:text-blue-400">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center text-gray-300 hover:text-blue-400">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-700">
          <h3 className="font-semibold text-gray-200 mb-2">Popular Topics</h3>
          <div className="flex flex-wrap gap-2">
            {['AI', 'Machine Learning', 'Neural Networks', 'Deep Learning', 'GPT', 'AI Ethics'].map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={`text-sm px-3 py-1 rounded-full transition-colors ${filters.keyword === topic
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main feed */}
      <div className="md:w-2/4">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-700">
            <h2 className="text-xl font-medium text-gray-100 mb-2">No articles found</h2>
            <p className="text-gray-400">Try adjusting your filters or check back later for new content.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map(article => (
              <div key={article._id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-700">
                <div className="p-4">
                  {/* Article header with source and time */}
                  <div className="flex items-center mb-3">
                    <span className="font-medium text-gray-100">
                      {article.source?.name || 'Unknown Source'}
                    </span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-sm text-gray-400">
                      {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                    </span>
                  </div>

                  {/* Article content */}
                  <Link to={`/article/${article._id}`}>
                    <h3 className="font-bold text-lg mb-2 text-gray-100 hover:text-blue-400 transition-colors">{article.title}</h3>
                    <p className="text-gray-300 mb-3">{article.description}</p>

                    {article.urlToImage && (
                      <img
                        src={article.urlToImage ? `/api/news/image-proxy?url=${encodeURIComponent(article.urlToImage)}` : null}
                        alt={article.title}
                        className="w-full h-48 object-cover rounded-lg mb-3"
                        onError={(e) => {
                          e.target.onerror = null;

                          // Use a more reliable fallback that doesn't rely on external services
                          // Create a colored background with text overlay
                          const canvas = document.createElement('canvas');
                          canvas.width = 400;
                          canvas.height = 200;
                          const ctx = canvas.getContext('2d');

                          // Draw dark background
                          ctx.fillStyle = '#1F2937';
                          ctx.fillRect(0, 0, canvas.width, canvas.height);

                          // Draw source name or domain
                          ctx.fillStyle = '#FFFFFF';
                          ctx.font = 'bold 24px Arial';
                          ctx.textAlign = 'center';
                          ctx.textBaseline = 'middle';

                          // Try to extract domain from article URL or use source name
                          let label = '';
                          try {
                            const url = new URL(article.url);
                            label = url.hostname.replace('www.', '');
                          } catch (err) {
                            label = article.source?.name || 'AI News';
                          }

                          ctx.fillText(label, canvas.width / 2, canvas.height / 2);

                          // Use the canvas as the image source
                          e.target.src = canvas.toDataURL('image/png');
                        }}
                      />
                    )}
                  </Link>

                  {/* Keywords/hashtags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {article.keywords?.map((keyword, index) => (
                      <button
                        key={index}
                        onClick={() => handleTopicClick(keyword)}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        #{keyword.replace(/\s+/g, '')}
                      </button>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-between text-gray-400 pt-2 border-t border-gray-700">
                    <button className="flex items-center hover:text-blue-400">
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-xs">Share</span>
                    </button>
                    <button className="flex items-center hover:text-green-400">
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span className="text-xs">Repost</span>
                    </button>
                    <button className="flex items-center hover:text-red-400">
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="text-xs">Like</span>
                    </button>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-blue-400"
                    >
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="text-xs">Read More</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Load more button */}
            {pagination.currentPage < pagination.totalPages && (
              <button
                onClick={() => fetchArticles(pagination.currentPage + 1)}
                className="w-full py-3 bg-gray-800 rounded-xl shadow-lg text-blue-400 font-medium hover:bg-gray-700 transition-colors border border-gray-700"
              >
                Load more articles
              </button>
            )}
          </div>
        )}
      </div>

      {/* Right sidebar */}
      <div className="md:w-1/4 p-4">
        <div className="bg-gray-800 rounded-xl shadow-lg p-4 mb-4 border border-gray-700">
          <h3 className="font-semibold text-gray-200 mb-3">Top Sources</h3>
          <ul className="space-y-2">
            {['techcrunch', 'wired', 'the-verge', 'mit-technology-review', 'ars-technica'].map((source, index) => {
              const sourceNames = {
                'techcrunch': 'TechCrunch',
                'wired': 'Wired',
                'the-verge': 'The Verge',
                'mit-technology-review': 'MIT Tech Review',
                'ars-technica': 'Ars Technica'
              };

              return (
                <li key={source}>
                  <button
                    onClick={() => handleSourceClick(source)}
                    className={`w-full text-left flex items-center justify-between p-2 rounded ${filters.source === source
                        ? 'bg-gray-700 text-blue-400'
                        : 'hover:bg-gray-700 text-gray-300'
                      }`}
                  >
                    <span className="flex items-center">
                      <span className="w-8 h-8 flex items-center justify-center bg-gray-600 text-gray-300 rounded-full mr-2">
                        {sourceNames[source].charAt(0)}
                      </span>
                      {sourceNames[source]}
                    </span>
                    {filters.source === source && (
                      <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-700">
          <h3 className="font-semibold text-gray-200 mb-3">Latest Updates</h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-300 border-l-2 border-blue-500 pl-3">
              New language model announced with improved reasoning capabilities
            </p>
            <p className="text-sm text-gray-300 border-l-2 border-green-500 pl-3">
              AI ethics conference scheduled for next month
            </p>
            <p className="text-sm text-gray-300 border-l-2 border-purple-500 pl-3">
              Computer vision breakthrough in medical imaging analysis
            </p>
            <div className="pt-2">
              <Link to="/trending" className="text-blue-400 text-sm hover:underline">
                View all updates →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;