import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { IArticle } from "src/app/shared/data-access/model";
import { SharedUiSanitizerPipe } from "src/app/shared/ui/pipes";
import { NgForOf, NgIf } from "@angular/common";

const COMMONS = [NgForOf, NgIf];
const PIPES = [SharedUiSanitizerPipe];

@Component({
  selector: 'th-article-content',
  standalone: true,
  imports: [COMMONS, PIPES],
  template: `
    <div id="page-article-content" class="my-6 ">
      <div *ngIf="article?.body" [innerHTML]="article!.body | sanitizer"></div>
      <div class="flex flex-row gap-1 mt-6">
        <ng-container *ngFor="let tag of article?.tagList">
          <span
            class="px-2 py-1 rounded-md border border-gray-400 text-gray-400 bg-white mr-2 mb-2 inline-block text-sm italic"
          >
            <i class="ion-pricetag mr-1"></i>
            {{ tag }}
          </span>
        </ng-container>
      </div>
    </div>
  `,
  styles: [
    `
      #page-article-content {
        a {
          @apply text-green-600;
        }
        p {
          @apply leading-7 mb-4;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleUiArticleContentComponent implements OnInit {
  @Input() article: IArticle | null = null;

  constructor() {}

  ngOnInit(): void {}
}
