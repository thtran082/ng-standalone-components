import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { exhaustMap, pipe, tap } from 'rxjs';
import {
  ApiClient,
  AuthStore,
  IUserLogin,
  LocalStorageService,
  NG_CONDUIT_TOKEN,
  NG_CONDUIT_USER
} from '../shared/data-access';
import { ILoginState } from './login.state';

const initialLoginState: ILoginState = {
  errors: {},
  status: 'idle',
};

@Injectable()
export class LoginStore extends ComponentStore<ILoginState> {
  readonly loginEffect$ = this.select((s) => s.errors, {
    debounce: true,
  });
  readonly status$ = this.select((s) => s.status);

  readonly vm$ = this.select(this.status$, (status) => ({ status }));

  readonly login = this.effect<IUserLogin>(
    pipe(
      tap(() => this.patchState({ status: 'loading' })),
      exhaustMap((req) =>
        this._apiClient.login(req).pipe(
          tapResponse(
            (response) => {
              localStorage.setItem(NG_CONDUIT_TOKEN, response.user.token);
              localStorage.setItem(
                NG_CONDUIT_USER,
                JSON.stringify(response.user)
              );
              this._authStore.authenticate();
              this.patchState({ status: 'success' });
            },
            (error: ILoginState) => {
              console.error('error login user', error);
              this.patchState({ errors: error?.errors || {}, status: 'error' });
            }
          )
        )
      )
    )
  );

  constructor(
    private _authStore: AuthStore,
    private _localStorageService: LocalStorageService,
    private _apiClient: ApiClient
  ) {
    super(initialLoginState);
  }
}
