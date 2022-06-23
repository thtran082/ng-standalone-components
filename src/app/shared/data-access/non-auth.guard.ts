import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router, UrlTree } from "@angular/router";
import { AuthStore } from "./auth.store";
import { map, Observable, take } from "rxjs";

@Injectable({ providedIn: "root" })
export class NonAuthGuard implements CanActivate, CanLoad {
  constructor(private _authStore: AuthStore, private _router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this._isAuthenticated$();
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this._isAuthenticated$();
  }

  private _isAuthenticated$() {
    return this._authStore.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) return !isAuthenticated;
        return this._router.parseUrl("/not-found");
      }),
      take(1),
    );
  }
}
