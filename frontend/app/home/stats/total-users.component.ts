import { UserService } from "./../../core/http/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-total-users",
  templateUrl: "./total-users.component.html",
  styleUrls: ["./total-users.component.scss"]
})
export class TotalUsersComponent implements OnInit {
  users;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
