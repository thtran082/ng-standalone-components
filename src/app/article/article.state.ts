import { ApiStatus, IArticle } from './../shared/data-access/model';

export interface IArticleState {
    status: ApiStatus;
    comments: Comment[];
    article: IArticle | null;
}