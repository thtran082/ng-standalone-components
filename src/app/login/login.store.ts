import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { exhaustMap, pipe, tap, withLatestFrom } from "rxjs";
import { ApiClient, AuthStore, IUserLogin, NG_CONDUIT_TOKEN, NG_CONDUIT_USER } from "../shared/data-access";
import { ILoginState } from "./login.state";
import { HttpErrorResponse } from "@angular/common/http";

const initialLoginState: ILoginState = {
  errors: {},
  status: "idle",
};

@Injectable()
export class LoginStore extends ComponentStore<ILoginState> {
  readonly loginEffect$ = this.select((s) => s.errors, {
    debounce: true,
  });
  readonly status$ = this.select((s) => s.status);
  readonly errors$ = this.select((s) => s.errors);

  readonly vm$ = this.select(
    this.status$,
    this._route.queryParamMap,
    this.errors$,
    (status, params, errors) => ({ status, params: params.get("redirect"), errors })
  );

  readonly login = this.effect<IUserLogin>(
    pipe(
      tap(() => this.patchState({ status: "loading" })),
      withLatestFrom(this._route.queryParamMap),
      exhaustMap(([user, params]) =>
        this._apiClient.login(user).pipe(
          tapResponse(
            (response) => {
              localStorage.setItem(NG_CONDUIT_TOKEN, response.user.token);
              localStorage.setItem(
                NG_CONDUIT_USER,
                JSON.stringify(response.user)
              );
              this._authStore.authenticate([decodeURIComponent(params.get("redirect") || "")]);
              this.patchState({ status: "success" });
            },
            ({ error }: HttpErrorResponse) => {
              console.error('error login user', error);
              this.patchState({ errors: error?.errors || {}, status: "error" });
            }
          )
        )
      )
    )
  );

  constructor(
    private _authStore: AuthStore,
    private _route: ActivatedRoute,
    private _apiClient: ApiClient
  ) {
    super(initialLoginState);
  }
}
