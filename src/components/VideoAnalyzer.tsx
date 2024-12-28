import React, { useRef, useState } from 'react';
import { Film, Loader2 } from 'lucide-react';
import { analyzeScene, AnalysisError } from '../utils/gemini';
import { detectScenes } from '../utils/sceneDetection';
import { VideoUploader } from './VideoUploader';
import { VideoPlayer } from './VideoPlayer';
import { AnalysisResults } from './AnalysisResults';
import { TimelineView } from './TimelineView';
import { MovieMetadataForm } from './MovieMetadataForm';
import { YouTubeGenerator } from './YouTubeGenerator';
import { ErrorMessage } from './errors/ErrorMessage';
import { useError } from '../hooks/useError';
import type { MovieMetadata } from '../types/movie';
import type { SceneAnalysis } from '../types/analysis';

export const VideoAnalyzer: React.FC = () => {
  const [video, setVideo] = useState<string | null>(null);
  const [analyses, setAnalyses] = useState<SceneAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [metadata, setMetadata] = useState<MovieMetadata>({
    title: '',
    year: new Date().getFullYear(),
    type: 'movie'
  });
  
  const { error, showError, clearError } = useError();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideo(url);
      setAnalyses([]);
      clearError();
      setProgress(0);
    }
  };

  const analyzeVideo = async () => {
    if (!video || !videoRef.current || !canvasRef.current || !metadata.title) {
      showError('Please fill in all required fields and upload a video.');
      return;
    }

    setIsAnalyzing(true);
    clearError();
    setProgress(0);

    try {
      const scenes = await detectScenes(videoRef.current, canvasRef.current);
      const totalScenes = scenes.length;
      const results: SceneAnalysis[] = [];

      for (let i = 0; i < scenes.length; i++) {
        const sceneAnalysis = await analyzeScene(scenes[i], metadata);
        results.push(sceneAnalysis);
        setProgress(((i + 1) / totalScenes) * 100);
        setAnalyses([...results]);
      }
    } catch (err) {
      const message = err instanceof AnalysisError 
        ? err.message 
        : 'An unexpected error occurred during analysis. Please try again.';
      showError(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 lg:p-8 mb-8 transition-all duration-300 hover:shadow-2xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 flex items-center gap-2 sm:gap-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            <Film className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
            Scene-by-Scene Trailer Analysis AI
          </h1>

          <MovieMetadataForm 
            metadata={metadata} 
            onChange={setMetadata} 
          />

          <div className="mb-6 lg:mb-8">
            <VideoUploader onVideoUpload={handleVideoUpload} />

            {video && (
              <div className="space-y-4 sm:space-y-6 animate-fadeIn">
                <VideoPlayer videoRef={videoRef} videoUrl={video} />
                <canvas ref={canvasRef} className="hidden" />
                
                <button
                  onClick={analyzeVideo}
                  disabled={isAnalyzing || !metadata.title}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 sm:py-4 rounded-lg font-semibold 
                    hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-400
                    transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none
                    flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      Analyzing Scenes... {Math.round(progress)}%
                    </>
                  ) : (
                    'Analyze Video'
                  )}
                </button>
              </div>
            )}

            {error && (
              <ErrorMessage 
                message={error}
                onDismiss={clearError}
                className="mt-4"
              />
            )}
          </div>

          {analyses.length > 0 && (
            <div className="animate-fadeIn">
              <TimelineView analyses={analyses} videoRef={videoRef} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div className="col-span-1">
                  <AnalysisResults analyses={analyses} videoRef={videoRef} />
                </div>
                <div className="col-span-1">
                  <YouTubeGenerator 
                    scenes={analyses} 
                    metadata={metadata}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};