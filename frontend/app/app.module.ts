import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { AppComponent } from "./app.component";
import { MyCommonModule } from "./common/my-common.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, MyCommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
