import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PaymentPlansPage } from "./payment-plans.page";

const routes: Routes = [
  {
    path: "",
    component: PaymentPlansPage
  },
  {
    path: ":PaymentPlanID",
    loadChildren: () => import("./form/form.module").then(m => m.FormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentPlansPageRoutingModule {}
