import React, { useState, useContext, useEffect } from 'react';
import { NewsContext } from '../context/NewsContext';
import newsService from '../services/newsService';

const FilterBar = () => {
  const { filters, updateFilters } = useContext(NewsContext);
  const [sources, setSources] = useState([]);
  const [trending, setTrending] = useState([]);
  
  useEffect(() => {
    const fetchSourcesAndTrending = async () => {
      try {
        const sourcesData = await newsService.getSources();
        setSources(sourcesData);
        
        const trendingData = await newsService.getTrending();
        setTrending(trendingData);
      } catch (error) {
        console.error('Error fetching filter data:', error);
      }
    };
    
    fetchSourcesAndTrending();
  }, []);
  
  const handleSortChange = (e) => {
    updateFilters({ sort: e.target.value });
  };
  
  const handleSourceChange = (e) => {
    updateFilters({ source: e.target.value });
  };
  
  const handleKeywordClick = (keyword) => {
    updateFilters({ keyword });
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
          <select
            value={filters.source}
            onChange={handleSourceChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="">All Sources</option>
            {sources.map(source => (
              <option key={source.id} value={source.id}>
                {source.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            value={filters.sort}
            onChange={handleSortChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="-publishedAt">Newest First</option>
            <option value="publishedAt">Oldest First</option>
            <option value="-relevanceScore">Most Relevant</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>
      
      {filters.keyword && (
        <div className="mt-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600">Active filter:</span>
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {filters.keyword}
              <button
                type="button"
                className="ml-1 inline-flex text-blue-400 hover:text-blue-600"
                onClick={() => updateFilters({ keyword: '' })}
              >
                <span className="sr-only">Remove filter</span>
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          </div>
        </div>
      )}
      
      {trending.length > 0 && !filters.keyword && (
        <div className="mt-4">
          <span className="text-sm text-gray-600">Trending topics:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {trending.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(topic.keyword)}
                  className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors duration-200"
              >
                {topic.keyword}
                <span className="ml-1 text-gray-500">{topic.count}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;