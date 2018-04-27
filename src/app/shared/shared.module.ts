import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridComponent } from './grid/grid.component';
import {AgGridModule} from "ag-grid-angular";
import { Grid2Component } from './grid2/grid2.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule.withComponents([

  ]),
  AngularFontAwesomeModule
  ],
  declarations: [GridComponent, Grid2Component],
  exports: [GridComponent,Grid2Component]
})
export class SharedModule { }
