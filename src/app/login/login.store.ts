import { inject, Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ILoginState } from "./login.state";
import { exhaustMap, of } from "rxjs";
import { AuthStore, ILogin, IUser, IUserResponse, NG_MYAPP_TOKEN, NG_MYAPP_USER } from "../shared/data-access";

const initialLoginState: ILoginState = {
  errors: {}
};

@Injectable()
export class LoginStore extends ComponentStore<ILoginState> {
  readonly loginEffect$ = this.select(
    s => s.errors,
    {
      debounce: true
    }
  )

  private _authStore = inject(AuthStore);

  constructor() {
    super(initialLoginState);
  }

  readonly login = this.effect<ILogin>(
    exhaustMap(req$ =>
      of<IUserResponse>({ user: UserSampleData }).pipe(
        tapResponse(
          response => {
            localStorage.setItem(NG_MYAPP_TOKEN, response.user.token);
            localStorage.setItem(NG_MYAPP_USER, JSON.stringify(response.user));
            this._authStore.authenticate();
          },
          (error: ILoginState) => {
            console.error("error login user", error);
            this.patchState({ errors: error?.errors || {} });
          }
        )
      )
    )
  )
}

export const UserSampleData: IUser = {
  bio: "Just call me Thanh, sounds like Thanks but no 's' at the end",
  email: "thtran.082@gmail.com",
  image: "",
  token: "this-is-my-token",
  username: "Huy Tran Thanh"
}
