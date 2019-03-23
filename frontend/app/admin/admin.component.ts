import { AdminService } from "./../core/http/admin.service";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  categoryModal: BsModalRef | null;
  categoryForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ["", Validators.required],
      value: ["", Validators.required]
    });
  }

  onClickAddCategory(template: TemplateRef<any>) {
    this.categoryModal = this.modalService.show(template, {
      class: "modal-md"
    });
  }

  onSubmitCategoryForm() {
    if (this.categoryForm.invalid) {
      return;
    }

    this.adminService.addCategory(this.categoryForm.value).subscribe(
      data => {
        this.toastr.success(data["success"]);
      },
      err => {
        this.errHandler(err);
      }
    );

    this.categoryForm.reset();
    this.categoryModal.hide();
  }

  onCancel() {
    this.categoryForm.reset();
    this.categoryModal.hide();
  }

  errHandler(err) {
    this.toastr.error(
      err.error["error"] || err.error["notLoggedIn"] || "Something went wrong."
    );
    if (err.error["notLoggedIn"]) {
      localStorage.removeItem("__aux__");
    }
  }

  get name() {
    return this.categoryForm.get("name");
  }

  value() {
    return this.categoryForm.get("value");
  }
}
