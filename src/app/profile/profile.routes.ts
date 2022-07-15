import { Routes } from '@angular/router';
import { getProfileArticlesInjectionToken } from '.';

export const ProfileRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./profile.component').then((m) => m.ProfileComponent),
    children: [
      {
        path: '',
        providers: [getProfileArticlesInjectionToken('all')],
        loadComponent: () =>
          import('./profile-articles/profile-articles.component').then(
            (m) => m.ProfileArticlesComponent
          ),
      },
      {
        path: 'favorites',
        providers: [getProfileArticlesInjectionToken('favorites')],
        loadComponent: () =>
          import('./profile-articles/profile-articles.component').then(
            (m) => m.ProfileArticlesComponent
          ),
      },
    ],
  },
];
