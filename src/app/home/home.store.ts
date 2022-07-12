import { Injectable } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  tapResponse
} from '@ngrx/component-store';
import { filter, MonoTypeOperatorFunction, pipe, switchMap, tap } from 'rxjs';
import {
  ApiClient,
  ApiStatus,
  AuthStore,
  MultipleArticlesResponse
} from '../shared/data-access';
import { Article } from './../shared/data-access/model';
import { IHomeState } from './home.state';

const initialHomeState: IHomeState = {
  articles: [],
  tags: [],
  selectedTag: '',
  feedType: 'global',
  statuses: {
    articles: 'idle',
    tags: 'idle',
  },
};

@Injectable()
export class HomeStore
  extends ComponentStore<IHomeState>
  implements OnStateInit
{
  readonly statuses$ = this.select((s) => s.statuses);

  readonly tagsStatus$ = this.select(
    this.statuses$,
    (statuses) => statuses['tags']
  );

  vm$ = this.select(
    this._authStore.isAuthenticated$,
    this.select((s) => s.tags),
    this.select((s) => s.feedType),
    this.tagsStatus$.pipe(filter((status) => status !== 'idle')),
    (isAuthenticated, tags, feedType, tagStatus) => ({
      isAuthenticated,
      tags,
      feedType,
      tagStatus,
    })
  );

  getArticles = this.effect<void>(
    pipe(
      this._getArticlesPreProcessing('global'),
      switchMap(() => {
        return this._apiClient
          .getArticlesFeed()
          .pipe(this._getArticlesPostProcessing());
      })
    )
  );
  private readonly _setArticles = this.updater<Article[]>((state, value) => ({
    ...state,
    articles: [...state.articles, ...value],
  }));

  private readonly _setStatus = this.updater<{
    key: string;
    status: ApiStatus;
  }>((state, { key, status }) => ({
    ...state,
    statuses: { ...state.statuses, [key]: status },
  }));

  getTags = this.effect<void>(
    pipe(
      tap(() => this._setStatus({ key: 'tags', status: 'loading' })),
      switchMap(() =>
        this._apiClient.getTags().pipe(
          tapResponse(
            (response) => {
              this.patchState({ tags: response.tags });
              this._setStatus({ key: 'tags', status: 'success' });
            },
            (error) => {
              console.error('error getting tags: ', error);
              this._setStatus({ key: 'tags', status: 'error' });
            }
          )
        )
      )
    ) 
  );

  constructor(private _authStore: AuthStore, private _apiClient: ApiClient) {
    super(initialHomeState);
  }

  ngrxOnStateInit(): void {
    this.getArticles();
    this.getTags();
  }

  private _getArticlesPreProcessing(feedType: 'global' | 'feed') {
    return tap<void>(() => {
      this._setStatus({ key: 'articles', status: 'loading' });
      this.patchState({ selectedTag: '', feedType });
    });
  }

  private _getArticlesPostProcessing(): MonoTypeOperatorFunction<MultipleArticlesResponse> {
    return tapResponse<MultipleArticlesResponse, unknown>(
      (response) => {
        this._setArticles(response.articles);
        this._setStatus({ key: 'articles', status: 'success' });
      },
      (error) => {
        console.error('error getting articles', error);
        this._setStatus({ key: 'articles', status: 'error' });
      }
    );
  }
}
