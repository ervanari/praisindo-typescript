import React from 'react';
import { NYTArticle } from '../../types/nytApi';

interface ArticleItemProps {
  article: NYTArticle;
  className?: string;
}

export const ArticleItem: React.FC<ArticleItemProps> = ({ article, className = '' }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const getAuthor = (): string => {
    if (!article.byline?.original) return 'Unknown Author';
    return article.byline.original.replace('By ', '');
  };

  const getSectionColor = (): string => {
    const sections: Record<string, string> = {
      'World': 'bg-blue-100 text-blue-800',
      'U.S.': 'bg-red-100 text-red-800',
      'Politics': 'bg-purple-100 text-purple-800',
      'Business': 'bg-green-100 text-green-800',
      'Opinion': 'bg-yellow-100 text-yellow-800',
      'Technology': 'bg-indigo-100 text-indigo-800',
      'Science': 'bg-teal-100 text-teal-800',
      'Health': 'bg-pink-100 text-pink-800',
      'Sports': 'bg-orange-100 text-orange-800',
      'Arts': 'bg-purple-100 text-purple-800',
      'Books': 'bg-blue-100 text-blue-800',
      'Style': 'bg-pink-100 text-pink-800',
      'Food': 'bg-green-100 text-green-800',
      'Travel': 'bg-indigo-100 text-indigo-800',
    };

    const section = article.section_name || article.news_desk || '';
    return sections[section] || 'bg-neutral-100 text-neutral-800';
  };

  return (
    <article className={`bg-white rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden animate-fade-in ${className}`}>
      <a
        href={article.web_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        data-testid="article-link"
      >
        <div className="p-5">
          <div className="mb-3">
            <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getSectionColor()}`}>
              {article.section_name || article.news_desk || 'General'}
            </span>
          </div>

          <h2 className="text-xl font-bold text-neutral-800 mb-3 hover:text-primary-600 transition-colors line-clamp-2">
            {article.headline.main}
          </h2>

          <div className="flex items-center text-sm text-neutral-500 mb-4">
            <svg className="h-4 w-4 mr-1 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="mr-3" data-testid="article-author">{getAuthor()}</span>

            <svg className="h-4 w-4 mr-1 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span data-testid="article-date">{formatDate(article.pub_date)}</span>
          </div>

          <p className="text-neutral-600 mb-4 line-clamp-3">
            {article.abstract || article.snippet || article.lead_paragraph}
          </p>

          <div className="flex justify-end items-center mt-auto pt-2 border-t border-neutral-100">
            <span className="text-primary-600 hover:text-primary-700 font-medium flex items-center transition-colors">
              Read more
              <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </article>
  );
};

export default ArticleItem;
