import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

export interface LoanInfo {
  LoanID: Number;
  UserID: Number;
  LoanName: String;
  LoanTypeID: String;
  LoanTerm: Number;
  LoanBalance: Number;
  InterestRate: Number;
  PaymentMinimum: Number;
  PaymentStart: String;
  StatusID: Number;
  DateCreated: String;
  DateUpdated: String;
  DateDeleted: String;
}

export interface PostLoanData {
  LoanName: String;
  LoanTypeID: String;
  LoanTerm: Number;
  LoanBalance: Number;
  InterestRate: Number;
  PaymentMinimum: Number;
  PaymentStart: String;
  StatusID: Number;
}

@Injectable({
  providedIn: "root"
})
export class LoansService {
  private hiddenLoans: Number[] = [];

  constructor(private storage: Storage, private platform: Platform, private http: HttpClient) {
    // Check if stored token exists
    this.platform.ready().then(() => {
      this.storage.get(environment.storage.HIDDEN_LOANS).then(res => {
        if (res) {
          this.hiddenLoans = res.split(",").map((l: String) => Number(l));
        }
      });
    });
  }

  getLoans = (): Observable<any> => {
    return this.http.get(`${environment.API_HOST}/me/loans?hidden=${this.hiddenLoans.join(",")}`).pipe(map((res: any) => console.log(res)));
  };

  createLoan = (data: PostLoanData): Observable<any> => {
    return this.http.post(`${environment.API_HOST}/me/loans`, data);
  };

  updateLoan = (LoanID: LoanInfo["LoanID"], data: PostLoanData): Observable<any> => {
    return this.http.put(`${environment.API_HOST}/me/loans${LoanID}`, data);
  };

  deleteLoan = (LoanID: LoanInfo["LoanID"]): Observable<any> => {
    return this.http.delete(`${environment.API_HOST}/me/loans${LoanID}`);
  };

  getHiddenLoans = (): Promise<Number[]> => {
    return new Promise((resolve, reject) => {
      this.storage.get(environment.storage.HIDDEN_LOANS).then(res => {
        if (res) {
          resolve(res.split(",").map((l: String) => Number(l)));
        } else {
          resolve([]);
        }
      });
    });
  };

  addHiddenLoan = async (LoanID: LoanInfo["LoanID"]) => {
    let hiddenLoans = await this.getHiddenLoans();
    hiddenLoans.push(LoanID);

    this.storage.set(environment.storage.HIDDEN_LOANS, hiddenLoans);

    return hiddenLoans;
  };

  removeHiddenLoan = async (LoanID: LoanInfo["LoanID"]) => {
    let hiddenLoans = await this.getHiddenLoans();
    hiddenLoans = hiddenLoans.filter(l => l !== LoanID);

    this.storage.set(environment.storage.HIDDEN_LOANS, hiddenLoans);

    return hiddenLoans;
  };
}
