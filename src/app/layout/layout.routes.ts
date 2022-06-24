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
    path: "profile",
    // canActivate: [NonAuthGuard],
    // canLoad: [NonAuthGuard],
    loadComponent: () => import("../profile/profile.component").then(m => m.ProfileComponent)
  },
  {
    path: "setting",
    // canActivate: [NonAuthGuard],
    // canLoad: [NonAuthGuard],
    loadComponent: () => import("../setting/setting.component").then(m => m.SettingComponent)
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
