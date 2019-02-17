import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";
import { JobSeekerRoutingModule } from "./job-seeker-routing.module";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { JobSeekerProfileComponent } from "./job-seeker-profile.component";

@NgModule({
  declarations: [EditProfileComponent, JobSeekerProfileComponent],
  imports: [CommonModule, JobSeekerRoutingModule, SharedModule]
})
export class JobSeekerModule {}
