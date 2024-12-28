import React from 'react';
import type { FrameAnalysis } from '../utils/videoAnalysis';

interface TimelineThumbnailProps {
  analysis: FrameAnalysis;
  onClick: () => void;
}

export const TimelineThumbnail: React.FC<TimelineThumbnailProps> = ({ analysis, onClick }) => {
  return (
    <button onClick={onClick} className="flex-shrink-0 group">
      <div className="relative w-32 h-20 overflow-hidden rounded-lg">
        <img
          src={analysis.thumbnail}
          alt={`Frame at ${analysis.timestamp}s`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 px-2">
          {analysis.timestamp}s
        </div>
      </div>
    </button>
  );
};