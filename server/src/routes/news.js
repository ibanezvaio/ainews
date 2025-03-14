const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const axios = require('axios');

// Get all news articles with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const source = req.query.source;
    const keyword = req.query.keyword;
    const sort = req.query.sort || '-publishedAt'; // Default sort by newest
    
    // Build query
    const query = {};
    
    if (source) {
      query['source.id'] = source;
    }
    
    if (keyword) {
      query.keywords = keyword;
    }
    
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ 
        message: 'Database not connected. Cannot retrieve real articles.',
        code: 'DB_ERROR'
      });
    }
    
    // Execute query with pagination
    const articles = await Article.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    const total = await Article.countDocuments(query);
    
    res.json({
      articles,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalArticles: total
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Image proxy endpoint
router.get('/image-proxy', async (req, res) => {
  const imageUrl = req.query.url;
  
  if (!imageUrl) {
    return res.status(400).send('Image URL is required');
  }
  
  try {
    console.log('Proxying image:', imageUrl);
    
    const response = await axios({
      method: 'GET',
      url: imageUrl,
      responseType: 'stream',
      timeout: 8000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://www.google.com/'
      }
    });
    
    // Forward content type header
    res.set('Content-Type', response.headers['content-type']);
    res.set('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
    
    response.data.pipe(res);
  } catch (error) {
    console.error('Error proxying image:', error.message);
    res.status(404).send('Image not found');
  }
});

// Get article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;