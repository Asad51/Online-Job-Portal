import { ToastrService } from "ngx-toastr";
import { JobService } from "./../../core/http";
import { Component, OnInit } from "@angular/core";
import { ThirdPartyModule } from "frontend/app/shared/third-party-module";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  categories;
  constructor(private jobService: JobService, private toastr: ToastrService) {}

  ngOnInit() {
    this.jobService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      },
      err => {
        this.toastr.error(err.error["error"] || "Something went wrong.");
      }
    );
  }
}
