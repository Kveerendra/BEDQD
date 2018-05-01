import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridComponent } from './grid/grid.component';
import {AgGridModule} from 'ag-grid-angular';
import { Grid2Component } from './grid2/grid2.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { Grid3Component } from './grid3/grid3.component';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule.withComponents([

  ]),
  AngularFontAwesomeModule
  ],
  declarations: [GridComponent, Grid2Component, Grid3Component],
  exports: [GridComponent, Grid2Component, Grid3Component]
})
export class SharedModule { }
