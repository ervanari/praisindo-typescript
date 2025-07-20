import { create } from 'zustand';
import { SearchParams } from '../types/nytApi';

interface SearchState {
  searchParams: SearchParams;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  setSort: (sort: 'newest' | 'oldest' | 'relevance') => void;
  resetSearch: () => void;
}

const DEFAULT_SEARCH_PARAMS: SearchParams = {
  q: '',
  page: 0,
  sort: 'relevance',
};

export const useSearchStore = create<SearchState>((set) => ({
  searchParams: { ...DEFAULT_SEARCH_PARAMS },
  
  setSearchQuery: (query: string) =>
    set((state) => ({
      searchParams: {
        ...state.searchParams,
        q: query,
        page: 0,
      },
    })),
  
  setPage: (page: number) =>
    set((state) => ({
      searchParams: {
        ...state.searchParams,
        page,
      },
    })),
  
  setSort: (sort: 'newest' | 'oldest' | 'relevance') =>
    set((state) => ({
      searchParams: {
        ...state.searchParams,
        sort,
        page: 0,
      },
    })),
  
  resetSearch: () =>
    set({
      searchParams: { ...DEFAULT_SEARCH_PARAMS },
    }),
}));
