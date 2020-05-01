import { Component, OnInit, ViewChild } from "@angular/core";
import { LoansService, LoanInfo } from "src/app/services/loans/loans.service";
import { PaymentPlansService, PaymentPlan } from "src/app/services/paymentPlans/payment-plans.service";
import { AnalyticsService, Analytics, MinimumPlan } from "src/app/services/analytics/analytics.service";
import * as moment from "moment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./overview.page.html",
  styleUrls: ["./overview.page.scss"]
})
export class OverviewPage implements OnInit {
  public analytics: Analytics = {
    accumulatedSchedule: [],
    consolidatedSchedule: [],
    description: "",
    finalPayment: "",
    firstPayment: "",
    interest: 0,
    loans: [],
    masterSchedule: [],
    minimumPlan: {
      accumulatedSchedule: [],
      consolidatedSchedule: [],
      description: "",
      finalPayment: "",
      firstPayment: "",
      interest: 0,
      loans: [],
      masterSchedule: [],
      name: "",
      payments: 0,
      principal: 0,
      total: 0,
      type: ""
    },
    name: "",
    payments: 0,
    principal: 0,
    total: 0,
    type: ""
  };

  public loading: Boolean = false;

  constructor(public LoanService: LoansService, private plansService: PaymentPlansService, private analyticsService: AnalyticsService) {
    this.LoanService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.fetchAnalytics();
    });

    this.plansService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.fetchAnalytics();
    });
  }

  ngOnInit() {
    this.fetchAnalytics();
  }

  fetchAnalytics = async () => {
    let hidden = await this.LoanService.getHiddenLoans();
    this.loading = true;
    this.analyticsService.fetchAnalytics(hidden).subscribe(
      (analytics: Analytics) => {
        this.analytics = analytics;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  };

  get loans() {
    return this.analytics.loans;
  }

  get minPlan(): MinimumPlan {
    let analytics = Object.assign({}, this.analytics.minimumPlan);

    analytics.finalPayment = moment(analytics.finalPayment).format("MMM DD, YYYY");

    return analytics;
  }

  get currentPlan(): Analytics {
    let analytics = Object.assign({}, this.analytics);

    analytics.finalPayment = moment(analytics.finalPayment).format("MMM DD, YYYY");

    return analytics;
  }

  get daysleft(): number {
    let current = Object.assign({}, this.analytics);

    var eventdate = moment(current.finalPayment);
    var todaysdate = moment();
    return eventdate.diff(todaysdate, "days");
  }
}
