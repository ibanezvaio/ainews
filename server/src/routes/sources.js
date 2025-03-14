const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Get all news sources
router.get('/', (req, res) => {
  const sources = [
    { id: 'techcrunch', name: 'TechCrunch', category: 'technology' },
    { id: 'wired', name: 'Wired', category: 'technology' },
    { id: 'the-verge', name: 'The Verge', category: 'technology' },
    { id: 'mit-technology-review', name: 'MIT Technology Review', category: 'technology' },
    { id: 'ars-technica', name: 'Ars Technica', category: 'technology' }
  ];
  
  res.json(sources);
});

// Get trending topics
router.get('/trending', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Return sample data if not connected
      return res.json([
        { keyword: 'Artificial Intelligence', count: 25 },
        { keyword: 'Machine Learning', count: 18 },
        { keyword: 'Neural Networks', count: 15 },
        { keyword: 'Deep Learning', count: 12 },
        { keyword: 'GPT', count: 10 },
        { keyword: 'LLM', count: 8 },
        { keyword: 'Computer Vision', count: 7 },
        { keyword: 'NLP', count: 6 },
        { keyword: 'AI Ethics', count: 5 },
        { keyword: 'Robotics', count: 4 }
      ]);
    }
    
    // If MongoDB is connected, try to get actual data
    // This part would normally query the MongoDB collection
    // For now, still return sample data
    return res.json([
      { keyword: 'Artificial Intelligence', count: 25 },
      { keyword: 'Machine Learning', count: 18 },
      { keyword: 'Neural Networks', count: 15 },
      { keyword: 'Deep Learning', count: 12 },
      { keyword: 'GPT', count: 10 },
      { keyword: 'LLM', count: 8 },
      { keyword: 'Computer Vision', count: 7 },
      { keyword: 'NLP', count: 6 },
      { keyword: 'AI Ethics', count: 5 },
      { keyword: 'Robotics', count: 4 }
    ]);
  } catch (error) {
    console.error('Error fetching trending topics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;