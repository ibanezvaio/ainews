const axios = require('axios');
const Article = require('../models/Article');

// Fetch from NewsAPI.org
async function fetchFromNewsAPI() {
  try {
    console.log('Fetching from NewsAPI...');
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        apiKey: process.env.NEWS_API_KEY,
        q: 'artificial intelligence OR machine learning OR AI OR "neural networks" OR "deep learning" OR NLP OR "computer vision" OR GPT OR LLM OR "generative AI"',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 100
      }
    });
    
    console.log(`Found ${response.data.articles.length} articles from NewsAPI`);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error.message);
    return [];
  }
}

// Fetch from GNews
async function fetchFromGNews() {
  try {
    console.log('Fetching from GNews...');
    const response = await axios.get('https://gnews.io/api/v4/search', {
      params: {
        token: process.env.GNEWS_API_KEY,
        q: 'artificial intelligence',
        lang: 'en',
        max: 50
      }
    });
    
    console.log(`Found ${response.data.articles.length} articles from GNews`);
    
    // Normalize GNews data to match NewsAPI structure
    return response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      content: article.content,
      url: article.url,
      urlToImage: article.image,
      publishedAt: article.publishedAt,
      source: {
        id: article.source.name.toLowerCase().replace(/\s+/g, '-'),
        name: article.source.name
      }
    }));
  } catch (error) {
    console.error('Error fetching from GNews:', error.message);
    return [];
  }
}

// Extract keywords from text
function extractKeywords(text) {
  const aiKeywords = [
    'AI', 'artificial intelligence', 'machine learning', 'neural network',
    'deep learning', 'NLP', 'natural language processing', 'computer vision', 
    'GPT', 'LLM', 'large language model', 'generative AI', 'AI ethics', 
    'reinforcement learning', 'transformer', 'ChatGPT', 'Claude',
    'OpenAI', 'Anthropic', 'Google DeepMind', 'Microsoft AI', 'Meta AI'
  ];
  
  const keywords = [];
  const textLower = text.toLowerCase();
  
  for (const keyword of aiKeywords) {
    if (textLower.includes(keyword.toLowerCase())) {
      keywords.push(keyword);
    }
  }
  
  return keywords;
}

// Calculate relevance score based on AI content
function calculateRelevanceScore(article) {
  const text = `${article.title} ${article.description || ''} ${article.content || ''}`.toLowerCase();
  let score = 0;
  
  // Score based on keyword presence
  const aiKeywords = [
    { term: 'artificial intelligence', weight: 5 },
    { term: 'ai ', weight: 4 },
    { term: 'machine learning', weight: 4 },
    { term: 'neural network', weight: 3 },
    { term: 'deep learning', weight: 3 },
    { term: 'nlp', weight: 2 },
    { term: 'computer vision', weight: 2 },
    { term: 'gpt', weight: 3 },
    { term: 'llm', weight: 3 }
  ];
  
  for (const keyword of aiKeywords) {
    // Count occurrences of each keyword
    const matches = text.split(keyword.term).length - 1;
    score += matches * keyword.weight;
  }
  
  // Bonus for AI in title (more prominent)
  if (article.title.toLowerCase().includes('artificial intelligence') || 
      article.title.toLowerCase().includes(' ai ')) {
    score += 10;
  }
  
  return score;
}

// Save articles to database
async function saveArticlesToDatabase(articles) {
  let savedCount = 0;
  let skippedCount = 0;
  
  for (const article of articles) {
    try {
      // Skip articles with no title or URL
      if (!article.title || !article.url) {
        skippedCount++;
        continue;
      }
      
      // Check if article already exists
      const existingArticle = await Article.findOne({ url: article.url });
      if (existingArticle) {
        skippedCount++;
        continue;
      }
      
      // Extract keywords and calculate relevance
      const keywords = extractKeywords(article.title + ' ' + (article.description || '') + ' ' + (article.content || ''));
      const relevanceScore = calculateRelevanceScore(article);
      
      // Skip articles with low relevance to AI
      if (relevanceScore < 5) {
        skippedCount++;
        continue;
      }
      
      // Create new article
      const newArticle = new Article({
        title: article.title,
        description: article.description || '',
        content: article.content || '',
        url: article.url,
        urlToImage: article.urlToImage || '',
        publishedAt: new Date(article.publishedAt),
        source: article.source,
        keywords: keywords,
        relevanceScore: relevanceScore
      });
      
      await newArticle.save();
      savedCount++;
    } catch (error) {
      console.error('Error saving article:', error.message);
      skippedCount++;
    }
  }
  
  console.log(`Saved ${savedCount} new articles, skipped ${skippedCount}`);
  return { saved: savedCount, skipped: skippedCount };
}

// Fetch all news
async function fetchAllNews() {
  try {
    // Fetch from multiple sources in parallel
    const [newsApiArticles, gNewsArticles] = await Promise.all([
      fetchFromNewsAPI(),
      fetchFromGNews()
    ]);
    
    // Combine all articles
    const allArticles = [...newsApiArticles, ...gNewsArticles];
    
    // Remove duplicates based on URL
    const uniqueUrls = new Set();
    const uniqueArticles = allArticles.filter(article => {
      if (uniqueUrls.has(article.url)) {
        return false;
      }
      uniqueUrls.add(article.url);
      return true;
    });
    
    console.log(`Total unique articles: ${uniqueArticles.length}`);
    
    // Save to database
    const result = await saveArticlesToDatabase(uniqueArticles);
    
    return result;
  } catch (error) {
    console.error('Error aggregating news:', error);
    throw error;
  }
}

module.exports = {
  fetchAllNews,
  fetchFromNewsAPI,
  fetchFromGNews,
  saveArticlesToDatabase
};