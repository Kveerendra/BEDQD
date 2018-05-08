import { BrowserModule } from '@angular/platform-browser';
import { NgModule, keyframes } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyHighlightsModule } from './key-highlights/key-highlights.module';
import { DataQualityMoniteringModule } from './data-quality-monitering/data-quality-monitering.module';
import { MeasureRemidateDataQualityModule } from './measure-remidate-data-quality/measure-remidate-data-quality-module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { InternalControlsModule } from './internal-controls/internal-controls.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    KeyHighlightsModule,
    DataQualityMoniteringModule,
    MeasureRemidateDataQualityModule,
    AngularFontAwesomeModule,
  InternalControlsModule,
  BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent ]
})
export class AppModule { }
