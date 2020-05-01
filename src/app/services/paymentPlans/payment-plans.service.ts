import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "../authentication/authentication.service";

export interface PaymentPlan {
  PaymentPlanID: Number;
  UserID: Number;
  PlanName: String;
  AllocationMethodID: Number;
  AllocationMethod: AllocationMethod;
  IsCurrent: Boolean;
  DateCreated: String;
  DateUpdated: String;
  DateDeleted: String;
  Payments: Payment[];
}

export interface AllocationMethod {
  CodeValueID: Number;
  CodeValueName: String;
  CodeValueDescription: String;
  CodeValueParentID: Number;
}

export interface Payment {
  PaymentID: Number;
  PaymentPlanID: Number;
  PaymentName: String;
  PaymentDate: String;
  PaymentAmount: Number;
  RecurringTypeID: Number;
  IsRecurring: Number;
  DateCreated: String;
  DateUpdated: String;
  DateDeleted: String;
}

export interface PostPaymentPlanData {
  PlanName: String;
  AllocationMethodID: Number;
  IsCurrent: Boolean;
  Payments: PostPaymentData[];
}

export interface PostPaymentData {
  PaymentName: String;
  PaymentDate: String;
  PaymentAmount: Number;
  RecurringTypeID: Number;
}

@Injectable({
  providedIn: "root"
})
export class PaymentPlansService {
  private paymentPlans: PaymentPlan[] = [];

  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;

  constructor(private platform: Platform, private http: HttpClient, private authService: AuthenticationService) {
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getPaymentPlans = (): PaymentPlan[] => {
    return this.paymentPlans;
  };

  fetchPaymentPlans = (): Observable<any> => {
    return this.http.get(`${environment.API_HOST}/me/payment-plans`).pipe(map((res: any) => (this.paymentPlans = res.data)));
  };

  createPaymentPlans = (data: PostPaymentPlanData) => {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.API_HOST}/me/payment-plans`, data).subscribe((res: any) => {
        this.paymentPlans = [...this.paymentPlans, res.data];
        this.dataChangeSubject.next(true);
        resolve(this.paymentPlans);
      });
    });
  };

  updatePaymentPlans = (LoanID: PaymentPlan["PaymentPlanID"], data: PostPaymentPlanData) => {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.API_HOST}/me/payment-plans/${LoanID}`, data).subscribe((res: any) => {
        this.paymentPlans = this.paymentPlans.map(l => {
          if (l.PaymentPlanID === res.data.PaymentPlanID) {
            return res.data;
          }

          return l;
        });

        this.dataChangeSubject.next(true);
        resolve(this.paymentPlans);
      });
    });
  };

  deletePaymentPlans = (LoanID: PaymentPlan["PaymentPlanID"]) => {
    return new Promise((resolve, reject) => {
      return this.http.delete(`${environment.API_HOST}/me/payment-plans/${LoanID}`).subscribe((res: any) => {
        this.paymentPlans = this.paymentPlans.filter(l => !l.PaymentPlanID === res.data);
        this.dataChangeSubject.next(true);
        resolve(this.paymentPlans);
      });
    });
  };

  activatePaymentPlan = (PlanID: PaymentPlan["PaymentPlanID"], IsCurrent: Number) => {
    return new Promise((resolve, reject) => {
      return this.http.post(`${environment.API_HOST}/me/payment-plans/${PlanID}/activate`, { IsCurrent }).subscribe((res: any) => {
        this.paymentPlans = this.paymentPlans.map(p => {
          if (p.PaymentPlanID === res.data) {
            return { ...p, IsCurrent: IsCurrent ? true : false };
          }
          return p;
        });

        this.dataChangeSubject.next(true);
        resolve(this.paymentPlans);
      });
    });
  };
}
