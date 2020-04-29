import { Component, OnInit } from "@angular/core";
import { LoansService, LoanInfo } from "src/app/services/loans/loans.service";
import { PaymentPlansService, PaymentPlan } from "src/app/services/paymentPlans/payment-plans.service";

@Component({
  selector: "app-overview",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  public Loans: LoanInfo[] = [];
  public plans: PaymentPlan[] = [];

  constructor(public LoanService: LoansService, private plansService: PaymentPlansService) {
    this.LoanService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.getLoans();
    });

    this.plansService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.getPaymentPlans();
    });
  }

  ngOnInit() {}

  getLoans = () => {
    this.LoanService.fetchLoans().subscribe(
      (loans: LoanInfo[]) => {
        this.Loans = loans;
      },
      error => {}
    );
  };

  getPaymentPlans = () => {
    this.plansService.fetchPaymentPlans().subscribe(
      (plans: PaymentPlan[]) => {
        this.plans = plans;
      },
      error => {}
    );
  };
}
