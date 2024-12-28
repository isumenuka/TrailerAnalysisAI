import React from 'react';
import { Upload } from 'lucide-react';

interface VideoUploaderProps {
  onVideoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoUpload }) => {
  return (
    <label className="block mb-4 cursor-pointer group">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center 
        transition-all duration-300 
        group-hover:border-blue-500 group-hover:bg-blue-50
        transform group-hover:scale-[1.01]">
        <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400 
          transition-all duration-300 
          group-hover:text-blue-500 
          group-hover:scale-110" />
        <p className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
          Upload a video trailer to analyze
        </p>
        <input
          type="file"
          accept="video/*"
          onChange={onVideoUpload}
          className="hidden"
        />
      </div>
    </label>
  );
};