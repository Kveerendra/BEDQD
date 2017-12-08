import { BrowserModule } from '@angular/platform-browser';
import { NgModule, keyframes } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyHighlightsModule } from './key-highlights/key-highlights.module';
import { DataQualityMoniteringModule } from './data-quality-monitering/data-quality-monitering.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    KeyHighlightsModule,
    DataQualityMoniteringModule
  ],
  providers: [],
  bootstrap: [AppComponent ]
})
export class AppModule { }
