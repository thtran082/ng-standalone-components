import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../shared/ui/components/navbar/navbar.component";
import { NavbarItemDirective } from "../shared/ui/components/navbar/navbar-item.directive";
import { NavbarItemLinkDirective } from "../shared/ui/components/navbar/navbar-item-link.directive";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent, NavbarItemDirective, NavbarItemLinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full h-screen">
      <app-navbar>
        <ng-template appNavbarItem>home</ng-template>
        <ng-template appNavbarItem>
          <ng-template appNavbarItemLink link="/setting">
            <i class="ion-gear-b"></i>&nbsp;
            <span>Settings</span>
          </ng-template>
        </ng-template>
        <ng-template appNavbarItem>Huy Tran Thanh</ng-template>
      </app-navbar>
    </div>
  `,
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
