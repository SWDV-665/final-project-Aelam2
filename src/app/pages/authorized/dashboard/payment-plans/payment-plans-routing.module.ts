import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentPlansPage } from './payment-plans.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentPlansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentPlansPageRoutingModule {}
