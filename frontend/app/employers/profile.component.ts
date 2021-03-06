import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
declare let $: any;
import { EmployerService } from "../core/http";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  constructor(
    private employerService: EmployerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    $("#sidebarToggleEmp").on("click", function(e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
    });
  }

  onLogout() {
    this.employerService.logout().subscribe(
      data => {
        this.toastr.info(data["success"]);
        localStorage.removeItem("__ex__");
        this.router.navigate(["/"]);
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
