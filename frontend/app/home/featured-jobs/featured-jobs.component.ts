import { ToastrService } from "ngx-toastr";
import { JobService } from "./../../core/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-featured-jobs",
  templateUrl: "./featured-jobs.component.html",
  styleUrls: ["./featured-jobs.component.scss"]
})
export class FeaturedJobsComponent implements OnInit {
  jobs;
  constructor(private jobService: JobService, private toastr: ToastrService) {}

  ngOnInit() {
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
        this.errHandler(err);
      }
    );
  }

  errHandler(err) {
    this.toastr.error(
      err.error["error"] || err.error["notLoggedIn"] || "Something went wrong"
    );
  }
}
