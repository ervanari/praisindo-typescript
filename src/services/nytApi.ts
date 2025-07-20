import axios from 'axios';
import { NYTApiResponse, SearchParams } from '../types/nytApi';

const API_BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

const API_KEY = process.env.REACT_APP_NYT_API_KEY || '';

export const fetchArticles = async (params: SearchParams): Promise<NYTApiResponse> => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        ...params,
        'api-key': API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const getArticlesUrl = (params: SearchParams): string => {
  const stringParams: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      stringParams[key] = String(value);
    }
  });

  stringParams['api-key'] = API_KEY;

  const queryParams = new URLSearchParams(stringParams);

  return `${API_BASE_URL}?${queryParams.toString()}`;
};
