import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { defer, filter, map, of, switchMap, tap } from "rxjs";
import { ApiClient } from "./api";
import { IAuthState } from "./auth.state";
import { NG_CONDUIT_TOKEN, NG_CONDUIT_USER } from "./constants";
import { LocalStorageService } from "./local-storage.service";
import { IUser } from "./model";

@Injectable({ providedIn: 'root' })
export class AuthStore extends ComponentStore<IAuthState> {
  readonly user$ = this.select((s) => s.user);
  readonly profile$ = this.select((s) => s.profile);
  readonly status$ = this.select((s) => s.status);

  readonly username$ = this.select(
    this.user$.pipe(filter((user): user is IUser => !!user)),
    (user) => user.username
  );

  readonly isAuthenticated$ = this.select(
    this.status$.pipe(filter((status) => status !== 'idle')),
    (status) => status === 'authenticated',
    { debounce: true }
  );

  readonly auth$ = this.select(
    this.isAuthenticated$,
    this.user$,
    this.profile$,
    (isAuthenticated, user, profile) => ({ isAuthenticated, user, profile }),
    { debounce: true }
  );
  readonly updateAngularTitle = this.effect<void>(
    switchMap(() =>
      this.auth$.pipe(
        map((auth) => {
          if (auth.user?.username) {
            this._titleService.setTitle(`@${auth.user.username} - NgConduit`);
          } else {
            this._titleService.setTitle('NgConduit');
          }
        })
      )
    )
  );
  private _refresh = this.effect<void>(
    switchMap(() =>
      defer(() => {
        const token = this._localStorageService.getItem(NG_CONDUIT_TOKEN);
        // TODO: call API later
        return !token ? of(null) : this._apiClient.getCurrentUser();
      }).pipe(
        tapResponse(
          (response) => {
            this.patchState({
              user: response?.user || null,
              status: !!response ? 'authenticated' : 'unauthenticated',
            });
            this._localStorageService.setItem(
              NG_CONDUIT_USER,
              JSON.stringify(response?.user)
            );
          },
          (error) => {
            console.error('error refreshing current user: ', error);
            this.patchState({ user: null, status: 'unauthenticated' });
          }
        )
      )
    )
  );
  readonly logout = this.effect<void>(
    tap(() => {
      this._localStorageService.removeItem(NG_CONDUIT_TOKEN);
      this._localStorageService.removeItem(NG_CONDUIT_USER);
      void this._router.navigate(['/']);
      this._refresh();
    })
  );

  constructor(
    private _router: Router,
    private _apiClient: ApiClient,
    private _localStorageService: LocalStorageService,
    private _titleService: Title
  ) {
    super(initialAuthState);
  }

  init() {
    this._refresh();
  }

  authenticate(url: string[] = ['']) {
    this._refresh();
    void this._router.navigate(url);
  }
}

export const initialAuthState: IAuthState = {
  status: 'idle',
  profile: null,
  user: null,
};
