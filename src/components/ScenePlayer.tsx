import React from 'react';
import type { Scene } from '../types/analysis';

interface ScenePlayerProps {
  scene: Scene;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const ScenePlayer: React.FC<ScenePlayerProps> = ({ scene, videoRef }) => {
  const playScene = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = scene.startTime;
      videoRef.current.play();
      
      // Stop at end of scene
      const stopAtEnd = () => {
        if (videoRef.current && videoRef.current.currentTime >= scene.endTime) {
          videoRef.current.pause();
          videoRef.current.removeEventListener('timeupdate', stopAtEnd);
        }
      };
      
      videoRef.current.addEventListener('timeupdate', stopAtEnd);
    }
  };

  return (
    <button
      onClick={playScene}
      className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors"
    >
      Play Scene
    </button>
  );
};