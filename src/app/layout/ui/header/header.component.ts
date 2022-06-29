import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthStore } from "../../../shared/data-access";
import { CdkMenuModule } from "@angular/cdk/menu";
import { NavbarComponent, NavbarItemDirective } from "../../../shared/ui/components/navbar";

const ANGULAR_MODULES = [CommonModule, RouterModule];
const MAT_MODULES = [CdkMenuModule];
const COMPONENTS = [NavbarComponent];
const DIRECTIVES = [NavbarItemDirective];

@Component({
  selector: "app-header",
  standalone: true,
  imports: [ANGULAR_MODULES, MAT_MODULES, COMPONENTS, DIRECTIVES],
  template: `
    <div class="container mx-auto">
      <app-navbar>
        <ng-template appNavbarItem link="/">home</ng-template>
        <ng-template appNavbarItem link="/setting">
          <i class="ion-gear-b"></i>&nbsp;
          <span>Settings</span>
        </ng-template>
      </app-navbar>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
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
