import { PostJobComponent } from "./post-job/post-job.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileComponent } from "./profile.component";
import { PageNotFoundComponent } from "../shared/page-not-found/page-not-found.component";
import { SummaryComponent } from "./summary/summary.component";
import { ProfileViewComponent } from "./profile-view/profile-view.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: ProfileComponent,
    children: [
      { path: "", component: SummaryComponent },
      { path: "profile", component: ProfileViewComponent },
      { path: "edit", component: ProfileEditComponent },
      { path: "post-job", component: PostJobComponent }
    ]
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployersRoutingModule {}
