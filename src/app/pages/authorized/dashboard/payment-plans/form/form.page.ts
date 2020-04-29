import { Component, OnInit } from "@angular/core";
import { PaymentPlansService, PaymentPlan } from "src/app/services/paymentPlans/payment-plans.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "app-form",
  templateUrl: "./form.page.html",
  styleUrls: ["./form.page.scss"]
})
export class FormPage implements OnInit {
  public PaymentPlanID: Number = null;
  public plan: PaymentPlan = null;
  public planForm: FormGroup;

  public datePickerOptions: any;
  public submitting: Boolean = false;
  public deleting: boolean = false;

  public repeatSelectOptions = {
    header: "Payment Repeats?"
  };

  public allocationSelectOptions = {
    header: "Allocation Method"
  };

  constructor(private planService: PaymentPlansService, public route: ActivatedRoute, private fb: FormBuilder, public router: Router) {
    // INIT Login Form
    this.planForm = this.fb.group({
      PlanName: ["New Plan", [Validators.required]],
      AllocationMethodID: ["5", [Validators.required]],
      Payments: this.fb.array([])
    });

    this.datePickerOptions = {
      cancelText: "Cancel",
      doneText: "save",
      min: moment().add(1, "day").toISOString()
    };

    this.route.paramMap.subscribe(paramMap => {
      this.PaymentPlanID = Number(paramMap.get("PaymentPlanID"));

      this.planService.getPaymentPlans().map(p => {
        if (p.PaymentPlanID == this.PaymentPlanID) {
          this.plan = p;
          this.setExistingPlan();
        }
      });
    });
  }

  ngOnInit() {}

  setExistingPlan = () => {
    // If a valid PaymentPlanID is passed to this page then the form will be initalized with existing values
    this.planForm.get("PlanName").setValue(this.plan.PlanName);
    this.planForm.get("AllocationMethodID").setValue(this.plan.AllocationMethod.CodeValueID);
    for (let payment of this.plan.Payments) {
      let payments = this.PaymentForm;

      const paymentGroup = this.fb.group({
        PaymentName: [payment.PaymentName, [Validators.required]],
        PaymentDate: [payment.PaymentDate, [Validators.required]],
        PaymentAmount: [payment.PaymentAmount, [Validators.required, Validators.min(0)]],
        RecurringTypeID: [`${payment.RecurringTypeID}`, [Validators.required]]
      });
      payments.push(paymentGroup);
    }
  };

  get PaymentForm() {
    return this.planForm.get("Payments") as FormArray;
  }

  get formData() {
    return this.planForm.controls;
  }

  PaymentItem(field: string | Array<string>, index) {
    return this.PaymentForm.controls[index].get(field);
  }

  displayErrorClass(field: string | Array<string>) {
    return this.planForm.get(field).invalid ? "has-error" : "";
  }

  displayArrayErrorClass(field: string | Array<string>, index) {
    return this.PaymentForm.controls[index].get(field).touched && this.PaymentForm.controls[index].get(field).invalid ? "has-error" : "";
  }

  addPaymentToForm = () => {
    let payments = this.PaymentForm;

    const paymentGroup = this.fb.group({
      PaymentName: ["New Payment", [Validators.required]],
      PaymentDate: [null, [Validators.required]],
      PaymentAmount: [null, [Validators.required, Validators.min(0)]],
      RecurringTypeID: ["6", [Validators.required]]
    });

    payments.push(paymentGroup);
  };

  submitPlanForm = async () => {
    try {
      if (this.planForm.invalid) {
        return;
      }

      this.submitting = true;

      let values = Object.assign({}, this.planForm.value);
      values.InterestRate = values.InterestRate / 100;

      if (this.plan && this.PaymentPlanID) {
        await this.planService.updatePaymentPlans(this.PaymentPlanID, values);
      } else {
        await this.planService.createPaymentPlans(values);
      }

      this.router.navigate(["auth/dashboard/payment-plans"]);
    } catch (err) {
    } finally {
      this.submitting = false;
    }
  };

  deletePlan = async () => {
    try {
      this.deleting = true;
      await this.planService.deletePaymentPlans(this.PaymentPlanID);
      this.router.navigate(["auth/dashboard/payment-plans"]);
    } catch (err) {
    } finally {
      this.deleting = false;
    }
  };
}
