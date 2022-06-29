import { Component, ContentChildren, QueryList } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarItemDirective } from "./navbar-item.directive";
import { RouterModule } from "@angular/router";
import { AuthStore } from "../../../data-access";
import { CdkMenuModule, CdkMenuTrigger } from "@angular/cdk/menu";

const ANGULAR_MODULES = [CommonModule, RouterModule];
const MAT_MODULES = [CdkMenuModule];
const DIRECTIVES = [NavbarItemDirective];

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [ANGULAR_MODULES, MAT_MODULES, DIRECTIVES],
  template: `
    <nav class="w-full py-3 bg-transparent flex flex-row justify-between">
      <a routerLink="/" class="no-underline text-[#5cb85c] font-bold text-base">MyBlog</a>
      <ul class="flex flex-row gap-4">
        <ng-container *ngIf="auth$ | async as auth">
          <ng-container *ngIf="auth.isAuthenticated; else nonAuthenticated">
            <li
              *ngFor="let item of items"
              class="cursor-pointer capitalize font-titillium hover:text-black hover:font-semibold text-[#bbb]"
            >
              <a
                routerLinkActive="active"
                [routerLink]="item.link"
                [routerLinkActiveOptions]="{ exact: true}"
              >
                <ng-template [ngTemplateOutlet]="item.templateRef"></ng-template>
              </a>
            </li>
            <li class="cursor-pointer capitalize font-titillium hover:text-black hover:font-semibold text-[#bbb]">
              <a
                [cdkMenuTriggerFor]="menu"
                #menuTrigger="cdkMenuTriggerFor"
                (mouseenter)="openMenu(menuTrigger)"
                (mouseleave)="closeMenu(menuTrigger)"
                routerLink="/profile"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }">
                <i class="ion-person"></i>
                &nbsp;{{auth.user?.username}}
              </a>
              <ng-template #menu>
                <ng-template
                  [ngTemplateOutlet]="menuZone"
                  [ngTemplateOutletContext]="{$implicit: menuTrigger}"
                ></ng-template>
              </ng-template>
            </li>
          </ng-container>
        </ng-container>
      </ul>
    </nav>

    <ng-template #menuZone let-menuTrigger>
      <div
        cdkMenu
        class="flex flex-col shadow-md rounded-sm mx-4 bg-white"
        (mouseenter)="isMenuOpen = true"
        (mouseleave)="isMenuOpen = false; closeMenu(menuTrigger)"
      >
        <a
          cdkMenuItem
          class="px-4 py-3 capitalize text-red-300 hover:text-red-500 cursor-pointer"
          (click)="logout()"
        >
          <i class="ion-log-out mr-1"></i>
          sign out
        </a>
      </div>
    </ng-template>

    <ng-template #nonAuthenticated>
      <li class="nav-item">
        <a
          class="nav-link"
          routerLink="/register"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true}">
          Sign Up
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          routerLink="/login"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true}">
          Sign In
        </a>
      </li>
    </ng-template>
  `,
})
export class NavbarComponent {
  @ContentChildren(NavbarItemDirective) items!: QueryList<NavbarItemDirective>;
  readonly auth$ = this._authStore.auth$;
  isMenuOpen = false;

  constructor(private _authStore: AuthStore) {
  }

  openMenu(menuTrigger: CdkMenuTrigger): void {
    if (!this.isMenuOpen) {
      menuTrigger.open();
    }
    this.isMenuOpen = true;
  }

  closeMenu(menuTrigger: CdkMenuTrigger): void {
    if (!this.isMenuOpen) {
      menuTrigger.close();
    }
  }

  logout(): void {
    this._authStore.logout();
  }
}
