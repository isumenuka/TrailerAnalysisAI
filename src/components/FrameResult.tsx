import React from 'react';
import type { FrameAnalysis } from '../utils/videoAnalysis';

interface FrameResultProps {
  analysis: FrameAnalysis;
  index: number;
}

export const FrameResult: React.FC<FrameResultProps> = ({ analysis, index }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <img
          src={analysis.thumbnail}
          alt={`Frame ${index + 1}`}
          className="w-48 rounded-lg"
        />
        <div>
          <h3 className="font-semibold mb-2">
            Frame at {analysis.timestamp}s
          </h3>
          <pre className="whitespace-pre-wrap font-sans text-sm">
            {analysis.analysis}
          </pre>
        </div>
      </div>
    </div>
  );
};