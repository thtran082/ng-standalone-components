import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: 'th-footer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-slate-100 mt-12 py-4 px-0 fixed bottom-0 w-full">
      <div class="container mx-auto px-4">
        <a class="text-blue-400 no-underline font-titillium font-bold text-base" routerLink="/">Conduit</a>
        <span class="ml-3 text-xs text-slate-400 font-light">
      <span class="">Angular 14 standalone app -&nbsp;</span>
      <a class="text-blue-400" href="https://github.com/thtran082" target="blank">thtran.082@gmail.com</a>
    </span>
      </div>
    </footer>
  `,
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
