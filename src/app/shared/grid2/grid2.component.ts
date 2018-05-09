import { Component, OnInit } from '@angular/core';
import { MeasureRemidateDQService } from '../../measure-remidate-data-quality/measure-remidate-data-quality.service';
@Component({
  selector: 'app-grid2',
  templateUrl: './grid2.component.html',
  styleUrls: ['./grid2.component.css'],
  providers: [MeasureRemidateDQService]
})
export class Grid2Component implements OnInit {
  columnDefs;
  rowData = [];
  service: MeasureRemidateDQService;
  constructor(measureRemidateDQService: MeasureRemidateDQService) {
    this.columnDefs = [
      { headerName: 'Legal Entity/LOB', field: 'legalEntity' },
      { headerName: 'Current Quarter', field: 'crntQtr' },
      { headerName: 'Prior Quarter', field: 'prQtr' },
      { headerName: 'Change', field: 'change' }
    ];

    this.rowData = [];
    this.service = measureRemidateDQService;
  }

  ngOnInit() {
    this.service.getData().then(dataaa => {
      var tempVar = {};
      var tempArray = [];

      var appGridData = this.service.getissueSummaryLst();

      for (const itr_3 in appGridData) {
        if (tempVar[appGridData[itr_3]['legalEntity']]) {
          tempVar[appGridData[itr_3]['legalEntity']]['crntQtr'] =
            appGridData[itr_3]['currentQuarter'];
          tempVar[appGridData[itr_3]['legalEntity']]['prQtr'] =
            appGridData[itr_3]['priorQuarter'];
          tempVar[appGridData[itr_3]['legalEntity']]['change'] =
            appGridData[itr_3]['change'];
        } else {
          tempVar[appGridData[itr_3]['legalEntity']] = appGridData[itr_3];
          // console.log(tempVar[appGridData[itr_3]['legalEntity']]);
        }
      }

      for (const itr_4 in tempVar) {
        if (tempVar[itr_4]) {
          tempArray.push(tempVar[itr_4]);
        }
      }
      this.rowData = tempArray;

      //this.rowData = tempVar;
    });
  }
}
