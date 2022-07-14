import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ComponentStore, OnStateInit, tapResponse } from "@ngrx/component-store";
import { filter, forkJoin, pipe, switchMap, tap } from "rxjs";
import { IArticleState } from "./article.state";
import { ApiClient } from "../shared/data-access";

@Injectable()
export class ArticleStore extends ComponentStore<IArticleState> implements OnStateInit {
  readonly article$ = this.select((s) => s.article);
  readonly comments$ = this.select((s) => s.comments);
  readonly status$ = this.select((s) => s.status);
  readonly slug$ = this.select(
    this._route.params,
    (params) => params["slug"] as string
  );
  readonly vm$ = this.select(
    this.article$,
    this.comments$,
    this.slug$,
    this.status$.pipe(filter((status) => status !== "idle")),
    (articles, comments, slug, status) => ({
      articles,
      comments,
      slug,
      status,
    })
  );

  readonly getArticle = this.effect<string>(
    pipe(
      tap(() => this.patchState(({ status: "loading" }))),
      switchMap(slug =>
        forkJoin([
          this._apiClient.getArticle(slug),
          this._apiClient.getArticleComments(slug),
        ]).pipe(
          tapResponse(
            ([{ article }, { comments }]) => {
              this.patchState({
                article,
                comments,
                status: "success"
              })
            },
            error => {
              console.error("error getting article or comments", error);
              this.patchState({ status: "error" });
            }
          )
        )
      )
    )
  );

  constructor(private _route: ActivatedRoute, private _apiClient: ApiClient) {
    super(initialArticleState);
  }

  ngrxOnStateInit(): void {
    this.getArticle(this.slug$)
  }
}

const initialArticleState: IArticleState = {
  article: null,
  comments: [],
  status: "idle",
};
