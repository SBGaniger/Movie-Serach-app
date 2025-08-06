import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import Favorites from './components/Favorites';
import axios from 'axios';

const App = () => {
  // State management
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('search'); // 'search' or 'favorites'
  const [isDarkMode, setIsDarkMode] = useState(false);

  // OMDB API configuration
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY || '43b6e397';
  const BASE_URL = 'http://www.omdbapi.com/';

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Search movies function
  const searchMovies = async (query) => {
    if (!query.trim()) {
      setError('Please enter a movie title to search');
      return;
    }

    if (!API_KEY || API_KEY === 'your_api_key_here') {
      setError('Please set your OMDB API key in the .env file');
      return;
    }

    setIsLoading(true);
    setError('');
    setSearchTerm(query);

    try {
      const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
      
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
        setCurrentView('search');
      } else {
        setMovies([]);
        setError(response.data.Error || 'No movies found');
      }
    } catch (err) {
      setError('Failed to fetch movies. Please check your internet connection.');
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Get movie details
  const getMovieDetails = async (imdbID) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`);
      if (response.data.Response === 'True') {
        setSelectedMovie(response.data);
        setIsDetailsOpen(true);
      }
    } catch (err) {
      setError('Failed to fetch movie details');
    } finally {
      setIsLoading(false);
    }
  };

  // Add/remove favorites
  const toggleFavorite = (movie) => {
    const isAlreadyFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
    
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter(fav => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  // Check if movie is favorite
  const isFavorite = (imdbID) => {
    return favorites.some(fav => fav.imdbID === imdbID);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode ? 'dark' : ''
    }`}>
      {/* Clean Background */}
      <div className={`fixed inset-0 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}></div>
      <div className="fixed inset-0 elegant-bg opacity-5"></div>
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
              <header className="clean-card dark:clean-card-dark transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">
                🎬 Movie Search App
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Navigation */}
              <nav className="flex space-x-4">
                <button
                  onClick={() => setCurrentView('search')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentView === 'search'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Search
                </button>
                <button
                  onClick={() => setCurrentView('favorites')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                    currentView === 'favorites'
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Favorites
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </button>
              </nav>

              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

              {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'search' ? (
          <>
            {/* Search Section */}
            <div className="mb-8">
              <SearchBar onSearch={searchMovies} />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg animate-fade-in">
                <div className="flex items-center">
                  <span className="text-xl mr-2">⚠️</span>
                  {error}
                </div>
              </div>
            )}

            {/* Loading Spinner */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-300">Loading movies...</span>
              </div>
            )}

            {/* Movies Grid */}
            {!isLoading && movies.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Search Results for "{searchTerm}" ({movies.length} movies found)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onCardClick={() => getMovieDetails(movie.imdbID)}
                      onToggleFavorite={() => toggleFavorite(movie)}
                      isFavorite={isFavorite(movie.imdbID)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* No results message */}
            {!isLoading && !error && movies.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  No movies found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try searching for a different movie title
                </p>
              </div>
            )}

            {/* Welcome message */}
            {!searchTerm && !isLoading && (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">🎬</div>
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Welcome to Movie Search App
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Discover movies, view detailed information, and build your personal favorites collection. 
                  Start by searching for your favorite movies above.
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <span>🔍</span>
                    <span>Search any movie</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>⭐</span>
                    <span>Add to favorites</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📱</span>
                    <span>Mobile friendly</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🌙</span>
                    <span>Dark mode</span>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <Favorites
            favorites={favorites}
            onCardClick={(movie) => getMovieDetails(movie.imdbID)}
            onToggleFavorite={toggleFavorite}
            onBackToSearch={() => setCurrentView('search')}
          />
        )}
      </main>

      {/* Movie Details Modal */}
      {isDetailsOpen && selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          onToggleFavorite={() => toggleFavorite(selectedMovie)}
          isFavorite={isFavorite(selectedMovie.imdbID)}
        />
      )}
      </div>
    </div>
  );
};

export default App; 