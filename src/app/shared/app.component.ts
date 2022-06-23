import { Component, importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { BASE_URL } from "./di/token";

@Component({
  selector: "app-root",
  template: `
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent {
  title = "ng-standalone-components";

  static bootstrap() {
    bootstrapApplication(this, {
      providers: [
        { provide: BASE_URL, useValue: "http://localhost:4200" },
        importProvidersFrom(
          RouterModule.forRoot(
            [
              {
                path: "",
                loadComponent: () => import("../layout/layout.component").then(m => m.LayoutComponent),
                loadChildren: () => import("../layout/layout.routes").then(m => m.routes),
              }
            ]
          ),
          HttpClientModule
        )
      ]
    }).catch(e => console.error(e));
  }
}
