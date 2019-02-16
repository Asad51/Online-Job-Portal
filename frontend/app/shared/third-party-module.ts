import { NgModule } from "@angular/core";
import {
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSelectModule,
  MatMenuModule
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ModalModule, BsDropdownModule } from "ngx-bootstrap";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-top-right"
    }),
    ModalModule,
    MatMenuModule,
    BsDropdownModule,
    FlexLayoutModule
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    ToastrModule,
    ModalModule,
    MatMenuModule,
    BsDropdownModule,
    FlexLayoutModule
  ]
})
export class ThirdPartyModule {}
