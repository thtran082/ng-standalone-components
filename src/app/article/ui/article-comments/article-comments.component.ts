import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'th-article-comments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      article-comments works!
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleUiArticleCommentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
