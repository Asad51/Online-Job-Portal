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
    headers: new HttpHeaders()
      .append("Content-Type", "application/json")
      .append("__jsx__", localStorage.getItem("__jsx__"))
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
    return this.httpClient.get(
      environment.apiUrl + "user/profile",
      this.options
    );
  }

  updateProfile(userInfo) {
    return this.httpClient.put(
      environment.apiUrl + "user/profile",
      userInfo,
      this.options
    );
  }

  updateContactInfo(contactInfo) {
    return this.httpClient.put(
      environment.apiUrl + "user/contact",
      contactInfo,
      this.options
    );
  }

  updateAddress(address) {
    return this.httpClient.put(
      environment.apiUrl + "user/address",
      address,
      this.options
    );
  }

  updateOthers(info) {
    return this.httpClient.put(
      environment.apiUrl + "user/others",
      info,
      this.options
    );
  }

  uploadProfileImage(file: any) {
    return this.httpClient.put(environment.apiUrl + "user/photo", file, {
      observe: "body",
      withCredentials: true,
      headers: new HttpHeaders().append(
        "__jsx__",
        localStorage.getItem("__jsx__")
      )
    });
  }
}
