import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import {
  BsModalService,
  ComponentLoaderFactory,
  PositioningService
} from "ngx-bootstrap";

import { UserService } from "./http";
import { UserAuthService } from "./services";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    UserService,
    UserAuthService,
    BsModalService,
    ComponentLoaderFactory,
    PositioningService
  ]
})
export class CoreModule {}
