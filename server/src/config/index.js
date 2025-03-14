module.exports = {
    newsApiKey: process.env.NEWS_API_KEY,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/ai-news-aggregator',
    sources: [
      { id: 'techcrunch', name: 'TechCrunch', category: 'technology' },
      { id: 'wired', name: 'Wired', category: 'technology' },
      { id: 'the-verge', name: 'The Verge', category: 'technology' },
      { id: 'mit-technology-review', name: 'MIT Technology Review', category: 'technology' },
      { id: 'ars-technica', name: 'Ars Technica', category: 'technology' }
    ],
    aiKeywords: ['artificial intelligence', 'AI', 'machine learning', 'ML', 'deep learning', 
                 'neural network', 'NLP', 'computer vision', 'AI ethics', 'GPT', 'large language model', 
                 'LLM', 'generative AI', 'transformer', 'AI research', 'OpenAI', 'Anthropic', 
                 'Google DeepMind', 'Meta AI']
  };