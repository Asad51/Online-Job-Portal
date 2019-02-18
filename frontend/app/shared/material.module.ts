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
  MatMenuModule,
  MatTabsModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatRadioModule
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

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
    MatTabsModule,
    MatExpansionModule,
    MatMenuModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatRadioModule
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
    MatExpansionModule,
    MatTabsModule,
    MatMenuModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatRadioModule
  ]
})
export class MaterialModule {}
