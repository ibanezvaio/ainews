import React, { useContext } from 'react';
import { NewsContext } from '../context/NewsContext';

const Pagination = () => {
  const { pagination, fetchArticles } = useContext(NewsContext);
  const { currentPage, totalPages } = pagination;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    // First page
    if (currentPage > 3) {
      pages.push(1);
      if (currentPage > 4) {
        pages.push('...');
      }
    }
    
    // Pages around current page
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Last page
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-1 mt-8">
      <button
        onClick={() => fetchArticles(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        Previous
      </button>
      
      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-1">...</span>
          ) : (
            <button
              onClick={() => fetchArticles(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}
      
      <button
        onClick={() => fetchArticles(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;