import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EmployersRoutingModule } from "./employers-routing.module";
import { ProfileComponent } from "./profile.component";
import { SharedModule } from "../shared/shared.module";
import { SummaryComponent } from './summary/summary.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@NgModule({
  declarations: [ProfileComponent, SummaryComponent, ProfileViewComponent, ProfileEditComponent],
  imports: [CommonModule, EmployersRoutingModule, SharedModule]
})
export class EmployersModule {}
