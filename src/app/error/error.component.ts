import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthLayoutComponent } from "../shared/ui";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-error",
  standalone: true,
  imports: [CommonModule, AuthLayoutComponent, RouterModule],
  template: `
    <app-auth-layout>
      <div class="container">
        <h1 class="text-danger">404</h1>
        <h3><em>File not found</em></h3>
        <a routerLink="/" class="btn btn-lg btn-primary pull-xs-right text-uppercase">home</a>
      </div>
    </app-auth-layout>
  `,
})
export class ErrorComponent {
}
