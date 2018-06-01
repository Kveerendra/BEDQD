import { BrowserModule } from '@angular/platform-browser';
import { NgModule, keyframes, APP_INITIALIZER } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyHighlightsModule } from './key-highlights/key-highlights.module';
import { DataQualityMoniteringModule } from './data-quality-monitering/data-quality-monitering.module';
import { MeasureRemidateDataQualityModule } from './measure-remidate-data-quality/measure-remidate-data-quality-module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { InternalControlsModule } from './internal-controls/internal-controls.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataProvider } from './shared/DataProvider';
import {MeasureRemidiateDataProvider} from './shared/MeasureRemidateDataProvider';

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
  providers: [
    DataProvider,
    { 
      provide: APP_INITIALIZER, 
      useFactory: dataProviderFactory,
      deps: [DataProvider], multi: true
     },
     MeasureRemidiateDataProvider,
     {
       provide: APP_INITIALIZER,
       useFactory:MeasureRemidiateDataProviderFactory,
       deps: [MeasureRemidiateDataProvider], multi: true
     }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function dataProviderFactory(provider: DataProvider) {
  return () => provider.loadinternalControlsJsonObject();
}
export function MeasureRemidiateDataProviderFactory(provider: MeasureRemidiateDataProvider) {
  return () => provider.loadMeasureRemidateJsonObject();
}
