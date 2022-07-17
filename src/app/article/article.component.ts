import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { provideComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs';
import { SharedUiLoadingComponent } from './../shared/ui/loading/loading.component';
import { ArticleStore } from './article.store';
import {
  ArticleUiArticleActionsComponent,
  ArticleUiArticleCommentsComponent,
  ArticleUiArticleContentComponent,
  ArticleUiArticleMetaComponent
} from './ui';

const ANGULAR_MODULES = [CommonModule];
const COMPONENTS = [
  ArticleUiArticleMetaComponent,
  ArticleUiArticleActionsComponent,
  ArticleUiArticleCommentsComponent,
  ArticleUiArticleContentComponent,
  SharedUiLoadingComponent,
];

@Component({
  selector: 'th-article',
  standalone: true,
  imports: [ANGULAR_MODULES, COMPONENTS],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <th-article-meta
        [article]="vm.article"
        [status]="vm.articleStatus"
      ></th-article-meta>
      <div class="container page lg:max-w-screen-lg mx-auto my-4">
        <ng-container
          *ngIf="
            vm.articleStatus !== 'loading' && vm.commentsStatus !== 'loading';
            else loadingPage
          "
        >
          <th-article-content [article]="vm.article"></th-article-content>
          <hr />
          <div class="mx-auto w-fit pt-6 pb-12">
            <th-article-actions
              [article]="vm.article"
              [status]="vm.articleStatus"
            ></th-article-actions>
          </div>
          <th-article-comments></th-article-comments>
        </ng-container>
      </div>
    </ng-container>

    <ng-template #loadingPage>
      <div class="font-source-sans-pro py-6">
        <span>Please wait</span>
        <th-loading></th-loading>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(ArticleStore)],
})
export class ArticleComponent {
  readonly vm$ = this._articleStore.vm$.pipe(
    tap((vm) => {
      if (vm.article?.slug) {
        this._titleService.setTitle(`${vm.article.title} ー NgConduit`);
      }
    })
  );

  constructor(
    private _articleStore: ArticleStore,
    private _titleService: Title
  ) {}
}
