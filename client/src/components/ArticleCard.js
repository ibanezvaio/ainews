import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const ArticleCard = ({ article }) => {
  const publishedDate = new Date(article.publishedAt);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/article/${article._id}`}>
        {article.urlToImage ? (
          <img 
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover rounded-lg mb-3"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loops if fallback also fails
            
            // Try to extract domain from article URL for a custom fallback
            let domain = '';
            try {
              const url = new URL(article.url);
              domain = url.hostname.replace('www.', '');
            } catch (err) {
              domain = article.source?.name || 'AI News';
            }
            
            // Use a more customized placeholder
            e.target.src = `https://via.placeholder.com/400x200/1F2937/FFFFFF?text=${encodeURIComponent(domain)}`;
          }}
        />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image Available</span>
          </div>
        )}
        
        <div className="p-4">
          <div className="flex items-center mb-2">
            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
              {article.source?.name || 'Unknown Source'}
            </span>
            <span className="ml-2 text-xs text-gray-500">
              {formatDistanceToNow(publishedDate, { addSuffix: true })}
            </span>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {article.description || 'No description available'}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {article.keywords?.slice(0, 3).map((keyword, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;