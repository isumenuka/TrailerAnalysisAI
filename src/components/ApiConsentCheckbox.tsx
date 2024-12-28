import React from 'react';
import { Info } from 'lucide-react';

interface ApiConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const ApiConsentCheckbox: React.FC<ApiConsentCheckboxProps> = ({
  checked,
  onChange
}) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg mb-4 animate-fadeIn">
      <div className="flex items-center h-5 mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 text-blue-600 rounded border-gray-300 
            focus:ring-blue-500 cursor-pointer"
        />
      </div>
      <div className="flex items-start gap-2">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <label htmlFor="api-consent" className="text-sm text-gray-700 font-medium cursor-pointer">
            Use TMDB & OMDB movie data
          </label>
          <p className="text-xs text-gray-600 mt-1">
            Enable this to enhance your YouTube scripts with accurate movie details, cast information, 
            and plot elements from The Movie Database (TMDB) and Open Movie Database (OMDB).
          </p>
        </div>
      </div>
    </div>
  );
};