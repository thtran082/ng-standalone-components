import { InjectionToken, Provider } from '@angular/core';
import { PROFILE_ARTICLES_TYPE } from 'src/app/shared/data-access';
import { ProfileArticleType } from './profile-article.model';

export const PROFILE_ARTICLES_DI = new InjectionToken<ProfileArticleType>(
  PROFILE_ARTICLES_TYPE
);

export const getProfileArticlesInjectionToken = (value: ProfileArticleType): Provider => ({
  provide: PROFILE_ARTICLES_DI,
  useValue: value,
});
