import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication/authentication.service";

@Injectable({
  providedIn: "root"
})
export class UnAuthGuard implements CanActivate {
  private loggedIn: boolean = false;

  constructor(private router: Router, public authService: AuthenticationService) {
    this.authService.getAuthentication().subscribe((value: boolean) => {
      this.loggedIn = value;

      if (this.loggedIn) {
        this.router.navigate(["auth", "dashboard", "overview"]);
      } else {
        this.router.navigate(["unauth", "sign-in"]);
      }
    });
  }

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.loggedIn) {
      this.router.navigate(["auth", "dashboard", "overview"]);
      return false;
    }

    return true;
  }
}
