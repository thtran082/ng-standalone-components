import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'th-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-blue-400 text-white gap-4 p-8 text-center">
      <h1 class="!text-5xl !font-extrabold text-shadow">My Blog</h1>
      <p class="text-lg font-thin">
        This project is written by Angular, forked from
        <a
          href="https://github.com/gothinkster/realworld"
          class="font-extrabold text-shadow hover:text-blue-100"
        >
          Conduit
          <i class="ion-link inline-block -rotate-45"></i>
        </a>
      </p>
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
