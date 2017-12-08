import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridComponent } from './grid/grid.component';
import {AgGridModule} from "ag-grid-angular";

@NgModule({
  imports: [
    CommonModule,
    AgGridModule.withComponents([

  ])
  ],
  declarations: [GridComponent],
  exports: [GridComponent]
})
export class SharedModule { }
