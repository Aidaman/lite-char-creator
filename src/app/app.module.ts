import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ControlComponent} from './char-display/control/control.component';
import {DisplayComponent} from './char-display/display/display.component';
import {StartPageComponent} from './start-page/start-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ThemingComponent} from './char-display/theming/theming.component';
import {ColorPickerModule} from "ngx-color-picker";
import {ColorSketchModule} from "ngx-color/sketch";
import {ColorChromeModule} from "ngx-color/chrome";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { EndComponent } from './end/end.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlComponent,
    DisplayComponent,
    StartPageComponent,
    ThemingComponent,
    EndComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    ColorSketchModule,
    ColorChromeModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
