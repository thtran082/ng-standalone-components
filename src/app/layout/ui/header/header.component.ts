import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthStore } from "../../../shared/data-access";
import { CdkMenuModule } from "@angular/cdk/menu";

const COMMON_MODULES = [CommonModule, RouterModule];

const MAT_MODULES = [CdkMenuModule];

@Component({
  selector: "app-header",
  standalone: true,
  imports: [COMMON_MODULES, MAT_MODULES],
  template: `
    <nav class="bg-white">
      <div class="container mx-auto my-4 flex flex-row justify-between items-center">
        <a routerLink="/" class="no-underline text-[#5cb85c] font-bold text-base">MyBlog</a>
        <ul class="flex flex-row gap-4 text-[#bbb] text-sm">
          <li class="nav-item">
            <a
              class="nav-link"
              routerLink="/"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true}">
              &nbsp;Home
            </a>
          </li>
          <ng-container *ngIf="isAuthenticated; else nonAuthenticated">
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/setting"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }">
                &nbsp;Settings
              </a>
            </li>
            <li class="nav-item">
              <a
                [cdkMenuTriggerFor]="menu"
                class="nav-link"
                routerLink="/profile"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }">
                <i class="ion-person"></i>
                &nbsp;{{username}}
              </a>
            </li>
          </ng-container>
        </ul>
      </div>
    </nav>
    <ng-template #menu>
      <div cdkMenu class="flex flex-col shadow-md rounded-sm mx-4 bg-white">
        <a cdkMenuItem class="px-4 py-3 capitalize text-red-300 hover:text-red-500" (click)="logout()">
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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() isAuthenticated = false;
  @Input() username = "";

  constructor(private _store: AuthStore) {
  }

  ngOnInit(): void {
  }

  logout() {
    this._store.logout();
  }
}
