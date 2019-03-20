import { JobService } from "./http/job.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import {
  BsModalService,
  ComponentLoaderFactory,
  PositioningService,
  BsDatepickerConfig
} from "ngx-bootstrap";

import { UserService, EmployerService } from "./http";
import { UserAuthService } from "./services";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    UserService,
    UserAuthService,
    EmployerService,
    JobService,
    BsModalService,
    ComponentLoaderFactory,
    PositioningService,
    BsDatepickerConfig
  ]
})
export class CoreModule {}
