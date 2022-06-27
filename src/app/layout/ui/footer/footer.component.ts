import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-[#f3f3f3] mt-12 py-4 px-0 absolute bottom-0 w-full">
      <div class="container mx-auto px-4">
        <a class="text-[#5cb85c] no-underline font-titillium font-bold text-base" routerLink="/">MyBlog</a>
        <span class="ml-3 text-xs text-[#bbb] font-light">
          <span class="">Angular 14 standalone app -&nbsp;</span>
          <a class="text-[#5cb85c]" href="https://github.com/thtran082" target="blank">thtran.082@gmail.com</a>
        </span>
      </div>
    </footer>
  `,
})
export class FooterComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
