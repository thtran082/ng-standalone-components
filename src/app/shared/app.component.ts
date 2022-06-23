import { Component, importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

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
        importProvidersFrom(
          RouterModule.forRoot(
            [
              {
                path: "",
                loadComponent: () => import("../layout/layout.component").then(m => m.LayoutComponent),
                loadChildren: () => import("../layout/layout.routes").then(m => m.routes),
              }
            ],
            {
              useHash: true
            }
          ),
          HttpClientModule
        )
      ]
    }).catch(e => console.error(e));
  }
}
