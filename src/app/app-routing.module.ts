import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/auth/dashboard/overview",
    canActivate: [AuthGuard],
    data: { authGuardRedirect: "/unauth/sign-in" },
    pathMatch: "full"
  },
  {
    path: "unauth",
    loadChildren: () => import("./pages/unauthorized/unauthorized.module").then(m => m.UnauthorizedPageModule)
  },
  {
    path: "auth",
    canActivate: [AuthGuard],
    loadChildren: () => import("./pages/authorized/authorized.module").then(m => m.AuthorizedPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
