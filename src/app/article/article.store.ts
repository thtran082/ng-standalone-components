import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { filter } from 'rxjs';
import { IArticleState } from './article.state';

@Injectable()
export class ArticleStore extends ComponentStore<IArticleState> {
  constructor(private _route: ActivatedRoute) {
    super(initialArticleState);
  }

  readonly slug$ = this.select(
    this._route.params,
    (params) => params['slug'] as string
  );
  readonly article$ = this.select((s) => s.article);
  readonly comments$ = this.select((s) => s.comments);
  readonly status$ = this.select((s) => s.status);

  readonly vm$ = this.select(
    this.article$,
    this.comments$,
    this.status$.pipe(filter((status) => status !== 'idle')),
    (articles, comments, status) => ({
      articles,
      comments,
      status,
    })
  );
}

const initialArticleState: IArticleState = {
  article: null,
  comments: [],
  status: 'idle',
};
