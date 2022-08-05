import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, ContentChildren, QueryList } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../../data-access';
import { NavbarItemDirective } from './navbar-item.directive';

const COMMONS = [CommonModule, RouterModule];
const MAT_MODULES = [CdkMenuModule];
const DIRECTIVES = [NavbarItemDirective];

@Component({
  selector: 'th-navbar',
  standalone: true,
  imports: [COMMONS, MAT_MODULES, DIRECTIVES],
  template: `
    <ng-container *ngIf="auth$ | async as auth">
      <nav class="w-full h-20 flex flex-row justify-between items-center">
        <a class="no-underline text-slate-900 font-bold text-2xl font-serif" routerLink="/"
          >Ng-Conduit</a
        >
        <ul class="flex flex-row gap-4 items-center">
          <ng-container *ngIf="auth.isAuthenticated; else nonAuthenticated">
            <li
              *ngFor="let item of items"
              class="cursor-pointer capitalize font-titillium hover:text-black hover:font-semibold text-slate-400"
            >
              <a
                [routerLinkActiveOptions]="{ exact: true }"
                [routerLink]="item.link"
                routerLinkActive="active"
              >
                <ng-template
                  [ngTemplateOutlet]="item.templateRef"
                ></ng-template>
              </a>
            </li>
            <li
              class="cursor-pointer capitalize font-titillium hover:text-black hover:font-semibold text-slate-400"
            >
              <a [cdkMenuTriggerFor]="menu">
                <img
                  [src]="auth.user?.image || defaultImage"
                  class="rounded-full hover:opacity-80"
                  height="30"
                  width="30"
                />
              </a>
            </li>
          </ng-container>
        </ul>
      </nav>

      <ng-template #menu>
        <div
          cdkMenu
          class="w-[19rem] flex flex-col shadow-lg rounded-md border border-[rgba(0,0,0,0.1)] bg-white p-3 mt-2"
        >
          <a
            [routerLink]="'/profile/' + auth.user?.username"
            cdkMenuItem
            class="p-2 hover:bg-gray-100 rounded-md flex flex-row items-center gap-2"
            routerLinkActive="active"
          >
            <img
              [src]="auth.user?.image || defaultImage"
              alt=""
              class="rounded-full hover:opacity-80"
              height="36"
              width="36"
            />
            <span>{{ auth.user?.username }}</span>
          </a>
          <a
            (click)="logout()"
            cdkMenuItem
            class="p-2 hover:bg-gray-100 rounded-md flex flex-row items-center gap-2"
          >
            <i
              class="ion-android-exit px-[9px] py-0.5 rounded-full bg-gray-300 text-2xl"
            ></i>
            <span>Log Out</span>
          </a>
          <span class="p-2 text-sm text-gray-400">
            ng-conduit
            <span> · </span>
            rewrite by angular
            <span> · </span>
            forked from
            <a
              class="underline italic hover:!text-blue-400"
              href="https://github.com/gothinkster/realworld"
            >
              gothinkster/realworld
              <i class="ion-link absolute -rotate-45 pl-0.5"></i>
            </a>
          </span>
        </div>
      </ng-template>

      <ng-template #nonAuthenticated>
        <li class="font-titillium animate-bounce">
          <a
          [routerLinkActiveOptions]="{ exact: true }"
          routerLink="/login"
          routerLinkActive="active"
          >
          Sign In
          </a>
        </li>
        <li class="font-titillium">
          <a
            [routerLinkActiveOptions]="{ exact: true }"
            routerLink="/register"
            routerLinkActive="active"
          >
            Sign Up
          </a>
        </li>
      </ng-template>
    </ng-container>
  `,
})
export class NavbarComponent {
  @ContentChildren(NavbarItemDirective) items!: QueryList<NavbarItemDirective>;
  readonly auth$ = this._authStore.auth$;
  readonly defaultImage = 'https://api.realworld.io/images/smiley-cyrus.jpeg';

  constructor(private _authStore: AuthStore) {}

  logout(): void {
    this._authStore.logout();
  }
}
