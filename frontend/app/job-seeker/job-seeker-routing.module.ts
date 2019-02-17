import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { JobSeekerProfileComponent } from "./job-seeker-profile.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { PageNotFoundComponent } from "./../shared/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: JobSeekerProfileComponent,
    children: [
      { path: "", component: EditProfileComponent, pathMatch: "full" },
      { path: "edit", component: EditProfileComponent }
    ]
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobSeekerRoutingModule {}
