import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader } from 'lucide-react';
import { searchMovies } from '../utils/movieApis';
import { MovieSearchResults } from './MovieSearchResults';
import type { MovieDetails } from '../utils/movieApis';
import type { MovieMetadata } from '../types/movie';

interface MovieSearchProps {
  onSelect: (metadata: MovieMetadata) => void;
}

export const MovieSearch: React.FC<MovieSearchProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MovieDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    searchTimeout.current = setTimeout(async () => {
      const searchResults = await searchMovies(query);
      setResults(searchResults);
      setIsLoading(false);
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [query]);

  const handleSelect = (movie: MovieDetails) => {
    onSelect({
      title: movie.title,
      year: movie.year,
      type: movie.type
    });
    setQuery(movie.title);
    setResults([]);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie or TV series..."
          className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <Loader className="w-5 h-5 animate-spin text-blue-500" />
          </div>
        )}
      </div>

      {results.length > 0 && (
        <MovieSearchResults
          results={results}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}