import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  ComponentStore,
  OnStateInit,
  tapResponse
} from '@ngrx/component-store';
import {
  combineLatest,
  exhaustMap,
  iif,
  of,
  pipe,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs';
import { AuthStore, IArticle } from 'src/app/shared/data-access';
import { ApiClient } from './../../shared/data-access/api';
import { ProfileArticleType } from './profile-article.model';
import { PROFILE_ARTICLES_DI } from './profile-articles.di';
import { IProfileArticlesState } from './profile-articles.state';

@Injectable()
export class ProfileArticlesStore
  extends ComponentStore<IProfileArticlesState>
  implements OnStateInit
{
  constructor(
    @Inject(PROFILE_ARTICLES_DI)
    private _profileArticleType: ProfileArticleType,
    private _authStore: AuthStore,
    private _apiClient: ApiClient,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    super(initialProfileArticlesState);
  }

  readonly userProfile$ = this.select(
    this._route.parent?.params || of(''),
    (params) => (params as Params)['username'] || ''
  );

  readonly vm$ = this.select(
    this.select((s) => s.articles),
    this.select((s) => s.status),
    this.userProfile$,
    (articles, status, userProfile) => ({ articles, status, userProfile })
  );

  ngrxOnStateInit(): void {
    this.getArticles(this._profileArticleType);
  }

  getArticles = this.effect<ProfileArticleType>(
    pipe(
      tap(() => this.patchState({ status: 'loading' })),
      exhaustMap((type) => {
        return combineLatest([this.userProfile$, this._authStore.auth$]).pipe(
          exhaustMap(([userProfile, auth]) => {
            let params: Record<string, string> = {};
            if (type == 'favorites') {
              params['favorited'] = userProfile || '';
            } else {
              params['author'] = userProfile || '';
            }
            return this._apiClient.getArticles(params).pipe(
              tapResponse(
                ({ articles }) => {
                  this.patchState({ status: 'success', articles });
                },
                (error) => {
                  console.error('error getting the profile articles', error);
                  this.patchState({ status: 'error' });
                }
              )
            );
          })
        );
      })
    )
  );

  readonly toggleFavorite = this.effect<IArticle>(
    pipe(
      withLatestFrom(this._authStore.isAuthenticated$),
      switchMap(([article, isAuthenticated]) =>
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
                this.patchState(({ articles }) => {
                  return {
                    articles: articles.map((item) => {
                      if (item.slug === response.article.slug) {
                        return response.article;
                      }
                      return item;
                    }),
                  };
                });
              } else {
                void this._router.navigate(['/login'], {
                  queryParams: {
                    redirect: `/profile/${article.author.username}`,
                  },
                });
              }
            },
            (error) => {
              console.error('Error toggling favorite', error);
            }
          )
        )
      )
    )
  );
}

const initialProfileArticlesState: IProfileArticlesState = {
  articles: [],
  status: 'idle',
};
