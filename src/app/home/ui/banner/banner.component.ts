import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IUser } from './../../../shared/data-access/model';

@Component({
  selector: 'th-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-blue-400 text-white p-8 text-center flex flex-col gap-4">
      <ng-container *ngIf="user; else default">
        <img *ngIf="user.image" class="rounded-full mx-auto" width="100" height="100" [src]="user.image" alt="" />
        <span class="!text-5xl !font-extrabold text-shadow">
          {{ user?.username ? 'Welcome, ' + user?.username : 'NgConduit' }}
        </span>
      </ng-container>
      <span class="text-lg font-thin">
        Realworld Conduit clone, rewrite with Angular v14 beta standalone
        components
      </span>
    </div>

    <ng-template #default>
      <h1 class="!text-5xl !font-extrabold text-shadow">NgConduit</h1>
    </ng-template>
  `,
  styles: [
    `
      .text-shadow {
        text-shadow: 0 1px 3px rgb(0, 0, 0, 30%);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeUiBannerComponent implements OnInit {
  @Input() user: IUser | null = null;
  constructor() {}

  ngOnInit(): void {}
}
