import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { AuthenticationService } from "../../../services/authentication/authentication.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AuthService } from "angularx-social-login";

@Component({
  selector: "app-user-sign-in",
  templateUrl: "./user-sign-in.page.html",
  styleUrls: ["./user-sign-in.page.scss"]
})
export class UserSignInPage implements OnInit {
  userLoginForm: FormGroup;
  loading: boolean = false;
  googleLoading: boolean = false;
  facebookLoading: boolean = false;

  constructor(public toastController: ToastController, private fb: FormBuilder, private authService: AuthenticationService) {}

  ngOnInit() {
    // INIT Login Form
    this.userLoginForm = this.fb.group({
      UserName: "",
      Password: ""
    });
  }

  signIn = async () => {
    this.loading = true;
    // Pass Login Form values to authService for sign-in
    this.authService.signIn(this.userLoginForm.value).subscribe(
      res => {
        this.loading = false;
        this.authService.setAuthToken(res.token);
      },
      (error: any) => {
        if (error.status === 401) {
          this.toastController
            .create({
              message: "Invalid username or password",
              duration: 2000,
              position: "top",
              color: "light"
            })
            .then(toast => {
              toast.present();
            });
        } else {
          this.toastController
            .create({
              message: "An unexpected error occured",
              duration: 2000,
              position: "top",
              color: "danger"
            })
            .then(toast => {
              toast.present();
            });
        }
        this.loading = false;
      }
    );
  };

  // signInWithGoogle = async () => {
  //   this.googleLoading = true;

  //   this.authService.signInWithGoogle().subscribe(
  //     res => {
  //       this.googleLoading = false;
  //       this.authService.setAuthToken(res.token);
  //     },
  //     (error: any) => {
  //       if (error.status === 401) {
  //         this.toastController
  //           .create({
  //             message: "Invalid username or password",
  //             duration: 2000,
  //             position: "top",
  //             color: "light"
  //           })
  //           .then(toast => {
  //             toast.present();
  //           });
  //       } else {
  //         this.toastController
  //           .create({
  //             message: "An unexpected error occured",
  //             duration: 2000,
  //             position: "top",
  //             color: "danger"
  //           })
  //           .then(toast => {
  //             toast.present();
  //           });
  //       }
  //       this.googleLoading = false;
  //     }
  //   );
  // };

  // signInWithFB = async () => {
  //   this.facebookLoading = true;
  //   // Pass Login Form values to authService for sign-in
  //   this.authService.signInWithFB().subscribe(
  //     res => {
  //       this.facebookLoading = false;
  //       this.authService.setAuthToken(res.token);
  //     },
  //     (error: any) => {
  //       if (error.status === 401) {
  //         this.toastController
  //           .create({
  //             message: "Invalid username or password",
  //             duration: 2000,
  //             position: "top",
  //             color: "light"
  //           })
  //           .then(toast => {
  //             toast.present();
  //           });
  //       } else {
  //         this.toastController
  //           .create({
  //             message: "An unexpected error occured",
  //             duration: 2000,
  //             position: "top",
  //             color: "danger"
  //           })
  //           .then(toast => {
  //             toast.present();
  //           });
  //       }
  //       this.facebookLoading = false;
  //     }
  //   );
  // };
}
