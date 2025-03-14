require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
const path = require('path');

// Import models
require('./models/Article');

// Import routes
const newsRoutes = require('./routes/news');
const sourcesRoutes = require('./routes/sources');

// Import services
const { fetchAllNews } = require('./services/newsFetcher');

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/sources', sourcesRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
  });
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai-news-aggregator')
  .then(() => {
    console.log('MongoDB Connected');
    
    // Initial fetch
    fetchAllNews()
      .then(result => console.log(`Initial fetch completed: ${result.saved} articles added`))
      .catch(err => console.error('Error in initial news fetch:', err));
      
    // Schedule news fetching - every 6 hours
    cron.schedule('0 */6 * * *', async () => {
      console.log('Running scheduled news fetch...');
      try {
        const result = await fetchAllNews();
        console.log(`Scheduled fetch completed: ${result.saved} new articles added`);
      } catch (error) {
        console.error('Error in scheduled news fetch:', error);
      }
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Warning: Running without MongoDB connection. Some features will not work.');
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});