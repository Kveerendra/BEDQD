import { Component, OnInit } from '@angular/core';
import { MeasureRemidateDQService } from '../../measure-remidate-data-quality/measure-remidate-data-quality.service';
@Component({
  selector: 'app-grid3',
  templateUrl: './grid3.component.html',
  styleUrls: ['./grid3.component.css'],
  providers: [MeasureRemidateDQService]
})
export class Grid3Component implements OnInit {
  columnDefs;
  rowData = [];
  keysOfGrid3;
  service: MeasureRemidateDQService;
  constructor(measureRemidateDQService: MeasureRemidateDQService) {
    this.columnDefs = [{ headerName: "Legal Entity/LOB", field: "legalEntity" },
    { headerName: "Days", field: "days" },
    { headerName: "Frm Prior Qtr", field: "prQtrCnt" },
    { headerName: "New/Migrate In", field: "MigrateInCnt" },
    { headerName: "Total", field: "TotalCnt" },
    { headerName: "Closed", field: "closedCnt" },
    { headerName: "Migrate Out", field: "mgOutCnt" },
    { headerName: "Outstanding", field: "outstandingCnt" }
  ];

    this.rowData = [];
    this.service = measureRemidateDQService;
  }

  ngOnInit() {
    
    this.service.getData().then((dataaa) => {

      var tempVar = {};
      var tempArray = [];
     
      var appGridData = this.service.getopenDQPrioritySummaryMap();
      this.keysOfGrid3 = Object.keys(appGridData);
      for (let itr_1 in appGridData) {
        var gridMap:any;
        gridMap = appGridData[itr_1];
        for(let i:any = 0;i < gridMap.length;i++){
          tempVar = {};
          for(let itr_2 in gridMap[i]){

            tempVar["legalEntity"] = itr_1;
            tempVar["days"] = gridMap[i]['agingBucket'];
            tempVar["prQtrCnt"] = gridMap[i]['priorQuarter'];
            tempVar["MigrateInCnt"] = gridMap[i]['newOrMigrateIn'];
            tempVar["TotalCnt"] = gridMap[i]['total'];
            tempVar["closedCnt"] = gridMap[i]['closed'];
            tempVar["mgOutCnt"] = gridMap[i]['migrateOut'];
            tempVar["outstandingCnt"] = gridMap[i]['outstanding'];
           // console.log(tempVar[gridMap[itr_2]['legalEntity']]);
          }
          tempArray.push(tempVar)
        }
        
      }
       console.log(tempArray);
       this.rowData = tempArray;
    });
  }

}
