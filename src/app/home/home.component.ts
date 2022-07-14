import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { provideComponentStore } from "@ngrx/component-store";
import { IArticle } from "src/app/shared/data-access";
import { HomeStore } from "./home.store";
import {
  HomeUiArticleListComponent,
  HomeUiArticlePreviewComponent,
  HomeUiBannerComponent,
  HomeUiFeedToggleComponent,
  HomeUiTagsComponent
} from "./ui";

const ANGULAR_MODULES = [CommonModule];
const COMPONENTS = [
  HomeUiTagsComponent,
  HomeUiBannerComponent,
  HomeUiFeedToggleComponent,
  HomeUiArticleListComponent,
  HomeUiArticlePreviewComponent,
];

@Component({
  selector: 'th-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [ANGULAR_MODULES, COMPONENTS],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [provideComponentStore(HomeStore)],
})
export class HomeComponent {
  readonly vm$ = this._homeStore.vm$;

  constructor(private _homeStore: HomeStore) {}

  toggleFavorite(article: IArticle) {
    this._homeStore.toggleFavorite(article);
  }

  selectFeed(): void {
    this._homeStore.getArticles('feed');
  }

  selectGlobal(): void {
    this._homeStore.getArticles('global');
  }

  selectTag(tag: string) {
  this._homeStore.getArticlesByTag(tag);
  }
}
