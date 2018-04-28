import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular2-chartjs';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MeasureRemidateDQService } from './measure-remidate-data-quality.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { MeasureRemidateDataQualityComponent } from './measure-remidate-data-quality.component';

@NgModule({
  imports: [
    CommonModule,
    ChartModule,
    SharedModule,
    FormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [MeasureRemidateDataQualityComponent],
  exports: [MeasureRemidateDataQualityComponent],
  providers: [MeasureRemidateDQService]
})
export class MeasureRemidateDataQualityModule { }
