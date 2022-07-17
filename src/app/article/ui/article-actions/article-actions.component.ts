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
import { SharedUtilsFirstWord } from 'src/app/shared/ui/pipes';
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
        <ng-container *ngIf="isOwner; else notOwner">
          <button class="secondary-outlined !py-0.5 !px-2 text-sm">
            <i class="ion-edit mr-1"></i>
            Edit Article
          </button>
          <button
            class="danger-outlined !py-0.5 !px-2 text-sm"
            (click)="deleteArticle()"
          >
            <i class="ion-trash-a mr-1"></i>
            Delete Article
          </button>
        </ng-container>
      </div>
    </div>

    <ng-template #notOwner>
      <ng-container *ngIf="article?.author?.username">
        <button
          class="!py-0.5 !px-2 text-sm"
          [ngClass]="{
            'secondary-outlined': !article?.author?.following,
            'secondary': article?.author?.following
          }"
          (click)="toggleFollow()"
        >
          <ng-container *ngIf="article?.author?.following; else followButton">
            <i class="ion-minus-round mr-1"></i>
            Unfollow {{ article?.author?.username }}
          </ng-container>
        </button>
        <button
          class="!py-0.5 !px-2 text-sm border border-pink-600"
          [ngClass]="{
            'hover:bg-pink-600 hover:text-white': true,
            'bg-pink-600 text-white': article?.favorited,
            'text-pink-500 ': !article?.favorited
          }"
          (click)="toggleFavorite()"
        >
          <i class="ion-heart mr-1"></i>
          {{ article?.favorited ? 'favorited' : 'favorite' }}&nbsp;
          <em>({{ article?.favoritesCount }})</em>
        </button>
      </ng-container>
    </ng-template>

    <ng-template #followButton>
      <i class="ion-plus-round mr-1"></i>
      Follow {{ article?.author?.username }}
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleUiArticleActionsComponent implements OnInit {
  @Input() article!: IArticle | null;
  @Input() status: ApiStatus = 'idle';
  @Input() isOwner = false;

  constructor(private _articleStore: ArticleStore) {}

  ngOnInit(): void {}

  deleteArticle() {
    if (this.article?.slug) {
      this._articleStore.deleteArticle(this.article.slug);
    }
  }

  toggleFollow(): void {
    if (this.article) {
      this._articleStore.toggleFollow(this.article);
    }
  }

  toggleFavorite(): void {
    if (this.article) {
      this._articleStore.toggleFavorite(this.article);
    }
  }
}
