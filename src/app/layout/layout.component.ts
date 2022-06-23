import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from "./ui/header/header.component";
import { FooterComponent } from "./ui/footer/footer.component";
import { RouterModule } from "@angular/router";
import { AuthStore } from "../shared/data-access";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-layout',
  standalone: true,
  template: `
    <ng-container *ngIf="auth$ | async as auth">
      <app-header [isAuthenticated]="auth.isAuthenticated" [userName]="auth.user?.username"
      ></app-header>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent, FooterComponent, RouterModule, CommonModule,
  ]
})
export class LayoutComponent implements OnInit {
  readonly auth$ = this._authStore.auth$;

  constructor(private _authStore: AuthStore) { }

  ngOnInit(): void {
  }

}
