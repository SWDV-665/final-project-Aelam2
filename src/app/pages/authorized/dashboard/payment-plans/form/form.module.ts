import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { FormPageRoutingModule } from "./form-routing.module";
import { AccordionModule } from "ng-zorro-antd-mobile";
import { FormPage } from "./form.page";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IonicModule, FormPageRoutingModule, AccordionModule],
  declarations: [FormPage]
})
export class FormPageModule {}
