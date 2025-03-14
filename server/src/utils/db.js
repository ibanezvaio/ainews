const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Log connection string (remove for production, sensitive info)
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai-news-aggregator';
    console.log('Connecting to MongoDB at:', mongoURI.replace(/mongodb:\/\/([^:]+):([^@]+)@/, 'mongodb://***:***@'));
    
    // Connect to MongoDB with settings to handle connection issues
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      connectTimeoutMS: 10000, // Give up initial connection after 10s
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    
    // Provide helpful troubleshooting messages based on the error
    if (error.name === 'MongoServerSelectionError') {
      console.log('\nTROUBLESHOOTING STEPS:');
      console.log('1. Make sure MongoDB is installed and running on your machine');
      console.log('2. Check if the MongoDB URI in your .env file is correct');
      console.log('3. If using MongoDB Atlas, make sure your IP is whitelisted');
      console.log('4. Try running the application without MongoDB features for now\n');
    }
    
    return false;
  }
};

module.exports = connectDB;