import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-job-seeker-resume",
  templateUrl: "./job-seeker-resume.component.html",
  styleUrls: ["./job-seeker-resume.component.scss"]
})
export class JobSeekerResumeComponent implements OnInit {
  user = {
    name: "Md. Asadul Islam",
    phone: "017272822"
  };
  constructor() {}

  ngOnInit() {}
}
