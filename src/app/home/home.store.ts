import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ComponentStore,
  OnStateInit,
  tapResponse
} from '@ngrx/component-store';
import {
  filter,
  iif, MonoTypeOperatorFunction,
  of,
  pipe,
  switchMap,
  tap
} from 'rxjs';
import {
  ApiClient,
  ApiStatus,
  AuthStore,
  IMultipleArticlesResponse
} from '../shared/data-access';
import { IArticle } from './../shared/data-access/model';
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

  readonly articlesStatus$ = this.select(
    this.statuses$,
    (statuses) => statuses['articles']
  );

  vm$ = this.select(
    this._authStore.isAuthenticated$,
    this.select((s) => s.tags),
    this.select((s) => s.feedType),
    this.select((s) => s.articles),
    this.articlesStatus$.pipe(filter((status) => status !== 'idle')),
    this.tagsStatus$.pipe(filter((status) => status !== 'idle')),
    (isAuthenticated, tags, feedType, articles, articlesStatus, tagStatus) => ({
      isAuthenticated,
      tags,
      feedType,
      articles,
      articlesStatus,
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
  private readonly _setArticles = this.updater<IArticle[]>((state, value) => ({
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

  constructor(
    private _authStore: AuthStore,
    private _apiClient: ApiClient,
    private _router: Router
  ) {
    super(initialHomeState);
  }

  ngrxOnStateInit(): void {
    this.getArticles();
    this.getTags();
  }

  readonly toggleFavorite = this.effect<IArticle>(
    switchMap((article) => {
      return this._authStore.isAuthenticated$.pipe(
        switchMap((isAuthenticated) =>
          iif(
            () => isAuthenticated,
            article.favorited
              ? this._apiClient.unmarkArticleFavorite(article.slug)
              : this._apiClient.markArticleFavorite(article.slug),
             of(null)
          ).pipe(
            tapResponse(
              (response) => {
                if (response) {
                  this.patchState(({ articles }) => ({
                    articles: articles.map((item) => {
                      if (item.slug === response.article.slug) {
                        return response.article;
                      }
                      return item;
                    }),
                  }));
                } else {
                  void this._router.navigate(['/login']);
                }
              },
              (error) => {
                console.error('Error toggling favorite', error);
              }
            )
          )
        )
      );
    })
  );

  private _getArticlesPreProcessing(feedType: 'global' | 'feed') {
    return tap<void>(() => {
      this._setStatus({ key: 'articles', status: 'loading' });
      this.patchState({ selectedTag: '', feedType });
    });
  }

  private _getArticlesPostProcessing(): MonoTypeOperatorFunction<IMultipleArticlesResponse> {
    return tapResponse<IMultipleArticlesResponse, unknown>(
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
