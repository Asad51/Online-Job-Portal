import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private options: Object = {
    observe: "body",
    withCredentials: true,
    headers: new HttpHeaders().append("Content-Type", "application/json")
  };

  constructor(private httpClient: HttpClient) {}

  register(userDetails) {
    return this.httpClient.post(
      environment.apiUrl + "user/register",
      userDetails,
      this.options
    );
  }

  login(loginDetails) {
    return this.httpClient.post(
      environment.apiUrl + "user/login",
      loginDetails,
      this.options
    );
  }

  logout() {
    return this.httpClient.get(
      environment.apiUrl + "user/logout",
      this.options
    );
  }

  getProfile() {
    return this.httpClient.post(
      environment.apiUrl + "user/profile",
      this.options
    );
  }
}
