import React, { useState, useEffect } from 'react';
import { FileText, Copy, Check, Loader2 } from 'lucide-react';
import type { VideoScript } from '../types/youtube';
import { generateVideoScript } from '../utils/scriptGenerator';
import { getEnrichedMovieData } from '../utils/movieDetails';

interface ScriptGeneratorProps {
  title: string;
  movieTitle: string;
  year: number;
  useMovieData: boolean;
}

export const ScriptGenerator: React.FC<ScriptGeneratorProps> = ({
  title,
  movieTitle,
  year,
  useMovieData,
}) => {
  const [script, setScript] = useState<VideoScript | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateScript = async () => {
      setIsGenerating(true);
      setError(null);
      try {
        const movieData = useMovieData ? await getEnrichedMovieData(movieTitle) : null;
        const generatedScript = await generateVideoScript(title, movieData, { title: movieTitle, year });
        setScript(generatedScript);
      } catch (error) {
        setError('Failed to generate script. Please try again.');
        console.error('Script generation failed:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    generateScript();
  }, [title, movieTitle, year, useMovieData]);

  // ... rest of the component remains the same
};