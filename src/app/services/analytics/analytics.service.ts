import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { LoansService } from "../loans/loans.service";

export interface Analytics {
  accumulatedSchedule: object[];
  consolidatedSchedule: object[];
  description: string;
  finalPayment: string;
  firstPayment: string;
  interest: number;
  loans: object[];
  masterSchedule: object[];
  minimumPlan: MinimumPlan;
  name: string;
  payments: number;
  principal: number;
  total: number;
  type: string;
}

export interface MinimumPlan {
  accumulatedSchedule: object[];
  consolidatedSchedule: object[];
  description: string;
  finalPayment: string;
  firstPayment: string;
  interest: number;
  loans: object[];
  masterSchedule: object[];
  name: string;
  payments: number;
  principal: number;
  total: number;
  type: string;
}

@Injectable({
  providedIn: "root"
})
export class AnalyticsService {
  private analytics: Analytics = {
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
  constructor(private http: HttpClient, private loansService: LoansService) {}

  fetchAnalytics = (hiddenLoans: Number[]): Observable<any> => {
    return this.http
      .get(`${environment.API_HOST}/me/loans/amortization${hiddenLoans.length ? `?hidden=${hiddenLoans.join(",")}` : ""}`)
      .pipe(map((res: any) => (this.analytics = res.data)));
  };
}
