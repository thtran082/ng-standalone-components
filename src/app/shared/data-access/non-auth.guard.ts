import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthStore } from "./auth.store";

@Injectable({ providedIn: "root" })
export class NonAuthGuard implements CanActivate, CanLoad {
  constructor(private _authStore: AuthStore, private _router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    this._authStore.updateAngularTitle();
    return this._isAuthenticated$();
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this._isAuthenticated$();
  }

  private _isAuthenticated$() {
    return this._authStore.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) return !isAuthenticated;
        return this._router.parseUrl("/");
      }),
      take(1),
    );
  }
}
