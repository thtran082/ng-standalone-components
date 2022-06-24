import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthStore } from "../../../shared/data-access";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-light">
      <div class="container">
        <a routerLink="/" class="navbar-brand">AppName</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <a
              class="nav-link"
              routerLink="/"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true}">
              <i class="ion-home"></i>
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
                <i class="ion-gear-b"></i>
                &nbsp;Settings
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/profile"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }">
                <i class="ion-person"></i>
                &nbsp;{{username}}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" (click)="logout()">
                logout
              </a>
            </li>
          </ng-container>
        </ul>
      </div>
    </nav>
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
