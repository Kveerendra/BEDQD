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
  constructor(measureRemidateDQService : MeasureRemidateDQService) {
    this.columnDefs = [
      { headerName: "Legal Entity/LOB", field: "LOBName"},
      { headerName: "Current Quarter", field: "crntQtr"},
      { headerName: "Prior Quarter", field: "prQtr"},
      { headerName: "Change", field: "change" }
    ];

    this.rowData = [
        
    ]
    this.service = measureRemidateDQService;
   }

  ngOnInit() {
    this.service.getData().then((dataaa) => {
      this.columnDefs = [
        { headerName: "Legal Entity/LOB", field: "LOBName"},
        { headerName: "Current Quarter", field: "crntQtr"},
        { headerName: "Prior Quarter", field: "prQtr"},
        { headerName: "Change", field: "change" }
      ];
  
      this.rowData = [
        {LOBName: "CAO", crntQtr: "1", prQtr: "23",change: "22"},
        {LOBName: "CD", crntQtr: "1", prQtr: "23",change: "22"},
        {LOBName: "HR", crntQtr: "1", prQtr: "23",change: "22"},
        {LOBName: "Legal", crntQtr: "1", prQtr: "23",change: "22"},
        {LOBName: "QS", crntQtr: "1", prQtr: "23",change: "22"},
        {LOBName: "XXXGS", crntQtr: "1", prQtr: "23",change: "22"},
        {LOBName: "XYZ", crntQtr: "1", prQtr: "23",change: "22"}
      ];
    });
  }

}
