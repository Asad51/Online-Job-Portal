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
      if ($(".sidebar").hasClass("toggled")) {
        //$(".sidebar .collapse").collapse("hide");
      }
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(function() {
      if ($(window).width() < 768) {
        //$(".sidebar .collapse").collapse("hide");
      }
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    // $("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel", function(
    //   e
    // ) {
    //   if ($(window).width() > 768) {
    //     var e0 = e.originalEvent,
    //       delta = e0.wheelDelta || -e0.detail;
    //     this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    //     e.preventDefault();
    //   }
    // });
  }
}
