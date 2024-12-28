import React from 'react';
import { Loader2 } from 'lucide-react';

interface VideoControlsProps {
  isAnalyzing: boolean;
  progress: number;
  disabled: boolean;
  onAnalyze: () => void;
}

export const VideoControls: React.FC<VideoControlsProps> = ({
  isAnalyzing,
  progress,
  disabled,
  onAnalyze
}) => {
  return (
    <button
      onClick={onAnalyze}
      disabled={disabled}
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
  );
};