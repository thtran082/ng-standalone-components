import { ApiStatus, IArticle, ITagsResponse } from '../shared/data-access';

export interface IHomeState {
  articles: IArticle[];
  tags: ITagsResponse['tags'];
  selectedTag: string;
  feedType: 'global' | 'feed';
  statuses: Record<string, ApiStatus>;
}
