import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

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
              Home
            </a>
          </li>
          <ng-container *ngIf="isAuthenticated; else nonAuthenticated">
            is Authenticated
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
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() isAuthenticated = false;
  @Input() userName?: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
