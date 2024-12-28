import type { MovieDetails } from './movieApis';

const OMDB_API_KEY = '83f67682'; // Using the existing key from movieApis.ts

export interface EnrichedMovieData {
  cast: string[];
  director: string;
  genre: string[];
  plot: string;
  rating: string;
  relatedMovies?: MovieDetails[];
}

let cachedMovieData: Record<string, EnrichedMovieData> = {};

export const getEnrichedMovieData = async (movieTitle: string): Promise<EnrichedMovieData> => {
  const cacheKey = movieTitle.toLowerCase();
  
  if (cachedMovieData[cacheKey]) {
    return cachedMovieData[cacheKey];
  }

  try {
    const searchUrl = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(movieTitle)}&plot=full`;
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Movie not found');
    }

    const enrichedData: EnrichedMovieData = {
      cast: data.Actors?.split(', ') || [],
      director: data.Director || '',
      genre: data.Genre?.split(', ') || [],
      plot: data.Plot || '',
      rating: data.imdbRating || '',
    };

    cachedMovieData[cacheKey] = enrichedData;
    return enrichedData;
  } catch (error) {
    console.error('Failed to fetch movie data:', error);
    return {
      cast: [],
      director: '',
      genre: [],
      plot: '',
      rating: '',
    };
  }
};