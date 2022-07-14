import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { ApiStatus, IArticle } from 'src/app/shared/data-access';
import { HomeUiArticlePreviewComponent } from './../article-preview/article-preview.component';

@Component({
  selector: 'th-article-list',
  standalone: true,
  imports: [CommonModule, HomeUiArticlePreviewComponent],
  template: `
    <ng-container *ngIf="status !== 'loading'; else loading">
      <th-article-preview
        *ngFor="let article of articles"
        [article]="article"
        (toggleFavorite)="toggleFavorite.emit($event)"
      >
      </th-article-preview>
    </ng-container>

    <ng-template #loading>
      <th-article-preview> Loading Articles... </th-article-preview>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeUiArticleListComponent {
  @Input() articles: IArticle[] = [];
  @Input() status!: ApiStatus;

  @Output() toggleFavorite = new EventEmitter<IArticle>();

  ngOnChanges(): void {
    console.log(this.articles);
  }
}
