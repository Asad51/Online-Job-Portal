import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";
import { JobSeekerRoutingModule } from "./job-seeker-routing.module";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { JobSeekerProfileComponent } from "./job-seeker-profile.component";
import { JobSeekerStatsComponent } from "./job-seeker-stats/job-seeker-stats.component";
import { JobSeekerResumeComponent } from "./job-seeker-resume/job-seeker-resume.component";
import { ProfileImageComponent } from "./profile-image/profile-image.component";

@NgModule({
  declarations: [
    EditProfileComponent,
    JobSeekerProfileComponent,
    JobSeekerStatsComponent,
    JobSeekerResumeComponent,
    ProfileImageComponent
  ],
  imports: [CommonModule, JobSeekerRoutingModule, SharedModule]
})
export class JobSeekerModule {}
