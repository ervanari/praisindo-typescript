import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArticleList from '../ArticleList/ArticleList';
import { useArticles } from '../../hooks/useArticles';
import { useSearchStore } from '../../store/searchStore';
import { NYTArticle } from '../../types/nytApi';

jest.mock('../../hooks/useArticles', () => ({
  useArticles: jest.fn()
}));

jest.mock('../../store/searchStore', () => ({
  useSearchStore: jest.fn() as unknown as jest.MockedFunction<typeof import('../../store/searchStore').useSearchStore>
}));

jest.mock('../ArticleList/ArticleItem', () => {
  return {
    __esModule: true,
    default: ({ article }: { article: NYTArticle }) => (
      <div data-testid="article-item">{article.headline.main}</div>
    )
  };
});

jest.mock('../ui/LoadingState', () => {
  return {
    __esModule: true,
    default: ({ className }: { className?: string }) => (
      <div data-testid="loading-state">Loading...</div>
    )
  };
});

jest.mock('../ui/ErrorState', () => {
  return {
    __esModule: true,
    default: ({ className }: { className?: string }) => (
      <div data-testid="error-state">Error</div>
    )
  };
});

jest.mock('../ui/EmptyState', () => {
  return {
    __esModule: true,
    default: ({ className, searchQuery }: { className?: string, searchQuery: string }) => (
      <div data-testid="empty-state">No results for {searchQuery}</div>
    )
  };
});

describe('ArticleList', () => {
  const mockArticles: NYTArticle[] = [
    {
      abstract: 'Test abstract 1',
      web_url: 'https://www.nytimes.com/test-article-1',
      snippet: 'Test snippet 1',
      lead_paragraph: 'Test lead paragraph 1',
      print_section: 'A',
      print_page: '1',
      source: 'The New York Times',
      multimedia: [],
      headline: {
        main: 'Test Headline 1',
        kicker: '',
        content_kicker: '',
        print_headline: '',
        name: '',
        seo: '',
        sub: ''
      },
      keywords: [],
      pub_date: '2023-07-20T12:00:00Z',
      document_type: 'article',
      news_desk: 'Test Desk',
      section_name: 'Test Section',
      byline: {
        original: 'By Test Author',
        person: [],
        organization: ''
      },
      type_of_material: 'News',
      _id: 'test-id-1',
      word_count: 100,
      uri: 'nyt://article/test-id-1'
    },
    {
      abstract: 'Test abstract 2',
      web_url: 'https://www.nytimes.com/test-article-2',
      snippet: 'Test snippet 2',
      lead_paragraph: 'Test lead paragraph 2',
      print_section: 'B',
      print_page: '2',
      source: 'The New York Times',
      multimedia: [],
      headline: {
        main: 'Test Headline 2',
        kicker: '',
        content_kicker: '',
        print_headline: '',
        name: '',
        seo: '',
        sub: ''
      },
      keywords: [],
      pub_date: '2023-07-21T12:00:00Z',
      document_type: 'article',
      news_desk: 'Test Desk',
      section_name: 'Test Section',
      byline: {
        original: 'By Another Author',
        person: [],
        organization: ''
      },
      type_of_material: 'News',
      _id: 'test-id-2',
      word_count: 200,
      uri: 'nyt://article/test-id-2'
    }
  ];

  const mockSetPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state when initially loading', () => {
    (useSearchStore as jest.Mock).mockReturnValue({
      searchParams: { q: 'test', page: 0 },
      setPage: mockSetPage
    });

    (useArticles as jest.Mock).mockReturnValue({
      articles: [],
      isLoading: true,
      isError: false,
      meta: { hits: 0 }
    });

    render(<ArticleList />);

    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
  });

  it('shows error state when there is an error', () => {
    (useSearchStore as jest.Mock).mockReturnValue({
      searchParams: { q: 'test', page: 0 },
      setPage: mockSetPage
    });

    (useArticles as jest.Mock).mockReturnValue({
      articles: [],
      isLoading: false,
      isError: true,
      meta: null
    });

    render(<ArticleList />);

    expect(screen.getByTestId('error-state')).toBeInTheDocument();
  });

  it('shows empty state when no results are found', () => {
    (useSearchStore as jest.Mock).mockReturnValue({
      searchParams: { q: 'nonexistent', page: 0 },
      setPage: mockSetPage
    });

    (useArticles as jest.Mock).mockReturnValue({
      articles: [],
      isLoading: false,
      isError: false,
      meta: { hits: 0 }
    });

    render(<ArticleList />);

    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByText('No results for nonexistent')).toBeInTheDocument();
  });

  it('shows instructions when no search has been performed', () => {
    (useSearchStore as jest.Mock).mockReturnValue({
      searchParams: { q: '', page: 0 },
      setPage: mockSetPage
    });

    (useArticles as jest.Mock).mockReturnValue({
      articles: [],
      isLoading: false,
      isError: false,
      meta: null
    });

    render(<ArticleList />);

    expect(screen.getByText('Search for New York Times Articles')).toBeInTheDocument();
    expect(screen.getByText('Enter a search term above to find articles')).toBeInTheDocument();
  });

  it('renders a list of articles', () => {
    (useSearchStore as jest.Mock).mockReturnValue({
      searchParams: { q: 'test', page: 0 },
      setPage: mockSetPage
    });

    (useArticles as jest.Mock).mockReturnValue({
      articles: mockArticles,
      isLoading: false,
      isError: false,
      meta: { hits: 2 }
    });

    render(<ArticleList />);

    expect(screen.getByText('Search Results')).toBeInTheDocument();
    expect(screen.getAllByTestId('article-item')).toHaveLength(2);
    expect(screen.getByText('Test Headline 1')).toBeInTheDocument();
    expect(screen.getByText('Test Headline 2')).toBeInTheDocument();
  });

  it('shows load more button when there are more results', () => {
    (useSearchStore as jest.Mock).mockReturnValue({
      searchParams: { q: 'test', page: 0 },
      setPage: mockSetPage
    });

    (useArticles as jest.Mock).mockReturnValue({
      articles: mockArticles,
      isLoading: false,
      isError: false,
      meta: { hits: 10 }
    });

    render(<ArticleList />);

    const loadMoreButton = screen.getByTestId('load-more-button');
    expect(loadMoreButton).toBeInTheDocument();

    fireEvent.click(loadMoreButton);
    expect(mockSetPage).toHaveBeenCalledWith(1);
  });

  it('does not show load more button when all results are loaded', () => {
    (useSearchStore as jest.Mock).mockReturnValue({
      searchParams: { q: 'test', page: 0 },
      setPage: mockSetPage
    });

    (useArticles as jest.Mock).mockReturnValue({
      articles: mockArticles,
      isLoading: false,
      isError: false,
      meta: { hits: 2 }
    });

    render(<ArticleList />);

    expect(screen.queryByTestId('load-more-button')).not.toBeInTheDocument();
  });
});
