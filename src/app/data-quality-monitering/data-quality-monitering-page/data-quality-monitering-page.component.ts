import { Component, OnInit, Inject } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataQualityMoniteringService } from '../service/data-quality-monitering.service';

@Component({
  selector: 'app-data-quality-monitering-page',
  templateUrl: './data-quality-monitering-page.component.html',
  styleUrls: ['./data-quality-monitering-page.component.css'],
  providers: [NgbDropdownConfig, DataQualityMoniteringService]
})

export class DataQualityMoniteringPageComponent implements OnInit {
  grid1loaded = false;
  grid2loaded = false;
  dataQualityScoreModel = {};
  bcdeWithDQModel = {};
  ecdeWithDQModel = {};
  drop1: String;
  drop2: String[] = [];
  drop3: String[] = [];
  drop4: String[] = [];
  drop5: String;
  grid1config = {
    type: 'bar',
    data: {
      labels: ['CAO', 'CD', 'HR', 'Legal', 'QS', 'XXXGS', 'XYZ'],
      datasets: [
        {
          label: 'Current Quarter',
          data: [],
          stack: 'Stack 0',
          backgroundColor: '#007acc',
        },
        {
          label: 'Prior Quarter',
          data: [],
          stack: 'Stack 1',
          backgroundColor: '#29a329'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    legend:{
    display:true
  },
  tooltips:{
    enabled:true,
    mode :'index'
  },
  scales: {
        xAxes: [{
            barPercentage: 0.8
        }],
        yAxes: [{
           scaleLabel: {
        display: true,
        labelString: '% Profiled'
      } 
        }],
    }
  }

  };
  grid2config = {
    type: 'bar',
    data: {
      labels: ['Archer', 'BluePrint', 'CREST', 'Finance FW', 'GOALD-UK', 'Insurence...', 'Service No...'],
      datasets: [
        {
        label : '',
          data: [],
          stack: 'Stack 0',
          backgroundColor: '#29a329',
          options: {
            scales: {
              xAxes: [
                {
                  stacked: true
                }
              ],
              yAxes: [
                {
                  scaleLabel: {
                  display: true,
                 labelString: '% Profiled'
               },
                  stacked: true
                }
              ]
            }
          }
        },
        {
        label : '',
          data: [],
          stack: 'Stack 0',
          backgroundColor: '#007acc'
        }
      ]
    },
  };
  service: DataQualityMoniteringService;
  constructor(dataQualityMoniteringService: DataQualityMoniteringService) {
    this.drop1 = 'Source System';
    this.drop5 = 'ADS';
    this.service = dataQualityMoniteringService;
  }

  ngOnInit() {
    
    this.service.getData().then((dataaa) => {
     
      this.dataQualityScoreModel = this.service.getdQScoreModel();
      this.bcdeWithDQModel = this.service.getbcdeWithDQModel();
      this.ecdeWithDQModel = this.service.getecdeWithDQModel();
      var recievedData_1 = this.service.getperstOfAdsProfileModel();
      var receivedData_2 = this.service.geteCDEandBCDEwithDQmonitoringbyADS();

      var dropDown2 = this.service.getdQMonitoringDetailsbySourceSystem();
      for(var k in dropDown2){
        if(this.drop2.indexOf(dropDown2[k]["ads"]) == -1){
          this.drop2.push(dropDown2[k]["ads"]);
        }
      }
     for(var j in recievedData_1){
      if(this.drop4.indexOf(recievedData_1[j]["bucfName"]) == -1){
         this.drop4.push(recievedData_1[j]["bucfName"]);
        }
        
      }
     for(var l in receivedData_2){
      if(this.drop3.indexOf(receivedData_2[l]["yearQtr"]) == -1){
         this.drop3.push(receivedData_2[l]["yearQtr"]);
        }
        
      }
      //alert(this.drop4);
      var data = {
        label: '0',
        data: [],
        stack: 'Stack 0',
        backgroundColor: 'blue'
      };
      var priorQrtr = this.grid1config.data.datasets[0].data;
      var currentQrtr = this.grid1config.data.datasets[1].data;

      var priorQrtr_2 = this.grid2config.data.datasets[0].data;
      var currentQrtr_2 = this.grid2config.data.datasets[1].data;

      for (var i in recievedData_1) {
        this.grid1config.data.datasets[0].data.push(recievedData_1[i]["prQtr"]);
        this.grid1config.data.datasets[1].data.push(recievedData_1[i]["crntQtr"]);
      }
     
      this.grid1loaded = true;

      for (var j in receivedData_2) {
        this.grid2config.data.datasets[0].data.push(receivedData_2[j]["bcdeTot"]);
        this.grid2config.data.datasets[1].data.push(receivedData_2[j]["ecdeTot"]);
      }
      this.grid2loaded = true;
      

    /*  datasets = [
        {
          label: '0',
          data: priorQrtr,
          stack: 'Stack 0',
          backgroundColor: 'blue'
        },
        {
          label: '3',
          data: currentQrtr,
          stack: 'Stack 1',
          backgroundColor: 'green'
        }
      ]*/
      //this.grid1config.data.datasets = datasets;
    });
 
  }
filterData(e){
  if(!e.target.checked){  
    alert("not checked");
  }
}
}
