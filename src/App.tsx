import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ArticleList from './components/ArticleList/ArticleList';
import { SWRConfig } from 'swr';

function App() {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false
      }}
    >
      <div className="min-h-screen bg-neutral-50">
        <header className="bg-gradient-to-r from-primary-600 to-secondary-600 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  className="h-8 w-8 text-white mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <h1 className="text-3xl font-bold text-white">New York Times Article Search</h1>
              </div>
              <div className="hidden md:block">
                <p className="text-primary-100 italic">Discover the world's best journalism</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
          <div className="mb-10 animate-slide-up">
            <SearchBar />
          </div>

          <ArticleList />
        </main>

        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 mt-12 shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-neutral-500 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} New York Times Article Search App
              </p>
            </div>
          </div>
        </footer>
      </div>
    </SWRConfig>
  );
}

export default App;
