import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Observable, BehaviorSubject, from } from "rxjs";
import { map, mergeMap } from "rxjs/operators";

import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

const TOKEN_KEY = "JWT_TOKEN";

interface SignInData {
  UserName: string;
  Password: string;
}

interface SignUpData {
  UserName: string;
  Password: string;
  Email: string;
  FirstName: string;
  LastName: string;
}

interface AccessToken {
  token: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private storage: Storage, private platform: Platform, private http: HttpClient) {
    // Check if stored token exists
    this.platform.ready().then(() => {
      this.storage.get(TOKEN_KEY).then(res => {
        console.log("JWT_TOKEN", res);
        this.authenticated.next(res ? true : false);
      });
    });
  }

  signIn = (data: SignInData): Observable<any> => {
    return this.http.post(`${environment.API_HOST}/sign-in`, data);
  };

  // signInWithGoogle = (): Observable<any> => {
  //   return from(this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID)).pipe(
  //     mergeMap(user => {
  //       return this.http.post(`${environment.API_HOST}/oauth/google`, { access_token: user.authToken });
  //     })
  //   );
  // };

  // signInWithFB = (): Observable<any> => {
  //   return from(this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID)).pipe(
  //     mergeMap(user => {
  //       return this.http.post(`${environment.API_HOST}/oauth/facebook`, { access_token: user.authToken });
  //     })
  //   );
  // };

  signUp = (data: SignUpData): Observable<any> => {
    return this.http.post(`${environment.API_HOST}/sign-up`, data);
  };

  signOut = () => {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticated.next(false);
    });
  };

  setAuthToken = (token: AccessToken) => {
    return this.storage.set(TOKEN_KEY, token).then(() => {
      this.authenticated.next(true);
    });
  };

  getAuthentication = (): Observable<boolean> => {
    return this.authenticated.asObservable();
  };
}
