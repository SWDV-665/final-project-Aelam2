import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSignInPage } from './user-sign-in.page';

const routes: Routes = [
  {
    path: '',
    component: UserSignInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSignInPageRoutingModule {}
