import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <svg className="h-6 w-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6z" />
              </svg>
              <span className="ml-2 text-lg font-bold text-gray-100">AINewsFeed</span>
            </Link>
            <p className="text-gray-400 text-sm mt-1">Stay updated with the latest in AI</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-gray-200 mb-2">About</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-blue-400">About Us</Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-blue-400">Features</Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-blue-400">Contact</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-200 mb-2">Legal</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-blue-400">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-blue-400">Terms of Service</Link>
                </li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-medium text-gray-200 mb-2">Subscribe</h3>
              <p className="text-sm text-gray-400 mb-2">Get the latest AI news delivered to your inbox</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-gray-700 text-gray-200 rounded-l-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 text-sm"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AINewsFeed. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;