import { ToastrService } from "ngx-toastr";
import { EmployerService } from "./../../core/http/employer.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile-edit",
  templateUrl: "./profile-edit.component.html",
  styleUrls: ["./profile-edit.component.scss"]
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  companyForm: FormGroup;
  employer: Object;
  profileImage: FormControl;
  imageFile: File = null;
  changeFileText = "Pick An Image";
  fileName = "";
  formHelpers = {
    hide: true
  };

  constructor(
    private fb: FormBuilder,
    private employerService: EmployerService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern(/^01\d{9}$/)]]
    });

    this.passwordForm = this.fb.group({
      oldPassword: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\S+$/),
          Validators.minLength(6)
        ]
      ],
      newPassword: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\S+$/),
          Validators.minLength(6)
        ]
      ],
      confirmPassword: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\S+$/),
          Validators.minLength(6)
        ]
      ]
    });
  }

  ngOnInit() {
    this.profileImage = new FormControl(["", [Validators.required]]);
    this.getEmployerData();
  }

  getEmployerData() {
    this.employerService.getProfile().subscribe(
      data => {
        this.employer = data;
        this.name.setValue(data["name"] || "");
        this.email.setValue(data["email"] || "");
        this.phone.setValue(data["phone"] || "");
      },
      err => {
        this.errorHandler(err);
      }
    );
  }

  onSubmitProfileForm() {
    if (this.profileForm.invalid) {
      return;
    }

    this.employerService.updateProfile(this.profileForm.value).subscribe(
      data => {
        this.toastr.success(data["success"]);
        this.getEmployerData();
      },
      err => {
        this.errorHandler(err);
      }
    );
  }

  onChangeImage(event) {
    this.imageFile = event.target.files[0];
    this.fileName = this.imageFile.name;
    this.changeFileText = "Change Image";
  }

  onImageUpload() {
    if (!this.imageFile) {
      this.toastr.warning("Select an image.");
      return;
    }
    const fd = new FormData();
    fd.append("profileImage", this.imageFile, this.imageFile.name);
    this.employerService.uploadProfileImage(fd).subscribe(
      data => {
        this.toastr.success(data["success"]);
      },
      err => {
        this.errorHandler(err);
      }
    );
  }

  onPasswordFormSubmit() {
    if (this.passwordForm.invalid) return;
    this.employerService
      .changePassword(this.passwordForm.value)
      .subscribe(data => {
        this.passwordForm.reset();
        this.toastr.success(data["success"]);
      }),
      err => {
        this.errorHandler(err);
      };
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

  get name() {
    return this.profileForm.get("name");
  }

  get email() {
    return this.profileForm.get("email");
  }

  get phone() {
    return this.profileForm.get("phone");
  }

  get oldPassword() {
    return this.passwordForm.get("oldPassword");
  }

  get newPassword() {
    return this.passwordForm.get("newPassword");
  }

  get confirmPassword() {
    return this.passwordForm.get("confirmPassword");
  }
}
