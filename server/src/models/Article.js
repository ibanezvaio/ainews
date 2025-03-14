const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  content: {
    type: String
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  urlToImage: {
    type: String
  },
  publishedAt: {
    type: Date,
    required: true
  },
  source: {
    id: String,
    name: String
  },
  keywords: {
    type: [String],
    default: []
  },
  relevanceScore: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Article', ArticleSchema);