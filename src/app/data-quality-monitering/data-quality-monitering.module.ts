import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataQualityMoniteringPageComponent } from './data-quality-monitering-page/data-quality-monitering-page.component';
import { ChartModule } from 'angular2-chartjs';
import { SharedModule } from '../shared/shared.module';
import { LabelPercentageComponent } from './label-percentage/label-percentage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataQualityMoniteringService } from './service/data-quality-monitering.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    ChartModule,
    SharedModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  declarations: [DataQualityMoniteringPageComponent, LabelPercentageComponent],
  exports: [DataQualityMoniteringPageComponent],
  providers: [DataQualityMoniteringService]
})
export class DataQualityMoniteringModule { }
