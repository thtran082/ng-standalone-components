import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentStore, OnStateInit, tapResponse } from "@ngrx/component-store";
import { delay, exhaustMap, filter, forkJoin, iif, of, pipe, tap, withLatestFrom } from "rxjs";
import { ApiClient, AuthStore, IArticle } from "../shared/data-access";
import { IArticleState } from "./article.state";

@Injectable()
export class ArticleStore
  extends ComponentStore<IArticleState>
  implements OnStateInit {
  readonly article$ = this.select((s) => s.article);
  readonly comments$ = this.select((s) => s.comments);
  readonly statuses$ = this.select((s) => s.statuses);
  readonly slug$ = this.select(
    this._route.params,
    (params) => params["slug"] as string
  );
  readonly articleStatus$ = this.select((s) => s.statuses.article);
  readonly commentsStatus$ = this.select((s) => s.statuses.comments);
  readonly deleteStatus$ = this.select((s) => s.statuses.delete);

  readonly vm$ = this.select(
    this.article$,
    this.comments$,
    this.slug$,
    this.articleStatus$.pipe(
      filter((articleStatus) => articleStatus !== "idle")
    ),
    this.commentsStatus$.pipe(
      filter((commentsStatus) => commentsStatus !== "idle")
    ),
    this.select((s) => s.statuses.delete),
    this._authStore.auth$,
    (
      article,
      comments,
      slug,
      articleStatus,
      commentsStatus,
      deleteStatus,
      auth
    ) => ({
      article,
      comments,
      slug,
      articleStatus,
      commentsStatus,
      deleteStatus,
      auth,
      isOwner: auth?.user?.username === article?.author.username,
    })
  );

  readonly getArticle = this.effect<string>(
    pipe(
      tap(() =>
        this.patchState({
          statuses: { article: "loading", comments: "loading", delete: "idle" },
        })
      ),
      // take more times to displaying the skeleton loader
      delay(500),
      exhaustMap((slug) =>
        forkJoin([
          this._apiClient.getArticle(slug),
          this._apiClient.getArticleComments(slug),
        ]).pipe(
          tapResponse(
            ([{ article }, { comments }]) => {
              this.patchState((state) => ({
                article,
                comments,
                statuses: {
                  delete: "idle",
                  comments: "success",
                  article: "success",
                },
              }));
            },
            (error) => {
              console.error("error getting article or comments", error);
              this.patchState((state) => ({
                ...state,
                statuses: {
                  ...state.statuses,
                  comments: "error",
                  article: "error",
                },
              }));
            }
          )
        )
      )
    )
  );

  readonly deleteArticle = this.effect<IArticle["slug"]>(
    exhaustMap((slug) =>
      this._apiClient.deleteArticle(slug).pipe(
        tapResponse(
          (response) => {
            void this._router.navigate(["/"]);
          },
          (error) => {
            console.error("error deleting the article", error);
          }
        )
      )
    )
  );

  readonly toggleFavorite = this.effect<IArticle>(
    pipe(
      withLatestFrom(this._authStore.isAuthenticated$),
      exhaustMap(([article, isAuthenticated]) =>
        iif(
          () => isAuthenticated,
          !article.favorited ? this._apiClient.markArticleFavorite(article.slug) :
            this._apiClient.unmarkArticleFavorite(article.slug),
          of(null)
        ).pipe(
          tapResponse(
            (response) => {
              if (response?.article) {
                this.patchState({ article: response.article });
              } else {
                void this._router.navigate(["/login"], {
                  queryParams: {
                    redirect: `/article/${article.slug}`,
                  },
                })
              }
            },
            (error) => {
              console.error("error toggling favorite", error);
            }
          )
        )
      )
    )
  );

  readonly toggleFollow = this.effect<IArticle>(
    pipe(
      withLatestFrom(this._authStore.isAuthenticated$),
      exhaustMap(([article, isAuthenticated]) =>
        iif(
          () => isAuthenticated,
          !article.author.following ?
            this._apiClient.followUser(article.author.username) :
            this._apiClient.unfollowUser(article.author.username),
          of(null)
        ).pipe(
          tapResponse(
            (response) => {
              if (response?.profile) {
                this.patchState((state) => ({
                  ...state,
                  article: {
                    ...state.article!,
                    author: response.profile,
                  }
                }));
              } else {
                void this._router.navigate(["/login"], {
                  queryParams: {
                    redirect: `/article/${article.slug}`
                  }
                })
              }
            },
            (error) => {
              console.error("error toggling favorite", error);
            }
          )
        )
      )
    )
  );

  constructor(
    private _route: ActivatedRoute,
    private _apiClient: ApiClient,
    private _router: Router,
    private _authStore: AuthStore
  ) {
    super(initialArticleState);
  }

  ngrxOnStateInit(): void {
    this.getArticle(this.slug$);
  }
}

const initialArticleState: IArticleState = {
  article: null,
  comments: [],
  statuses: {
    article: "idle",
    comments: "idle",
    delete: "idle",
  },
};
