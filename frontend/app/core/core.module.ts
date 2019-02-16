import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  BsModalService,
  ComponentLoaderFactory,
  PositioningService
} from "ngx-bootstrap";

import { UserService } from "./http";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    UserService,
    BsModalService,
    ComponentLoaderFactory,
    PositioningService
  ]
})
export class CoreModule {}
