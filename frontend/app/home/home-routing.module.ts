import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home.component";
import { TermsComponent } from "./terms/terms.component";
import { PageNotFoundComponent } from "./../shared/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "terms", component: TermsComponent },
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
