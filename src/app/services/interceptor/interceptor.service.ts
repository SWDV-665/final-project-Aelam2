import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Observable, from, throwError } from "rxjs";
import { mergeMap, catchError } from "rxjs/operators";
import { ToastController } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "../authentication/authentication.service";

@Injectable({
  providedIn: "root"
})
export class InterceptorService implements HttpInterceptor {
  constructor(private storage: Storage, private toastCtrl: ToastController, private authService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let promise = this.storage.get(environment.storage.JWT_TOKEN);

    return from(promise).pipe(
      mergeMap(token => {
        let clonedReq = this.addToken(request, token);
        return next.handle(clonedReq);
      }),
      catchError(error => {
        if (error.status === 500) {
          this.toastCtrl
            .create({
              header: "Error",
              message: "An unexpected error occured.",
              duration: 3000,
              position: "top"
            })
            .then(toast => {
              toast.present();
            });
        }

        if (error.status === 401) {
          this.authService.signOut();
        }

        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: any) {
    if (token) {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token
        }
      });
      return clone;
    }

    return request;
  }
}
