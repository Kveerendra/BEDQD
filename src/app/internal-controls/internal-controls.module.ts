import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalControlsPageComponent } from './internal-controls-page/internal-controls-page.component';
import { ChartModule } from 'angular2-chartjs';
import { SharedModule } from '../shared/shared.module';
import { LabelPercentageComponent } from './label-percentage/label-percentage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InternalControlService } from './service/internal-control.service';
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
  declarations: [InternalControlsPageComponent, LabelPercentageComponent],
  exports: [InternalControlsPageComponent],
  providers: [InternalControlService]
})
export class InternalControlsModule {}
