// Google Custom Search API configuration
const GOOGLE_CSE_ID = '12c6dd7701bf64bf0';
const GOOGLE_API_KEY = 'AIzaSyBfEci9ATzeBxok1BPnw2XKjcGsUY6ULVk';

export interface MovieSearchResult {
  title: string;
  year: number;
  type: 'movie' | 'tv';
  description?: string;
  imageUrl?: string;
}

export async function searchMovies(query: string): Promise<MovieSearchResult[]> {
  if (!query) return [];
  
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return data.items?.map((item: any) => ({
      title: item.title.split('(')[0].trim(),
      year: parseInt(item.title.match(/\((\d{4})\)/)?.[1] || new Date().getFullYear()),
      type: item.pagemap?.metatags?.[0]?.['og:type']?.includes('tv') ? 'tv' : 'movie',
      description: item.snippet,
      imageUrl: item.pagemap?.cse_image?.[0]?.src
    })) || [];
  } catch (error) {
    console.error('Movie search failed:', error);
    return [];
  }
}