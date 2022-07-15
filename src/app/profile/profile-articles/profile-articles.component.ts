import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ProfileArticleType } from './profile-article.model';
import { PROFILE_ARTICLES_DI } from './profile-articles.di';

@Component({
  selector: 'th-profile-articles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      profile-articles works! {{articleType}}
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileArticlesComponent {

  constructor(@Inject(PROFILE_ARTICLES_DI) public articleType: ProfileArticleType) { }

}
