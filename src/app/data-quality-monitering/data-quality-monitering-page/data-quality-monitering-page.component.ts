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
  dataQualityScoreModel = {};
  drop1: String;
  drop2: String;
  drop3: String;
  drop4: String;
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
      maintainAspectRatio: false
    }
  };
  grid2config = {
    type: 'bar',
    data: {
      labels: ['Archer', 'BluePrint', 'CREST', 'Finance FW', 'GOALD-UK', 'Insurence...', 'Service No...'],
      datasets: [
        {
          data: [65, 59, 80, 81, 56, 55, 40],
          stack: 'Stack 0',
          backgroundColor: '#29a329',

        },
        {
          data: [65, 59, 80, 81, 56, 55, 40],
          stack: 'Stack 0',
          backgroundColor: '#007acc'
        }
      ]
    },
  };
  service: DataQualityMoniteringService;
  constructor(dataQualityMoniteringService: DataQualityMoniteringService) {
    this.drop1 = 'Source System';
    this.drop2 = 'All';
    this.drop3 = 'All';
    this.drop4 = 'All';
    this.drop5 = 'ADS';
    this.service = dataQualityMoniteringService;



  }

  ngOnInit() {
    
    this.service.getData().then((dataaa) => {
    
       
     
      this.dataQualityScoreModel = this.service.getdQScoreModel();
      var recievedData = this.service.getperstOfAdsProfileModel();
      var data = {
        label: '0',
        data: [],
        stack: 'Stack 0',
        backgroundColor: 'blue'
      };
      var priorQrtr = this.grid1config.data.datasets[0].data;
      var currentQrtr = this.grid1config.data.datasets[1].data;
      var datasets = [];
      for (var i in recievedData) {
        this.grid1config.data.datasets[0].data.push(recievedData[i]["prQtr"])
        this.grid1config.data.datasets[1].data.push(recievedData[i]["crntQtr"])
      }
      this.grid1loaded = true;
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

}
