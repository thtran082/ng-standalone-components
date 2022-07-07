import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ApiStatus } from '../../../shared/data-access';

@Component({
  selector: 'th-tags',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rounded p-2 bg-gray-100">
      <p>Popular Tags</p>
      <div>
        <ng-container *ngIf="status !== 'loading'; else loading">
          <a
            *ngFor="let tag of tags"
            (click)="selectedTag.emit(tag)"
            class="px-2 py-1 rounded-full bg-slate-500 text-white mr-2 mb-2 inline-block cursor-pointer hover:opacity-90"
          >
            #{{ tag }}
          </a>
        </ng-container>
      </div>
      <ng-template #loading>
        <ng-content></ng-content>
      </ng-template>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeUiTagsComponent implements OnInit {
  @Input() status!: ApiStatus;
  @Input() tags: string[] = [];

  @Output() selectedTag = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
}
