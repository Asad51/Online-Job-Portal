import { EmployerService } from "./../../core/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-total-companies",
  templateUrl: "./total-companies.component.html",
  styleUrls: ["./total-companies.component.scss"]
})
export class TotalCompaniesComponent implements OnInit {
  companies;
  constructor(private employerService: EmployerService) {}

  ngOnInit() {
    this.employerService.getAllEmployer().subscribe(data => {
      this.companies = data;
    });
  }
}
