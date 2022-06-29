import { Directive, Input, TemplateRef } from "@angular/core";

@Directive({
  selector: "[appNavbarItem], [app-navbar-item]",
  standalone: true,
})
export class NavbarItemDirective {
  @Input() link!: string;

  constructor(public templateRef: TemplateRef<HTMLElement>) {
  }
}
