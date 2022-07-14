import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

@Component({
  selector: "th-feed-toggle",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mt-2 -mb-[1px]">
      <ul class="after:content-[''] table clear-both">
        <li class="float-left capitalize text-slate-400">
          <a
            class="block px-4 py-2 border-b-2 border-b-transparent"
            [ngClass]="{
              'active !border-b-blue-400': feedType === 'feed' && !selectedTag,
              'disabled': isFeedDisabled
            }"
            (click)="!isFeedDisabled && selectFeed.emit()"
          >
            your feed
          </a>
        </li>
        <li class="float-left capitalize text-slate-400">
          <a
            class="block px-4 py-2 border-b-2 border-b-transparent"
            [ngClass]="{
              'active !border-b-blue-400': feedType === 'global' && !selectedTag
            }"
            (click)="selectGlobal.emit()"
          >
            global feed
          </a>
        </li>
        <li *ngIf="selectedTag" class="float-left">
          <a
            class="block px-4 py-2 border-b-2 border-b-transparent active !border-b-blue-400"
            (click)="selectGlobal.emit()"
          >
            #{{selectedTag}}
          </a>
        </li>
      </ul>
    </div>
  `,
})
export class HomeUiFeedToggleComponent implements OnChanges {
  @Input() selectedTag?: string;
  @Input() feedType: "global" | "feed" = "global";
  @Input() isFeedDisabled = false;

  @Output() selectGlobal = new EventEmitter();
  @Output() selectFeed = new EventEmitter();

  ngOnChanges(): void {
    console.log(this.feedType);
  }
}
