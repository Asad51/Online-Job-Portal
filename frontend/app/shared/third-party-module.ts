import { NgModule } from "@angular/core";
import {
  ModalModule,
  BsDropdownModule,
  BsDatepickerModule
} from "ngx-bootstrap";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  imports: [
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-top-right"
    }),
    ModalModule,
    BsDropdownModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [ToastrModule, ModalModule, BsDropdownModule, BsDatepickerModule]
})
export class ThirdPartyModule {}
