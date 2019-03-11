import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import { UserService } from "../../core/http";

declare let $: any;
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
  academicForm: FormGroup;
  othersInfoForm: FormGroup;
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

    this.othersInfoForm = this.fb.group({
      academicInfo: this.fb.array([]),
      workExperience: this.fb.array([
        this.fb.group({
          orgName: ["", [Validators.required]],
          position: ["", [Validators.required]],
          joinDate: ["", [Validators.required]],
          resignDate: ["", [Validators.required]],
          salary: ["", [Validators.required]]
        })
      ])
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
          .setValue(data["permanentAddress"].street || "");
        this.permanentAddress
          .get("city")
          .setValue(data["permanentAddress"].city || "");
        this.permanentAddress
          .get("zipCode")
          .setValue(data["permanentAddress"].zipCode || "");
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

  onAddSkill(skill) {
    if (this.user["skills"].length >= 20) {
      this.toastr.warning("You can't add more skills.");
      return;
    }
    this.user["skills"].push(skill.toLowerCase());
    this.updateSkills(
      this.user["skills"].filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
    );
  }

  onRemoveSkill(skill) {
    let i = this.user["skills"].indexOf(skill);
    this.user["skills"].splice(i, 1);
    this.updateSkills(this.user["skills"]);
  }

  updateSkills(skills) {
    this.userService.updateOthers({ skills: skills }).subscribe(
      data => {
        this.toastr.success("Skills updated successfully.");
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

  onAddAcademicInfo() {
    let control = this.fb.group({
      examTitle: ["", [Validators.required]],
      major: ["", [Validators.required]],
      institute: ["", [Validators.required]],
      result: ["", [Validators.required]],
      passingYear: ["", [Validators.required]],
      duration: ["", [Validators.required]],
      board: ["", [Validators.required]]
    });

    (<FormArray>this.othersInfoForm.get("academicInfo")).push(control);
  }

  onOthersInfoFormSubmit() {
    if (!this.othersInfoForm.valid) {
      return;
    }
    this.userService.updateOthers(this.othersInfoForm.value).subscribe(
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

  get academicInfo() {
    return this.othersInfoForm.get("academicInfo");
  }

  get workExperience() {
    return this.othersInfoForm.get("workExperience");
  }
}
