import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onDismiss,
  className = ''
}) => {
  return (
    <div className={`relative flex items-start gap-3 p-4 bg-red-50 text-red-700 rounded-lg animate-fadeIn ${className}`}
         role="alert">
      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1 text-sm">
        {message}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 text-red-500 hover:text-red-700 transition-colors"
          aria-label="Dismiss error"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};