import { NgForOf, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ApiStatus } from "../../../shared/data-access";

@Component({
  selector: 'th-tags',
  standalone: true,
  imports: [NgIf, NgForOf],
  template: `
    <p class="mb-4 uppercase font-bold font-sans text-gray-600 text-sm">

      What topic do you highly interested to?
    </p>
    <div>
      <ng-container *ngIf="status !== 'loading'; else loading">
        <a
          *ngFor="let tag of tags"
          (click)="selectedTag.emit(tag)"
          class="px-2 py-1 rounded-md text-gray-400 border border-gray-400 bg-white mr-2 mb-2 inline-block"
        >
          <i class="ion-pricetag mr-1"></i>
          {{ tag }}
        </a>
      </ng-container>
    </div>
    <ng-template #loading>
      <ng-content></ng-content>
    </ng-template>
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
