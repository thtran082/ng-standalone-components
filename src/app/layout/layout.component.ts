import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from "./ui/header/header.component";
import { FooterComponent } from "./ui/footer/footer.component";
import { RouterModule } from "@angular/router";
import { AuthStore } from "../shared/data-access";

@Component({
  selector: 'app-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  imports: [
    HeaderComponent, FooterComponent, RouterModule
  ]
})
export class LayoutComponent implements OnInit {

  constructor(private _authStore: AuthStore) { }

  ngOnInit(): void {
  }

}
