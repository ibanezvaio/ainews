import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const TweetArticle = ({ article, onKeywordClick }) => {
  const publishedDate = new Date(article.publishedAt);
  
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-700">
      <div className="p-4">
        {/* Header with source and time */}
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-blue-400 font-bold text-xl mr-3">
            {article.source?.name?.charAt(0) || '?'}
          </div>
          <div>
            <span className="font-bold text-gray-100">{article.source?.name || 'Unknown Source'}</span>
            <div className="flex items-center">
              <span className="text-sm text-gray-400">
                {formatDistanceToNow(publishedDate, { addSuffix: true })}
              </span>
              <span className="mx-1 text-gray-500">•</span>
              <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.51 20h-.08a10.87 10.87 0 0 1-4.65-1.09A1.38 1.38 0 0 1 3 17.47a1.41 1.41 0 0 1 .75-1.23l3.18-1.45c.57-1.93 1.5-4.58 2.32-6.43A3.16 3.16 0 0 1 12 6.1h.13a3.16 3.16 0 0 1 2.75 2.26c.82 1.85 1.75 4.5 2.32 6.43l3.18 1.45a1.41 1.41 0 0 1 .75 1.23 1.38 1.38 0 0 1-.78 1.44A10.87 10.87 0 0 1 15.57 20h-.08a9.25 9.25 0 0 1-7 0Z"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <Link to={`/article/${article._id}`}>
          <h3 className="font-bold text-lg mb-2 text-gray-100 hover:text-blue-400 transition-colors">{article.title}</h3>
          <p className="text-gray-300 mb-3">{article.description}</p>
          
          {article.urlToImage && (
            <img 
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-48 object-cover rounded-lg mb-3"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x200?text=AI+News';
              }}
            />
          )}
        </Link>
        
        {/* Keywords/hashtags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {article.keywords?.map((keyword, index) => (
            <button
              key={index}
              onClick={() => onKeywordClick(keyword)}
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
            <span className="text-xs">42</span>
          </button>
          <button className="flex items-center hover:text-green-400">
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-xs">128</span>
          </button>
          <button className="flex items-center hover:text-red-400">
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs">583</span>
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
            <span className="text-xs">Read Full</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TweetArticle;