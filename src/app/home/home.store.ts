import { Injectable } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  tapResponse,
} from '@ngrx/component-store';
import { MonoTypeOperatorFunction, pipe, switchMap, tap } from 'rxjs';
import {
  ApiClient,
  ApiStatus,
  AuthStore,
  MultipleArticlesResponse,
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
  vm$ = this.select(this._authStore.isAuthenticated$, (isAuthenticated) => ({
    isAuthenticated,
  }));

  constructor(private _authStore: AuthStore, private _apiClient: ApiClient) {
    super(initialHomeState);
  }

  ngrxOnStateInit(): void {
    this.getArticles();
  }

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
}
