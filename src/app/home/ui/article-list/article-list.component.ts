import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ApiStatus, Article } from 'src/app/shared/data-access';
import { HomeUiArticlePreviewComponent } from './../article-preview/article-preview.component';

@Component({
  selector: 'th-article-list',
  standalone: true,
  imports: [CommonModule, HomeUiArticlePreviewComponent],
  template: `
  <ng-container *ngIf="status !== 'loading';else loading">
    <th-article-preview *ngFor="let article of articles" [article]="article">
    </th-article-preview>
  </ng-container>

  <ng-template  #loading>
  <th-article-preview>
      Loading Articles...
    </th-article-preview>
  </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeUiArticleListComponent {
  @Input() articles: Article[] = [];
  @Input() status!: ApiStatus;

  ngOnChanges(): void {
    console.log(this.articles);
  }
}
