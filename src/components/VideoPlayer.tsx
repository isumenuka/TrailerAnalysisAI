import React from 'react';

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoUrl: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoRef, videoUrl }) => {
  return (
    <video
      ref={videoRef}
      src={videoUrl}
      controls
      className="w-full rounded-lg mb-4"
    />
  );
};