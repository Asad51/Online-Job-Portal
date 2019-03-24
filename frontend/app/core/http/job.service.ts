import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class JobService {
  private options1: Object = {
    observe: "body",
    withCredentials: true,
    headers: new HttpHeaders()
      .append("Content-Type", "application/json")
      .append("__ex__", localStorage.getItem("__ex__"))
  };

  jobFilter = {
    title: "",
    location: "",
    category: "",
    type: ""
  };

  private options2: Object = {
    observe: "body",
    withCredentials: true,
    headers: new HttpHeaders()
      .append("Content-Type", "application/json")
      .append("__jsx__", localStorage.getItem("__jsx__"))
  };

  constructor(private http: HttpClient) {}

  getAllJobs() {
    return this.http.get(environment.apiUrl + "jobs", this.options1);
  }

  getJobById(id) {
    return this.http.get(environment.apiUrl + "jobs/" + id, this.options1);
  }

  postJob(jobInfo) {
    return this.http.post(environment.apiUrl + "jobs", jobInfo, this.options1);
  }

  updateJob(jobInfo) {
    return this.http.put(
      environment.apiUrl + "jobs/" + jobInfo["_id"],
      jobInfo,
      this.options1
    );
  }

  deleteJob(id) {
    return this.http.delete(environment.apiUrl + "jobs/" + id, this.options1);
  }

  getAllCategories() {
    return this.http.get(environment.apiUrl + "admin/categories");
  }
}
