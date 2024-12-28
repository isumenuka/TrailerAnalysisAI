import React from 'react';
import type { MovieMetadata } from '../types/movie';
import { MovieSearch } from './MovieSearch';

interface MovieMetadataFormProps {
  metadata: MovieMetadata;
  onChange: (metadata: MovieMetadata) => void;
}

export const MovieMetadataForm: React.FC<MovieMetadataFormProps> = ({
  metadata,
  onChange,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-4 mb-6">
      <MovieSearch onSelect={onChange} />
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <input
            type="number"
            id="year"
            required
            min="1900"
            max={currentYear}
            value={metadata.year}
            onChange={(e) => onChange({ ...metadata, year: parseInt(e.target.value) })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                required
                checked={metadata.type === 'movie'}
                onChange={() => onChange({ ...metadata, type: 'movie' })}
                className="text-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2">Movie</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                required
                checked={metadata.type === 'tv'}
                onChange={() => onChange({ ...metadata, type: 'tv' })}
                className="text-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2">TV Series</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}