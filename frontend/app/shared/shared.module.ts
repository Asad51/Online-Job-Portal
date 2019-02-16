import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ThirdPartyModule } from "./third-party-module";

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ThirdPartyModule],
  exports: [FormsModule, ReactiveFormsModule, ThirdPartyModule],
  providers: []
})
export class SharedModule {}
