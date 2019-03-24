import { Component, OnInit } from "@angular/core";
import { JobService } from "../core/http";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"]
})
export class JobsComponent implements OnInit {
  jobs;
  jobFilter;
  jobTypes = ["full-time", "half-time", "intern", "hourly"];
  jobCategories;
  constructor(public jobService: JobService, private toastr: ToastrService) {}

  ngOnInit() {
    this.jobFilter = this.jobService.jobFilter;
    this.jobService.getAllJobs().subscribe(
      data => {
        this.jobs = data;
        this.jobs = this.jobs.map(job => {
          let date = new Date(job.deadline);
          job["deadline"] =
            date.getDate() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getFullYear();
          return job;
        });
      },
      err => {
        console.log(err);
        this.errHandler(err);
      }
    );

    this.jobService.getAllCategories().subscribe(data => {
      this.jobCategories = data;
    }),
      err => {
        console.log(err);
      };
  }

  onChange(e) {
    // console.log(e.value);
    this.jobFilter[e.name] = e.value;
  }

  errHandler(err) {
    this.toastr.error(
      err.error["error"] || err.error["notLoggedIn"] || "Something went wrong"
    );
  }
}
