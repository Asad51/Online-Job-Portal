import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { EmployerService } from "../core/http";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  employer: Object = null;

  constructor(
    private employerService: EmployerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEmployerProfile();
  }

  getEmployerProfile() {
    this.employerService.getProfile().subscribe(
      data => {
        this.employer = data;
        console.log(this.employer);
      },
      err => {
        this.toastr.error(
          err.error["notLoggedIn"] ||
            err.error["error"] ||
            "Something went wrong."
        );
        if (err.error && err.error["notLoggedIn"]) {
          localStorage.removeItem("__ex__");
          this.router.navigate(["/"]);
        }
      }
    );
  }
}
