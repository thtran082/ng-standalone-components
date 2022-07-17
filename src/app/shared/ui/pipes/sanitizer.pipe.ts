import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from 'marked';

@Pipe({
  name: 'sanitizer',
  standalone: true,
})
export class SharedUiSanitizerPipe implements PipeTransform {
  constructor(private _domSanitizer: DomSanitizer) {}

  transform(value: string): string {
    return this._domSanitizer.sanitize(
      SecurityContext.HTML,
      marked(value)
    ) as string;
  }
}
