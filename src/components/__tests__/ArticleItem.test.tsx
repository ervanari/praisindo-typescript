import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticleItem from '../ArticleList/ArticleItem';
import { NYTArticle } from '../../types/nytApi';

describe('ArticleItem', () => {
  const mockArticle: NYTArticle = {
    abstract: 'Test abstract',
    web_url: 'https://www.nytimes.com/test-article',
    snippet: 'Test snippet',
    lead_paragraph: 'Test lead paragraph',
    print_section: 'A',
    print_page: '1',
    source: 'The New York Times',
    multimedia: [],
    headline: {
      main: 'Test Headline',
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
    _id: 'test-id',
    word_count: 100,
    uri: 'nyt://article/test-id'
  };

  it('renders article information correctly', () => {
    render(<ArticleItem article={mockArticle} />);
    
    expect(screen.getByText('Test Headline')).toBeInTheDocument();
    
    expect(screen.getByTestId('article-author')).toHaveTextContent('Test Author');
    
    const dateElement = screen.getByTestId('article-date');
    expect(dateElement).toBeInTheDocument();
    
    expect(screen.getByText('Test abstract')).toBeInTheDocument();
    
    expect(screen.getByText('Test Section')).toBeInTheDocument();
    
    const link = screen.getByTestId('article-link');
    expect(link).toHaveAttribute('href', 'https://www.nytimes.com/test-article');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays "Unknown Author" when byline is missing', () => {
    const articleWithoutByline = {
      ...mockArticle,
      byline: undefined
    };
    
    render(<ArticleItem article={articleWithoutByline} />);
    
    expect(screen.getByTestId('article-author')).toHaveTextContent('Unknown Author');
  });

  it('uses snippet or lead_paragraph when abstract is missing', () => {
    const articleWithoutAbstract = {
      ...mockArticle,
      abstract: '',
      snippet: 'Test snippet',
      lead_paragraph: 'Test lead paragraph'
    };
    
    render(<ArticleItem article={articleWithoutAbstract} />);
    
    expect(screen.getByText('Test snippet')).toBeInTheDocument();
    
    const articleWithoutAbstractAndSnippet = {
      ...mockArticle,
      abstract: '',
      snippet: '',
      lead_paragraph: 'Test lead paragraph'
    };
    
    render(<ArticleItem article={articleWithoutAbstractAndSnippet} />);
    
    expect(screen.getByText('Test lead paragraph')).toBeInTheDocument();
  });

  it('uses news_desk when section_name is missing', () => {
    const articleWithoutSectionName = {
      ...mockArticle,
      section_name: '',
      news_desk: 'Test Desk'
    };
    
    render(<ArticleItem article={articleWithoutSectionName} />);
    
    expect(screen.getByText('Test Desk')).toBeInTheDocument();
  });
});
