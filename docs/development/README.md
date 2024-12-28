# Development Guide

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with required API keys:
```env
VITE_GEMINI_API_KEY=your_key
VITE_TMDB_API_KEY=your_key
VITE_OMDB_API_KEY=your_key
```

## Development Workflow

1. Start development server:
```bash
npm run dev
```

2. Build for production:
```bash
npm run build
```

3. Preview production build:
```bash
npm run preview
```

## Code Style Guidelines

- Use TypeScript for all new files
- Follow React functional component patterns
- Use Tailwind CSS for styling
- Implement proper error handling
- Write meaningful component and function documentation