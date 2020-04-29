import { Component, OnInit } from "@angular/core";
import { LoansService, LoanInfo } from "src/app/services/loans/loans.service";

@Component({
  selector: "app-loans",
  templateUrl: "./loans.page.html",
  styleUrls: ["./loans.page.scss"]
})
export class LoansPage implements OnInit {
  public loading: Boolean = true;
  public Loans: LoanInfo[] = [];

  constructor(public LoanService: LoansService) {
    this.LoanService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.getLoans();
    });
  }

  ngOnInit() {
    this.getLoans();
  }

  getLoans = () => {
    this.LoanService.fetchLoans().subscribe(
      (loans: LoanInfo[]) => {
        this.Loans = loans;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  };

  generateArray(i: number) {
    return new Array(i);
  }

  toggleHiddenLoan = async (LoanID: LoanInfo["LoanID"], hidden: Boolean) => {
    if (hidden) {
      await this.LoanService.removeHiddenLoan(LoanID);
    } else {
      await this.LoanService.addHiddenLoan(LoanID);
    }
  };
}
