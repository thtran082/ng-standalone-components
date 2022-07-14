import { ApiStatus, IArticle, IComment } from "../shared/data-access";

export interface IArticleState {
    status: ApiStatus;
    comments: IComment[];
    article: IArticle | null;
}
