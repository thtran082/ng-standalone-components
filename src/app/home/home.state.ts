import { ApiStatus, IArticle, ITagsResponse } from '../shared/data-access';

export interface IHomeState {
  articles: IArticle[];
  tags: ITagsResponse['tags'];
  selectedTag: string;
  feedType: FeedType;
  statuses: Record<string, ApiStatus>;
}

export type FeedType = 'global' | 'feed';