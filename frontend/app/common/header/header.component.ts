import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";

import { UserService, EmployerService } from "./../../core/http";
import { PasswordValidator } from "./password-validator";
import { UserAuthService } from "../../core/services";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isEmployerIsSelected: Boolean = false;

  loginModal: BsModalRef | null;
  registerModal: BsModalRef | null;

  notifications = [
    "Asim has applied to your posted job id 1233",
    "Arif sent cv at job id 1002"
  ];

  registerForm: FormGroup;
  loginForm: FormGroup;
  formHelpers = null;

  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private employerService: EmployerService,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit() {
    this.formHelpers = {
      hide: true
    };

    this.registerForm = this.fb.group(
      {
        username: ["", [Validators.required, Validators.minLength(4)]],
        name: ["", [Validators.required, Validators.minLength(4)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(6)]]
      },
      { validator: PasswordValidator.MatchPassword }
    );

    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegistrationFormSubmit() {
    if (!this.registerForm.valid) {
      return;
    }
    if (this.isEmployerIsSelected) {
      this.employerService.register(this.registerForm.value).subscribe(
        data => {
          this.toastr.success(data["success"]);
          this.closeRegisterModal();
        },
        err => {
          this.toastr.error(err.error["error"] || "Something went wrong.");
        }
      );
    } else {
      this.userService.register(this.registerForm.value).subscribe(
        data => {
          this.toastr.success(data["success"]);
          this.closeRegisterModal();
        },
        err => {
          this.toastr.error(err.error["error"] || "Something went wrong.");
        }
      );
    }
  }

  onLoginFormSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    if (this.isEmployerIsSelected) {
      this.employerService.login(this.loginForm.value).subscribe(
        data => {
          this.closeLoginModal();
          localStorage.setItem("__ex__", data["token"]);
          this.toastr.success(data["success"]);
        },
        err => {
          this.toastr.error(err.error["error"] || "Something went wrong.");
        }
      );
    } else {
      this.userService.login(this.loginForm.value).subscribe(
        data => {
          this.closeLoginModal();
          localStorage.setItem("__jsx__", data["token"]);
          this.toastr.success(data["success"]);
        },
        err => {
          this.toastr.error(err.error["error"] || "Something went wrong.");
        }
      );
    }
  }

  onJobSeekerLogout() {
    this.userService.logout().subscribe(
      data => {
        this.toastr.info(data["success"]);
        localStorage.removeItem("__jsx__");
        this.router.navigate(["/"]);
      },
      err => {
        if (err.error["notLoggedIn"]) {
          this.toastr.error(err.error["notLoggedIn"]);
          localStorage.removeItem("__jsx__");
        } else {
          this.toastr.error(err.error["error"] || "Something went wrong.");
        }
      }
    );
  }

  onEmployerLogout() {
    this.employerService.logout().subscribe(
      data => {
        this.toastr.info(data["success"]);
        localStorage.removeItem("__ex__");
        this.router.navigate(["/"]);
      },
      err => {
        if (err.error["notLoggedIn"]) {
          this.toastr.error(err.error["notLoggedIn"]);
          localStorage.removeItem("__ex__");
        } else {
          this.toastr.error(err.error["error"] || "Something went wrong.");
        }
      }
    );
  }

  get username() {
    return this.registerForm.get("username");
  }

  get name() {
    return this.registerForm.get("name");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("password");
  }
  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }

  get loginEmail() {
    return this.loginForm.get("email");
  }

  get loginPassword() {
    return this.loginForm.get("password");
  }

  openJobSeekerRegisterModal(template: TemplateRef<any>) {
    this.isEmployerIsSelected = false;
    this.openRegisterModal(template);
  }

  openJobSeekerLoginModal(template: TemplateRef<any>) {
    this.isEmployerIsSelected = false;
    this.openLoginModal(template);
  }

  openEmployerRegisterModal(template: TemplateRef<any>) {
    this.isEmployerIsSelected = true;
    this.openRegisterModal(template);
  }

  openEmployerLoginModal(template: TemplateRef<any>) {
    this.isEmployerIsSelected = true;
    this.openLoginModal(template);
  }

  openRegisterModal(template: TemplateRef<any>) {
    this.closeLoginModal();
    this.registerModal = this.modalService.show(template, {
      class: "modal-md"
    });
  }

  openLoginModal(template: TemplateRef<any>) {
    this.closeRegisterModal();
    this.loginModal = this.modalService.show(template, {
      class: "modal-md"
    });
  }

  closeRegisterModal() {
    if (!this.registerModal) {
      return;
    }
    this.registerForm.reset();
    this.registerModal.hide();
    this.registerModal = null;
  }

  closeLoginModal() {
    if (!this.loginModal) {
      return;
    }
    this.loginForm.reset();
    this.loginModal.hide();
    this.loginModal = null;
  }
}
