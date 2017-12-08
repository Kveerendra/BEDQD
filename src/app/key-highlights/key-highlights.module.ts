import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DqScoreComponent } from './dq-score/dq-score.component';
import { KeyHighlightsPageComponent } from './key-highlights-page/key-highlights-page.component';
import { ChartModule } from 'angular2-chartjs';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ChartModule,
    SharedModule
  ],
  declarations: [DqScoreComponent, KeyHighlightsPageComponent],
  exports: [KeyHighlightsPageComponent]
})
export class KeyHighlightsModule { }
