import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { ProfileStore } from './profile.store';
import { ProfileUiProfileInfoComponent } from './ui';

const ANGULAR_MODULES = [CommonModule];
const COMPONENTS = [ProfileUiProfileInfoComponent];

@Component({
  selector: 'th-profile',
  standalone: true,
  imports: [ANGULAR_MODULES, COMPONENTS],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <th-profile-info [profile]="vm.profile" [status]="vm.status"></th-profile-info>
      <div class="container page lg:max-w-screen-lg mx-auto my-4 flex flex-col gap-4">
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(ProfileStore)],
})
export class ProfileComponent implements OnInit {
  constructor(private _profileStore: ProfileStore) {}

  readonly vm$ = this._profileStore.vm$;

  ngOnInit(): void {
    console.log('init');
  }
}
