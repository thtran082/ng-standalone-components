import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ApiStatus, IArticle } from 'src/app/shared/data-access';
import { SharedUiArticlePreviewComponent } from '../article-preview/article-preview.component';
import { SharedUiLoadingComponent } from '../loading/loading.component';

const ANGULAR_MODULES = [CommonModule];
const COMPONENTS = [SharedUiArticlePreviewComponent, SharedUiLoadingComponent];

@Component({
  selector: 'th-article-list',
  standalone: true,
  imports: [ANGULAR_MODULES, COMPONENTS],
  template: `
    <ng-container *ngIf="status !== 'loading'; else loading">
      <ng-container *ngIf="articles.length > 0; else noArticle">
        <th-article-preview
          *ngFor="let article of articles"
          [article]="article"
          (toggleFavorite)="toggleFavorite.emit($event)"
        >
        </th-article-preview>
      </ng-container>
    </ng-container>

    <ng-template #noArticle>
      <th-article-preview>No articles are here... yet.</th-article-preview>
    </ng-template>

    <ng-template #loading>
      <th-article-preview>
        <span>Loading articles</span>
        <th-loading class="!text-blue-500"></th-loading>
      </th-article-preview>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedUiArticleListComponent {
  @Input() articles: IArticle[] = [];
  @Input() status!: ApiStatus;

  @Output() toggleFavorite = new EventEmitter<IArticle>();

  ngOnChanges(): void {}
}
