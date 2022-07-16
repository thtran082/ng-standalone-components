import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { IProfile } from './../shared/data-access/model';
import { ProfileStore } from './profile.store';
import {
  ProfileUiArticlesToggleComponent,
  ProfileUiProfileInfoComponent
} from './ui';

const ANGULAR_MODULES = [CommonModule, RouterModule];
const COMPONENTS = [
  ProfileUiProfileInfoComponent,
  ProfileUiArticlesToggleComponent,
];

@Component({
  selector: 'th-profile',
  standalone: true,
  imports: [ANGULAR_MODULES, COMPONENTS],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <th-profile-info
        [profile]="vm.profile"
        [status]="vm.status"
        [isMe]="vm.isMe"
        (toggleFollow)="toggleFollow(vm.profile)"
      ></th-profile-info>
      <div
        class="container page lg:max-w-screen-lg mx-auto my-4 flex flex-col"
      >
        <th-articles-toggle [username]="vm.profile?.username"></th-articles-toggle>
        <router-outlet></router-outlet>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(ProfileStore)],
})
export class ProfileComponent {
  constructor(private _profileStore: ProfileStore) {}

  readonly vm$ = this._profileStore.vm$;

  toggleFollow(profile: IProfile | null): void {
    if (profile) {
      this._profileStore.toggleFollow(profile);
    }
  }
}
