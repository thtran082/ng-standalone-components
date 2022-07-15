import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ComponentStore,
  OnStateInit,
  tapResponse
} from '@ngrx/component-store';
import { iif, of, pipe, switchMap, tap, withLatestFrom } from 'rxjs';
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
    private _router: Router
  ) {
    super(initialProfileArticlesState);
  }

  readonly vm$ = this.select(
    this.select((s) => s.articles),
    this.select((s) => s.status),
    (articles, status) => ({ articles, status })
  );

  ngrxOnStateInit(): void {
    this.getArticles(this._profileArticleType);
  }

  getArticles = this.effect<ProfileArticleType>(
    pipe(
      tap(() => this.patchState({ status: 'loading' })),
      withLatestFrom(this._authStore.auth$),
      switchMap(([type, { user }]) => {
        let params: Record<string, string> = {};
        params[type === 'favorites' ? 'favorited' : 'author'] =
          user?.username || '';
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
                void this._router.navigate(['/login']);
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
