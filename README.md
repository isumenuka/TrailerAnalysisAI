# Scene-by-Scene Trailer Analysis AI

An advanced web application that uses AI to analyze movie trailers and generate engaging YouTube content. Built with React, TypeScript, and powered by Google's Gemini AI.

## Features

- 🎬 **Scene Detection**: Automatically detects and analyzes distinct scenes in video trailers
- 🔍 **Deep Analysis**: Identifies easter eggs, hidden details, and potential fan theories
- 📝 **YouTube Content Generation**: Creates engaging titles and detailed video scripts
- 🎯 **Movie Data Integration**: Optional integration with TMDB & OMDB for enriched content
- 🎨 **Beautiful UI**: Modern, responsive interface with smooth animations
- 📱 **Mobile Friendly**: Fully responsive design that works on all devices

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd scene-analysis-ai
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Architecture

### Key Components

- `VideoAnalyzer`: Main component handling video upload and analysis
- `SceneDetection`: Processes videos to identify distinct scenes
- `ContentAnalysis`: AI-powered analysis of scenes using Gemini API
- `YouTubeGenerator`: Creates engaging content for YouTube videos

### Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **AI/ML**: Google Gemini AI API
- **Movie Data**: TMDB & OMDB APIs
- **UI Components**: Lucide React Icons
- **Build Tool**: Vite

## API Integration

### Gemini AI

The application uses Google's Gemini AI for:
- Scene analysis
- Content generation
- Script writing

### Movie Databases

Optional integration with:
- TMDB (The Movie Database)
- OMDB (Open Movie Database)

## Development

### Project Structure

```
src/
├── components/     # React components
├── utils/         # Utility functions
├── types/         # TypeScript type definitions
└── styles/        # CSS and styling files
```

### Key Files

- `VideoAnalyzer.tsx`: Main application component
- `SceneDetection.ts`: Video processing utilities
- `ContentAnalysis.ts`: AI analysis implementation
- `YouTubeGenerator.tsx`: Content generation component

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini AI for powerful content analysis
- TMDB and OMDB for comprehensive movie data
- React and Vite teams for excellent development tools