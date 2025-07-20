import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar/SearchBar';
import { useSearchStore } from '../../store/searchStore';

jest.mock('../../store/searchStore', () => ({
  useSearchStore: jest.fn() as unknown as jest.MockedFunction<typeof import('../../store/searchStore').useSearchStore>
}));

describe('SearchBar', () => {
  const mockSetSearchQuery = jest.fn();
  const mockSetSort = jest.fn();

  beforeEach(() => {
    (useSearchStore as jest.Mock).mockImplementation(() => ({
      searchParams: {
        q: '',
        sort: 'relevance'
      },
      setSearchQuery: mockSetSearchQuery,
      setSort: mockSetSort
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<SearchBar />);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('sort-select')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('calls setSearchQuery when form is submitted', () => {
    render(<SearchBar />);

    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(mockSetSearchQuery).toHaveBeenCalledWith('test query');
  });

  it('calls setSort when sort option changes', () => {
    render(<SearchBar />);

    const select = screen.getByTestId('sort-select');

    fireEvent.change(select, { target: { value: 'newest' } });

    expect(mockSetSort).toHaveBeenCalledWith('newest');
  });

  it('updates input value when searchParams.q changes', () => {
    const { rerender } = render(<SearchBar />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    expect(input.value).toBe('');

    (useSearchStore as jest.Mock).mockImplementation(() => ({
      searchParams: {
        q: 'new query',
        sort: 'relevance'
      },
      setSearchQuery: mockSetSearchQuery,
      setSort: mockSetSort
    }));

    rerender(<SearchBar />);

    expect(input.value).toBe('new query');
  });
});
