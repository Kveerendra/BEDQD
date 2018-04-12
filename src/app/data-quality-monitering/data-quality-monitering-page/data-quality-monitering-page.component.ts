import { Component, OnInit, Inject } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataQualityMoniteringService } from '../service/data-quality-monitering.service';

@Component({
  selector: 'app-data-quality-monitering-page',
  templateUrl: './data-quality-monitering-page.component.html',
  styleUrls: ['./data-quality-monitering-page.component.css'],
  providers: [NgbDropdownConfig,DataQualityMoniteringService]
})
export class DataQualityMoniteringPageComponent implements OnInit {
  dataQualityScoreModel ={};
  drop1: String;
  drop2: String;
  drop3: String;
  drop4: String;
  drop5: String;
  constructor(DataQualityMoniteringService:DataQualityMoniteringService) {
    this.drop1 = 'Source System';
    this.drop2 = 'All';
    this.drop3 = 'All';
    this.drop4 = 'All';
    this.drop5 = 'ADS';
    this.dataQualityScoreModel = DataQualityMoniteringService.getDataQualityModel();
  }
  grid1config = {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: '0',
          data: [65, 59, 80, 81, 56, 55, 40],
          stack: 'Stack 0',
          backgroundColor: 'blue',
          options: {
            scales: {
              xAxes: [
                {
                  stacked: true
                }
              ],
              yAxes: [
                {
                  stacked: true
                }
              ]
            }
          }
        },
        {
          label: '3',
          data: [65, 59, 80, 81, 56, 55, 40],
          stack: 'Stack 1',
          backgroundColor: 'green'
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
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: '0',
          data: [65, 59, 80, 81, 56, 55, 40],
          stack: 'Stack 0',
          backgroundColor: 'blue',
          options: {
            scales: {
              xAxes: [
                {
                  stacked: true
                }
              ],
              yAxes: [
                {
                  stacked: true
                }
              ]
            }
          }
        },
        {
          label: '1',
          data: [65, 59, 80, 81, 56, 55, 40],
          stack: 'Stack 0',
          backgroundColor: 'red'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          type: 'linear',
          position: 'left',
        }, {
          type: 'linear',
          position: 'right',
        }]
      }
    }
  };
  ngOnInit() {}
}
