import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ComponentStore,
  OnStateInit,
  tapResponse
} from '@ngrx/component-store';
import { pipe, switchMap, tap } from 'rxjs';
import { ApiClient } from './../shared/data-access/api';
import { IProfileState } from './profile.state';

@Injectable()
export class ProfileStore
  extends ComponentStore<IProfileState>
  implements OnStateInit
{
  constructor(private _apiClient: ApiClient, private _route: ActivatedRoute) {
    super(initialProfileState);
  }

  readonly vm$ = this.select(
    this.select((s) => s.profile),
    this.select((s) => s.status),
    (profile, status) => ({ profile, status })
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
}

const initialProfileState: IProfileState = {
  profile: null,
  status: 'idle',
};
