import { ApiStatus, IArticle } from './../../shared/data-access/model';

export interface IProfileArticlesState {
  articles: IArticle[];
  status: ApiStatus;
}