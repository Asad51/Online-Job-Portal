import { JobService } from "./../../core/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-post-job",
  templateUrl: "./post-job.component.html",
  styleUrls: ["./post-job.component.scss"]
})
export class PostJobComponent implements OnInit {
  jobForm: FormGroup;
  jobTypes = ["full-time", "half-time", "intern", "hourly"];
  degrees = ["masters", "honors", "hsc", "ssc"];
  experiences = [
    "No Experience",
    "Below 1 Year",
    "1 to 2 years",
    "2 to 3 years",
    "3 to 5 years",
    "Above 5 years"
  ];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private jobService: JobService,
    private router: Router
  ) {
    this.jobForm = this.fb.group({
      jobTitle: ["", [Validators.required]],
      location: ["", [Validators.required]],
      company: ["", [Validators.required]],
      vacancy: ["", [Validators.required]],
      type: ["", [Validators.required]],
      experience: ["", [Validators.required]],
      salary: ["0", [Validators.required, Validators.min(0)]],
      deadline: ["", Validators.required],
      educationalRequirements: ["", [Validators.required]]
    });
  }

  ngOnInit() {}

  onSubmitJobForm() {
    this.jobService.postJob(this.jobForm.value).subscribe(
      data => {
        this.toastr.success(data["success"]);
      },
      err => {
        this.errorHandler(err);
      }
    );
  }

  errorHandler(err) {
    this.toastr.error(
      err.error["notLoggedIn"] || err.error["error"] || "Something went wrong."
    );
    if (err.error["notLoggedIn"]) {
      localStorage.removeItem("__ex__");
      this.router.navigate(["/"]);
    }
  }

  get jobTitle() {
    return this.jobForm.get("jobTitle");
  }

  get location() {
    return this.jobForm.get("location");
  }

  get company() {
    return this.jobForm.get("company");
  }

  get type() {
    return this.jobForm.get("type");
  }

  get experience() {
    return this.jobForm.get("experience");
  }

  get salary() {
    return this.jobForm.get("salary");
  }

  get deadline() {
    return this.jobForm.get("deadline");
  }

  get vacancy() {
    return this.jobForm.get("vacancy");
  }

  get educationalRequirements() {
    return this.jobForm.get("educationalRequirements");
  }
}
