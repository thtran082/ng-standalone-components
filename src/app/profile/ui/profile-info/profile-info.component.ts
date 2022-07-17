import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileStore } from '../../profile.store';
import { ApiStatus, IProfile } from './../../../shared/data-access';
import { SharedUiLoadingComponent } from './../../../shared/ui';

const ANGULAR_MODULES = [CommonModule, RouterModule];
const COMPONENTS = [SharedUiLoadingComponent];

@Component({
  selector: 'th-profile-info',
  standalone: true,
  imports: [ANGULAR_MODULES, COMPONENTS],
  template: `
    <div
      class="pt-8 pb-4 bg-gray-100 text-center min-h-[17.125rem] flex items-center"
    >
      <div
        class="container mx-auto flex flex-col items-center justify-center gap-4  max-w-screen-lg"
      >
        <ng-container *ngIf="status !== 'loading'; else loading">
          <ng-container *ngIf="profile">
            <img
              [src]="profile.image"
              width="100"
              height="100"
              class="rounded-full"
              alt="no image"
            />
            <div class="flex flex-col gap-2">
              <span class="text-3xl font-bold font-source-sans-pro">
                {{ profile.username }}
              </span>
              <span class="text-gray-400 font-thin font-source-sans-pro">
                {{ profile.bio }}
              </span>
            </div>
            <div class="w-full flex justify-end">
              <ng-container *ngIf="isMe; else followButton">
                <button class="secondary-outlined !py-1" routerLink="/settings">
                  <i class="ion-gear-a mr-1"></i>
                  Edit profile
                </button>
              </ng-container>

              <ng-template #followButton>
                <ng-container *ngIf="profile.following; else doFollowing">
                  <button class="danger !py-1" (click)="toggleFollow.emit()">
                    <i class="ion-minus-round mr-1"></i>
                    Unfollow {{ profile.username }}
                  </button>
                </ng-container>

                <ng-template #doFollowing>
                  <button
                    class="danger-outlined !py-1"
                    (click)="toggleFollow.emit()"
                  >
                    <i class="ion-plus-round mr-1"></i>
                    Follow {{ profile.username }}
                  </button>
                </ng-template>
              </ng-template>
            </div>
          </ng-container>
        </ng-container>
        <ng-template #loading>
          <span class="text-gray-400 font-thin text-sm">One moment</span>
          <th-loading></th-loading>
        </ng-template>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileUiProfileInfoComponent {
  @Input() profile!: IProfile | null;
  @Input() status: ApiStatus = 'idle';
  @Input() isMe: boolean = false;

  @Output() toggleFollow = new EventEmitter<void>();

  constructor(private _profileStore: ProfileStore) {}
}
