import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { IAuthState } from "./auth.state";
import { defer, filter, of, switchMap } from "rxjs";
import { IUser } from "./model";
import { Router } from "@angular/router";
import { NG_MYAPP_TOKEN, NG_MYAPP_USER } from "./constants";

@Injectable({ providedIn: "root" })
export class AuthStore extends ComponentStore<IAuthState> {
  readonly user$ = this.select(s => s.user);
  readonly profile$ = this.select(s => s.profile);
  readonly status$ = this.select(s => s.status);

  readonly username$ = this.select(
    this.user$.pipe(filter((user): user is IUser => !!user)),
    user => user.username
  );

  readonly isAuthenticated$ = this.select(
    this.status$.pipe(filter((status) => status !== "idle")),
    status => status === "authenticated",
    { debounce: true }
  );

  readonly auth$ = this.select(
    this.isAuthenticated$,
    this.user$,
    this.profile$,
    (isAuthenticated, user, profile) => ({ isAuthenticated, user, profile }),
    { debounce: true }
  );

  constructor(private _router: Router) {
    super(initialAuthState);
  }

  init() {
    this._refresh();
  }

  authenticate(url: string[] = [""]) {
    this._refresh();
    void this._router.navigate(url);
  }

  private _refresh = this.effect<void>(
    switchMap(() =>
      defer(() => {
        const a = localStorage.getItem(NG_MYAPP_TOKEN);
        // TODO: call API later
        return !a ? of(null) : this.auth$;
      }).pipe(
        tapResponse(
          response => {
            this.patchState({
              user: response?.user || null,
              status: !!response ? "authenticated" : "unauthenticated",
            });
            localStorage.setItem(NG_MYAPP_USER, JSON.stringify(response?.user));
          },
          error => {
            console.error("error refreshing current user: ", error);
            this.patchState({ user: null, status: "unauthenticated" });
          }
        )
      )
    )
  )
}

export const initialAuthState: IAuthState = {
  status: "idle",
  profile: null,
  user: null,
}
