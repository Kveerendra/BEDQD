import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataQualityMoniteringService } from '../service/data-quality-monitering.service';
import { ChangeDetectorRef } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs';

@Component({
  selector: "app-data-quality-monitering-page",
  templateUrl: "./data-quality-monitering-page.component.html",
  styleUrls: ["./data-quality-monitering-page.component.css"],
  providers: [NgbDropdownConfig, DataQualityMoniteringService]
})
export class DataQualityMoniteringPageComponent implements OnInit {
  @ViewChild('grid1Chart') chart1: ChartComponent;
  @ViewChild('grid2Chart') chart2: ChartComponent;
  LOBFilter = {};
  SourceSysFilter = {};
  QuarterFilterQtr = {};
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
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Current Quarter",
          data: [],
          stack: 'Stack 0',
          backgroundColor: '#007acc'
        },
        {
          label: "Prior Quarter",
          data: [],
          stack: "Stack 1",
          backgroundColor: "#29a329"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true
      },
      tooltips: {
        enabled: true,
        mode: 'index'
      },
      scales: {
        xAxes: [
          {
            barPercentage: 0.8
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: '% Profiled'
            }
          }
        ]
      }
    }
  };
  grid2config = {
    type: "bar",
    data: {
      labels: [
        'Archer',
        'BluePrint',
        'CREST',
        'Finance FW',
        'GOALD-UK',
        'Insurence...',
        'Service No...'
      ],
      datasets: [
        {
          label: '',
          data: [],
          stack: "Stack 0",
          backgroundColor: "#29a329",
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
          label: '',
          data: [],
          stack: "Stack 0",
          backgroundColor: "#007acc"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true
      },
      tooltips: {
        enabled: true,
        mode: 'index'
      },
      scales: {
        xAxes: [
          {
            barPercentage: 0.8
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: '% Profiled'
            }
          }
        ]
      }
    }
  };
  service: DataQualityMoniteringService;
  constructor(
    private dataQualityMoniteringService: DataQualityMoniteringService,
    private cd: ChangeDetectorRef
  ) {
    this.drop1 = 'Source System';
    this.drop5 = 'ADS';
    this.service = dataQualityMoniteringService;
  }

  ngOnInit() {
    this.service.getData().then(dataaa => {
      this.dataQualityScoreModel = this.service.getdQScoreModel();
      this.bcdeWithDQModel = this.service.getbcdeWithDQModel();
      this.ecdeWithDQModel = this.service.getecdeWithDQModel();
      const recievedData_1 = this.service.getperstOfAdsProfileModel();
      const receivedData_2 = this.service.geteCDEandBCDEwithDQmonitoringbyADS();

      const dropDown2 = this.service.getdQMonitoringDetailsbySourceSystem();
      for (const k in dropDown2) {
        if (this.drop2.indexOf(dropDown2[k]['ads']) === -1) {
          this.drop2.push(dropDown2[k]['ads']);
          this.SourceSysFilter[dropDown2[k]['ads']] = true;
        }
      }
      for (const j in recievedData_1) {
        if (this.drop4.indexOf(recievedData_1[j]['bucfName']) === -1) {
          this.drop4.push(recievedData_1[j]['bucfName']);
          this.LOBFilter[recievedData_1[j]['bucfName']] = true;
        }
      }
      this.grid1config.data.labels = this.drop4;
      for (const l in receivedData_2) {
        if (this.drop3.indexOf(receivedData_2[l]['yearQtr']) === -1) {
          this.drop3.push(receivedData_2[l]['yearQtr']);
          this.QuarterFilterQtr[receivedData_2[l]['yearQtr']] = true;
        }
      }
      // alert(this.drop4);
      const data = {
        label: '0',
        data: [],
        stack: "Stack 0",
        backgroundColor: "blue"
      };
      const priorQrtr = this.grid1config.data.datasets[0].data;
      const currentQrtr = this.grid1config.data.datasets[1].data;

      const priorQrtr_2 = this.grid2config.data.datasets[0].data;
      const currentQrtr_2 = this.grid2config.data.datasets[1].data;

      for (const i in recievedData_1) {
        if (recievedData_1[i]) {
          this.grid1config.data.datasets[0].data.push(
            recievedData_1[i]['prQtr']
          );
          this.grid1config.data.datasets[1].data.push(
            recievedData_1[i]['crntQtr']
          );
        }
      }

      this.grid1loaded = true;

      for (const j in receivedData_2) {
        if (receivedData_2[j]) {
          this.grid2config.data.datasets[0].data.push(
            receivedData_2[j]['bcdeTot']
          );
          this.grid2config.data.datasets[1].data.push(
            receivedData_2[j]['ecdeTot']
          );
        }
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
      // this.grid1config.data.datasets = datasets;
    });
  }

  filterData(e) {
    var labels = [];
    for (const key in this.LOBFilter) {
      if (this.LOBFilter[key]) {
        labels.push(key);
      }
    }
    this.chart1.data.labels = labels;
    this.chart1.chart.update();
  }

  filterSourceSystemData(e) {
    var labels = [];
    for (const key in this.SourceSysFilter) {
      if (this.SourceSysFilter[key]) {
        labels.push(key);
      }
    }
    this.chart2.data.labels = labels;

    this.chart2.chart.update();
  }

  filterQuarterData(e) {
    this.service.getData().then(dataaa => {
      const quarterlabels = this.service.geteCDEandBCDEwithDQmonitoringbyADS();
      this.grid2config.data.datasets[0].data = [];
      this.grid2config.data.datasets[1].data = [];
      for (const i in quarterlabels) {
        if (this.QuarterFilterQtr[quarterlabels[i]['yearQtr']]) {
          this.grid2config.data.datasets[0].data.push(
            quarterlabels[i]['bcdeTot']
          );
          this.grid2config.data.datasets[1].data.push(
            quarterlabels[i]['ecdeTot']
          );
        }
      }
      this.chart2.data.datasets[0].data = this.grid2config.data.datasets[0].data;
      this.chart2.data.datasets[1].data = this.grid2config.data.datasets[1].data;
      this.chart2.chart.update();
    });
  }
}
