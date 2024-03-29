import { NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { IUser } from "../../../shared/data-access";

@Component({
  selector: 'th-banner',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="bg-blue-400 text-slate-100 p-8 text-center flex flex-col gap-4">
      <ng-container *ngIf="user; else default">
        <img class="rounded-full mx-auto" width="100" height="100" [src]="user.image || defaultImage" alt="" />
        <span class="!text-5xl !font-extrabold text-shadow">
          {{ user.username ? 'Welcome, ' + user.username : 'NgConduit' }}
        </span>
      </ng-container>
      <span class="text-lg font-thin">
        Inspired by Realworld Conduit, rewrite with Angular v14 beta standalone
        components
      </span>
    </div>

    <ng-template #default>
      <h1 class="!text-5xl !font-extrabold text-shadow font-serif">Ng-Conduit</h1>
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

  readonly defaultImage = 'https://api.realworld.io/images/smiley-cyrus.jpeg';

  constructor() {}

  ngOnInit(): void {}
}
