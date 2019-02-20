import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { JobSeekerProfileComponent } from "./job-seeker-profile.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { PageNotFoundComponent } from "./../shared/page-not-found/page-not-found.component";
import { JobSeekerStatsComponent } from "./job-seeker-stats/job-seeker-stats.component";
import { JobSeekerResumeComponent } from "./job-seeker-resume/job-seeker-resume.component";
import { ProfileImageComponent } from "./profile-image/profile-image.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: JobSeekerProfileComponent,
    children: [
      { path: "", component: JobSeekerStatsComponent, pathMatch: "full" },
      { path: "edit", component: EditProfileComponent },
      { path: "view", component: JobSeekerResumeComponent },
      { path: "upload-image", component: ProfileImageComponent }
    ]
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobSeekerRoutingModule {}
