import React, { useEffect } from 'react';

const MovieDetails = ({ movie, isOpen, onClose, onToggleFavorite, isFavorite }) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  const {
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Poster,
    Ratings,
    Metascore,
    imdbRating,
    imdbVotes,
    Type,
    BoxOffice,
    Production,
    Website
  } = movie;

  // Handle missing poster
  const posterUrl = Poster && Poster !== 'N/A' 
    ? Poster 
    : 'https://via.placeholder.com/400x600/374151/9CA3AF?text=No+Poster';

  // Parse ratings
  const getRatingColor = (rating) => {
    const score = parseFloat(rating);
    if (score >= 8) return 'text-green-600 dark:text-green-400';
    if (score >= 6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">
            {/* Poster Section */}
            <div className="lg:col-span-2">
              <div className="sticky top-0">
                <img
                  src={posterUrl}
                  alt={`${Title} poster`}
                  className="w-full rounded-xl shadow-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x600/374151/9CA3AF?text=No+Poster';
                  }}
                />
                
                {/* Favorite Button */}
                <button
                  onClick={() => onToggleFavorite()}
                  className={`w-full mt-4 px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${
                    isFavorite
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                >
                  <span className="text-xl">
                    {isFavorite ? '❤️' : '🤍'}
                  </span>
                  <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                </button>
              </div>
            </div>

            {/* Details Section */}
            <div className="lg:col-span-3 space-y-6">
              {/* Title and Basic Info */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {Title}
                  </h1>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full uppercase tracking-wide ${
                    Type === 'movie' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : Type === 'series'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }`}>
                    {Type}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{Year}</span>
                  </span>
                  {Rated && Rated !== 'N/A' && (
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                      {Rated}
                    </span>
                  )}
                  {Runtime && Runtime !== 'N/A' && (
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{Runtime}</span>
                    </span>
                  )}
                  {Released && Released !== 'N/A' && (
                    <span>Released: {Released}</span>
                  )}
                </div>
              </div>

              {/* Ratings */}
              {(imdbRating || Metascore || (Ratings && Ratings.length > 0)) && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Ratings</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {imdbRating && imdbRating !== 'N/A' && (
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getRatingColor(imdbRating)}`}>
                          {imdbRating}/10
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          IMDb ({imdbVotes && imdbVotes !== 'N/A' ? imdbVotes : 'votes'})
                        </div>
                      </div>
                    )}
                    {Metascore && Metascore !== 'N/A' && (
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getRatingColor(Metascore / 10)}`}>
                          {Metascore}/100
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Metascore</div>
                      </div>
                    )}
                    {Ratings && Ratings.length > 0 && Ratings[0].Source === 'Rotten Tomatoes' && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                          {Ratings[0].Value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Rotten Tomatoes</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Plot */}
              {Plot && Plot !== 'N/A' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Plot</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{Plot}</p>
                </div>
              )}

              {/* Cast and Crew */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Director && Director !== 'N/A' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Director</h4>
                    <p className="text-gray-700 dark:text-gray-300">{Director}</p>
                  </div>
                )}
                {Writer && Writer !== 'N/A' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Writer</h4>
                    <p className="text-gray-700 dark:text-gray-300">{Writer}</p>
                  </div>
                )}
                {Actors && Actors !== 'N/A' && (
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Cast</h4>
                    <p className="text-gray-700 dark:text-gray-300">{Actors}</p>
                  </div>
                )}
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {Genre && Genre !== 'N/A' && (
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Genre: </span>
                    <span className="text-gray-700 dark:text-gray-300">{Genre}</span>
                  </div>
                )}
                {Language && Language !== 'N/A' && (
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Language: </span>
                    <span className="text-gray-700 dark:text-gray-300">{Language}</span>
                  </div>
                )}
                {Country && Country !== 'N/A' && (
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Country: </span>
                    <span className="text-gray-700 dark:text-gray-300">{Country}</span>
                  </div>
                )}
                {BoxOffice && BoxOffice !== 'N/A' && (
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Box Office: </span>
                    <span className="text-gray-700 dark:text-gray-300">{BoxOffice}</span>
                  </div>
                )}
                {Production && Production !== 'N/A' && (
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Production: </span>
                    <span className="text-gray-700 dark:text-gray-300">{Production}</span>
                  </div>
                )}
                {Website && Website !== 'N/A' && (
                  <div className="md:col-span-2">
                    <span className="font-medium text-gray-900 dark:text-white">Website: </span>
                    <a 
                      href={Website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {Website}
                    </a>
                  </div>
                )}
              </div>

              {/* Awards */}
              {Awards && Awards !== 'N/A' && Awards !== 'N/A N/A' && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center">
                    <span className="mr-2">🏆</span>
                    Awards & Nominations
                  </h4>
                  <p className="text-yellow-700 dark:text-yellow-300">{Awards}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 