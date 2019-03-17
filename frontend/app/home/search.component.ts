import { Component, OnInit } from "@angular/core";
declare let $: any;

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  public quotes = ["Please Read Again.", "Go home.", "The world is round."];

  constructor() {}

  ngOnInit() {
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
}
