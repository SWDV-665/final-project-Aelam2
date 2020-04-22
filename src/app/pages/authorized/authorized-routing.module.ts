import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorizedPage } from "./authorized.page";

const routes: Routes = [
  {
    path: "",
    component: AuthorizedPage,
    children: [
      {
        path: "dashboard",
        loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardPageModule)
      },
      {
        path: "payment-schedule",
        loadChildren: () => import("./payment-schedule/payment-schedule.module").then(m => m.PaymentSchedulePageModule)
      },
      {
        path: "resources",
        loadChildren: () => import("./resources/resources.module").then(m => m.ResourcesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizedPageRoutingModule {}
