import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import { UserService } from "../../core/http";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"]
})
export class EditProfileComponent implements OnInit {
  panelOpenState = false;
  personalInfoForm: FormGroup;
  passwordChangeForm: FormGroup;
  user: Object = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.personalInfoForm = this.fb.group({
      name: ["", [Validators.required]],
      fatherName: [""],
      motherName: [""],
      gender: [""],
      birthDate: ["", [Validators.required]],
      religion: [""],
      maritalStatus: [""],
      nationality: ["", [Validators.required]],
      nid: ["", [Validators.pattern(/^\d{13}$|^\d{17}$/)]]
    });
  }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.userService.getProfile().subscribe(
      data => {
        this.user = data;
        this.name.setValue(data["name"] || "");
        this.fatherName.setValue(data["fatherName"] || "");
        this.motherName.setValue(data["motherName"] || "");
        this.gender.setValue(data["gender"] || "Male");
        this.birthDate.setValue(data["birthDate"] || "");
        this.religion.setValue(data["religion"] || "");
        this.maritalStatus.setValue(data["maritalStatus"] || "");
        this.nationality.setValue(data["nationality"] || "");
        this.nid.setValue(data["nid"] || "");
      },
      err => {
        this.toastr.error(
          err.error["notLoggedIn"] ||
            err.error["error"] ||
            "Something went wrong"
        );
      }
    );
  }

  onPersonalInfoFormSubmit() {
    if (!this.personalInfoForm.valid) {
      return;
    }

    this.userService.updateProfile(this.personalInfoForm.value).subscribe(
      data => {
        this.toastr.success(data["success"]);
        this.getUserData();
      },
      err => {
        this.toastr.error(
          err.error["notLoggedIn"] ||
            err.error["error"] ||
            "Something went wrong"
        );
      }
    );
  }

  get name() {
    return this.personalInfoForm.get("name");
  }

  get fatherName() {
    return this.personalInfoForm.get("fatherName");
  }

  get motherName() {
    return this.personalInfoForm.get("motherName");
  }

  get gender() {
    return this.personalInfoForm.get("gender");
  }

  get birthDate() {
    return this.personalInfoForm.get("birthDate");
  }

  get religion() {
    return this.personalInfoForm.get("religion");
  }

  get maritalStatus() {
    return this.personalInfoForm.get("maritalStatus");
  }

  get nationality() {
    return this.personalInfoForm.get("nationality");
  }

  get nid() {
    return this.personalInfoForm.get("nid");
  }
}
