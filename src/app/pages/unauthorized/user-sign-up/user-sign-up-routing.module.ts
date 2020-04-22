import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSignUpPage } from './user-sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: UserSignUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSignUpPageRoutingModule {}
