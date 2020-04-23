import { Component, OnInit } from "@angular/core";
import { ToastController, LoadingController } from "@ionic/angular";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from "@angular/forms";
import { AuthService } from "angularx-social-login";

@Component({
  selector: "app-user-sign-up",
  templateUrl: "./user-sign-up.page.html",
  styleUrls: ["./user-sign-up.page.scss"]
})
export class UserSignUpPage implements OnInit {
  userSignUpForm: FormGroup;
  submitted: Boolean = false;
  submitting: Boolean = false;
  passwordStrength: String = "none";

  constructor(
    public toastController: ToastController,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    // INIT Sign-up Form
    this.userSignUpForm = this.fb.group(
      {
        UserName: ["", Validators.required],
        Password: ["", [Validators.required, Validators.minLength(8)]],
        ConfirmPassowrd: ["", Validators.required],
        Email: ["", [Validators.required, Validators.email]],
        FirstName: [""],
        LastName: [""]
      },
      { validators: [this.checkPasswords] }
    );

    this.passwordStrengthValue();
  }

  checkPasswords: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
    let pass = group.value.Password;
    let confirmPass = group.value.ConfirmPassowrd;
    return pass === confirmPass ? null : { notSame: true };
  };

  // Check length of password, and set returned value as class on HTML
  passwordStrengthValue() {
    this.userSignUpForm.get("Password").valueChanges.subscribe(val => {
      let strength = "none";

      if (val.length > 4) {
        strength = "poor";
      }
      if (val.length >= 8) {
        strength = "ok";
      }
      if (val.length > 12) {
        strength = "pass";
      }

      this.passwordStrength = strength;
    });
  }

  get formData() {
    return this.userSignUpForm.controls;
  }

  get crossFieldErrors() {
    return this.userSignUpForm.errors;
  }

  displayErrorClass(field: string | Array<string>) {
    return this.submitted && this.userSignUpForm.get(field).invalid ? "has-error" : "";
  }

  handleSignUp = async () => {
    this.submitted = true;
    if (this.userSignUpForm.invalid) {
      return;
    }

    const loading = await this.loadingController.create({
      duration: 0,
      message: "Loading ...",
      translucent: true,
      backdropDismiss: false
    });

    await loading.present();

    this.authService.signUp(this.userSignUpForm.value).subscribe(
      res => {
        loading.dismiss();
        this.authService.setAuthToken(res.token);
      },
      (error: any) => {
        if (error.status === 422) {
          this.toastController
            .create({
              message: `${error.error.error} ${error.error.data?.codeName && `: ${error.error.data?.codeName}`}`,
              duration: 3500,
              position: "top",
              color: "light"
            })
            .then(toast => {
              toast.present();
            });
        }

        loading.dismiss();
      }
    );
  };
}
