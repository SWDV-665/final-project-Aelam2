import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Observable, BehaviorSubject, from } from "rxjs";
import { map, mergeMap } from "rxjs/operators";

import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

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
      this.storage.get(environment.storage.JWT_TOKEN).then(res => {
        this.authenticated.next(res ? true : false);
      });
    });
  }

  signIn = (data: SignInData): Observable<any> => {
    return this.http.post(`${environment.API_HOST}/sign-in`, data);
  };

  signInWithGoogle = (googleId: String): Observable<any> => {
    return this.http.post(`${environment.API_HOST}/oauth/google`, { access_token: googleId });
  };

  signInWithFB = (facebookId: string): Observable<any> => {
    return this.http.post(`${environment.API_HOST}/oauth/facebook`, { access_token: facebookId });
  };

  signUp = (data: SignUpData): Observable<any> => {
    return this.http.post(`${environment.API_HOST}/sign-up`, data);
  };

  signOut = () => {
    return this.storage.remove(environment.storage.JWT_TOKEN).then(() => {
      this.authenticated.next(false);
    });
  };

  setAuthToken = (token: AccessToken) => {
    return this.storage.set(environment.storage.JWT_TOKEN, token).then(() => {
      this.authenticated.next(true);
    });
  };

  getAuthentication = (): Observable<boolean> => {
    return this.authenticated.asObservable();
  };
}
