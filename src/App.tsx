import React from 'react';
import { VideoAnalyzer } from './components/VideoAnalyzer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <VideoAnalyzer />
    </div>
  );
};

export default App;