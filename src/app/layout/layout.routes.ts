import { Routes } from '@angular/router';
import { AuthGuard, NonAuthGuard } from '../shared/data-access';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    canActivate: [NonAuthGuard],
    canLoad: [NonAuthGuard],
    loadComponent: () =>
      import('../login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [NonAuthGuard],
    canLoad: [NonAuthGuard],
    loadComponent: () =>
      import('../register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'profile/:username',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('../profile/profile.routes').then((m) => m.ProfileRoutes),
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadComponent: () =>
      import('../setting/setting.component').then((m) => m.SettingComponent),
  },
  {
    path: 'article/:slug',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadComponent: () =>
      import('../article/article.component').then((m) => m.ArticleComponent),
  },
  {
    path: 'new-article',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadComponent: () =>
      import('../new-article/new-article.component').then(
        (m) => m.NewArticleComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full',
  },
];
