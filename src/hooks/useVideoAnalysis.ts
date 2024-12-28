import { useState } from 'react';
import { analyzeScene, AnalysisError } from '../utils/gemini';
import { detectScenes } from '../utils/sceneDetection';
import type { SceneAnalysis } from '../types/analysis';
import type { MovieMetadata } from '../types/movie';

export const useVideoAnalysis = () => {
  const [analyses, setAnalyses] = useState<SceneAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const analyzeVideo = async (
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    metadata: MovieMetadata
  ): Promise<{ success: boolean; error?: string }> => {
    setIsAnalyzing(true);
    setProgress(0);

    try {
      const scenes = await detectScenes(video, canvas);
      const totalScenes = scenes.length;
      const results: SceneAnalysis[] = [];

      for (let i = 0; i < scenes.length; i++) {
        const sceneAnalysis = await analyzeScene(scenes[i], metadata);
        results.push(sceneAnalysis);
        setProgress(((i + 1) / totalScenes) * 100);
        setAnalyses([...results]);
      }

      return { success: true };
    } catch (err) {
      const message = err instanceof AnalysisError 
        ? err.message 
        : 'An unexpected error occurred during analysis. Please try again.';
      return { success: false, error: message };
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analyses,
    isAnalyzing,
    progress,
    analyzeVideo
  };
};