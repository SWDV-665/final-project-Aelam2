import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardPage } from "./dashboard.page";

const routes: Routes = [
  {
    path: "",
    component: DashboardPage,
    children: [
      {
        path: "overview",
        loadChildren: () => import("./overview/overview.module").then(m => m.OverviewPageModule)
      },
      {
        path: "loans",
        loadChildren: () => import("./loans/loans.module").then(m => m.LoansPageModule)
      },
      {
        path: "payment-plans",
        loadChildren: () => import("./payment-plans/payment-plans.module").then(m => m.PaymentPlansPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule {}
