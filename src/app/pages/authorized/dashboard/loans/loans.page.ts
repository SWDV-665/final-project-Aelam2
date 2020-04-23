import { Component, OnInit } from "@angular/core";
import { LoansService, LoanInfo } from "src/app/services/loans/loans.service";

@Component({
  selector: "app-loans",
  templateUrl: "./loans.page.html",
  styleUrls: ["./loans.page.scss"]
})
export class LoansPage implements OnInit {
  public Loans: LoanInfo[] = [];

  constructor(public LoanService: LoansService) {}

  ngOnInit() {
    this.LoanService.getLoans().subscribe((loans: LoanInfo[]) => {
      this.Loans = loans;
    });
  }
}
