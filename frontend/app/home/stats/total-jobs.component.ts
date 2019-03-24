import { JobService } from "./../../core/http/job.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-total-jobs",
  templateUrl: "./total-jobs.component.html",
  styleUrls: ["./total-jobs.component.scss"]
})
export class TotalJobsComponent implements OnInit {
  jobs;
  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.jobService.getAllJobs().subscribe(data => {
      this.jobs = data;
    });
  }
}
