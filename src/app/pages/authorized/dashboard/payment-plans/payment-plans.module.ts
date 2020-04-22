import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPlansPageRoutingModule } from './payment-plans-routing.module';

import { PaymentPlansPage } from './payment-plans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentPlansPageRoutingModule
  ],
  declarations: [PaymentPlansPage]
})
export class PaymentPlansPageModule {}
