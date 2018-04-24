import { Component, OnInit } from '@angular/core';
import { DataQualityMoniteringService } from '../../data-quality-monitering/service/data-quality-monitering.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  providers: [DataQualityMoniteringService]
})
export class GridComponent implements OnInit {
  columnDefs;
  rowData;
  service: DataQualityMoniteringService;
appGridLoaded = false;
  constructor(dataQualityMoniteringService: DataQualityMoniteringService) {
    this.columnDefs = [
      {headerName: "Database Name", field: "databaseName", },
      {headerName: "DQ Score", field: "dataQualityScore", valueFormatter: this.percentageFormatter},
      {headerName: "Change From Prior Quarter", field: "chgFrmPrQtr", valueFormatter: this.percentageFormatter},
      {headerName: "#Records Passed", field: "rcrdsPsd"},
      {headerName: "#Records Tested", field: "rowsTstd"}
  ];

  this.rowData = [
    //  {make: "Insurance Data Warehouse", model: "", price: "10.8%",Rpassed: "0",RFailed : ""},
    //  {make: "People Soft", model: "", price: "0%",Rpassed: "228,730",RFailed : "229,264"}
  ]

 this.service = dataQualityMoniteringService;
   }

  ngOnInit() {
    var rowData = {};
  this.service.getData().then((dataaa) => {
   var recievedData_3 = this.service.getdQMonitoringDetailsbySourceSystem();
   this.rowData = recievedData_3;
  });/*
//alert(recievedData_3);
   var recordsTestedFor_1 = 0;
   var recordsTestedFor_2 = 0;
   var recordsPassesFor_1 = 0;
   var recordsPassesFor_2 = 0;
   var dqscore_1 = 0;
   var dqscore_2 = 0;
    for (var i in recievedData_3) {
     if(recievedData_3[i]["databaseName"] == "Insurance Data Warehouse"){
       dqscore_1 = recievedData_3[i]["dataQualityScore"];
       recordsPassesFor_1 = recordsPassesFor_1 + parseInt(recievedData_3[i]["rcrdsPsd"]);
       recordsTestedFor_1 = recordsTestedFor_1 + parseInt(recievedData_3[i]["rowsTstd"]);
       
     }
     if(recievedData_3[i]["databaseName"] == "People Soft"){
        dqscore_2 = recievedData_3[i]["dataQualityScore"];
        recordsPassesFor_2 = recordsPassesFor_2 +  parseInt(recievedData_3[i]["rcrdsPsd"]);
        recordsTestedFor_2 = recordsTestedFor_2 +  parseInt(recievedData_3[i]["rowsTstd"]);
        
     }
    }
     this.rowData[0].model = dqscore_1.toString()+"%";
     this.rowData[1].model = dqscore_2.toString()+"%";
     this.rowData[0].Rpassed = recordsPassesFor_1;
     this.rowData[1].Rpassed = recordsPassesFor_2;
     this.rowData[0].RFailed = recordsTestedFor_1;
     this.rowData[1].RFailed = recordsTestedFor_2;
    // this.gridApi.refreshCells({ force: true});
   });
   this.appGridLoaded = true;*/
  }
 // onGridReady(params){
 //   this.gridApi = params.api;
 // }

 percentageFormatter(params) {
  return params.value+"%";
}
}
