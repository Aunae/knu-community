import { publicApiClient } from '../../api/public-api.client';
import { Article } from '../../models/article';
import { ArticlesResponse } from '../../api-interfaces/response/article/article.interface';

const getMockArticles = () => {
  const url = '/posts';
  return publicApiClient.get<Article[]>(url);
};

export const getArticles = () => {
  const url = '/posts';
  return publicApiClient.get<ArticlesResponse>(url);
};
