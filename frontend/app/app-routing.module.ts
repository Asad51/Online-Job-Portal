import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "user",
    loadChildren: "./job-seeker/job-seeker.module#JobSeekerModule"
  },
  {
    path: "employer",
    loadChildren: "./employers/employers.module#EmployersModule"
  },
  { path: "admin", loadChildren: "./admin/admin.module#AdminModule" },
  { path: "jobs", loadChildren: "./jobs/jobs.module#JobsModule" },
  { path: "", loadChildren: "./home/home.module#HomeModule" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
