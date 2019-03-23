import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ReturnStatement } from "@angular/compiler";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  private options: Object = {
    observe: "body",
    withCredentials: true,
    headers: new HttpHeaders()
      .append("Content-Type", "application/json")
      .append("__aux__", localStorage.getItem("__aux__"))
  };

  constructor(private httpClient: HttpClient) {}

  addAdmin(adminInfo) {
    return this.httpClient.post(
      environment.apiUrl + "admin/add-admin",
      adminInfo,
      this.options
    );
  }

  login(adminInfo) {
    return this.httpClient.post(environment.apiUrl + "admin/login", adminInfo);
  }

  logout() {
    return this.httpClient.get(
      environment.apiUrl + "admin/logout",
      this.options
    );
  }

  addCategory(category) {
    return this.httpClient.post(
      environment.apiUrl + "admin/categories",
      category,
      this.options
    );
  }
}
