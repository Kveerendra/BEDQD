import { Component, OnInit, Input,Inject } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { MeasureRemidateDQService } from './measure-remidate-data-quality.service';
import { ChartComponent } from "angular2-chartjs";

@Component({
  selector: 'app-measure-remidate-data-quality',
  templateUrl: './measure-remidate-data-quality.component.html',
  styleUrls: ['./measure-remidate-data-quality.component.css'],
  providers: [MeasureRemidateDQService]
})
export class MeasureRemidateDataQualityComponent implements OnInit {
  openDQIssues : String;
  header : String;
  columnDefs;
  rowData = [];
  grid3config = {
    type: 'horizontalBar',
    data: {
        labels: ["CAO", "CD","FIN","HR","Legal","QS","XXXGS","XYZ"],
        datasets: [{
            label:"<30",
            data: [-1,-2,-3,-4,-5,-6,-7,-8],
            backgroundColor: "#b3cccc",
            hoverBackgroundColor: "#b3cccc"
        },{
            label:"30-60",
            data: [-2,-4,-5,-1,-7,-3,-8,-9],
            backgroundColor: "#0086b3",
            hoverBackgroundColor: "#0086b3"
        },{
          label:">60",
          data: [-2,-4,-5,-3,-7,-5,-8,-9],
          backgroundColor: "#264d73",
          hoverBackgroundColor: "#264d73"
      }
      ]
    },

    options: {
    scales: {
        xAxes: [{
            ticks: {
                beginAtZero:true,
                fontFamily: "'Open Sans Bold', sans-serif",
            },
            scaleLabel:{
                display:true
            },
            gridLines: {
            }, 
            stacked: true,
            scaleStartValue : 0
        }],
        yAxes: [{
            gridLines: {
                display:false,
                color: "#fff",
            },
            ticks: {
                fontFamily: "'Open Sans Bold', sans-serif"

            },
            stacked: true,
            position : "right",
            display : true
        }]
    },
    legend:{
      position : "bottom",
        display:true
    },
}
  };

  grid4config = {
    type: 'horizontalBar',
    data: {
        labels: ["CAO", "CD","FIN","HR","Legal","QS","XXXGS","XYZ"],
        datasets: [{
            label:"<30",
            data: [1,2,3,1,5,6,7,3],
            backgroundColor: "#b3cccc",
            hoverBackgroundColor: "#b3cccc"
        },{
            label:"30-60",
            data: [2,4,5,5,2,3,8,9],
            backgroundColor: "#0086b3",
            hoverBackgroundColor: "#0086b3"
        },{
          label:">60",
          data: [2,1,5,3,1,5,8,3],
          backgroundColor: "#264d73",
          hoverBackgroundColor: "#264d73"
      }
      ]
    },

    options: {
    scales: {
        xAxes: [{
            ticks: {
                beginAtZero:true,
                fontFamily: "'Open Sans Bold', sans-serif",
            },
            scaleLabel:{
                display:true
            },
            gridLines: {
            }, 
            stacked: true,
            scaleStartValue : 0
        }],
        yAxes: [{
            gridLines: {
                display:false,
                color: "#fff",
            },
            ticks: {
                fontFamily: "'Open Sans Bold', sans-serif"

            },
            stacked: true,
            position : "left",
            display : true
        }]
    },
    legend:{
      position : "bottom",
        display:true
    },
}
  };
  service: MeasureRemidateDQService;
  constructor(measureRemidateDQService : MeasureRemidateDQService) {
    this.service = measureRemidateDQService;
   }

  ngOnInit() {
    this.service.getData().then((dataaa) =>{
    var openDQIssuesData = this.service.getdataQualityScoreData();
    this.openDQIssues = (Math.round(openDQIssuesData["dqScore"])).toString();
    this.header = openDQIssuesData["header"].toString();
    
    });
  }

}
