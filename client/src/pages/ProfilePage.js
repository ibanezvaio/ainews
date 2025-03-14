import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  // This would normally fetch data from an API or context
  const user = {
    name: 'AI Enthusiast',
    username: '@ai_enthusiast',
    bio: 'Passionate about artificial intelligence, machine learning, and neural networks. Following the latest developments in AI research and applications.',
    followers: 1287,
    following: 425,
    joinedDate: 'March 2023',
    location: 'San Francisco, CA',
    website: 'aienthusiast.com',
    profileImage: 'https://via.placeholder.com/150',
    coverImage: 'https://via.placeholder.com/800x200?text=AI+Cover',
    interests: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks', 'GPT', 'Computer Vision']
  };

  // Sample saved articles
  const savedArticles = [
    {
      _id: 's1',
      title: 'New Research Shows Breakthrough in Reinforcement Learning',
      description: 'Scientists have developed a novel approach to reinforcement learning that significantly improves efficiency.',
      source: { name: 'TechCrunch' },
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      _id: 's2',
      title: 'AI Ethics Guidelines Released by International Consortium',
      description: 'A group of leading AI organizations has published comprehensive ethics guidelines for AI development.',
      source: { name: 'MIT Technology Review' },
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    },
    {
      _id: 's3',
      title: 'How Neural Networks Are Transforming Medical Imaging',
      description: 'Advanced neural networks are revolutionizing medical imaging, enabling earlier and more accurate diagnoses.',
      source: { name: 'Wired' },
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    }
  ];

  return (
    <div className="container mx-auto px-4">
      {/* Profile header */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {/* Cover image */}
        <div 
          className="h-48 bg-blue-600 bg-cover bg-center" 
          style={{ backgroundImage: `url(${user.coverImage})` }}
        ></div>
        
        <div className="p-5">
          {/* Profile image and buttons */}
          <div className="flex justify-between items-start">
            <div className="flex-shrink-0 -mt-20">
              <img 
                src={user.profileImage} 
                alt={user.name} 
                className="w-32 h-32 border-4 border-white rounded-full" 
              />
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50">
                Share
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">
                Edit profile
              </button>
            </div>
          </div>
          
          {/* User info */}
          <div className="mt-5">
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.username}</p>
            <p className="mt-2 text-gray-700">{user.bio}</p>
            
            <div className="flex flex-wrap gap-y-2 mt-3 text-gray-500 text-sm">
              {user.location && (
                <div className="flex items-center mr-4">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {user.location}
                </div>
              )}
              
              {user.website && (
                <div className="flex items-center mr-4">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {user.website}
                  </a>
                </div>
              )}
              
              <div className="flex items-center mr-4">
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Joined {user.joinedDate}</span>
              </div>
            </div>
            
            <div className="flex mt-3">
              <div className="mr-4">
                <span className="font-bold">{user.following}</span>
                <span className="text-gray-500 ml-1">Following</span>
              </div>
              <div>
                <span className="font-bold">{user.followers}</span>
                <span className="text-gray-500 ml-1">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mt-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button className="text-blue-600 border-b-2 border-blue-600 py-4 px-1 text-center w-1/4 font-medium">
              Saved
            </button>
            <button className="text-gray-500 hover:text-gray-700 py-4 px-1 text-center w-1/4 font-medium">
              Articles
            </button>
            <button className="text-gray-500 hover:text-gray-700 py-4 px-1 text-center w-1/4 font-medium">
              Likes
            </button>
            <button className="text-gray-500 hover:text-gray-700 py-4 px-1 text-center w-1/4 font-medium">
              Interests
            </button>
          </nav>
        </div>
      </div>
      
      {/* Saved articles */}
      <div className="mt-6 space-y-4">
        <h2 className="font-bold text-xl">Saved Articles</h2>
        
        {savedArticles.map(article => (
          <div key={article._id} className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-shadow">
            <Link to={`/article/${article._id}`}>
              <h3 className="font-bold text-lg hover:text-blue-600 transition-colors">{article.title}</h3>
              <p className="text-gray-600 mt-1">{article.description}</p>
              <div className="flex items-center mt-3 text-sm text-gray-500">
                <span>{article.source.name}</span>
                <span className="mx-2">•</span>
                <span>{article.publishedAt.toLocaleDateString()}</span>
              </div>
            </Link>
            <div className="flex justify-end mt-2">
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Remove from saved
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Interests */}
      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h2 className="font-bold text-xl mb-4">Your Interests</h2>
        <div className="flex flex-wrap gap-2">
          {user.interests.map((interest, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
          <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded-full text-sm hover:bg-gray-50">
            + Add new
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;