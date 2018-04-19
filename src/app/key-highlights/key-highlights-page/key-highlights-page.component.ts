import { Component, OnInit,Input } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { KeyHilightsService } from '../key-hilights.service';

@Component({
  selector: 'app-key-highlights-page',
  templateUrl: './key-highlights-page.component.html',
  styleUrls: ['./key-highlights-page.component.css'],
  providers: [NgbDropdownConfig,KeyHilightsService]
})
export class KeyHighlightsPageComponent implements OnInit {

  grid3loaded = false;
  grid4loaded = false;
  tRecords : String;
  dqriScore : String;
  dqpScore : String;
  impactScore : String;
  drop2: String[] = [];
  drop3: String[] = [];
  drop4: String[] = [];

  grid3config = {
    type: 'horizontalBar',
    data: {
        labels: ["ECDEs", "BCDEs"],
        datasets: [{
            label:"Not DQ Monitered",
            data: [],
            backgroundColor: "#29a329",
            hoverBackgroundColor: "#29a329"
        },{
            label:"DQ Monitered",
            data: [],
            backgroundColor: " #007acc",
            hoverBackgroundColor: " #007acc"
        }]
    },

    options: {
    scales: {
        xAxes: [{
            ticks: {
                beginAtZero:true,
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
            },
            scaleLabel:{
                display:true
            },
            gridLines: {
            }, 
            stacked: true
        }],
        yAxes: [{
            gridLines: {
                display:false,
                color: "#fff",
                zeroLineColor: "#fff",
                zeroLineWidth: 0
            },
            ticks: {
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
            },
            stacked: true
        }]
    },
    legend:{
        display:true
    },
}
  };

grid4config = {
    type: 'bar',
    data: {
      labels: ['Jul-Sep 2014', 'Oct-Dec 2014'],
      datasets: [
        {
          label: '<30 days',
          data: [],
          stack: 'Stack 0',
          backgroundColor: ' #007acc',
        },
        {
          label: '60 days',
          data: [],
          stack: 'Stack 0',
          backgroundColor: '#29a329'
        },
        {
          label: '30-60 days',
          data: [],
          stack: 'Stack 0',
          backgroundColor: '#85e085'
        }
      ]
    },
    options: {
      responsive: true
    }
  };

  grid1config = {
    type: 'pie',
    data: {
      labels: ['Prior Quarter'],
      datasets: [
        {
          label: '',
          data: [],
          backgroundColor: ' #007acc',
        }
      ]
    }
  };

  grid2config = {
    type: 'pie',
    data: {
      labels: ['Current Quarter'],
      datasets: [
        {
          label: '',
          data: [],
          backgroundColor: ' #007acc',
        }
      ]
    }
  };
  service: KeyHilightsService;
  constructor(KeyHighlightsService: KeyHilightsService) {
   this.service = KeyHighlightsService;

   }

  ngOnInit() {
    this.service.getData().then((dataaa) =>{

        var recievedData_1 = this.service.getdQRIAndDQPScoresData();
        this.tRecords = (Math.round(recievedData_1["totalRecords"])).toString();
        this.dqriScore = recievedData_1["dqriScore"].toString();
        this.dqpScore = recievedData_1["dqpScore"].toString()+"%";
        this.impactScore = recievedData_1["impactScore"].toString();



        var WholeData = this.service.getlistOfDQMoniteringStatsData();
        var hpDqIssues = this.service.getlistOfHighPriorityDQIssuesData();
        var openDQIssues = this.service.getopenDQIssuesData();
        
       for(var l in WholeData){
        if(this.drop3.indexOf(WholeData[l]["yearQuarter"]) == -1){
           this.drop3.push(WholeData[l]["yearQuarter"]);
          }
        }
        for(var j in WholeData){
        if(this.drop4.indexOf(WholeData[j]["lob"]) == -1){
           this.drop4.push(WholeData[j]["lob"]);
          }
        }
        for(var k in WholeData){
        if(this.drop2.indexOf(WholeData[k]["sourceSystem"]) == -1){
           this.drop2.push(WholeData[k]["sourceSystem"]);
          }
        }

        for (var i in WholeData) {
           if(WholeData[i]['label'] == "ECDEs"){
             this.grid3config.data.datasets[0].data.push(WholeData[0]["notDQMonitered"]);
             this.grid3config.data.datasets[1].data.push(WholeData[0]["dqMonitered"]); 
           }
            if(WholeData[i]['label'] == "BCDEs"){
             this.grid3config.data.datasets[0].data.push(WholeData[1]["notDQMonitered"]);
             this.grid3config.data.datasets[1].data.push(WholeData[1]["dqMonitered"]);
         }
         }
         this.grid3loaded = true;
            this.grid4config.data.datasets[0].data.push(hpDqIssues[1]["nbrOfIssues"],hpDqIssues[4]["nbrOfIssues"]);

             this.grid4config.data.datasets[1].data.push(hpDqIssues[0]["nbrOfIssues"],hpDqIssues[3]["nbrOfIssues"]);

             this.grid4config.data.datasets[2].data.push(hpDqIssues[2]["nbrOfIssues"],hpDqIssues[5]["nbrOfIssues"]);
        
         this.grid4loaded = true;
        this.grid1config.data.datasets[0].data.push(openDQIssues["priorQuarter"]);
        this.grid2config.data.datasets[0].data.push(openDQIssues["currentQuarter"]);
   });
  }
}
