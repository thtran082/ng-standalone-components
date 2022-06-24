import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { HeaderComponent } from "./ui/header/header.component";
import { FooterComponent } from "./ui/footer/footer.component";
import { RouterModule } from "@angular/router";
import { AuthStore } from "../shared/data-access";
import { CommonModule } from "@angular/common";
import { AuthLayoutComponent } from "../shared/ui";

const COMPONENTS = [HeaderComponent, FooterComponent, AuthLayoutComponent,];

const MODULES = [RouterModule, CommonModule];

@Component({
  selector: "app-layout",
  standalone: true,
  template: `
    <ng-container *ngIf="auth$ | async as auth">
      <app-header [isAuthenticated]="auth.isAuthenticated" [username]="auth.user?.username || ''"
      ></app-header>
      <app-auth-layout *ngIf="auth.isAuthenticated; else nonAuthenticated">
        <router-outlet></router-outlet>
      </app-auth-layout>
      <app-footer></app-footer>
    </ng-container>

    <ng-template #nonAuthenticated>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [COMPONENTS, MODULES,]
})
export class LayoutComponent implements OnInit {
  readonly auth$ = this._authStore.auth$;

  constructor(private _authStore: AuthStore) {
  }

  ngOnInit(): void {
  }

}
