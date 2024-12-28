// API configurations
const TMDB_API_KEY = 'd312796c78899e791b1fbd3bee90cdbb';
const OMDB_API_KEY = '83f67682';

export interface MovieDetails {
  title: string;
  year: number;
  type: 'movie' | 'tv';
  poster?: string;
  rating?: string;
  plot?: string;
  cast?: string[];
  director?: string;
  genre?: string[];
  imdbId?: string;
  tmdbId?: number;
  streamingServices?: string[];
  trailerUrl?: string;
}

// TMDb API
async function searchTMDb(query: string): Promise<MovieDetails[]> {
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const data = await response.json();
  
  return data.results.map((item: any) => ({
    title: item.title || item.name,
    year: new Date(item.release_date || item.first_air_date).getFullYear(),
    type: item.media_type === 'tv' ? 'tv' : 'movie',
    poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : undefined,
    plot: item.overview,
    tmdbId: item.id
  }));
}

// OMDb API
async function getOMDbDetails(imdbId: string): Promise<Partial<MovieDetails>> {
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbId}`;
  const response = await fetch(url);
  const data = await response.json();
  
  return {
    rating: data.imdbRating,
    cast: data.Actors?.split(', '),
    director: data.Director,
    genre: data.Genre?.split(', ')
  };
}

export async function searchMovies(query: string): Promise<MovieDetails[]> {
  try {
    const tmdbResults = await searchTMDb(query);
    
    // Enhance results with OMDb data if available
    const enhancedResults = await Promise.all(
      tmdbResults.map(async (result) => {
        if (result.imdbId) {
          const omdbData = await getOMDbDetails(result.imdbId);
          return { ...result, ...omdbData };
        }
        return result;
      })
    );
    
    return enhancedResults;
  } catch (error) {
    console.error('Movie search failed:', error);
    return [];
  }
}