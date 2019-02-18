import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../../core/http";

@Component({
  selector: "app-job-seeker-resume",
  templateUrl: "./job-seeker-resume.component.html",
  styleUrls: ["./job-seeker-resume.component.scss"]
})
export class JobSeekerResumeComponent implements OnInit {
  user: Object = null;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getProfile().subscribe(
      data => {
        this.user = data;
      },
      err => {
        this.toastr.error(
          err.error["notLoggedIn"] ||
            err.error["error"] ||
            "Something went wrong."
        );
        if (err.error && err.error["notLoggedIn"]) {
          localStorage.removeItem("__jsx__");
          this.router.navigate(["user", "login"]);
        }
      }
    );
  }
}
