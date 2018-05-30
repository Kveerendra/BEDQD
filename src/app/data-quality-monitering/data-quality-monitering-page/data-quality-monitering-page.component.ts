import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataQualityMoniteringService } from '../service/data-quality-monitering.service';
import { ChangeDetectorRef } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs';
import { GridComponent } from '../../shared/grid/grid.component';

@Component({
  selector: 'app-data-quality-monitering-page',
  templateUrl: './data-quality-monitering-page.component.html',
  styleUrls: ['./data-quality-monitering-page.component.css'],
  providers: [NgbDropdownConfig, DataQualityMoniteringService]
})
export class DataQualityMoniteringPageComponent implements OnInit {
  @ViewChild('grid1Chart') chart1: ChartComponent;
  @ViewChild('grid2Chart') chart2: ChartComponent;
  @ViewChild('grid') grid: GridComponent;
  dimensionFilter = 'sourceSystem';
  displayJson = {
    sourceSystem: 'Source System',
    entityLegalLob: 'Entity Legal/LOB'
  };
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
  d1;
  d2;
  d3;
  d4;
  d5;
  grid1config = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Prior Quarter',
          data: [],
          stack: 'Stack 1',
          backgroundColor: '#29a329'
        },
        {
          label: 'Current Quarter',
          data: [],
          stack: 'Stack 0',
          backgroundColor: '#007acc'
        }
      ]
    },
    options: {
      plugins: {
        datalabels: {
          color: 'white',
          formatter: Math.round,
          rotation: 90
        }
      },
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
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            },
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
    type: 'bar',
    data: {
      labels: [
        'Archer',
        'BluePrint',
        'CREST',
        'Finance FW',
        'GOALD-UK',
        'Insurence...',
        'Service No...',
        'VALIC-Ligh...'
      ],
      datasets: [
        {
          label: '',
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
                    labelString: 'Value'
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
          stack: 'Stack 0',
          backgroundColor: '#007acc'
        }
      ]
    },
    options: {
      plugins: {
        datalabels: {
          color: 'white',
          formatter: Math.round
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        enabled: true,
        mode: 'index'
      },
      scales: {
        xAxes: [
          {
            barPercentage: 0.5,
            categoryPercentage: 1.0,
            scaleLabel: {
              padding: 0
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }
        ]
      }
    }
  };
  service: DataQualityMoniteringService;
  constructor(
    private dataQualityMoniteringService: DataQualityMoniteringService,
    private cd: ChangeDetectorRef,
    ngbDropdownConfig: NgbDropdownConfig
  ) {
    this.drop1 = 'Source System';
    this.drop5 = 'ADS';
    this.service = dataQualityMoniteringService;
    ngbDropdownConfig.autoClose = 'outside';
  }

  ngOnInit() {
    this.service.getData().then(dataaa => {
      this.dataQualityScoreModel = this.service.getdQScoreModel();
      this.bcdeWithDQModel = this.service.getbcdeWithDQModel();
      this.ecdeWithDQModel = this.service.getecdeWithDQModel();
      const recievedData_1 = this.service.getperstOfAdsProfileModel();
      const receivedData_2 = this.service.geteCDEandBCDEwithDQmonitoringbyADS();
      this.dataQualityScoreModel['header']='Data Quality Score';
      this.ecdeWithDQModel['header']='ECDE with DQ Monitoring';
      this.bcdeWithDQModel['header']='BCDE with DQ Monitoring';
     // this.filterDimensionData();
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
      const data = {
        label: '0',
        data: [],
        stack: 'Stack 0',
        backgroundColor: 'blue'
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
    });

  }

  filterData(e) {
    let labels = [];
    for (const key in this.LOBFilter) {
      if (this.LOBFilter[key]) {
        labels.push(key);
      }
    }
    this.chart1.data.labels = labels;
    this.chart1.chart.update();
  }

  filterSourceSystemData(e) {
    let labels = [];
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
  filterDataOnBUCF(e) {
    var labels = [];
    for (const key in this.SourceSysFilter) {
      if (this.SourceSysFilter[key]) {
        labels.push(key);
      }
    }
    this.chart2.data.labels = labels;
    this.chart2.chart.update();
  }

  filterDataOnADS(e) {
    var labels = [];
    for (const key in this.LOBFilter) {
      if (this.LOBFilter[key]) {
        labels.push(key);
      }
    }
    this.chart2.data.labels = labels;
    this.chart2.chart.update();
  }
  filterDimensionData(): void {
    let recievedData_3 = [];
    var rowDataWithKeys = {};
    if (this.dimensionFilter === 'entityLegalLob') {
      recievedData_3 = this.service
        .getdQMonitoringDetailsbySourceSystem()
        .filter(x => {
          return x['databaseName'].toLowerCase().indexOf('insurance') === -1;
        });
    } else if (this.dimensionFilter === 'sourceSystem') {
      recievedData_3 = this.service
        .getdQMonitoringDetailsbySourceSystem()
        .filter(x => {
          return x['databaseName'].toLowerCase().indexOf('insurance') !== -1;
        });
    }

    for (var i in recievedData_3) {
      if (rowDataWithKeys[recievedData_3[i]['databaseName']]) {
        rowDataWithKeys[recievedData_3[i]['databaseName']]['rcrdsPsd'] =
          parseInt(
            rowDataWithKeys[recievedData_3[i]['databaseName']]['rcrdsPsd']
          ) + parseInt(recievedData_3[i]['rcrdsPsd']);
        rowDataWithKeys[recievedData_3[i]['databaseName']]['rowsTstd'] =
          parseInt(
            rowDataWithKeys[recievedData_3[i]['databaseName']]['rowsTstd']
          ) + parseInt(recievedData_3[i]['rowsTstd']);
      } else {
        rowDataWithKeys[recievedData_3[i]['databaseName']] =
          recievedData_3[i];
      }
    }

    var tempArray = [];
    for (var i in rowDataWithKeys) {
      if(rowDataWithKeys[i]) {
      rowDataWithKeys[i]['rcrdsPsd'] = this.formatNumberWithComma(rowDataWithKeys[i]['rcrdsPsd']);
      rowDataWithKeys[i]['rowsTstd'] = this.formatNumberWithComma(rowDataWithKeys[i]['rowsTstd']);
      rowDataWithKeys[i]['chgFrmPrQtr'] = Math.abs(rowDataWithKeys[i]['chgFrmPrQtr']);
      tempArray.push(rowDataWithKeys[i]);
    }
  }
    this.grid.rowData = tempArray;
  }

  formatNumberWithComma = function (x) {
    x = x.toString();
    var afterPoint = '';
    if (x.indexOf('.') > 0)
      afterPoint = x.substring(x.indexOf('.'), x.length);
    x = Math.floor(x);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
      lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    return res;
  }
}
