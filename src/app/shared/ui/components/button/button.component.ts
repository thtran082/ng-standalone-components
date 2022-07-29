import { NgIf, NgTemplateOutlet } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { fromEvent, map } from "rxjs";
import { autoDestroy, Destroy } from "src/app/shared/utils";
import { ApiStatus, ThButtonColor, ThButtonShape, ThButtonType } from "../../../data-access";
import { SharedUiLoadingComponent } from "../../loading/loading.component";

@Component({
  selector: "button[thButton], button[th-button]",
  standalone: true,
  imports: [NgIf, NgTemplateOutlet, SharedUiLoadingComponent],
  template: `
    <span #button class="shared-button-wrapper">
      <ng-container *ngIf="thStatus !== 'loading'; else loading">
      <ng-content></ng-content>
      </ng-container>
    </span>

    <ng-template #loading>
      <span class="inline-block animate-pulse" [style.min-width]="this.originalSize + 'px'">
        <ng-container *ngIf="loadingText">{{loadingText}}</ng-container>
        <th-loading></th-loading>
      </span>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "class": "th-btn",
    "[attr.disabled]": `disabled || null`,
    "[class.th-btn-primary]": `thColor === 'primary'`,
    "[class.th-btn-danger]": `thColor === 'danger'`,
    "[class.th-btn-hard-danger]": `thColor === 'hard-danger'`,
    "[class.th-btn-secondary]": `thColor === 'secondary'`,
    "[class.th-btn-success]": `thColor === 'success'`,
    "[class.th-btn-transparent]": `thColor === 'transparent'`,
    "[class.th-btn-fill]": `thType === 'fill'`,
    "[class.th-btn-outlined]": `thType === 'outlined'`,
    "[class.th-btn-rounded]": `thShape === 'rounded'`,
  }
})
@Destroy()
export class SharedButtonComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() thType: ThButtonType = "fill";
  @Input() thColor: ThButtonColor = "primary";
  @Input() thStatus: ApiStatus = "idle";
  @Input() thShape: ThButtonShape | null = null;
  @Input() disabled: boolean = false;
  @Input() loadingText = "";

  @ViewChild("button", { static: true }) button!: ElementRef<HTMLSpanElement>;
  public originalSize: number = 0;

  constructor(private _ngZone: NgZone, private _elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this._processTransformButton();
    this._ngZone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(this._elementRef.nativeElement, "click")
        .pipe(
          map(event => {
            if (this.disabled || this.thStatus === 'loading') {
              event.preventDefault();
              event.stopImmediatePropagation();
            }
          }),
          autoDestroy(this),
        )
        .subscribe();
    });
  }

  ngAfterViewInit(): void {
    this.originalSize = this.button.nativeElement.offsetWidth;
  }

  ngOnChanges(): void {
    this._processTransformButton();
  }

  private _processTransformButton(): void {
  }
}
