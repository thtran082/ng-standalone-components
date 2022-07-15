import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IArticle } from 'src/app/shared/data-access';
import { SharedUtilsFirstWord } from 'src/app/shared/utils';
import { ApiStatus } from './../../../shared/data-access/model';
import { ArticleStore } from './../../article.store';

const ANGULAR_MODULES = [CommonModule];
const UTILS = [SharedUtilsFirstWord];

@Component({
  selector: 'th-article-actions',
  standalone: true,
  imports: [ANGULAR_MODULES, UTILS],
  template: `
    <div *ngIf="article" class="flex flex-row gap-6 items-center">
      <div class="flex flex-row items-center gap-2">
        <ng-container *ngIf="status !== 'loading'; else loadingAvatar">
          <img
            [src]="article?.author?.image"
            class="rounded-full h-8 w-8"
            alt="no image"
          />
        </ng-container>
        <div class="flex flex-col">
          <span class="text-base leading-4 font-semibold font-source-sans-pro">
            {{ article?.author?.username }}
          </span>
          <span class="text-gray-300 text-xs leading-4">
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

    <ng-template #loadingAvatar>
      <div class="h-8 w-8 bg-gray-300 text-white relative rounded-full"></div>
    </ng-template>
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
