import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isJobSeekerLoggedIn = false;
  isEmployerLoggedIn = true;
  isAdminLoggedIn = false;

  notifications = [
    "Asim has applied to your posted job id 1233",
    "Arif sent cv at job id 1002"
  ];

  userName = "Asad";

  constructor() {}

  ngOnInit() {}
}
