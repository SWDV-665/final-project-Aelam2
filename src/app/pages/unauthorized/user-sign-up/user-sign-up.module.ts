import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserSignUpPageRoutingModule } from './user-sign-up-routing.module';

import { UserSignUpPage } from './user-sign-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserSignUpPageRoutingModule
  ],
  declarations: [UserSignUpPage]
})
export class UserSignUpPageModule {}
