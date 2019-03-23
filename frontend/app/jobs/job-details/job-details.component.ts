import { ToastrService } from "ngx-toastr";
import { JobService } from "./../../core/http/job.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-job-details",
  templateUrl: "./job-details.component.html",
  styleUrls: ["./job-details.component.scss"]
})
export class JobDetailsComponent implements OnInit {
  job;
  deadline;

  constructor(
    private jobService: JobService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params["id"];
    this.jobService.getJobById(id).subscribe(
      data => {
        this.job = data;
        let date = new Date(data["deadline"]);
        this.deadline =
          date.getDate() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getFullYear();
      },
      err => {
        this.router.navigate(["jobs/error/not-found"], {
          skipLocationChange: true
        });
      }
    );
  }
}
