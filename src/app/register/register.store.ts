import { ComponentStore, tapResponse } from "@ngrx/component-store";
import {
  ApiClient,
  AuthStore,
  IUserSignUp,
  LocalStorageService,
  NG_MYAPP_TOKEN,
  NG_MYAPP_USER
} from "../shared/data-access";
import { exhaustMap } from "rxjs";
import { Injectable } from "@angular/core";
import { IRegisterState } from "./register.state";

@Injectable()
export class RegisterStore extends ComponentStore<IRegisterState> {

  doSignup = this.effect<IUserSignUp>(
    exhaustMap(user =>
      this._apiClient.signup(user).pipe(
        tapResponse(
          response => {
            this._localStorageService.setItem(NG_MYAPP_TOKEN, response.user.token);
            this._localStorageService.setItem(NG_MYAPP_USER, response.user);
            this._authStore.authenticate();
          },
          (error: { errors: Record<string, any> }) => {
            console.error("error while registering new user", error);
            error?.errors && this.patchState({ error: error.errors });
          }
        )
      )
    ),
  );

  constructor(
    private _apiClient: ApiClient,
    private _localStorageService: LocalStorageService,
    private _authStore: AuthStore
  ) {
    super(initialState);
  }

}

const initialState: IRegisterState = {
  error: {},
};
