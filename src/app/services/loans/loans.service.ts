import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Observable, Subject } from "rxjs";
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
  hidden: Boolean;
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
  private Loans: LoanInfo[] = [];
  private hiddenLoans: Number[] = [];

  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;

  constructor(private storage: Storage, private platform: Platform, private http: HttpClient) {
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();

    // Check if stored token exists
    this.platform.ready().then(() => {
      this.storage.get(environment.storage.HIDDEN_LOANS).then(res => {
        if (res.length) {
          this.hiddenLoans = res;
        }
      });
    });
  }

  getLoans = (): LoanInfo[] => {
    return this.Loans;
  };

  fetchLoans = (): Observable<any> => {
    return this.http.get(`${environment.API_HOST}/me/loans`).pipe(
      map((res: any) => {
        let loans = res.data.map(loan => {
          let isHidden = this.hiddenLoans.includes(loan.LoanID);
          return { ...loan, hidden: isHidden };
        });

        this.Loans = loans;
        return loans;
      })
    );
  };

  createLoan = (data: PostLoanData) => {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.API_HOST}/me/loans`, data).subscribe((res: any) => {
        this.Loans = [...this.Loans, res.data];
        this.dataChangeSubject.next(true);
        resolve(res.data);
      });
    });
  };

  updateLoan = (LoanID: LoanInfo["LoanID"], data: PostLoanData) => {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.API_HOST}/me/loans/${LoanID}`, data).subscribe((res: any) => {
        this.Loans = this.Loans.map(l => {
          if (l.LoanID === res.data.LoanID) {
            return res.data;
          }

          return l;
        });

        this.dataChangeSubject.next(true);
        resolve(res.data);
      });
    });
  };

  deleteLoan = (LoanID: LoanInfo["LoanID"]) => {
    this.removeHiddenLoan(LoanID);

    return new Promise((resolve, reject) => {
      return this.http.delete(`${environment.API_HOST}/me/loans/${LoanID}`).subscribe((res: any) => {
        this.Loans = this.Loans.filter(l => !l.LoanID === res.data);

        this.dataChangeSubject.next(true);
        resolve(this.Loans);
      });
    });
  };

  getHiddenLoans = async (): Promise<Number[]> => {
    return (await this.storage.get(environment.storage.HIDDEN_LOANS)) || [];
  };

  addHiddenLoan = async (LoanID: LoanInfo["LoanID"]) => {
    let hiddenLoans = await this.getHiddenLoans();

    hiddenLoans.push(LoanID);
    await this.storage.set(environment.storage.HIDDEN_LOANS, hiddenLoans);
    this.hiddenLoans = hiddenLoans;

    this.dataChangeSubject.next(true);
  };

  removeHiddenLoan = async (LoanID: LoanInfo["LoanID"]) => {
    let hiddenLoans = await this.getHiddenLoans();

    hiddenLoans = hiddenLoans.filter(l => l !== LoanID);
    await this.storage.set(environment.storage.HIDDEN_LOANS, hiddenLoans);
    this.hiddenLoans = hiddenLoans;

    this.dataChangeSubject.next(true);
  };
}
