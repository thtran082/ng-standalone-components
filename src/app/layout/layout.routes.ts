import { Routes } from "@angular/router";
import { NonAuthGuard } from "../shared/data-access";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("../home/home.component").then(m => m.HomeComponent)
  },
  {
    path: "login",
    canLoad: [NonAuthGuard],
    canActivate: [NonAuthGuard],
    loadComponent: () => import('../login/login.component').then(m => m.LoginComponent)
  }
];
