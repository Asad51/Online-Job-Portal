import { PageNotFoundComponent } from "./../shared/page-not-found/page-not-found.component";
import { JobDetailsComponent } from "./job-details/job-details.component";
import { JobsComponent } from "./jobs.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", component: JobsComponent, pathMatch: "full" },
  { path: ":id", component: JobDetailsComponent },
  { path: "error/not-found", component: PageNotFoundComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule {}
