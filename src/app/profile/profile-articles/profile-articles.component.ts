import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { provideComponentStore } from "@ngrx/component-store";
import { SharedUiArticleListComponent } from "src/app/shared/ui";
import { IArticle } from "../../shared/data-access";
import { ProfileArticlesStore } from "./profile-articles.store";

const COMMONS = [NgIf, AsyncPipe];
const COMPONENTS = [SharedUiArticleListComponent];

@Component({
  selector: 'th-profile-articles',
  standalone: true,
  imports: [COMMONS, COMPONENTS],
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
  readonly vm$ = this._profileArticleStore.vm$;

  constructor(private _profileArticleStore: ProfileArticlesStore) {
  }

  toggleFavorite(article: IArticle): void {
    this._profileArticleStore.toggleFavorite(article);
  }
}
