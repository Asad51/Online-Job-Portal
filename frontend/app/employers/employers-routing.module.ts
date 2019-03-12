import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileComponent } from "./profile.component";
import { PageNotFoundComponent } from "../shared/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "profile", component: ProfileComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployersRoutingModule {}
