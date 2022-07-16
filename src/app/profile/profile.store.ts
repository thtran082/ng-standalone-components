import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ComponentStore,
  OnStateInit,
  tapResponse
} from '@ngrx/component-store';
import { exhaustMap, iif, pipe, switchMap, tap } from 'rxjs';
import { AuthStore, IProfile } from '../shared/data-access';
import { ApiClient } from './../shared/data-access/api';
import { IProfileState } from './profile.state';

@Injectable()
export class ProfileStore
  extends ComponentStore<IProfileState>
  implements OnStateInit
{
  constructor(
    private _apiClient: ApiClient,
    private _route: ActivatedRoute,
    private _authStore: AuthStore
  ) {
    super(initialProfileState);
  }

  readonly vm$ = this.select(
    this.select((s) => s.profile),
    this.select((s) => s.status),
    this._authStore.auth$,
    (profile, status, auth) => ({
      profile,
      status,
      isMe: auth.user?.username === profile?.username,
    })
  );

  readonly username$ = this.select(
    this._route.params,
    (params) => params['username'] as string
  );

  ngrxOnStateInit(): void {
    this.getProfile(this.username$);
  }

  readonly getProfile = this.effect<string>(
    pipe(
      tap(() => this.patchState({ status: 'loading' })),
      switchMap((username) =>
        this._apiClient.getProfile(username).pipe(
          tapResponse(
            ({ profile }) => {
              this.patchState({ status: 'success', profile });
            },
            (error) => {
              this.patchState({ status: 'error' });
              console.error(`error getting ${username} profile`, error);
            }
          )
        )
      )
    )
  );

  readonly toggleFollow = this.effect<IProfile>(
    pipe(
      exhaustMap((profile) =>
        iif(
          () => profile.following,
          this._apiClient.unfollowUser(profile.username),
          this._apiClient.followUser(profile.username)
        ).pipe(
          tapResponse(
            ({ profile }) => {
              this.patchState({ profile });
            },
            (error) => {
              console.error(
                'error follow/unfollow user ${profile.username}',
                error
              );
            }
          )
        )
      )
    )
  );
}

const initialProfileState: IProfileState = {
  profile: null,
  status: 'idle',
};
