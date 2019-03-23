import { AdminService } from "./../../core/http/admin.service";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.scss"]
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  formHelpers = {
    hide: true
  };
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  onLoginFormSubmit() {
    this.adminService.login(this.loginForm.value).subscribe(
      data => {
        this.toastr.success(data["success"]);
        localStorage.setItem("__aux__", data["token"]);
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
    if (err.error["notLoggedIn"]) {
      localStorage.removeItem("__aux__");
      this.router.navigate(["admin", "login"]);
    }
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }
}
