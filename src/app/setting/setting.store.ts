import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { pipe, switchMap, tap } from 'rxjs';
import { ApiClient, AuthStore, IUserSettings } from './../shared/data-access';
import { ISettingState } from './setting.state';

@Injectable()
export class SettingStore extends ComponentStore<ISettingState> {
  constructor(private _authStore: AuthStore, private _apiClient: ApiClient) {
    super(initialSettingState);
  }

  readonly vm$ = this.select(
    this._authStore.user$,
    this.select((s) => s.status),
    (user, status) => ({ user, status })
  );

  readonly updateSetting = this.effect<IUserSettings>(
    pipe(
      tap(() => this.patchState({ status: 'loading' })),
      switchMap((user) => {
        const { token, ...rest } = user;
        return this._apiClient.updateSetting(rest).pipe(
          tapResponse(
            () => {
              this.patchState({ status: 'success' });
              this._authStore.authenticate(['/profile']);
            },
            (error) => {
              this.patchState({ status: 'error' });
              console.error('error updating your settings', error);
            }
          )
        );
      })
    )
  );
}

const initialSettingState: ISettingState = {
  status: 'idle',
};
