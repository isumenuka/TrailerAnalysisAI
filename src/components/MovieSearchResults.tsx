import React from 'react';
import { Star, Play, Info } from 'lucide-react';
import type { MovieDetails } from '../utils/movieApis';

interface MovieSearchResultsProps {
  results: MovieDetails[];
  onSelect: (movie: MovieDetails) => void;
}

export const MovieSearchResults: React.FC<MovieSearchResultsProps> = ({ results, onSelect }) => {
  return (
    <div className="space-y-4">
      {results.map((movie, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex">
            {movie.poster && (
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-32 h-48 object-cover"
              />
            )}
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm text-gray-500">
                    {movie.year} • {movie.type === 'tv' ? 'TV Series' : 'Movie'}
                  </p>
                </div>
                {movie.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{movie.rating}</span>
                  </div>
                )}
              </div>
              
              {movie.genre && (
                <div className="flex gap-2 mt-2">
                  {movie.genre.map((g) => (
                    <span key={g} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {g}
                    </span>
                  ))}
                </div>
              )}
              
              {movie.plot && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{movie.plot}</p>
              )}
              
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => onSelect(movie)}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <Info className="w-4 h-4" />
                  Details
                </button>
                {movie.trailerUrl && (
                  <a
                    href={movie.trailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <Play className="w-4 h-4" />
                    Trailer
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}