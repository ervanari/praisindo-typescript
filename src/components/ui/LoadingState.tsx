import React from 'react';

interface LoadingStateProps {
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className} animate-fade-in`} data-testid="loading-state">
      <div className="bg-white rounded-xl shadow-card p-8 max-w-md mx-auto text-center">
        <div className="relative mx-auto w-16 h-16 mb-6">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-primary-200 opacity-25"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-primary-600 animate-spin"></div>
        </div>
        <h3 className="text-xl font-semibold text-neutral-800 mb-2">Searching for articles</h3>
        <p className="text-neutral-600">We're finding the best articles for you...</p>
        <div className="mt-6 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse-slow"></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-slow" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse-slow" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
