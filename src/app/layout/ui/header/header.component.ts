import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../../shared/data-access';
import {
  NavbarComponent,
  NavbarItemDirective,
} from '../../../shared/ui/components/navbar';

const ANGULAR_MODULES = [CommonModule, RouterModule];
const MAT_MODULES = [CdkMenuModule];
const COMPONENTS = [NavbarComponent];
const DIRECTIVES = [NavbarItemDirective];

@Component({
  selector: 'th-header',
  standalone: true,
  imports: [ANGULAR_MODULES, MAT_MODULES, COMPONENTS, DIRECTIVES],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() isAuthenticated = false;
  @Input() username = '';

  constructor(private _store: AuthStore) {}

  ngOnInit(): void {}

  logout() {
    this._store.logout();
  }
}
