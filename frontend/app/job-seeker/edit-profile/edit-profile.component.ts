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
  panelOpenState = true;
  personalInfoForm: FormGroup;
  contactInfoForm: FormGroup;
  addressForm: FormGroup;
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
      birthDate: [new Date(""), [Validators.required]],
      religion: [""],
      maritalStatus: [""],
      nationality: ["", [Validators.required]],
      nid: ["", [Validators.pattern(/^\d{13}$|^\d{17}$/)]]
    });

    this.contactInfoForm = fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^\w+[a-z0-9._]{3,30}@[a-z0-9-_]{2,20}.[a-z]{2,15}$/i
          )
        ]
      ],
      phone: ["", [Validators.required, Validators.pattern(/^1\d{9}$/)]]
    });

    this.addressForm = this.fb.group({
      currentAddress: this.fb.group({
        street: ["", [Validators.required]],
        city: ["", [Validators.required]],
        zipCode: ["", [Validators.required, Validators.pattern(/^\w{4}$/)]]
      }),
      permanentAddress: this.fb.group({
        street: ["", [Validators.required]],
        city: ["", [Validators.required]],
        zipCode: ["", [Validators.required, Validators.pattern(/^\w{4}$/)]]
      })
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
        this.email.setValue(data["email"] || "");
        this.phone.setValue(data["phone"] || "");
        this.currentAddress
          .get("street")
          .setValue(data["currentAddress"].street || "");
        this.currentAddress
          .get("city")
          .setValue(data["currentAddress"].city || "");
        this.currentAddress
          .get("zipCode")
          .setValue(data["currentAddress"].zipCode || "");
        this.permanentAddress
          .get("street")
          .setValue(data["currentAddress"].street || "");
        this.permanentAddress
          .get("city")
          .setValue(data["currentAddress"].city || "");
        this.permanentAddress
          .get("zipCode")
          .setValue(data["currentAddress"].zipCode || "");
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
    this.personalInfoForm.value.birthDate.setMinutes(
      this.personalInfoForm.value.birthDate.getMinutes() -
        this.personalInfoForm.value.birthDate.getTimezoneOffset()
    );

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

  onContactInfoFormSubmit() {
    if (!this.contactInfoForm.valid) {
      return;
    }

    this.userService.updateContactInfo(this.contactInfoForm.value).subscribe(
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

  onAddressFormSubmit() {
    if (!this.addressForm.valid) {
      return;
    }
    this.userService.updateAddress(this.addressForm.value).subscribe(
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

  get email() {
    return this.contactInfoForm.get("email");
  }

  get phone() {
    return this.contactInfoForm.get("phone");
  }

  get currentAddress() {
    return this.addressForm.get("currentAddress");
  }

  get permanentAddress() {
    return this.addressForm.get("permanentAddress");
  }
}
