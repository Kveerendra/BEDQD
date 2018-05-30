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
  dimensionFilter = '';
  internalControlsFlag = false;
  columnDefs;
  rowData = [];
  gridOptions = {
    animateRows: true,
    enableRangeSelection: true,
    enableSorting: true,
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
        let recievedData_3 = [];
      //  recievedData_3 = this.service.getdQMonitoringDetailsbySourceSystem();
        recievedData_3 = this.service
        .getdQMonitoringDetailsbySourceSystem()
        .filter(x => {
          return x['databaseName'].toLowerCase().indexOf('insurance') !== -1;
        });


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
          rowDataWithKeys[i]['rcrdsPsd'] = this.formatNumberWithComma(rowDataWithKeys[i]['rcrdsPsd']);
          rowDataWithKeys[i]['rowsTstd'] = this.formatNumberWithComma(rowDataWithKeys[i]['rowsTstd']);
          rowDataWithKeys[i]['chgFrmPrQtr'] = Math.abs(rowDataWithKeys[i]['chgFrmPrQtr']);
          tempArray.push(rowDataWithKeys[i]);
        }
        this.rowData = tempArray;
      });
    } else if (this.internalControlsFlag) {
    }
  }

  percentageFormatter(params) {
    return params.value + '%';
  }

  public recordsPassedGetter(params) {
    return params.getValue('rcrdsPsd') * 1000;
  }
  recordsTestedGetter(params) {
    return params.getValue('rowsTstd') * 1000;
  }

  formatNumberWithComma = function (x) {
    x = x.toString();
    var afterPoint = '';
    if (x.indexOf('.') > 0)
      afterPoint = x.substring(x.indexOf('.'), x.length);
    x = Math.floor(x);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
      lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    return res;
  }
}
