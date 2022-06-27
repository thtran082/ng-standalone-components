import { Directive, Input, TemplateRef } from "@angular/core";

@Directive({
  selector: "[appNavbarItemLink]",
  standalone: true,
})
export class NavbarItemLinkDirective {
  @Input() link = "";

  constructor(public templateRef: TemplateRef<HTMLElement>) {
  }
}
