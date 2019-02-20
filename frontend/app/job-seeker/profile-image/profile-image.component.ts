import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

import { UserService } from "./../../core/http";

@Component({
  selector: "app-profile-image",
  templateUrl: "./profile-image.component.html",
  styleUrls: ["./profile-image.component.scss"]
})
export class ProfileImageComponent implements OnInit {
  profileImage: FormControl;
  imageFile: File = null;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.profileImage = new FormControl(["", [Validators.required]]);
  }

  onChangeImage(event) {
    this.imageFile = event.target.files[0];
  }

  onImageUpload() {
    if (!this.imageFile) {
      this.toastr.warning("Select an image.");
      return;
    }
    const fd = new FormData();
    fd.append("profileImage", this.imageFile, this.imageFile.name);
    this.userService.uploadProfileImage(fd).subscribe(
      data => {
        this.toastr.success(data["success"]);
      },
      err => {
        this.toastr.error(err.error["error"] || "Error");
      }
    );
  }
}
