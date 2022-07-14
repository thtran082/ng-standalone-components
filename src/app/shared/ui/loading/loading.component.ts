import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'th-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lds-ellipsis">
      <div class="bg-current"></div>
      <div class="bg-current"></div>
      <div class="bg-current"></div>
    </div>
  `,
  styles: [
    `
      .lds-ellipsis {
        @apply inline-block relative w-10 h-4;
      }
      .lds-ellipsis div {
        @apply absolute top-[45%] -translate-y-1/2 w-2 h-2 rounded-full;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
      }
      .lds-ellipsis div:nth-child(1) {
        @apply left-1;
        animation: lds-ellipsis1 0.6s infinite;
      }
      .lds-ellipsis div:nth-child(2) {
        @apply left-2;
        animation: lds-ellipsis2 0.6s infinite;
      }
      .lds-ellipsis div:nth-child(3) {
        @apply left-5;
        animation: lds-ellipsis2 0.6s infinite;
      }
      @keyframes lds-ellipsis1 {
        0% {
          transform: scale(0);
        }
        100% {
          transform: scale(1);
        }
      }
      @keyframes lds-ellipsis2 {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(0.5rem, 0);
        }
      }
    `,
  ],
})
export class SharedUiLoadingComponent {
}
