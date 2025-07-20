import React from 'react';
import { useArticles } from '../../hooks/useArticles';
import { useSearchStore } from '../../store/searchStore';
import ArticleItem from './ArticleItem';
import LoadingState from '../ui/LoadingState';
import ErrorState from '../ui/ErrorState';
import EmptyState from '../ui/EmptyState';

interface ArticleListProps {
  className?: string;
}

export const ArticleList: React.FC<ArticleListProps> = ({ className = '' }) => {
  const { searchParams, setPage } = useSearchStore();
  const { articles, isLoading, isError, meta } = useArticles(searchParams);

  const handleLoadMore = () => {
    if (searchParams.page !== undefined) {
      setPage(searchParams.page + 1);
    }
  };

  if (isLoading && !articles.length) {
    return <LoadingState className={className} />;
  }

  if (isError) {
    return <ErrorState className={className} />;
  }

  if (!isLoading && !articles.length && searchParams.q) {
    return <EmptyState className={className} searchQuery={searchParams.q} />;
  }

  if (!searchParams.q) {
    return (
      <div className={`text-center py-12 ${className} animate-fade-in`}>
        <div className="bg-white rounded-xl shadow-card p-8 max-w-2xl mx-auto">
          <svg className="h-16 w-16 text-primary-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Search for New York Times Articles</h2>
          <p className="text-neutral-600 mb-6">Enter a search term above to discover articles from The New York Times archive.</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full">Politics</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Technology</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">Science</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">Health</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">Arts</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} animate-fade-in`}>
      <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-2xl font-bold text-neutral-800 mb-2 sm:mb-0">
            Search Results
            {meta && (
              <span className="text-primary-600 text-lg font-semibold ml-2">
                ({meta.hits.toLocaleString()} articles)
              </span>
            )}
          </h2>
          {meta && meta.hits > 0 && (
            <div className="text-sm text-neutral-500">
              Showing {articles.length} of {meta.hits.toLocaleString()} articles
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="article-list">
        {articles.map((article, index) => (
          <div key={article._id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
            <ArticleItem article={article} />
          </div>
        ))}
      </div>

      {articles.length > 0 && meta && articles.length < meta.hits && (
        <div className="mt-10 text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors shadow-sm flex items-center mx-auto"
            disabled={isLoading}
            data-testid="load-more-button"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : (
              <>
                Load More Articles
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
