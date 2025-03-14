import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDistanceToNow, format } from 'date-fns';
import newsService from '../services/newsService';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await newsService.getArticle(id);
        setArticle(data);

        // In a real application, you would fetch related articles
        // For now, we'll set some placeholder data
        setRelatedArticles([
          {
            _id: 'r1',
            title: 'Related: How Neural Networks Are Changing AI Research',
            source: { name: 'MIT Technology Review' },
            publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
          },
          {
            _id: 'r2',
            title: 'Related: The Ethics of Advanced AI Systems',
            source: { name: 'Wired' },
            publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
          },
          {
            _id: 'r3',
            title: 'Related: New Benchmarks for Machine Learning Models',
            source: { name: 'TechCrunch' },
            publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
          }
        ]);
      } catch (err) {
        setError('Failed to load article');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();

    // Scroll to top when loading a new article
    window.scrollTo(0, 0);
  }, [id]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-gray-300">{error || 'Article not found'}</p>
          <Link to="/" className="mt-4 inline-block text-blue-400 hover:underline">
            Go back to homepage
          </Link>
        </div>
      </div>
    );
  }

  const publishedDate = new Date(article.publishedAt);

  // Define some mock interaction stats
  const stats = {
    comments: 328,
    shares: 1452,
    likes: 5783,
    bookmarks: 892
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Main content */}
        <div className="md:w-2/3">
          <Link to="/" className="flex items-center text-blue-400 hover:underline mb-4">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to feed
          </Link>

          <article className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
            {/* Article header */}
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-900 text-blue-200 rounded-full flex items-center justify-center font-bold text-xl mr-3">
                  {article.source?.name?.charAt(0) || '?'}
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-100">{article.source?.name || 'Unknown Source'}</div>
                  <div className="text-gray-400 text-sm">
                    {format(publishedDate, 'MMMM d, yyyy')} · {formatDistanceToNow(publishedDate, { addSuffix: true })}
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-100 mb-4">{article.title}</h1>

              {article.urlToImage && (
                <img
                  src={article.urlToImage ? `/api/news/image-proxy?url=${encodeURIComponent(article.urlToImage)}` : null}
                  alt={article.title}
                  className="w-full rounded-lg h-auto mb-6"
                  onError={(e) => {
                    e.target.onerror = null;

                    // Create a canvas for the fallback image
                    const canvas = document.createElement('canvas');
                    canvas.width = 800;
                    canvas.height = 400;
                    const ctx = canvas.getContext('2d');

                    // Draw dark background
                    ctx.fillStyle = '#1F2937';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Draw source name or domain
                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = 'bold 32px Arial';
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

              {article.description && (
                <p className="text-lg text-gray-300 mb-6 font-medium">
                  {article.description}
                </p>
              )}

              {article.content ? (
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300">{article.content}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-gray-400 mb-4">Full article content is not available in our database.</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition-colors duration-200"
                  >
                    Read the full article on {article.source?.name}
                  </a>
                </div>
              )}
            </div>

            {/* Interaction stats */}
            <div className="border-t border-gray-700 px-6 py-4">
              <div className="flex justify-between">
                <div className="flex space-x-8">
                  <div className="flex items-center text-gray-400">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{formatNumber(stats.comments)}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>{formatNumber(stats.shares)}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{formatNumber(stats.likes)}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-400">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>{formatNumber(stats.bookmarks)}</span>
                </div>
              </div>
            </div>

            {/* Article actions */}
            <div className="border-t border-gray-700 grid grid-cols-4 divide-x divide-gray-700">
              <button className="py-3 flex justify-center items-center text-gray-400 hover:bg-gray-700 transition-colors">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Comment
              </button>
              <button className="py-3 flex justify-center items-center text-gray-400 hover:bg-gray-700 transition-colors">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Share
              </button>
              <button className="py-3 flex justify-center items-center text-gray-400 hover:bg-gray-700 transition-colors">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Like
              </button>
              <button className="py-3 flex justify-center items-center text-gray-400 hover:bg-gray-700 transition-colors">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Bookmark
              </button>
            </div>

            {/* Keywords/Topics */}
            {article.keywords?.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-700">
                <h3 className="text-lg font-medium text-gray-100 mb-2">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((keyword, index) => (
                    <Link
                      key={index}
                      to={`/?keyword=${encodeURIComponent(keyword)}`}
                      className="text-sm bg-gray-700 text-gray-300 px-3 py-1 rounded-full hover:bg-gray-600 transition-colors duration-200"
                    >
                      #{keyword.replace(/\s+/g, '')}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Comment section */}
            <div className="border-t border-gray-700 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-100 mb-4">Top Comments</h3>

              {/* Add comment form */}
              <div className="flex items-start mb-6">
                <div className="w-10 h-10 bg-blue-800 text-blue-200 rounded-full flex items-center justify-center font-bold text-xl mr-3">
                  U
                </div>
                <div className="flex-grow">
                  <textarea
                    placeholder="Add your comment..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <button className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-700">
                      Comment
                    </button>
                  </div>
                </div>
              </div>

              {/* Sample comments */}
              <div className="space-y-6">
                <div className="flex">
                  <div className="w-10 h-10 bg-purple-800 text-purple-200 rounded-full flex items-center justify-center font-bold text-xl mr-3">
                    A
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-bold text-gray-100">AI Researcher</span>
                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">2 hours ago</span>
                    </div>
                    <p className="text-gray-300 mt-1">
                      This research is groundbreaking. The implications for natural language processing are enormous, and I'm excited to see how this develops further.
                    </p>
                    <div className="flex items-center mt-2 text-sm">
                      <button className="text-gray-400 hover:text-gray-300">Reply</button>
                      <span className="mx-2 text-gray-600">•</span>
                      <div className="flex items-center text-gray-400">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>98</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-10 h-10 bg-green-800 text-green-200 rounded-full flex items-center justify-center font-bold text-xl mr-3">
                    D
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-bold text-gray-100">Data Scientist</span>
                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">5 hours ago</span>
                    </div>
                    <p className="text-gray-300 mt-1">
                      I've implemented something similar in my own work. The efficiency gains they're reporting are impressive, but I'd be curious to see how it performs on more diverse datasets.
                    </p>
                    <div className="flex items-center mt-2 text-sm">
                      <button className="text-gray-400 hover:text-gray-300">Reply</button>
                      <span className="mx-2 text-gray-600">•</span>
                      <div className="flex items-center text-gray-400">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>45</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button className="text-blue-400 text-sm font-medium hover:underline">
                  Show all {stats.comments} comments
                </button>
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="md:w-1/3">
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-4 border border-gray-700">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-100 mb-4">Related Articles</h2>
              <div className="space-y-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related._id}
                    to={`/article/${related._id}`}
                    className="block hover:bg-gray-700 rounded-lg p-2 -mx-2 transition-colors"
                  >
                    <h3 className="font-medium text-gray-100 hover:text-blue-400 transition-colors">
                      {related.title}
                    </h3>
                    <div className="flex items-center mt-1 text-sm text-gray-400">
                      <span>{related.source.name}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDistanceToNow(related.publishedAt, { addSuffix: true })}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-100 mb-4">About the Source</h2>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-900 text-blue-200 rounded-full flex items-center justify-center font-bold text-xl mr-3">
                  {article.source?.name?.charAt(0) || '?'}
                </div>
                <div>
                  <div className="font-bold text-gray-100">{article.source?.name || 'Unknown Source'}</div>
                  <div className="text-gray-400 text-sm">Trusted technology publication</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {article.source?.name} is a leading source of technology news, focusing on AI, machine learning, and emerging technologies. Their content is known for its depth, accuracy, and insightful analysis.
              </p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition-colors text-sm">
                  Follow
                </button>
                <button className="flex-1 border border-gray-600 text-gray-300 font-medium py-2 px-4 rounded-full hover:bg-gray-700 transition-colors text-sm">
                  More Articles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;