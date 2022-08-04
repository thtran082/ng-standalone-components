import { CdkMenuModule } from "@angular/cdk/menu";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation, } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthStore } from "../../../shared/data-access";
import { NavbarComponent, NavbarItemDirective, } from "../../../shared/ui";

const COMMONS = [CommonModule, RouterModule];
const MAT_MODULES = [CdkMenuModule];
const COMPONENTS = [NavbarComponent];
const DIRECTIVES = [NavbarItemDirective];

@Component({
  selector: "th-header",
  standalone: true,
  imports: [COMMONS, MAT_MODULES, COMPONENTS, DIRECTIVES],
  template: `
    <div class="container mx-auto px-4">
      <th-navbar>
        <ng-template thNavbarItem link="/">home</ng-template>
        <ng-template thNavbarItem link="/new-article">
          <i class="ion-edit"></i>
          New Article
        </ng-template>
        <ng-template thNavbarItem link="/settings">
          <i class="ion-gear-b"></i>&nbsp;
          <span>Settings</span>
        </ng-template>
      </th-navbar>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() isAuthenticated = false;
  @Input() username = "";

  constructor(private _store: AuthStore) {
  }

  ngOnInit(): void {
  }

  logout() {
    this._store.logout();
  }
}
