import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer>
      <div class="container">
        <a class="logo-font" routerLink="/">AppName</a>
        <span class="attribution">
          <span class="capitalize">Angular 14 standalone app - learning from </span>
          <a href="https://github.com/thtran082" target="blank">thtran.082@gmail.com</a>
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
