import React, { useState } from 'react';
import { Youtube, Sparkles, Copy, Check, Loader2 } from 'lucide-react';
import type { MovieMetadata } from '../types/movie';
import type { Scene } from '../types/analysis';
import { generateYouTubeMetadata } from '../utils/youtubeGenerator';
import { ScriptGenerator } from './ScriptGenerator';
import { ApiConsentCheckbox } from './ApiConsentCheckbox';

interface YouTubeGeneratorProps {
  scenes: Scene[];
  metadata: MovieMetadata;
}

export const YouTubeGenerator: React.FC<YouTubeGeneratorProps> = ({
  scenes,
  metadata,
}) => {
  const [titles, setTitles] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [copiedTitle, setCopiedTitle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [useMovieData, setUseMovieData] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const generatedTitles = await generateYouTubeMetadata(scenes, metadata);
      setTitles(generatedTitles);
    } catch (err) {
      setError('Failed to generate YouTube content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyTitle = (title: string) => {
    navigator.clipboard.writeText(title);
    setCopiedTitle(title);
    setTimeout(() => setCopiedTitle(null), 2000);
  };

  const handleGenerateScript = (title: string) => {
    setIsGeneratingScript(true);
    setSelectedTitle(title);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
          <Youtube className="w-6 h-6 text-red-500" />
          YouTube Content
        </h2>
        
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2.5 rounded-lg font-semibold 
            hover:from-red-600 hover:to-pink-600 transition-all duration-300 
            disabled:from-gray-400 disabled:to-gray-400
            transform hover:scale-[1.02] active:scale-[0.98]
            flex items-center gap-2 shadow-md"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Content
            </>
          )}
        </button>
      </div>

      <ApiConsentCheckbox 
        checked={useMovieData}
        onChange={setUseMovieData}
      />

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg animate-fadeIn">
          {error}
        </div>
      )}

      {titles.length > 0 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Suggested Titles:</h3>
            <div className="space-y-3">
              {titles.map((title, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg transition-all duration-300
                    hover:bg-gray-100 hover:shadow-md transform hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-gray-800 flex-1">{title}</p>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleGenerateScript(title)}
                        disabled={isGeneratingScript && selectedTitle !== title}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium
                          transition-all duration-300 shadow-sm
                          disabled:opacity-50 disabled:cursor-not-allowed
                          bg-gradient-to-r from-blue-500 to-indigo-500 text-white
                          hover:from-blue-600 hover:to-indigo-600
                          disabled:from-gray-400 disabled:to-gray-400"
                      >
                        {isGeneratingScript && selectedTitle === title ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Generate Script
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleCopyTitle(title)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium
                          transition-all duration-300 shadow-sm
                          border border-gray-200
                          hover:bg-gray-100 hover:border-gray-300
                          text-gray-600 hover:text-gray-800"
                      >
                        {copiedTitle === title ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedTitle && (
            <div className="mt-8 animate-fadeIn">
              <h3 className="text-lg font-semibold mb-4">Video Script</h3>
              <ScriptGenerator
                title={selectedTitle}
                movieTitle={metadata.title}
                year={metadata.year}
                useMovieData={useMovieData}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};