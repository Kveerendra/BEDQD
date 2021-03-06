import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataQualityMoniteringService } from '../service/data-quality-monitering.service';
import { ChangeDetectorRef } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs';
import { GridComponent } from '../../shared/grid/grid.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
  auBuText: string;
  public dataLoaded:boolean=true;
  dimensionFilter = 'sourceSystem';
  displayJson = {
    sourceSystem: 'Source System',
    entityLegalLob: 'Entity Legal/LOB'
  };
  allLobSelected = true;
  allYearQrtrSelected = true;
  allSourceSysSelected = true;
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
  recievedData_1;
  key = '';
  order = 'asc';
  grid1config = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Prior Quarter',
          data: [],
          stack: 'Stack 1',
          backgroundColor: '#43b02a'
        },
        {
          label: 'Current Quarter',
          data: [],
          stack: 'Stack 0',
          backgroundColor: '#0086b3'
        }
      ]
    },
    options: {
      plugins: {
        datalabels: {
          color: 'white',
          rotation: 90,
          display: (context: any) => {
            return context.chart.isDatasetVisible(context.datasetIndex);
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'bottom'
      },
      tooltips: {
        enabled: true,
        mode: 'index'
      },
      scales: {
        xAxes: [
          {
            position: 'top',
            barPercentage: 0.8
          }
        ],
        yAxes: [
          {
            ticks: {
              callback: function (value) {
                return value + '%';
              }
            },
            scaleLabel: {
              display: true,
              labelString: '% Profiled',
              fontStyle: 'bold',
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
        'Insurance...',
        'Service No...',
        'VALIC-Ligh...'
      ],
      datasets: [
        {
          label: 'ECDE',
          data: [],
          stack: 'Stack 0',
          backgroundColor: '#43b02a'
        },
        {
          label: 'BCDE',
          data: [],
          stack: 'Stack 0',
          backgroundColor: '#0086b3',
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
                    labelString: 'Value',
                    fontStyle: 'bold',
                  },
                  stacked: true
                }
              ]
            }
          }
        }
      ]
    },
    options: {
      plugins: {
        datalabels: {
          color: 'white',
          display: (context: any) => {
            return context.chart.isDatasetVisible(context.datasetIndex);
          }
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
              labelString: 'Value',
              fontStyle: 'bold',
            }
          },
          {
            position: 'right',
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: 'ECDE DQ Monitored',
              fontStyle: 'bold'
            },
            ticks: {
              max: 100,
              stepSize: 50,
              beginAtZero: true,
              callback: function (value) {
                return (value) + '%'
              }
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
    ngbDropdownConfig: NgbDropdownConfig,
    private activatedRoute: ActivatedRoute, private router: Router
  ) {
    this.drop1 = 'Source System';
    this.drop5 = 'ADS';
    this.service = dataQualityMoniteringService;
    ngbDropdownConfig.autoClose = 'outside';
  }
  sortBy(key: string) {
    this.key = key;
    this.recievedData_1.sort(this.compare.bind(this));
  }


  compare(a?: any, b?: any) {
    if (a[this.key] < b[this.key]) {
      return this.order === 'asc' ? -1 : 1;
    }
    if (a[this.key] > b[this.key]) {
      return this.order === 'asc' ? 1 : -1;
    }
    return 0;
  }
  ngOnInit() {
    this.initializeDashboard(null);
  }
  initializeDashboard(x:string){
    this.service.getData().then(dataaa => {
      this.auBuText = 'ADS'
      this.dataQualityScoreModel = this.service.getdQScoreModel();
      this.bcdeWithDQModel = this.service.getbcdeWithDQModel();
      this.ecdeWithDQModel = this.service.getecdeWithDQModel();
      this.recievedData_1 = this.service.getperstOfAdsProfileModel();
      this.sortBy('bucfName');
      const receivedData_2 = this.service.geteCDEandBCDEwithDQmonitoringbyADS();
      this.dataQualityScoreModel['header'] = 'Data Quality Score';
      this.ecdeWithDQModel['header'] = 'ECDE with DQ Monitoring';
      this.bcdeWithDQModel['header'] = 'BCDE with DQ Monitoring';
      const dropDown2 = this.service.getdQMonitoringDetailsbySourceSystem();
      this.grid1config.data.datasets[0].data = [];
      this.grid1config.data.datasets[1].data = [];
      this.grid1config.data.labels = [];
      for (const k in dropDown2) {
        if (this.drop2.indexOf(dropDown2[k]['ads']) === -1) {
          this.drop2.push(dropDown2[k]['ads']);
          this.SourceSysFilter[dropDown2[k]['ads']] = true;
        }
      }
      for (const j in this.recievedData_1) {
        if (this.drop4.indexOf(this.recievedData_1[j]['bucfName']) === -1 ) {
          if(this.recievedData_1[j]['bucfName'] != ""){
            this.drop4.push(this.recievedData_1[j]['bucfName']);
          }
          this.LOBFilter[this.recievedData_1[j]['bucfName']] = true;
        }
      }
     // this.grid1config.data.labels = this.drop4;
      //this.grid1config.data.labels.sort();
      for (const l in receivedData_2) {
        if (this.drop3.indexOf(receivedData_2[l]['yearQtr']) === -1) {
          this.drop3.push(receivedData_2[l]['yearQtr']);
          this.QuarterFilterQtr[receivedData_2[l]['yearQtr']] = true;
        }
      }
      this.drop3.sort();
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

      for (const i in this.recievedData_1) {
        if (this.recievedData_1[i]) {
          if (this.recievedData_1[i].bucfName != "") {

            this.grid1config.data.labels.push(this.recievedData_1[i].bucfName);
            this.grid1config.data.datasets[0].data.push(
              this.recievedData_1[i]['prQtr']
            );
            this.grid1config.data.datasets[1].data.push(
              this.recievedData_1[i]['crntQtr']
            );
          }
        }
      }

      this.grid1loaded = true;
      this.updateECDEandBCDEWithDQM();
      if(x!=null){
        this.chart1.data.datasets[0].data = this.grid1config.data.datasets[0].data;
        this.chart1.data.datasets[1].data = this.grid1config.data.datasets[1].data;
        this.chart2.data.datasets[0].data = this.grid2config.data.datasets[0].data;
        this.chart2.data.datasets[1].data = this.grid2config.data.datasets[1].data;
        this.filterDimensionData();
        this.chart1.chart.update();
        this.chart2.chart.update();

      }
    });

  }

  filterECDEandBCDEWithDQM() {
    let receivedData_2 = this.service.geteCDEandBCDEwithDQmonitoringbyADS();
    let labels = [];
    let chartData = {};
    this.grid2config.data.datasets[0].data = [];
    this.grid2config.data.datasets[1].data = [];
    if (this.auBuText === 'ADS') {

      for (const l in this.SourceSysFilter) {
        chartData[l] = {
          "ecde": [],
          "bcde": [],
          "ecdeTot": 0,
          "bcdeTot": 0
        };
      }

      for (const j in receivedData_2) {
        if (this.QuarterFilterQtr[receivedData_2[j]['yearQtr']]
          && this.SourceSysFilter[receivedData_2[j]['ads']]
          && this.LOBFilter[receivedData_2[j]['bucfName']]
        ) {
          if (chartData[receivedData_2[j]['ads']]['ecde'].indexOf(receivedData_2[j]['ecdeTot']) === -1) {
            chartData[receivedData_2[j]['ads']]['ecdeTot']++;
            chartData[receivedData_2[j]['ads']]['ecde'].push(receivedData_2[j]['ecdeTot']);
          }
          if (chartData[receivedData_2[j]['ads']]['bcde'].indexOf(receivedData_2[j]['bcdeTot']) === -1) {
            chartData[receivedData_2[j]['ads']]['bcdeTot']++;
            chartData[receivedData_2[j]['ads']]['bcde'].push(receivedData_2[j]['bcdeTot']);
          }
        }
      }

      for (const l in this.SourceSysFilter) {
        if (this.SourceSysFilter[l]) {
          labels.push(l);
          this.grid2config.data.datasets[0].data.push(
            parseInt(chartData[l]['ecdeTot'])
          );
          this.grid2config.data.datasets[1].data.push(
            parseInt(chartData[l]['bcdeTot'])
          );
        }
      }
    }
    else if (this.auBuText === 'BUs/CFs') {

      for (const l in this.LOBFilter) {
        chartData[l] = {
          "ecde": [],
          "bcde": [],
          "ecdeTot": 0,
          "bcdeTot": 0
        };
      }

      for (const j in receivedData_2) {
        if (this.QuarterFilterQtr[receivedData_2[j]['yearQtr']]
          && this.SourceSysFilter[receivedData_2[j]['ads']]
          && this.LOBFilter[receivedData_2[j]['bucfName']]
        ) {
          if (chartData[receivedData_2[j]['bucfName']]['ecde'].indexOf(receivedData_2[j]['ecdeTot']) === -1) {
            chartData[receivedData_2[j]['bucfName']]['ecdeTot']++;
            chartData[receivedData_2[j]['bucfName']]['ecde'].push(receivedData_2[j]['ecdeTot']);
          }
          if (chartData[receivedData_2[j]['bucfName']]['bcde'].indexOf(receivedData_2[j]['bcdeTot']) === -1) {
            chartData[receivedData_2[j]['bucfName']]['bcdeTot']++;
            chartData[receivedData_2[j]['bucfName']]['bcde'].push(receivedData_2[j]['bcdeTot']);
          }
        }
      }

      for (const l in this.LOBFilter) {
        if (this.LOBFilter[l]) {
          labels.push(l);
          this.grid2config.data.datasets[0].data.push(
            parseInt(chartData[l]['ecdeTot'])
          );
          this.grid2config.data.datasets[1].data.push(
            parseInt(chartData[l]['bcdeTot'])
          );
        }
      }
    }
    this.grid2config.data.labels = labels;
    this.chart2.data.labels = labels;
    this.chart2.data.datasets[0].data = this.grid2config.data.datasets[0].data;
    this.chart2.data.datasets[1].data = this.grid2config.data.datasets[1].data;
    this.grid2loaded = true;
    this.chart2.chart.update();
  }

  updateECDEandBCDEWithDQM() {
    let receivedData_2 = this.service.geteCDEandBCDEwithDQmonitoringbyADS();
    let labels = [];
    let chartData = {};
    this.grid2config.data.datasets[0].data = [];
    this.grid2config.data.datasets[1].data = [];
    if (this.auBuText === 'ADS') {

      for (const l in this.SourceSysFilter) {
        chartData[l] = {
          "ecde": [],
          "bcde": [],
          "ecdeTot": 0,
          "bcdeTot": 0
        };
      }

      for (const j in receivedData_2) {
        if (this.QuarterFilterQtr[receivedData_2[j]['yearQtr']]
          && this.SourceSysFilter[receivedData_2[j]['ads']]
          && this.LOBFilter[receivedData_2[j]['bucfName']]
        ) {
          if (chartData[receivedData_2[j]['ads']]['ecde'].indexOf(receivedData_2[j]['ecdeTot']) === -1) {
            chartData[receivedData_2[j]['ads']]['ecdeTot']++;
            chartData[receivedData_2[j]['ads']]['ecde'].push(receivedData_2[j]['ecdeTot']);
          }
          if (chartData[receivedData_2[j]['ads']]['bcde'].indexOf(receivedData_2[j]['bcdeTot']) === -1) {
            chartData[receivedData_2[j]['ads']]['bcdeTot']++;
            chartData[receivedData_2[j]['ads']]['bcde'].push(receivedData_2[j]['bcdeTot']);
          }
        }
      }

      for (const l in this.SourceSysFilter) {
        if (this.SourceSysFilter[l]) {
          labels.push(l);
          this.grid2config.data.datasets[0].data.push(
            parseInt(chartData[l]['ecdeTot'])
          );
          this.grid2config.data.datasets[1].data.push(
            parseInt(chartData[l]['bcdeTot'])
          );
        }
      }
    }
    else if (this.auBuText === 'BUs/CFs') {

      for (const l in this.LOBFilter) {
        chartData[l] = {
          "ecde": [],
          "bcde": [],
          "ecdeTot": 0,
          "bcdeTot": 0
        };
      }

      for (const j in receivedData_2) {
        if (this.QuarterFilterQtr[receivedData_2[j]['yearQtr']]
          && this.SourceSysFilter[receivedData_2[j]['ads']]
          && this.LOBFilter[receivedData_2[j]['bucfName']]
        ) {
          if (chartData[receivedData_2[j]['bucfName']]['ecde'].indexOf(receivedData_2[j]['ecdeTot']) === -1) {
            chartData[receivedData_2[j]['bucfName']]['ecdeTot']++;
            chartData[receivedData_2[j]['bucfName']]['ecde'].push(receivedData_2[j]['ecdeTot']);
          }
          if (chartData[receivedData_2[j]['bucfName']]['bcde'].indexOf(receivedData_2[j]['bcdeTot']) === -1) {
            chartData[receivedData_2[j]['bucfName']]['bcdeTot']++;
            chartData[receivedData_2[j]['bucfName']]['bcde'].push(receivedData_2[j]['bcdeTot']);
          }
        }
      }

      for (const l in this.LOBFilter) {
        if (this.LOBFilter[l]) {
          labels.push(l);
          this.grid2config.data.datasets[0].data.push(
            parseInt(chartData[l]['ecdeTot'])
          );
          this.grid2config.data.datasets[1].data.push(
            parseInt(chartData[l]['bcdeTot'])
          );
        }
      }
    }
    this.grid2config.data.labels = labels;
    this.grid2loaded = true;
  }
  filterECDEchart() {

  }
  filterData(e) {
    let labels = [];
    this.sortBy('bucfName');
    for (const key in this.LOBFilter) {
      if (this.LOBFilter[key] && key != "") {
        labels.push(key);
      }
    }
    this.grid1config.data.datasets[0].data = [];
    this.grid1config.data.datasets[1].data = [];
    this.grid1config.data.labels = [];

    for (const i in this.recievedData_1) {
      if (this.recievedData_1[i]) {
        if (this.recievedData_1[i].bucfName != "" && labels.indexOf(this.recievedData_1[i].bucfName) !== -1) {
          this.grid1config.data.labels.push(this.recievedData_1[i].bucfName);
          //console.log("============"+ this.recievedData_1[i].bucfName);
          this.grid1config.data.datasets[0].data.push(
            this.recievedData_1[i]['prQtr']
          );
          this.grid1config.data.datasets[1].data.push(
            this.recievedData_1[i]['crntQtr']
          );
        }
      }
    }

    this.grid1loaded = true;

    //this.chart1.data.labels = labels;
    //this.chart1.data.labels.sort();
    this.chart1.chart.update();
    this.filterECDEandBCDEWithDQM();
    this.filterDimensionData();
  }

  filterSourceSystemData(e) {
    this.filterECDEandBCDEWithDQM();
    this.filterDimensionData();
  }

  filterQuarterData(e) {
    this.filterECDEandBCDEWithDQM();
  }
  filterDataOnBUCF(e) {
    var labels = [];
    this.auBuText = 'BUs/CFs';
    this.filterECDEandBCDEWithDQM();
  }

  filterDataOnADS(e) {
    var labels = [];
    this.auBuText = 'ADS';
    this.filterECDEandBCDEWithDQM();
  }
  filterDimensionData(): void {
    let recievedData_3 = [];
    var rowDataWithKeys = {};
    if (this.dimensionFilter === 'entityLegalLob') {
      recievedData_3 = this.service
        .getdQMonitoringDetailsbySourceSystem()
        .filter(x => {
          return x['dimensionFltr'] === 'LEGAL_ENTITY_LOB';
        });
    } else if (this.dimensionFilter === 'sourceSystem') {
      recievedData_3 = this.service
        .getdQMonitoringDetailsbySourceSystem()
        .filter(x => {
          return x['dimensionFltr'] === 'SOURCE_SYSTEM';
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
      if (rowDataWithKeys[i]) {
        rowDataWithKeys[i]['rcrdsPsd'] = this.formatNumberWithComma(rowDataWithKeys[i]['rcrdsPsd']);
        rowDataWithKeys[i]['rowsTstd'] = this.formatNumberWithComma(rowDataWithKeys[i]['rowsTstd']);
        rowDataWithKeys[i]['chgFrmPrQtr'] = Math.abs(rowDataWithKeys[i]['chgFrmPrQtr']);
        if (this.LOBFilter[rowDataWithKeys[i]['bucfName']] === true
          && this.SourceSysFilter[rowDataWithKeys[i]['ads']] === true) {
          tempArray.push(rowDataWithKeys[i]);
        }
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
  selectAllLobs = function (e) {
    for (let key in this.LOBFilter) {
      if (this.LOBFilter[key] !== undefined) {
        this.LOBFilter[key] = this.allLobSelected;
      }
    }
    this.filterData();
  }
  selectAllYearQrtr = function (e) {
    for (let key in this.QuarterFilterQtr) {
      if (this.QuarterFilterQtr[key] !== undefined) {
        this.QuarterFilterQtr[key] = this.allYearQrtrSelected;
      }
    }
    this.filterQuarterData();
  }
  selectAllSourceSys = function (e) {
    for (let key in this.SourceSysFilter) {
      if (this.SourceSysFilter[key] !== undefined) {
        this.SourceSysFilter[key] = this.allSourceSysSelected;
      }
    }
    this.filterSourceSystemData();
  }
  
  refreshData(){
    console.log("refresh called");
    this.dataLoaded = false;
    this.service.getRefreshedData().then(dataaa => {
      this.dataLoaded = true;
      if(dataaa['header'] == 'SUCCESS'){
        this.initializeDashboard('refreshCall');
      }
      
  });
  };
}
