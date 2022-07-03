import { CdkMenuModule, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, ContentChildren, QueryList } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../../data-access';
import { NavbarItemDirective } from './navbar-item.directive';

const ANGULAR_MODULES = [CommonModule, RouterModule];
const MAT_MODULES = [CdkMenuModule];
const DIRECTIVES = [NavbarItemDirective];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ANGULAR_MODULES, MAT_MODULES, DIRECTIVES],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @ContentChildren(NavbarItemDirective) items!: QueryList<NavbarItemDirective>;
  readonly auth$ = this._authStore.auth$;
  isMenuOpen = false;

  constructor(private _authStore: AuthStore) {}

  openMenu(menuTrigger: CdkMenuTrigger): void {
    if (!this.isMenuOpen) {
      menuTrigger.open();
    }
    this.isMenuOpen = true;
  }

  closeMenu(menuTrigger: CdkMenuTrigger): void {
    if (!this.isMenuOpen) {
      menuTrigger.close();
    }
  }

  logout(): void {
    this._authStore.logout();
  }
}
