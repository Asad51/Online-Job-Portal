import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class EmployerService {
  private options: Object = {
    observe: "body",
    withCredentials: true,
    headers: new HttpHeaders()
      .append("Content-Type", "application/json")
      .append("__ex__", localStorage.getItem("__ex__"))
  };

  constructor(private httpClient: HttpClient) {}

  register(registrationDetails) {
    return this.httpClient.post(
      environment.apiUrl + "employer/register",
      registrationDetails,
      this.options
    );
  }

  login(loginDetails) {
    return this.httpClient.post(
      environment.apiUrl + "employer/login",
      loginDetails,
      this.options
    );
  }

  logout() {
    return this.httpClient.get(
      environment.apiUrl + "employer/logout",
      this.options
    );
  }

  getProfile() {
    return this.httpClient.get(
      environment.apiUrl + "employer/profile",
      this.options
    );
  }

  updateProfile(employerInfo) {
    return this.httpClient.put(
      environment.apiUrl + "employer/profile",
      employerInfo,
      this.options
    );
  }

  uploadProfileImage(file: any) {
    return this.httpClient.put(environment.apiUrl + "employer/photo", file, {
      observe: "body",
      withCredentials: true,
      headers: new HttpHeaders().append(
        "__ex__",
        localStorage.getItem("__ex__")
      )
    });
  }

  changePassword(passwordInfo) {
    return this.httpClient.put(
      environment.apiUrl + "employer/password",
      passwordInfo,
      this.options
    );
  }

  updateCompany(companyInfo) {
    return this.httpClient.put(
      environment.apiUrl + "employer/company",
      companyInfo,
      this.options
    );
  }
}
