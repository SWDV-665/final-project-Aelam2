import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ThemeSwitcherService {
  currentTheme: string = "light";
  constructor() {}
}
