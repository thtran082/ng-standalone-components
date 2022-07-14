import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'th-article',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      article works!
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
