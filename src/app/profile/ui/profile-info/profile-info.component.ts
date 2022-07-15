import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ApiStatus, IProfile } from './../../../shared/data-access/model';
import { SharedUiLoadingComponent } from './../../../shared/ui/loading/loading.component';

const ANGULAR_MODULES = [CommonModule];
const COMPONENTS = [SharedUiLoadingComponent];

@Component({
  selector: 'th-profile-info',
  standalone: true,
  imports: [ANGULAR_MODULES, COMPONENTS],
  template: `
    <div class="pt-8 pb-4 bg-gray-100 text-center min-h-[17.125rem] flex items-center">
      <div class="container mx-auto flex flex-col items-center justify-center gap-4">
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
              <button secondary-outlined class="!py-1">
                <i class="ion-gear-a mr-1"></i>
                Edit profile
              </button>
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
export class ProfileUiProfileInfoComponent implements OnInit {
  @Input() profile!: IProfile | null;
  @Input() status: ApiStatus = 'idle';

  constructor() {}

  ngOnInit(): void {}
}
