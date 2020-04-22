import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";

@Component({
  selector: "app-authorized",
  templateUrl: "./authorized.page.html",
  styleUrls: ["./authorized.page.scss"]
})
export class AuthorizedPage implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: "Overview",
      url: "/auth/dashboard/overview",
      icon: "bar-chart"
    },
    {
      title: "Payment Schedule",
      url: "/auth/payment-schedule",
      icon: "calendar"
    },
    {
      title: "Resources",
      url: "/auth/resources",
      icon: "bookmarks"
    }
  ];
  constructor(public authService: AuthenticationService) {}

  ngOnInit() {
    const path = window.location.pathname;
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.url.toLowerCase() === path.toLowerCase());
    }
  }

  signOut = () => {
    this.authService.signOut();
  };
}
