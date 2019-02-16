import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class UserAuthService {
  jwtHelper = new JwtHelperService();

  token: string = "";
  userName: string = "";
  isAdminLoggedIn: Boolean = false;
  isExpired: Boolean = false;

  constructor() {}

  isJobSeekerLoggedIn() {
    this.token = localStorage.getItem("__jsx__");
    if (this.token) {
      this.userName = this.jwtHelper.decodeToken(this.token).name;
      return true;
    } else {
      return false;
    }
  }
}
