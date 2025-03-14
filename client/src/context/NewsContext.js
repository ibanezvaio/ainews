import React, { createContext, useState, useEffect } from 'react';
import newsService from '../services/newsService';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalArticles: 0
  });
  const [filters, setFilters] = useState({
    category: '',
    source: '',
    keyword: '',
    sort: '-publishedAt'
  });

  const fetchArticles = async (page = 1) => {
    setLoading(true);
    try {
      const response = await newsService.getNews({
        page,
        limit: 12,
        ...filters
      });
      
      setArticles(response.articles);
        setPagination({
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            totalArticles: response.totalArticles
          });
        } catch (err) {
          setError('Failed to fetch articles');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
    
      const updateFilters = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
      };
    
      useEffect(() => {
        fetchArticles(1);
      }, [filters]);
    
      return (
        <NewsContext.Provider value={{
          articles,
          loading,
          error,
          pagination,
          filters,
          fetchArticles,
          updateFilters
        }}>
          {children}
        </NewsContext.Provider>
      );
    };