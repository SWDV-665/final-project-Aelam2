import { Component, OnInit } from "@angular/core";
import { PaymentPlansService, PaymentPlan } from "src/app/services/paymentPlans/payment-plans.service";

@Component({
  selector: "app-payment-plans",
  templateUrl: "./payment-plans.page.html",
  styleUrls: ["./payment-plans.page.scss"]
})
export class PaymentPlansPage implements OnInit {
  constructor(private plansService: PaymentPlansService) {
    this.plansService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.getPaymentPlans();
    });
  }
  public loading: Boolean = true;
  public plans: PaymentPlan[] = [];

  ngOnInit() {
    this.getPaymentPlans();
  }

  getPaymentPlans = () => {
    console.log("here");

    this.plansService.fetchPaymentPlans().subscribe(
      (plans: PaymentPlan[]) => {
        this.plans = plans;
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  };

  toggleActivePlan = (PaymentPlanID: PaymentPlan["PaymentPlanID"], IsCurrent: PaymentPlan["IsCurrent"]) => {
    this.plansService.activatePaymentPlan(PaymentPlanID, IsCurrent ? 0 : 1);
  };

  generateArray(i: number) {
    return new Array(i);
  }
}
