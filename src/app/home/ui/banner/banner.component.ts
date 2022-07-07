import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'th-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-blue-400 text-white gap-4 p-8 text-center">
      <h1 class="!text-5xl !font-extrabold text-shadow">conduit</h1>
      <p class="text-lg font-thin">A place to share your knowledge.</p>
    </div>
  `,
  styles: [
    `
      .text-shadow {
        text-shadow: 0 1px 3px rgb(0, 0, 0, 30%);
      }
    `,
  ],
})
export class HomeUiBannerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
