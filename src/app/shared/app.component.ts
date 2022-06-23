import { Component, importProvidersFrom, OnInit } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { BASE_URL } from "./di/token";
import { AuthStore } from "./data-access";

@Component({
  selector: "app-root",
  template: `
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent implements OnInit {
  constructor(private _authStore: AuthStore) {
  }

  ngOnInit(): void {
    this._authStore.init();
  }

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
