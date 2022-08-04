import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthStore } from "../shared/data-access";
import { AuthLayoutComponent } from "../shared/ui";
import { FooterComponent } from "./ui/footer/footer.component";
import { HeaderComponent } from "./ui/header/header.component";

const COMPONENTS = [HeaderComponent, FooterComponent, AuthLayoutComponent];

const COMMONS = [RouterModule, AsyncPipe, NgIf, AsyncPipe];

@Component({
  selector: "th-layout",
  standalone: true,
  template: `
    <ng-container *ngIf="auth$ | async as auth">
      <th-header [isAuthenticated]="auth.isAuthenticated" [username]="auth.user?.username || ''"></th-header>
      <th-auth-layout *ngIf="auth.isAuthenticated; else nonAuthenticated">
        <router-outlet></router-outlet>
      </th-auth-layout>
      <th-footer></th-footer>
    </ng-container>

    <ng-template #nonAuthenticated>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [COMPONENTS, COMMONS],
})
export class LayoutComponent implements OnInit {
  readonly auth$ = this._authStore.auth$;

  constructor(private _authStore: AuthStore) {
  }

  ngOnInit(): void {
  }
}
