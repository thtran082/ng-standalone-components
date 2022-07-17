import {
  Directive,
  ElementRef,
  Input, Renderer2
} from '@angular/core';

@Directive({
  selector: '[thSkeletonLoading]',
  standalone: true,
})
export class SharedUiSkeletonLoadingDirective {
  private _initClasses = '';

  @Input() set isLoaded(isLoaded: boolean) {
    if (isLoaded) {
      this._renderer2.setAttribute(
        this._element.nativeElement,
        'class',
        this._initClasses
      );
      setTimeout(() => {
        if (this._element.nativeElement.tagName.toLowerCase() === 'img') {
          this._renderer2.setAttribute(
            this._element.nativeElement,
            'src',
            this.source || ''
          );
        }
      }, 0);
    } else {
      this._initClasses = this._element.nativeElement.className;
      switch (this._element.nativeElement.tagName.toLowerCase()) {
        case 'img':
          this._renderer2.setAttribute(
            this._element.nativeElement,
            'class',
            this._initClasses + ' animate-pulse bg-gray-300'
          );
          break;
        default:
          this._renderer2.setAttribute(
            this._element.nativeElement,
            'class',
            this._initClasses + ' animate-pulse rounded-md'
          );
          break;
      }
    }
  }

  @Input() source?: string;

  constructor(
    private _element: ElementRef<HTMLElement>,
    private _renderer2: Renderer2
  ) {
    this._initClasses = this._element.nativeElement.className;
  }
}
