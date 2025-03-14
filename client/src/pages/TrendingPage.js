import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import newsService from '../services/newsService';

const TrendingPage = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('today');

  // Realistic trending topics with counts and history data
  const trendingData = {
    today: [
      { keyword: 'GPT-5', count: 4728, percentChange: 125, articles: 42 },
      { keyword: 'AI Ethics', count: 3156, percentChange: 85, articles: 31 },
      { keyword: 'Neural Networks', count: 2854, percentChange: 45, articles: 27 },
      { keyword: 'Machine Learning', count: 2341, percentChange: 15, articles: 22 },
      { keyword: 'Deep Learning', count: 1986, percentChange: 28, articles: 19 },
      { keyword: 'Computer Vision', count: 1752, percentChange: 35, articles: 16 },
      { keyword: 'AI Research', count: 1531, percentChange: 22, articles: 15 },
      { keyword: 'NLP', count: 1342, percentChange: 18, articles: 12 },
      { keyword: 'Reinforcement Learning', count: 1187, percentChange: -5, articles: 11 },
      { keyword: 'LLM', count: 962, percentChange: 65, articles: 9 }
    ],
    weekly: [
      { keyword: 'AI Regulation', count: 15243, percentChange: 220, articles: 147 },
      { keyword: 'GPT-5', count: 12758, percentChange: 180, articles: 125 },
      { keyword: 'Machine Learning', count: 11542, percentChange: 45, articles: 112 },
      { keyword: 'Neural Networks', count: 9876, percentChange: 25, articles: 95 },
      { keyword: 'AI Ethics', count: 8652, percentChange: 95, articles: 82 },
      { keyword: 'Computer Vision', count: 7564, percentChange: 35, articles: 73 },
      { keyword: 'Deep Learning', count: 6842, percentChange: 18, articles: 65 },
      { keyword: 'AI Research', count: 5761, percentChange: 12, articles: 56 },
      { keyword: 'NLP', count: 4985, percentChange: 8, articles: 48 },
      { keyword: 'Robotics & AI', count: 4321, percentChange: 75, articles: 42 }
    ],
    monthly: [
      { keyword: 'AI Regulation', count: 62478, percentChange: 315, articles: 587 },
      { keyword: 'Machine Learning', count: 58542, percentChange: 45, articles: 542 },
      { keyword: 'GPT Models', count: 51786, percentChange: 280, articles: 498 },
      { keyword: 'Neural Networks', count: 47896, percentChange: 35, articles: 456 },
      { keyword: 'AI Ethics', count: 42187, percentChange: 125, articles: 412 },
      { keyword: 'Deep Learning', count: 38452, percentChange: 28, articles: 375 },
      { keyword: 'Computer Vision', count: 32564, percentChange: 42, articles: 312 },
      { keyword: 'NLP', count: 28753, percentChange: 58, articles: 276 },
      { keyword: 'AI Research', count: 25641, percentChange: 32, articles: 245 },
      { keyword: 'Reinforcement Learning', count: 21456, percentChange: 15, articles: 208 }
    ]
  };

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        // In a real application, you would fetch this data from your API
        // For now, we'll use the mock data defined above
        setTrending(trendingData[activeTab]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load trending topics');
        setLoading(false);
        console.error(err);
      }
    };

    fetchTrending();
  }, [activeTab]);

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

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left column */}
        <div className="md:w-2/3">
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-100 mb-2">Trending in AI</h1>
              <p className="text-gray-400">
                The most discussed AI topics and technologies right now
              </p>
            </div>
            
            {/* Time period tabs */}
            <div className="border-b border-gray-700">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('today')}
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === 'today'
                      ? 'border-b-2 border-blue-400 text-blue-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setActiveTab('weekly')}
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === 'weekly'
                      ? 'border-b-2 border-blue-400 text-blue-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  This Week
                </button>
                <button
                  onClick={() => setActiveTab('monthly')}
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === 'monthly'
                      ? 'border-b-2 border-blue-400 text-blue-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  This Month
                </button>
              </nav>
            </div>
            
            {/* Trending list */}
            <div>
              {trending.map((topic, index) => (
                <div 
                  key={topic.keyword}
                  className="px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <span className="text-gray-500 font-medium text-sm mr-2">
                          {index + 1}
                        </span>
                        <Link
                          to={`/?keyword=${encodeURIComponent(topic.keyword)}`}
                          className="text-lg font-bold text-gray-100 hover:text-blue-400 transition-colors"
                        >
                          #{topic.keyword.replace(/\s+/g, '')}
                        </Link>
                      </div>
                      <div className="mt-1 text-gray-400 text-sm">
                        {formatNumber(topic.count)} mentions • {topic.articles} articles
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${
                      topic.percentChange > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {topic.percentChange > 0 ? '+' : ''}{topic.percentChange}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right column */}
        <div className="md:w-1/3">
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-4 border border-gray-700">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-100 mb-4">What is Trending?</h2>
              <p className="text-gray-300 text-sm">
                Trending topics are determined by analyzing mentions, engagement, and article frequency
                across our curated sources of AI news and research.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-100 mb-4">Trending Chart</h2>
              <div className="h-64 bg-gray-700 rounded flex items-center justify-center">
                <p className="text-gray-400 text-sm">
                  Interactive trend chart would go here
                </p>
              </div>
              <div className="mt-4 text-sm text-gray-400">
                Visualizing trending topics over time. Select topics to compare their trends.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;