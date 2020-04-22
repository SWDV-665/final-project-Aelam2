import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { UserSignInPageRoutingModule } from "./user-sign-in-routing.module";
import { UserSignInPage } from "./user-sign-in.page";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, UserSignInPageRoutingModule],
  declarations: [UserSignInPage]
})
export class UserSignInPageModule {}
