# API Documentation

## External APIs

### Gemini AI
- **Base URL**: `https://generativelanguage.googleapis.com/v1`
- **Authentication**: API key required
- **Rate Limits**: 60 requests per minute

### TMDB API
- **Base URL**: `https://api.themoviedb.org/3`
- **Authentication**: API key required
- **Endpoints Used**:
  - `/search/multi`: Search movies and TV shows
  - `/movie/{id}`: Get movie details

### OMDB API
- **Base URL**: `https://www.omdbapi.com`
- **Authentication**: API key required
- **Main Endpoint**: `/?apikey={key}&t={title}`