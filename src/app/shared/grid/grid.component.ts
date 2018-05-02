import { Component, OnInit, ViewChild } from '@angular/core';
import { DataQualityMoniteringService } from '../../data-quality-monitering/service/data-quality-monitering.service';
import { Grid } from 'ag-grid';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  providers: [DataQualityMoniteringService]
})
export class GridComponent implements OnInit {
  @ViewChild('grid') grid: Grid;
  internalControlsFlag = false;
  columnDefs;
  rowData = [];
  gridOptions = {
    animateRows: true,
    enableRangeSelection: true,
    enableSorting: true
};

  service: DataQualityMoniteringService;
  constructor(dataQualityMoniteringService: DataQualityMoniteringService) {
    this.columnDefs = [
      { headerName: 'Database Name', field: 'databaseName' },
      {
        headerName: 'DQ Score',
        field: 'dataQualityScore',
        valueFormatter: this.percentageFormatter
      },
      {
        headerName: 'Change From Prior Quarter',
        field: 'chgFrmPrQtr',
        valueFormatter: this.percentageFormatter
      },
      { headerName: '#Records Passed', field: 'rcrdsPsd' },
      { headerName: '#Records Tested', field: 'rowsTstd' }
    ];

    this.rowData = [
      //  {make: 'Insurance Data Warehouse', model: '', price: '10.8%',Rpassed: '0',RFailed : ''},
      //  {make: 'People Soft', model: '', price: '0%',Rpassed: '228,730',RFailed : '229,264'}
    ];

    this.service = dataQualityMoniteringService;
  }

  ngOnInit() {
    if (!this.internalControlsFlag) {
      var rowDataWithKeys = {};
      this.service.getData().then(dataaa => {
        var recievedData_3 = this.service.getdQMonitoringDetailsbySourceSystem();
        for (var i in recievedData_3) {
          if (rowDataWithKeys[recievedData_3[i]['databaseName']]) {
            rowDataWithKeys[recievedData_3[i]['databaseName']]['rcrdsPsd'] =
              parseInt(
                rowDataWithKeys[recievedData_3[i]['databaseName']]['rcrdsPsd']
              ) + parseInt(recievedData_3[i]['rcrdsPsd']);
            rowDataWithKeys[recievedData_3[i]['databaseName']]['rowsTstd'] =
              parseInt(
                rowDataWithKeys[recievedData_3[i]['databaseName']]['rowsTstd']
              ) + parseInt(recievedData_3[i]['rowsTstd']);
          } else {
            rowDataWithKeys[recievedData_3[i]['databaseName']] =
              recievedData_3[i];
          }
        }
        var tempArray = [];
        for (var i in rowDataWithKeys) {
          tempArray.push(rowDataWithKeys[i]);
        }
        this.rowData = tempArray;
      });
    }
    else if(this.internalControlsFlag){

    }
  }

  percentageFormatter(params) {
    return params.value + '%';
  }

  recordsPassedGetter(params) {
    return params.getValue('rcrdsPsd') * 1000;
  }
  recordsTestedGetter(params) {
    return params.getValue('rowsTstd') * 1000;
  }
}
