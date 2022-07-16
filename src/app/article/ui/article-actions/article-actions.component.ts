import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IArticle } from 'src/app/shared/data-access';
import { ApiStatus } from 'src/app/shared/data-access/model';
import { SharedUiSkeletonLoadingDirective } from 'src/app/shared/ui';
import { SharedUtilsFirstWord } from 'src/app/shared/utils';
import { ArticleStore } from './../../article.store';

const ANGULAR_MODULES = [CommonModule];
const UTILS = [SharedUtilsFirstWord];
const DIRECTIVES = [SharedUiSkeletonLoadingDirective];

@Component({
  selector: 'th-article-actions',
  standalone: true,
  imports: [ANGULAR_MODULES, UTILS, DIRECTIVES],
  template: `
    <div class="flex flex-row gap-6 items-center">
      <div class="flex flex-row items-center gap-2">
        <img
          thSkeletonLoading
          [isLoaded]="status !== 'loading'"
          [source]="article?.author?.image"
          class="rounded-full h-8 w-8"
          alt=""
        />
        <div class="flex flex-col min-w-[6rem]">
          <span
            thSkeletonLoading
            [isLoaded]="status !== 'loading'"
            class="text-base leading-4 font-semibold font-source-sans-pro"
            [ngClass]="{ 'h-4 w-16 bg-gray-300': status === 'loading' }"
          >
            {{ article?.author?.username }}
          </span>
          <span
            thSkeletonLoading
            [isLoaded]="status !== 'loading'"
            class="text-gray-300 text-xs leading-4"
            [ngClass]="{ 'h-4 w-24 mt-0.5 bg-gray-300': status === 'loading' }"
          >
            {{ article?.updatedAt | date: 'mediumDate' }}
          </span>
        </div>
      </div>
      <div class="flex flex-row gap-2 h-full">
        <button secondary-outlined class="!py-0.5 !px-2">
          <i class="ion-edit mr-1"></i>
          Edit Article
        </button>
        <button danger-outlined class="!py-0.5 !px-2" (click)="deleteArticle()">
          <i class="ion-trash-a mr-1"></i>
          Delete Article
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleUiArticleActionsComponent implements OnInit {
  @Input() article!: IArticle | null;
  @Input() status: ApiStatus = 'idle';

  constructor(private _articleStore: ArticleStore) {}

  ngOnInit(): void {}

  deleteArticle() {
    if (this.article?.slug) {
      this._articleStore.deleteArticle(this.article.slug);
    }
  }
}
