import useSWR from 'swr';
import { fetchArticles, getArticlesUrl } from '../services/nytApi';
import { NYTApiResponse, SearchParams } from '../types/nytApi';

export const useArticles = (params: SearchParams) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<NYTApiResponse>(
    params.q ? getArticlesUrl(params) : null,
    async () => await fetchArticles(params),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  return {
    articles: data?.response.docs || [],
    meta: data?.response.meta,
    isLoading,
    isValidating,
    isError: !!error,
    error,
    mutate,
  };
};
