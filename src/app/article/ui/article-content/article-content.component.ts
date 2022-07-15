import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'th-article-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      article-content works!
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleUiArticleContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
