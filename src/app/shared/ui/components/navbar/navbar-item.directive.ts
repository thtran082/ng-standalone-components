import { ContentChild, Directive, TemplateRef } from "@angular/core";
import { NavbarItemLinkDirective } from "./navbar-item-link.directive";

@Directive({
  selector: "[appNavbarItem]",
  standalone: true,
})
export class NavbarItemDirective {
  @ContentChild(NavbarItemLinkDirective, { static: true }) itemLink!: NavbarItemLinkDirective;

  constructor(public templateRef: TemplateRef<HTMLElement>) {
  }
}
