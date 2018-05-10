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
        /*if (this.dimensionFilter) {
          recievedData_3 = this.service
            .getdQMonitoringDetailsbySourceSystem()
            .filter(x => {
              return x['databaseName'].toLowerCase().indexOf('insurance') == -1;
            });
        } else {*/
        recievedData_3 = this.service.getdQMonitoringDetailsbySourceSystem();
        //  }
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

  recordsPassedGetter(params) {
    return params.getValue('rcrdsPsd') * 1000;
  }
  recordsTestedGetter(params) {
    return params.getValue('rowsTstd') * 1000;
  }

  formatNumberWithComma = function (nStr) {
    nStr +='';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{5})/;
    var rgx2 = /(\d+)(\d{3})/;
    if (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
    x1 = x1.replace(rgx2, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }
}
