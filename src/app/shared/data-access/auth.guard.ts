import { CanActivate, CanActivateChild, CanLoad, Router, UrlTree } from "@angular/router";
import { AuthStore } from "./auth.store";
import { map, Observable, take } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(private _authStore: AuthStore, private _router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this._isAuthenticated();
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this._isAuthenticated();
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this._isAuthenticated();
  }

  private _isAuthenticated() {
    return this._authStore.isAuthenticated$.pipe(
      map(isAuthenticated => {
        return isAuthenticated || this._router.parseUrl("/not-found");
      }),
      take(1),
    )
  }
}
