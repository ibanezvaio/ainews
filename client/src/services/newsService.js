const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const newsService = {
  getNews: async (params = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const response = await fetch(`${API_URL}/news?${queryParams}`);
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    return response.json();
  },

  getArticle: async (id) => {
    const response = await fetch(`${API_URL}/news/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    return response.json();
  },

  getSources: async () => {
    const response = await fetch(`${API_URL}/sources`);
    if (!response.ok) {
      throw new Error('Failed to fetch sources');
    }
    return response.json();
  },

  getTrending: async () => {
    const response = await fetch(`${API_URL}/sources/trending`);
    if (!response.ok) {
      throw new Error('Failed to fetch trending topics');
    }
    return response.json();
  }
};

export default newsService;
