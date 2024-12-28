import React from 'react';
import type { SceneAnalysis } from '../types/analysis';
import { Clock, Egg, Eye, Lightbulb } from 'lucide-react';
import { ScenePlayer } from './ScenePlayer';

interface AnalysisResultsProps {
  analyses: SceneAnalysis[];
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analyses, videoRef }) => {
  // ... existing functions remain the same ...

  return (
    <div className="space-y-6 sm:space-y-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Scene Analysis</h2>
      {analyses.map((scene, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="w-full sm:w-64 space-y-2">
              <img
                src={scene.thumbnail}
                alt={`Scene ${index + 1}`}
                className="w-full rounded-lg shadow-md"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(scene.startTime)} - {formatTime(scene.endTime)}</span>
                </div>
                <ScenePlayer scene={scene} videoRef={videoRef} />
              </div>
            </div>
            
            <div className="flex-1 w-full sm:w-auto">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Scene {index + 1}</h3>
              
              <DetailSection
                icon={<Egg className="w-4 h-4" />}
                title="Easter Eggs"
                items={scene.details.easterEggs}
              />
              
              <DetailSection
                icon={<Eye className="w-4 h-4" />}
                title="Hidden Details"
                items={scene.details.hiddenDetails}
              />
              
              <DetailSection
                icon={<Lightbulb className="w-4 h-4" />}
                title="Fan Theories"
                items={scene.details.fanTheories}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};