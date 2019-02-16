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

import { ModalModule } from "ngx-bootstrap";

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
    ToastrModule,
    ModalModule,
    MatMenuModule
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
    MatMenuModule
  ]
})
export class ThirdPartyModule {}
