import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gray-800 shadow-md sticky top-0 z-10 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="flex items-center">
            <svg className="h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6z" />
            </svg>
            <span className="ml-2 text-xl font-bold text-gray-100">AINewsFeed</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-gray-100 hover:bg-gray-700"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/')
                  ? 'bg-gray-700 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
              }`}
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </div>
            </Link>
            
            <Link
              to="/sources"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/sources')
                  ? 'bg-gray-700 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
              }`}
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Sources
              </div>
            </Link>
            
            <Link
              to="/trending"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/trending')
                  ? 'bg-gray-700 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
              }`}
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Trending
              </div>
            </Link>
            
            <div className="ml-4 relative">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors">
                New Post
              </button>
            </div>
          </nav>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-700 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/')
                  ? 'bg-gray-700 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </Link>
            
            <Link
              to="/sources"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/sources')
                  ? 'bg-gray-700 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Sources
            </Link>
            
            <Link
              to="/trending"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/trending')
                  ? 'bg-gray-700 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Trending
            </Link>

            <div className="pt-2">
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-full text-base font-medium hover:bg-blue-600 transition-colors">
                New Post
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;