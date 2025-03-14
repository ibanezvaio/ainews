import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import SourcesPage from './pages/SourcesPage';
import TrendingPage from './pages/TrendingPage';
import ProfilePage from './pages/ProfilePage';
import { NewsProvider } from './context/NewsContext';

function App() {
  return (
    <NewsProvider>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/sources" element={<SourcesPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </NewsProvider>
  );
}

export default App;
