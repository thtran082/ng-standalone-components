import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IArticle } from 'src/app/shared/data-access';
import { SharedUiSkeletonLoadingDirective } from 'src/app/shared/ui';
import { ApiStatus } from './../../../shared/data-access/model';
import { ArticleUiArticleActionsComponent } from './../article-actions/article-actions.component';

const ANGULAR_MODULES = [CommonModule];
const COMPONENTS = [ArticleUiArticleActionsComponent];
const DIRECTIVES = [SharedUiSkeletonLoadingDirective];

@Component({
  selector: 'th-article-meta',
  standalone: true,
  imports: [ANGULAR_MODULES, COMPONENTS, DIRECTIVES],
  template: `
    <div class="py-8 bg-slate-700 text-white min-h-[11rem]">
      <div class="container mx-auto flex flex-col gap-4 lg:max-w-screen-lg">
        <span
          thSkeletonLoading
          [isLoaded]="status !== 'loading'"
          class="text-5xl font-semibold font-source-sans-pro"
          [ngClass]="{ 'h-12 w-1/2 bg-gray-300': status === 'loading' }"
        >
          {{ article?.title }}
        </span>
        <span
          thSkeletonLoading
          [isLoaded]="status !== 'loading'"
          class="text-sm italic font-thin font-source-sans-pro"
          [ngClass]="{ 'h-5  w-1/3 bg-gray-300': status === 'loading' }"
        >
          {{ article?.description }}
        </span>
        <th-article-actions
          [article]="article"
          [status]="status"
        ></th-article-actions>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleUiArticleMetaComponent implements OnInit {
  @Input() article!: IArticle | null;
  @Input() status: ApiStatus = 'idle';

  constructor() {}

  ngOnInit(): void {}
}
