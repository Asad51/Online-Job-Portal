import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { JobService } from "./../core/http/job.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
declare let $: any;

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  jobForm: FormGroup;
  categories;
  public quotes = [
    "Find the career you deserve.",
    "Search, find and apply for jobs directly.",
    "Manage all of the jobs you have applied."
  ];

  constructor(
    private jobService: JobService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.jobService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      },
      err => {
        console.log(err);
      }
    );
    this.jobForm = this.fb.group({
      title: [""],
      category: [""]
    });

    $(document).ready(function() {
      $(".owl-carousel").owlCarousel({
        animateOut: "fadeOut",
        items: 1,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true
      });
    });
  }

  onSubmitSearchForm() {
    this.jobService.jobFilter["title"] = this.jobForm.value["title"];
    this.jobService.jobFilter["category"] = this.jobForm.value["category"];
    this.router.navigate(["jobs"]);
  }

  get title() {
    return this.jobForm.get("title");
  }

  get category() {
    return this.jobForm.get("category");
  }
}
