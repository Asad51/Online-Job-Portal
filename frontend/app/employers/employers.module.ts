import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EmployersRoutingModule } from "./employers-routing.module";
import { ProfileComponent } from "./profile.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, EmployersRoutingModule, SharedModule]
})
export class EmployersModule {}
