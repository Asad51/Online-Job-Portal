import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "./material.module";
import { ThirdPartyModule } from "./third-party-module";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { FilterPipe } from "./pipes/filter.pipe";

@NgModule({
  declarations: [PageNotFoundComponent, FilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ThirdPartyModule,
    RouterModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ThirdPartyModule,
    MaterialModule,
    PageNotFoundComponent,
    RouterModule,
    FilterPipe
  ]
})
export class SharedModule {}
