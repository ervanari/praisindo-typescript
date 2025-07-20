import React, { useState, useEffect } from 'react';
import { useSearchStore } from '../../store/searchStore';

interface SearchBarProps {
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ className = '' }) => {
  const { searchParams, setSearchQuery, setSort } = useSearchStore();
  const [inputValue, setInputValue] = useState(searchParams.q);

  useEffect(() => {
    setInputValue(searchParams.q);
  }, [searchParams.q]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue.trim());
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as 'newest' | 'oldest' | 'relevance');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-4xl mx-auto ${className}`}
      role="form"
    >
      <div className="bg-white p-6 rounded-xl shadow-card">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">Find Articles</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <label htmlFor="search-input" className="sr-only">Search articles</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="search-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search for articles..."
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                data-testid="search-input"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <select
                value={searchParams.sort}
                onChange={handleSortChange}
                className="appearance-none w-full bg-white pl-4 pr-10 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                data-testid="sort-select"
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors shadow-sm"
              data-testid="search-button"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
