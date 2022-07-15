import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { provideComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs';
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
];

@Component({
  selector: 'th-article',
  standalone: true,
  imports: [ANGULAR_MODULES, COMPONENTS],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <th-article-meta [article]="vm.article" [status]="vm.articleStatus"></th-article-meta>
      <div class="container page lg:max-w-screen-lg mx-auto my-4">
        <th-article-content></th-article-content>
        <th-article-actions [article]="vm.article" [status]="vm.articleStatus"></th-article-actions>
        <hr>
        <th-article-comments></th-article-comments>
      </div>
    </ng-container>
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
  ) {
  }
}
