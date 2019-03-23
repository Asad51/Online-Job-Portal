import { AdminComponent } from "./admin.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "../shared/page-not-found/page-not-found.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";

const routes: Routes = [
  { path: "", component: AdminComponent, pathMatch: "full" },
  { path: "login", component: AdminLoginComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
