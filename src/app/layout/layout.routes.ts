import { Routes } from "@angular/router";
import { NonAuthGuard } from "../shared/data-access";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("../home/home.component").then(m => m.HomeComponent)
  },
  {
    path: "login",
    canActivate: [NonAuthGuard],
    canLoad: [NonAuthGuard],
    loadComponent: () => import("../login/login.component").then(m => m.LoginComponent)
  },
  {
    path: "**",
    redirectTo: "/not-found",
    pathMatch: "full"
  },
  {
    path: "not-found",
    canActivate: [NonAuthGuard],
    canLoad: [NonAuthGuard],
    loadComponent: () => import("../error/error.component").then(m => m.ErrorComponent),
  }
];
