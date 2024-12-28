# Component Documentation

## Core Components

### VideoAnalyzer
The main container component that orchestrates video analysis and content generation.

**Props:** None

**State:**
- `video`: Currently loaded video file
- `analyses`: Array of scene analyses
- `isAnalyzing`: Loading state for analysis
- `error`: Error state
- `progress`: Analysis progress (0-100)
- `metadata`: Movie metadata

### ScriptGenerator
Generates YouTube scripts using AI and movie data.

**Props:**
- `title`: string - Selected video title
- `movieTitle`: string - Original movie title
- `year`: number - Movie release year
- `useMovieData`: boolean - Whether to use TMDB/OMDB data

**State:**
- `script`: Generated script content
- `isGenerating`: Loading state
- `error`: Error state

### MovieSearch
Handles movie search functionality with TMDB/OMDB integration.

**Props:**
- `onSelect`: (metadata: MovieMetadata) => void - Callback for selection

**State:**
- `query`: Search query
- `results`: Search results
- `isLoading`: Loading state