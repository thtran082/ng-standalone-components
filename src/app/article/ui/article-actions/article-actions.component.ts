import { DatePipe, NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IArticle } from 'src/app/shared/data-access';
import { ApiStatus } from 'src/app/shared/data-access/model';
import {
  SharedButtonComponent,
  SharedUiSkeletonLoadingDirective
} from 'src/app/shared/ui';
import { SharedUtilsFirstWord } from 'src/app/shared/ui/pipes';
import { ArticleStore } from '../../article.store';

const COMMONS = [NgIf, NgClass, NgTemplateOutlet, DatePipe, RouterModule];
const COMPONENTS = [SharedButtonComponent];
const UTILS = [SharedUtilsFirstWord];
const DIRECTIVES = [SharedUiSkeletonLoadingDirective];

@Component({
  selector: 'th-article-actions',
  standalone: true,
  imports: [COMMONS, UTILS, DIRECTIVES, COMPONENTS],
  template: `
    <div class="flex flex-row gap-6 items-center">
      <div class="flex flex-row items-center gap-2">
        <img
          thSkeletonLoading
          [isLoaded]="!isLoading"
          [source]="article?.author?.image"
          class="rounded-full h-8 w-8"
          alt=""
        />
        <div class="flex flex-col min-w-[6rem]">
          <span
            thSkeletonLoading
            [isLoaded]="!isLoading"
            class="text-base leading-4 font-semibold font-source-sans-pro"
            [ngClass]="{ 'h-4 w-16 bg-gray-300': isLoading }"
            [routerLink]="'/profile/' + article?.author?.username"
          >
            {{ article?.author?.username }}
          </span>
          <span
            thSkeletonLoading
            [isLoaded]="!isLoading"
            class="text-gray-300 text-xs leading-4"
            [ngClass]="{ 'h-4 w-24 mt-0.5 bg-gray-300': isLoading }"
          >
            {{ article?.updatedAt | date: 'mediumDate' }}
          </span>
        </div>
      </div>
      <div *ngIf="!isLoading" class="flex flex-row gap-2 h-full">
        <ng-container *ngIf="isOwner; else notOwner">
          <button
            th-button
            thType="outlined"
            thShape="rounded"
            thColor="secondary"
            class="!py-0.5 !px-2 text-sm"
          >
            <i class="ion-edit mr-1"></i>
            Edit Article
          </button>
          <button
            th-button
            thType="outlined"
            thShape="rounded"
            thColor="danger"
            class=" !py-0.5 !px-2 text-sm"
            f
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
          th-button
          thColor="success"
          thShape="rounded"
          [thType]="article?.author?.following ? 'fill' : 'outlined'"
          class="!py-0.5 !px-2 text-sm"
          (click)="toggleFollow()"
        >
          <ng-template
            *ngTemplateOutlet="
              followProfile;
              context: {
                following: article?.author?.following,
                username: article?.author?.username
              }
            "
          ></ng-template>
        </button>
        <button
          th-button
          thColor="hard-danger"
          thShape="rounded"
          [thType]="article?.favorited ? 'fill' : 'outlined'"
          class="!py-0.5 !px-2 text-sm"
          (click)="toggleFavorite()"
        >
          <i class="ion-heart mr-1"></i>
          <span>{{ article?.favorited ? 'favorited' : 'favorite' }}</span
          >&nbsp;
          <em>({{ article?.favoritesCount }})</em>
        </button>
      </ng-container>
    </ng-template>

    <ng-template
      #followProfile
      let-username="username"
      let-following="following"
    >
      <i
        class="mr-1"
        [class.ion-plus-round]="!following"
        [class.ion-minus-round]="following"
      ></i>
      {{ !following ? 'Follow' : 'Unfollow' }} {{ article?.author?.username }}
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleUiArticleActionsComponent {
  @Input() article!: IArticle | null;
  @Input() status: ApiStatus = 'idle';
  @Input() isOwner = false;

  constructor(private _articleStore: ArticleStore) {}

  get isLoading() {
    return this.status === 'loading';
  }

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
