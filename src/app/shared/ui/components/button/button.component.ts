import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export type ButtonType = 'fill' | 'outlined';

@Component({
  selector: 'button[thButton], button[th-button]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedButtonComponent implements OnInit, OnChanges {
  @Input() buttonType: ButtonType = 'fill';
  @Input() color: ThemePalette = 'primary';

  constructor(
    public elementRef: ElementRef<HTMLButtonElement>,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._processTransformButton();
  }

  ngOnChanges(): void {
    this._processTransformButton();
  }

  private _processTransformButton(): void {}
}
