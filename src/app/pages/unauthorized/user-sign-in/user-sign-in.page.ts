import { Component, OnInit } from "@angular/core";
import { ToastController, Platform } from "@ionic/angular";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Plugins } from "@capacitor/core";

const { BiometricAuth } = Plugins;

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

  constructor(
    public toastController: ToastController,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private socialAuth: AuthService,
    private platform: Platform
  ) {
    platform.pause.subscribe(async () => {
      alert("Pause event detected");
    });
  }

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
        }

        this.loading = false;
      }
    );
  };

  signInWithGoogle = async () => {
    this.googleLoading = true;
    let user = await this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log(user);
    this.authService.signInWithGoogle(user.authToken).subscribe(
      res => {
        this.googleLoading = false;
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
        }

        this.googleLoading = false;
      }
    );
  };

  signInWithFB = async () => {
    this.facebookLoading = true;

    let user = await this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID);

    // Pass Login Form values to authService for sign-in
    this.authService.signInWithFB(user.authToken).subscribe(
      res => {
        this.facebookLoading = false;
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
        }

        this.facebookLoading = false;
      }
    );
  };

  unlockWithBiometric = async () => {
    const available = await BiometricAuth.isAvailable();

    if (available.has) {
      const authResult = await BiometricAuth.verify({
        reason: "Biometric Login",
        title: "Biometric Login"
      });

      if (authResult.verified) {
        console.log("here");
        // success authentication
      } else {
        console.log("failed biometric");

        // fail authentication
      }
    } else {
      // biometric not available
    }
  };
}
