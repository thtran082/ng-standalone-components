import { ApiStatus, IArticle, IComment } from "../shared/data-access";

type StatusType = 'article' | 'comments' | 'delete';

export interface IArticleState {
    statuses: Record<StatusType, ApiStatus>;
    comments: IComment[];
    article: IArticle | null;
}
