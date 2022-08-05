import { OverlayModule } from '@angular/cdk/overlay';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../shared/data-access';
import { AuthLayoutComponent } from '../shared/ui';
import { FooterComponent } from './ui/footer/footer.component';
import { HeaderComponent } from './ui/header/header.component';

const COMPONENTS = [HeaderComponent, FooterComponent, AuthLayoutComponent];

const CDK = [OverlayModule];

const COMMONS = [RouterModule, AsyncPipe, NgIf, AsyncPipe];

@Component({
  selector: 'th-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [COMPONENTS, COMMONS, CDK],
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
})
export class LayoutComponent {
  readonly auth$ = this._authStore.auth$;

  constructor(private _authStore: AuthStore) {
  }

}
