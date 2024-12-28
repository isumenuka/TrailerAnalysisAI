import React from 'react';
import type { SceneAnalysis } from '../utils/gemini';
import { Clock } from 'lucide-react';

interface TimelineViewProps {
  analyses: SceneAnalysis[];
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ analyses, videoRef }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSceneClick = (startTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play();
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Timeline</h2>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {analyses.map((scene, index) => (
          <button
            key={index}
            onClick={() => handleSceneClick(scene.startTime)}
            className="flex-shrink-0 group"
          >
            <div className="relative w-48 overflow-hidden rounded-lg">
              <img
                src={scene.thumbnail}
                alt={`Scene ${index + 1}`}
                className="w-full aspect-video object-cover group-hover:scale-110 transition-transform"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(scene.startTime)}</span>
                </div>
                <div className="text-xs opacity-75">Scene {index + 1}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};