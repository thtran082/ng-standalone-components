import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { exhaustMap, pipe, withLatestFrom } from 'rxjs';
import { ApiClient, IArticleRequest } from '../shared/data-access';
import { AuthStore } from './../shared/data-access/auth.store';

@Injectable()
export class NewArticleStore extends ComponentStore<{}> {
  constructor(private _router: Router, private _api: ApiClient, private _authStore: AuthStore) {
    super({});
  }

  readonly createArticle = this.effect<IArticleRequest>(
    pipe(
      withLatestFrom(this._authStore.auth$),
      exhaustMap(([article, { user }]) =>
        this._api.createArticle(article).pipe(
          tapResponse(
            (response) => {
              if (response?.article) {
                void this._router.navigate(['/article', response.article.slug]);
              } else {
                void this._router.navigate(['/profile', user?.username]);
              }
            },
            (error) => {
              console.error('error creating new article', error);
            }
          )
        )
      )
    )
  );
}
