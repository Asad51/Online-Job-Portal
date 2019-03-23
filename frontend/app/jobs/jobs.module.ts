import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { JobsRoutingModule } from "./jobs-routing.module";
import { JobsComponent } from "./jobs.component";
import { JobDetailsComponent } from "./job-details/job-details.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [JobsComponent, JobDetailsComponent],
  imports: [CommonModule, JobsRoutingModule, SharedModule]
})
export class JobsModule {}
