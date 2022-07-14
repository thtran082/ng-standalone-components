import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { exhaustMap } from 'rxjs';
import { ApiClient, IArticleRequest } from '../shared/data-access';

@Injectable()
export class NewArticleStore extends ComponentStore<{}> {
  constructor(private _router: Router, private _api: ApiClient) {
    super({});
  }

  readonly createArticle = this.effect<IArticleRequest>(
    exhaustMap((article) => 
      this._api.createArticle(article).pipe(
        tapResponse(
          response => {
            if (response?.article) {
              void this._router.navigate(['/article', response.article.slug]);
            } else {
              void this._router.navigate(['/profile']);
            }
          },
          error => {
            console.error('error creating new article', error);
          }
        )
      )
    )
  );
}
