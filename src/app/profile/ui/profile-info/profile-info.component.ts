import { NgIf, NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ApiStatus, IProfile } from "../../../shared/data-access";
import { SharedButtonComponent, SharedUiLoadingComponent } from "../../../shared/ui";
import { ProfileStore } from "../../profile.store";

const COMMONS = [NgIf, NgTemplateOutlet, RouterModule];
const COMPONENTS = [SharedUiLoadingComponent, SharedButtonComponent];

@Component({
  selector: "th-profile-info",
  standalone: true,
  imports: [COMMONS, COMPONENTS],
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
                <button
                  th-button
                  thShape="rounded"
                  thColor="secondary"
                  thType="outlined"
                  class="!py-1"
                  routerLink="/settings"
                >
                  <i class="ion-gear-a mr-1"></i>
                  Edit profile
                </button>
              </ng-container>

              <ng-template #followButton>
                <button
                  th-button
                  [thType]="profile.following ? 'fill' : 'outlined'"
                  thColor="success"
                  thShape="rounded"
                  class="!py-1"
                  (click)="toggleFollow.emit()"
                >
                  <ng-template
                    *ngTemplateOutlet=" followAnotherUser; context: { profile: profile }"
                  ></ng-template>
                </button>
              </ng-template>
            </div>
          </ng-container>
        </ng-container>

        <ng-template #followAnotherUser let-profile="profile">
          <i
            [class.ion-minus-round]="profile.following"
            [class.ion-plus-round]="!profile.following"
          ></i
          >&nbsp;
          <span
          >{{ profile.following ? 'Unfollow' : 'Follow' }}
            {{ profile.username }}</span
          >
        </ng-template>

        <ng-template #loading>
          <div class="w-[6.25rem] h-[6.25rem] bg-gray-400 rounded-full animate-pulse"></div>
          <div class="flex flex-col justify-center items-center gap-2">
            <div class="h-[2.25rem] w-56 bg-gray-400 animate-pulse"></div>
            <div class="h-4 w-[22rem] bg-gray-400 animate-pulse"></div>
          </div>
          <button
            th-button
            thColor="transparent"
            thShape="rounded"
            thStatus="loading"
            class="!py-1 ml-auto w-32"
            (click)="toggleFollow.emit()"
          >
          </button>
        </ng-template>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileUiProfileInfoComponent {
  @Input() profile!: IProfile | null;
  @Input() status: ApiStatus = "idle";
  @Input() isMe: boolean = false;

  @Output() toggleFollow = new EventEmitter<void>();

  constructor(private _profileStore: ProfileStore) {
  }
}
