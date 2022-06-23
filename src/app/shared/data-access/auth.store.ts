import { inject, Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { IAuthState } from "./auth.state";
import { filter, of, switchMap } from "rxjs";
import { IUser } from "./model";
import { Router } from "@angular/router";
import { NG_MYAPP_TOKEN } from "./constants";

@Injectable()
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
  )

  readonly auth$ = this.select(
    this.isAuthenticated$,
    this.user$,
    this.profile$,
    (isAuthenticated, user, profile) => ({ isAuthenticated, user, profile }),
    { debounce: true }
  );

  private readonly _router = inject(Router);

  constructor() {
    super(initialAuthState);
  }

  authenticate(url: string[] = [""]) {
    this._refresh();
    void this._router.navigate(url);
  }

  private _refresh = this.effect<void>(
    switchMap(() => {
        const a = localStorage.getItem(NG_MYAPP_TOKEN);
        return !a ? of(null) : this.auth$;
      }
    )
  )
}

export const initialAuthState: IAuthState = {
  status: "idle",
  profile: null,
  user: null,
}
