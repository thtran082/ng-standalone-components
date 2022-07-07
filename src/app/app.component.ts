import { HttpClientModule } from '@angular/common/http';
import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthStore } from './shared/data-access';
import { provideAuthInterceptor } from './shared/data-access/auth.interceptor';
import { BASE_URL } from './shared/di/token';

@Component({
  selector: 'th-root',
  template: ` <router-outlet></router-outlet> `,
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent implements OnInit {
  constructor(private _authStore: AuthStore) {}

  ngOnInit(): void {
    this._authStore.init();
  }

  static bootstrap() {
    bootstrapApplication(this, {
      providers: [
        { provide: BASE_URL, useValue: environment.baseUrl },
        provideAuthInterceptor,
        importProvidersFrom(
          RouterModule.forRoot([
            {
              path: '',
              loadComponent: () =>
                import('./layout/layout.component').then(
                  (m) => m.LayoutComponent
                ),
              loadChildren: () =>
                import('./layout/layout.routes').then((m) => m.routes),
            },
          ]),
          HttpClientModule
        ),
      ],
    }).catch((e) => console.error(e));
  }
}
