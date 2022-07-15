import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { SharedUiArticleListComponent } from 'src/app/shared/ui';
import { IArticle } from './../../shared/data-access/model';
import { ProfileArticlesStore } from './profile-articles.store';

const ANGULAR_MODULES = [CommonModule];
const COMPONENTS = [SharedUiArticleListComponent];

@Component({
  selector: 'th-profile-articles',
  standalone: true,
  imports: [ANGULAR_MODULES, COMPONENTS],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <th-article-list
        [articles]="vm.articles"
        [status]="vm.status"
        (toggleFavorite)="toggleFavorite($event)"
      ></th-article-list>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(ProfileArticlesStore)],
})
export class ProfileArticlesComponent {
  constructor(private _profileArticleStore: ProfileArticlesStore) {}

  readonly vm$ = this._profileArticleStore.vm$;

  toggleFavorite(article: IArticle): void {
    this._profileArticleStore.toggleFavorite(article);
  }
}
