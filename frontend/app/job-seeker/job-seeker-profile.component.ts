import { Component, OnInit } from "@angular/core";
declare let $: any;
@Component({
  selector: "app-job-seeker-profile",
  templateUrl: "./job-seeker-profile.component.html",
  styleUrls: ["./job-seeker-profile.component.scss"]
})
export class JobSeekerProfileComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    $("#sidebarToggle, #sidebarToggleTop").on("click", function(e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
    });
  }
}
