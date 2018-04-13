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
      labels: ['CAO', 'CD', 'HR', 'Legal', 'QS', 'XXXGS', 'XYZ'],
      datasets: [
        {
          label: 'Current Quarter',
          data: [65, 59, 80, 81, 56, 55, 40],
          stack: 'Stack 0',
          backgroundColor: '#007acc',
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
          label: 'Prior Quarter',
          data: [65, 59, 80, 81, 56, 55, 40],
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
          data: [65, 59, 80, 81, 56, 55, 40],
          stack: 'Stack 0',
          backgroundColor: '#007acc'
        }
      ]
    },
  };
  ngOnInit() {}
}
