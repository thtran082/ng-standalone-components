import { Component, ContentChildren, QueryList } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarItemDirective } from "./navbar-item.directive";
import { RouterModule } from "@angular/router";
import { NavbarItemLinkDirective } from "./navbar-item-link.directive";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, NavbarItemDirective, NavbarItemLinkDirective, RouterModule],
  template: `
    <nav class="w-full py-3 bg-green-100">
      <ul class="flex flex-row gap-4">
        <li *ngFor="let item of items"
            class="text-[#ccc] cursor-pointer capitalize font-titillium hover:text-black hover:font-semibold">
          <ng-container *ngIf="item">
            <ng-template [ngTemplateOutlet]="item.templateRef">
            </ng-template>
            <a *ngIf="item.itemLink" [routerLink]="item.itemLink.link" routerLinkActive="active">
              <ng-template [ngTemplateOutlet]="item.itemLink.templateRef">
              </ng-template>
            </a>
          </ng-container>
        </li>
      </ul>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent {
  @ContentChildren(NavbarItemDirective) items!: QueryList<NavbarItemDirective>;
}
