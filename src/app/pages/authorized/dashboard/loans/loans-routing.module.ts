import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoansPage } from "./loans.page";

const routes: Routes = [
  {
    path: "",
    component: LoansPage
  },
  {
    path: ":LoanID",
    loadChildren: () => import("./form/form.module").then(m => m.FormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoansPageRoutingModule {}
