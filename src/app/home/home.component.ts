import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { provideComponentStore } from "@ngrx/component-store";
import { IArticle } from "src/app/shared/data-access";
import { SharedUiArticleListComponent } from "../shared/ui";
import { HomeStore } from "./home.store";
import { HomeUiBannerComponent, HomeUiFeedToggleComponent, HomeUiTagsComponent } from "./ui";

const COMMONS = [NgIf, AsyncPipe];
const COMPONENTS = [
  HomeUiTagsComponent,
  HomeUiBannerComponent,
  HomeUiFeedToggleComponent,
  SharedUiArticleListComponent,
];

@Component({
  selector: "th-home",
  standalone: true,
  imports: [COMMONS, COMPONENTS],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [provideComponentStore(HomeStore)],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <th-banner [user]="vm.auth.user"></th-banner>
      <div class="container mx-auto mt-4 px-4">
        <div class="flex flex-row gap-8">
          <div class="flex-1">
            <div class="flex flex-col mb-14">
              <th-feed-toggle (selectFeed)="selectFeed()" (selectGlobal)="selectGlobal()" [feedType]="vm.feedType"
                              [isFeedDisabled]="!vm.isAuthenticated" [selectedTag]="vm.selectedTag"></th-feed-toggle>
              <th-article-list (toggleFavorite)="toggleFavorite($event)" [articles]="vm.articles"
                               [status]="vm.articlesStatus"></th-article-list>
            </div>
          </div>
          <th-tags (selectedTag)="selectTag($event)" [status]="vm.tagStatus" [tags]="vm.tags" class="w-1/3">
            <span>loading...</span>
          </th-tags>
        </div>
      </div>
    </ng-container>
  `,
})
export class HomeComponent {
  readonly vm$ = this._homeStore.vm$;

  constructor(private _homeStore: HomeStore) {
  }

  toggleFavorite(article: IArticle) {
    this._homeStore.toggleFavorite(article);
  }

  selectFeed(): void {
    this._homeStore.getArticles("feed");
  }

  selectGlobal(): void {
    this._homeStore.getArticles("global");
  }

  selectTag(tag: string) {
    this._homeStore.getArticlesByTag(tag);
  }
}
