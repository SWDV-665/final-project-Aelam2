import { Component, OnInit } from "@angular/core";
import { LoansService, LoanInfo, PostLoanData } from "src/app/services/loans/loans.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "app-form",
  templateUrl: "./form.page.html",
  styleUrls: ["./form.page.scss"]
})
export class FormPage implements OnInit {
  public loan: LoanInfo = null;
  public LoanID: Number = null;
  public loanForm: FormGroup;
  public datePickerOptions: any;
  public submitting: Boolean = false;
  public deleting: boolean = false;

  constructor(public LoanService: LoansService, public route: ActivatedRoute, private fb: FormBuilder, public router: Router) {
    // INIT Login Form
    this.loanForm = this.fb.group({
      LoanName: ["", [Validators.required]],
      LoanTypeID: [9, []],
      LoanTerm: ["", []],
      LoanBalance: ["", [Validators.required, Validators.min(1)]],
      InterestRate: ["", [Validators.required, Validators.min(0)]],
      PaymentMinimum: ["", [Validators.required, Validators.min(1)]],
      PaymentStart: ["", [Validators.required]],
      StatusID: [0, []]
    });

    this.datePickerOptions = {
      cancelText: "Cancel",
      doneText: "save",
      min: moment().add(1, "day").toISOString(),
      max: moment().add(1, "month").toISOString()
    };

    // If page is initalized with an exisiting LoanID
    this.route.paramMap.subscribe(paramMap => {
      this.LoanID = Number(paramMap.get("LoanID"));
      if (this.LoanID) {
        this.LoanService.getLoans().forEach(l => {
          if (l.LoanID == this.LoanID) {
            this.loan = l;
            this.setExistingLoan();
          }
        });
      }
    });
  }

  ngOnInit() {}

  get formData() {
    return this.loanForm.controls;
  }

  displayErrorClass(field: string | Array<string>) {
    return this.loanForm.get(field).touched && this.loanForm.get(field).invalid ? "has-error" : "";
  }

  setExistingLoan = () => {
    // If a valid LoanID is passed to this page then the form will be initalized with values
    this.loanForm.get("LoanName").setValue(this.loan.LoanName);
    this.loanForm.get("LoanTerm").setValue(this.loan.LoanTerm);
    this.loanForm.get("LoanBalance").setValue(this.loan.LoanBalance);
    this.loanForm.get("InterestRate").setValue(100 * Number(this.loan.InterestRate));
    this.loanForm.get("PaymentMinimum").setValue(this.loan.PaymentMinimum);
    this.loanForm.get("PaymentStart").setValue(this.loan.PaymentStart);
  };

  submitLoanForm = async () => {
    try {
      if (this.loanForm.invalid) {
        return;
      }

      this.submitting = true;

      let values = Object.assign({}, this.loanForm.value);
      values.InterestRate = values.InterestRate / 100;

      if (this.loan && this.LoanID) {
        await this.LoanService.updateLoan(this.LoanID, values);
      } else {
        await this.LoanService.createLoan(values);
      }

      this.router.navigate(["auth/dashboard/loans"]);
    } catch (err) {
    } finally {
      this.submitting = false;
    }
  };

  deleteLoan = async () => {
    try {
      this.deleting = true;
      await this.LoanService.deleteLoan(this.LoanID);
      this.router.navigate(["auth/dashboard/loans"]);
    } catch (err) {
    } finally {
      this.deleting = false;
    }
  };
}
