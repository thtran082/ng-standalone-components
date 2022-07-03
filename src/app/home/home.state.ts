import { ApiStatus, Article, TagsResponse } from '../shared/data-access';

export interface IHomeState {
  articles: Article[];
  tags: TagsResponse['tags'];
  selectedTag: string;
  feedType: 'global' | 'feed';
  statuses: Record<string, ApiStatus>;
}
