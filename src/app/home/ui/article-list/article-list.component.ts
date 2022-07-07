import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'th-article-list',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>article-list works!</p> `,
  styles: [],
})
export class HomeUiArticleListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
