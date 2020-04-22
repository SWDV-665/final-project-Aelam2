import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UnauthorizedPage } from "./unauthorized.page";

const routes: Routes = [
  {
    path: "",
    redirectTo: "sign-in",
    pathMatch: "full"
  },
  {
    path: "",
    component: UnauthorizedPage,
    children: [
      {
        path: "sign-in",
        loadChildren: () => import("./user-sign-in/user-sign-in.module").then(m => m.UserSignInPageModule)
      },
      {
        path: "sign-up",
        loadChildren: () => import("./user-sign-up/user-sign-up.module").then(m => m.UserSignUpPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnauthorizedPageRoutingModule {}
