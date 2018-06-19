import {Component, OnInit} from '@angular/core';
import {MeasureRemidateDQService} from '../../measure-remidate-data-quality/measure-remidate-data-quality.service';
import { HoverTextSection } from '@angular/language-service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-grid3',
  templateUrl: './grid3.component.html',
  styleUrls: ['./grid3.component.css'],
  providers: [MeasureRemidateDQService],
  
})
export class Grid3Component implements OnInit {
  columnDefs;
  rowData = [];
  keysOfGrid3;
  titleDisplay;
  service: MeasureRemidateDQService;
  constructor(measureRemidateDQService: MeasureRemidateDQService) {
    this.columnDefs = [
      {headerName: 'Legal Entity/LOB', field: 'legalEntity'},
      {headerName: 'Days', field: 'days'},
      {headerName: 'Frm Prior Qtr', field: 'prQtrCnt'},
      {headerName: 'New/Migrate In', field: 'MigrateInCnt'},
      {headerName: 'Total', field: 'TotalCnt'},
      {headerName: 'Closed', field: 'closedCnt'},
      {headerName: 'Migrate Out', field: 'mgOutCnt'},
      {headerName: 'Outstanding', field: 'outstandingCnt'}
    ];

    this.rowData = [];
    this.service = measureRemidateDQService;
  }

  ngOnInit() {
    this.service.getData().then(dataaa => {
      var tempVar = {};
      var tempArray = [];

      var appGridData = this.service.getopenDQPrioritySummaryMap();
      this.keysOfGrid3 = Object.keys(appGridData);
      for (let itr_1 in appGridData) {
        var gridMap: any;
        gridMap = appGridData[itr_1];
        for (let i: any = 0; i < gridMap.length; i++) {
          tempVar = {};
          for (let itr_2 in gridMap[i]) {
            tempVar['legalEntity'] = itr_1;
            tempVar['days'] = gridMap[i]['agingBucket'];
            tempVar['prQtrCnt'] = this.formatNumberWithComma(gridMap[i]['priorQuarter']);
            tempVar['MigrateInCnt'] = this.formatNumberWithComma(gridMap[i]['newOrMigrateIn']);
            tempVar['TotalCnt'] = this.formatNumberWithComma(gridMap[i]['total']);
            tempVar['closedCnt'] = this.formatNumberWithComma(gridMap[i]['closed']);
            tempVar['mgOutCnt'] = this.formatNumberWithComma(gridMap[i]['migrateOut']);
            tempVar['outstandingCnt'] = this.formatNumberWithComma(gridMap[i]['outstanding']);
            // console.log(tempVar[gridMap[itr_2]['legalEntity']]);
          }
          tempArray.push(tempVar);
        }
      }
      this.rowData = tempArray;
    });
  }

  formatNumberWithComma = function(x) {
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


  showData = function(x,y) {
    console.log("i am atleast here :) "+ x.data)
    this.titleDisplay=x.data.legalEntity+"\t\n"
          +x.data.days+ "\t\n"
          +x.data.prQtrCnt+"\n"
     +x.data.MigrateInCnt+"\n"
     +x.data.TotalCnt+"\n"
     +x.data.closedCnt+"\n"
     +x.data.mgOutCnt+"\n"
     +x.data.outstandingCnt+"\n"
        return this.titleDisplay
  }
  
  
}





