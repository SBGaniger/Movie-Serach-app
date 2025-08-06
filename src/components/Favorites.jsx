import React from 'react';
import MovieCard from './MovieCard';

const Favorites = ({ favorites, onCardClick, onToggleFavorite, onBackToSearch }) => {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ❤️ My Favorite Movies
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {favorites.length === 0 
              ? 'No favorite movies yet. Start by searching and adding movies you love!'
              : `You have ${favorites.length} favorite ${favorites.length === 1 ? 'movie' : 'movies'}`
            }
          </p>
        </div>
        
        <button
          onClick={onBackToSearch}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Search Movies</span>
        </button>
      </div>

      {/* Empty State */}
      {favorites.length === 0 && (
        <div className="text-center py-16">
          <div className="text-8xl mb-6">💔</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No favorites yet
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Discover amazing movies by searching and clicking the heart icon to add them to your favorites collection.
          </p>
          <button
            onClick={onBackToSearch}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200 text-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Start Searching</span>
          </button>
        </div>
      )}

      {/* Favorites Grid */}
      {favorites.length > 0 && (
        <div>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {favorites.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Total Favorites
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {favorites.filter(movie => movie.Type === 'movie').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Movies
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {favorites.filter(movie => movie.Type === 'series').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                TV Series
              </div>
            </div>
          </div>

          {/* Clear All Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to remove all favorites? This action cannot be undone.')) {
                  favorites.forEach(movie => onToggleFavorite(movie));
                }
              }}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Clear All Favorites</span>
            </button>
          </div>

          {/* Movies Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onCardClick={() => onCardClick(movie)}
                onToggleFavorite={() => onToggleFavorite(movie)}
                isFavorite={true}
              />
            ))}
          </div>

          {/* Tips */}
          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2 flex items-center">
              <span className="mr-2">💡</span>
              Pro Tips
            </h3>
            <ul className="text-blue-800 dark:text-blue-300 space-y-1">
              <li>• Click on any movie card to view detailed information</li>
              <li>• Your favorites are automatically saved and will persist between sessions</li>
              <li>• Use the heart button to quickly remove movies from your favorites</li>
              <li>• Search for more movies to expand your collection</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites; 