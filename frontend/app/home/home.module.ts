import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { TermsComponent } from "./terms/terms.component";
import { SharedModule } from "../shared/shared.module";
import { SearchComponent } from './search.component';
import { TotalJobsComponent } from './stats/total-jobs.component';
import { TotalCompaniesComponent } from './stats/total-companies.component';
import { TotalUsersComponent } from './stats/total-users.component';

@NgModule({
  declarations: [HomeComponent, TermsComponent, SearchComponent, TotalJobsComponent, TotalCompaniesComponent, TotalUsersComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule]
})
export class HomeModule {}
