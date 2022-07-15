import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, Component,
  Input,
  OnInit
} from '@angular/core';
import { IArticle } from 'src/app/shared/data-access';
import { ApiStatus } from './../../../shared/data-access/model';
import { ArticleUiArticleActionsComponent } from './../article-actions/article-actions.component';

const ANGULAR_MODULES = [CommonModule];
const COMPONENTS = [ArticleUiArticleActionsComponent];

@Component({
  selector: 'th-article-meta',
  standalone: true,
  imports: [ANGULAR_MODULES, COMPONENTS],
  template: `
    <div class="py-8 bg-slate-700 text-white">
      <div class="container mx-auto px-4 flex flex-col gap-8">
        <ng-container *ngIf="article">
          <span class="text-5xl font-semibold font-source-sans-pro">{{article.title}}</span>
          <th-article-actions [article]="article"></th-article-actions>
        </ng-container>
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
