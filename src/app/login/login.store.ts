import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { exhaustMap } from 'rxjs';
import {
  ApiClient,
  AuthStore,
  IUser,
  IUserLogin,
  LocalStorageService,
  NG_MYAPP_TOKEN,
  NG_MYAPP_USER,
} from '../shared/data-access';
import { ILoginState } from './login.state';

const initialLoginState: ILoginState = {
  errors: {},
};

@Injectable()
export class LoginStore extends ComponentStore<ILoginState> {
  readonly loginEffect$ = this.select((s) => s.errors, {
    debounce: true,
  });
  readonly login = this.effect<IUserLogin>(
    exhaustMap((req) =>
      this._apiClient.login(req).pipe(
        tapResponse(
          (response) => {
            localStorage.setItem(NG_MYAPP_TOKEN, response.user.token);
            localStorage.setItem(NG_MYAPP_USER, JSON.stringify(response.user));
            this._authStore.authenticate();
          },
          (error: ILoginState) => {
            console.error('error login user', error);
            this.patchState({ errors: error?.errors || {} });
          }
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

export const UserSampleData: IUser = {
  bio: "Just call me Thanh, sounds like Thanks but no 's' at the end",
  email: 'thtran.082@gmail.com',
  image: '',
  token: 'this-is-my-token',
  username: 'Huy Tran Thanh',
};
