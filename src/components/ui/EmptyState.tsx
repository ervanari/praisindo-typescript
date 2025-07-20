import React from 'react';

interface EmptyStateProps {
  className?: string;
  searchQuery: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ className = '', searchQuery }) => {
  const getSuggestions = (): string[] => {
    const suggestions: Record<string, string[]> = {
      'politics': ['election', 'president', 'congress', 'senate'],
      'technology': ['apple', 'google', 'microsoft', 'ai', 'tech'],
      'sports': ['football', 'basketball', 'baseball', 'olympics'],
      'health': ['covid', 'vaccine', 'medicine', 'healthcare'],
      'business': ['economy', 'stock market', 'finance', 'companies'],
    };

    const defaultSuggestions = ['politics', 'technology', 'health', 'climate', 'science'];

    for (const [category, terms] of Object.entries(suggestions)) {
      if (searchQuery.toLowerCase().includes(category)) {
        return terms;
      }
    }

    return defaultSuggestions;
  };

  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className} animate-fade-in`} data-testid="empty-state">
      <div className="bg-white rounded-xl shadow-card p-8 max-w-md mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-6 mx-auto">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-neutral-800 mb-3">No results found</h3>
        <p className="text-neutral-600 mb-4">
          We couldn't find any articles matching "<span className="font-semibold text-primary-700">{searchQuery}</span>".
        </p>

        <div className="bg-neutral-50 p-4 rounded-lg mb-6">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Try these suggestions:</h4>
          <ul className="text-sm text-neutral-600 space-y-1">
            <li>• Check your spelling</li>
            <li>• Try more general keywords</li>
            <li>• Try different keywords</li>
          </ul>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Popular searches:</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {getSuggestions().map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  const searchInput = document.getElementById('search-input') as HTMLInputElement;
                  if (searchInput) {
                    searchInput.value = suggestion;
                    searchInput.form?.dispatchEvent(new Event('submit', { cancelable: true }));
                  }
                }}
                className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm hover:bg-primary-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
