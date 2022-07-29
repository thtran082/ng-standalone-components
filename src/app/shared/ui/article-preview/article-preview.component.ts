import { DatePipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IArticle } from "src/app/shared/data-access";
import { SharedButtonComponent } from "../components/button";
import { SharedUtilsFirstWord } from "../pipes";

const COMMONS = [NgIf, NgForOf, DatePipe, NgClass, RouterModule];
const COMPONENTS = [SharedButtonComponent];
const UTILS = [SharedUtilsFirstWord];

@Component({
  selector: 'th-article-preview',
  standalone: true,
  imports: [COMMONS, UTILS, COMPONENTS],
  template: `
    <div
      *ngIf="article; else noArticle"
      class="font-source-sans-pro border-t border-black border-opacity-10 flex flex-col gap-2 py-6"
    >
      <div class="flex flex-row justify-between">
        <div class="flex flex-row items-center gap-2">
          <ng-container *ngIf="article?.author?.image; else noAvatar">
            <img
              [src]="article.author.image"
              class="rounded-full h-8 w-8"
              alt="no image"
              [routerLink]="'/article/' + article.slug"
            />
          </ng-container>
          <ng-template #noAvatar>
            <div class="h-8 w-8 bg-blue-600 text-white relative rounded-full">
              <span
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                {{ article.author.username | thFirstWord }}
              </span>
            </div>
          </ng-template>
          <div class="flex flex-col">
            <span
              class="text-blue-600 text-base font-semibold font-source-sans-pro hover:underline"
              [routerLink]="'/profile/' + article.author.username"
            >
              {{ article.author.username }}
            </span>
            <span class="text-gray-400 text-xs">
              {{ article.updatedAt | date: 'mediumDate' }}
            </span>
          </div>
        </div>
        <button
          th-button
          [thType]="article.favorited ? 'fill' : 'outlined'"
          thColor="hard-danger"
          thShape="rounded"
          class="!px-2 !py-0 h-8"
          (click)="toggleFavorite.emit(article)"
        >
          <i class="ion-heart mr-1"></i>
          <span>{{ article.favoritesCount }}</span>
        </button>
      </div>

      <div class="flex flex-col gap-1" [routerLink]="'/article/' + article.slug">
        <span class="text-2xl font-semibold">{{ article.title }}</span>
        <span class="text-base text-gray-400 font-light">
          {{ article.description }}
        </span>
      </div>

      <div class="flex flex-row justify-between items-end">
        <a class="text-gray-400 font-light hover:!text-blue-600 hover:underline" [routerLink]="'/article/' + article.slug">
          Read more...
        </a>
        <span>
          <ng-container *ngFor="let tag of article.tagList">
            <span
              class="px-2 py-1 ml-2 rounded-md border border-gray-300 text-gray-400 inline-block"
            >
              <i class="ion-pricetag mr-1"></i>
              <span>{{ tag }}</span>
            </span>
          </ng-container>
        </span>
      </div>
    </div>
    <ng-template #noArticle>
      <div
        class="font-source-sans-pro border-t border-black border-opacity-10 py-6"
      >
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedUiArticlePreviewComponent implements OnInit {
  @Input() article?: IArticle;
  @Output() toggleFavorite = new EventEmitter<IArticle>();

  constructor() {}

  ngOnInit(): void {}
}
