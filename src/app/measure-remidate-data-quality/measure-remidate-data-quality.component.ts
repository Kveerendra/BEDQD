import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { MeasureRemidateDQService } from './measure-remidate-data-quality.service';
import { ChartComponent } from 'angular2-chartjs';
import { ChangeDetectorRef } from '@angular/core';
import { Grid2Component } from '../shared/grid2/grid2.component';
import { Chart } from 'chart.js';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-measure-remidate-data-quality',
  templateUrl: './measure-remidate-data-quality.component.html',
  styleUrls: ['./measure-remidate-data-quality.component.css'],
  providers: [MeasureRemidateDQService, NgbDropdownConfig]
})
export class MeasureRemidateDataQualityComponent implements OnInit {
  @ViewChild('grid3Chart') chart1: ChartComponent;
  @ViewChild('grid4Chart') chart2: ChartComponent;
  @ViewChild('gridTable') grid: Grid2Component;
  openDQIssues: String;
  header: String;
  columnDefs;
  allLobSelected = true;
  allSourceSystemSelected = true;
  allYearQtrSelected = true;
  rowData = [];
  drop1 = [];
  drop2 = [];
  drop3 = [];
  LOBFilter = {};
  yearQtr = {};
  SourceSystem = {};
  keysOfGrid3 = [];
  grid3loaded = false;
  grid4loaded = false;
  grid5loaded = false;
  grid6loaded = false;
  grid3config = {
    type: 'horizontalBar',
    data: {
      labels: [],
      datasets: [
        {
          label: '>60',
          data: [],
          backgroundColor: '#264d73',
          hoverBackgroundColor: '#264d73'
        },
        {
          label: '30-60',
          data: [],
          backgroundColor: '#0086b3',
          hoverBackgroundColor: '#0086b3'
        },
        {
          label: '<30',
          data: [],
          backgroundColor: '#b3cccc',
          hoverBackgroundColor: '#b3cccc'
        }
      ]
    },

    options: {
      plugins: {
        datalabels: {
          color: 'white',
          formatter: value => {
            return this.formatNumberWithComma(Math.abs(value));
          },
          display: (context: any) => {
            //debugger;
            return context.chart.isDatasetVisible(context.datasetIndex)  && Math.abs(context.dataset.data[context.dataIndex]) > 7000;
        }
        }
      },
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontFamily: 'Open Sans Bold, sans-serif',
              callback: function (x) {
                  x = (x/1000)*-1;
                  return x+'K';
                }
            },
            scaleLabel: {
              display: true,
              labelString: 'High Priority DQ Issues-Positive',
              fontStyle : 'bold',
            },
            gridLines: {},
            stacked: true,
            scaleStartValue: 0
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
              color: '#fff'
            },
            ticks: {
              fontFamily: 'Open Sans Bold, sans-serif'
            },scaleLabel: {
              display: true,
              labelString: 'Legal Entity',
              fontStyle : 'bold'
            },
            stacked: true,
            position: 'right',
            display: true
          }
        ]
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            let x = tooltipItem.xLabel.toString();
            let datasetLabel = data.datasets[tooltipItem.datasetIndex].label;
            let afterPoint = '';
            if (x.indexOf('.') > 0) {
              afterPoint = x.substring(x.indexOf('.'), x.length);
            }
            x = Math.abs(x);
            x = x.toString();
            let lastThree = x.substring(x.length - 3);
            let otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != '') {
              lastThree = ',' + lastThree;
            }
            let res =
              otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
              lastThree +
              afterPoint;
              tooltipItem.xLabel = res;
              return (datasetLabel +' : '+tooltipItem.xLabel);
             }
        }

     },
      legend: {
        position: 'bottom',
        display: true
      }
    }
  };

  grid4config = {
    type: 'horizontalBar',
    data: {
      labels: [],
      datasets: [
        {
          label: '>60',
          data: [],
          backgroundColor: '#264d73',
          hoverBackgroundColor: '#264d73'
        },
        {
          label: '30-60',
          data: [],
          backgroundColor: '#0086b3',
          hoverBackgroundColor: '#0086b3'
        },
        {
          label: '<30',
          data: [],
          backgroundColor: '#b3cccc',
          hoverBackgroundColor: '#b3cccc'
        }
      ]
    },

    options: {
      plugins: {
        datalabels: {
          color: 'white',
          formatter: value => {
            return this.formatNumberWithComma(Math.abs(value));
          },
          display: (context: any) => {
            return context.chart.isDatasetVisible(context.datasetIndex) && Math.abs(context.dataset.data[context.dataIndex]) > 3500;
        }
        }
      },
      scales: {
        xAxes: [
          {
            ticks: {
              callback: function (x) {
                x = x/1000;
                return x+'K';
              },
              beginAtZero: true,
              fontFamily: 'Open Sans Bold, sans-serif'
            },
            scaleLabel: {
              display: true,
              labelString: 'Low Priority',
              fontStyle : 'bold'
            },
            gridLines: {},
            stacked: true,
            scaleStartValue: 0
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
              color: '#fff'
            },
            ticks: {
              fontFamily: 'Open Sans Bold, sans-serif'
            },scaleLabel: {
              display: true,
              labelString: 'Legal Entity',
              fontStyle : 'bold',
            },
            stacked: true,
            position: 'left',
            display: true
          }
        ]
      },tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            let x = tooltipItem.xLabel.toString();
            let datasetLabel = data.datasets[tooltipItem.datasetIndex].label;
            let afterPoint = '';
            if (x.indexOf('.') > 0) {
              afterPoint = x.substring(x.indexOf('.'), x.length);
            }
            x = Math.abs(x);
            x = x.toString();
            let lastThree = x.substring(x.length - 3);
            let otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != '') {
              lastThree = ',' + lastThree;
            }
            let res =
              otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
              lastThree +
              afterPoint;
              tooltipItem.xLabel = res;
              return (datasetLabel +' : '+tooltipItem.xLabel);
             }
        }

     },
      legend: {
        position: 'bottom',
        display: true
      }
    }
  };

  grid5config = {
    type: 'horizontalBar',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Conformity',
          data: [],
          backgroundColor: '#b3cccc',
          hoverBackgroundColor: '#b3cccc'
        },
        {
          label: 'Completeness',
          data: [],
          backgroundColor: '#0086b3',
          hoverBackgroundColor: '#0086b3'
        },
        {
          label: 'Validity',
          data: [],
          backgroundColor: '#264d73',
          hoverBackgroundColor: '#264d73'
        },
        {
          label: 'Accuracy',
          data: [],
          backgroundColor: '#0099cc',
          hoverBackgroundColor: '#0099cc'
        }
      ]
    },

    options: {
      plugins: {
        datalabels: {
          color: 'white',
          formatter: value => {
            return this.formatNumberWithComma(Math.abs(value));
          },
          display: (context: any) => {
            return context.chart.isDatasetVisible(context.datasetIndex);
        }
        }
      },
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontFamily: 'Open Sans Bold, sans-serif',
              callback: function (value) {
                return Math.abs(value);
              }
            },
            scaleLabel: {
              display: true
            },
            gridLines: {},
            stacked: true,
            scaleStartValue: 0
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
              color: '#fff'
            },
            ticks: {
              fontFamily: 'Open Sans Bold, sans-serif'
            },
            stacked: true,
            position: 'right',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Legal Entity',
              fontStyle : 'bold'
            }
          }
        ]
      },tooltips: {
        callbacks: {
           label: function(t, d) {
              let datasetLabel = d.datasets[t.datasetIndex].label;
              let xLabel = Math.abs(t.xLabel);
              return datasetLabel + ': ' + xLabel;
           }
        }
     },
      legend: {
        position: 'bottom',
        display: true
      }
    }
  };

  grid6config = {
    type: 'horizontalBar',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Conformity',
          data: [],
          backgroundColor: '#b3cccc',
          hoverBackgroundColor: '#b3cccc'
        },
        {
          label: 'Completeness',
          data: [],
          backgroundColor: '#0086b3',
          hoverBackgroundColor: '#0086b3'
        },
        {
          label: 'Validity',
          data: [],
          backgroundColor: '#264d73',
          hoverBackgroundColor: '#264d73'
        },
        {
          label: 'Accuracy',
          data: [],
          backgroundColor: '#0099cc',
          hoverBackgroundColor: '#0099cc'
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
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontFamily: 'Open Sans Bold, sans-serif'
            },
            scaleLabel: {
              display: true
            },
            gridLines: {},
            stacked: true,
            scaleStartValue: 0
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
              color: '#fff'
            },
            ticks: {
              fontFamily: 'Open Sans Bold, sans-serif'
            },
            stacked: true,
            position: 'left',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Legal Entity',
              fontStyle : 'bold'
            }
          }
        ]
      },
      legend: {
        position: 'bottom',
        display: true
      }
    }
  };

  service: MeasureRemidateDQService;
  constructor(
    measureRemidateDQService: MeasureRemidateDQService,
    private cd: ChangeDetectorRef,
    ngbDropdownConfi: NgbDropdownConfig
  ) {
    this.service = measureRemidateDQService;
    ngbDropdownConfi.autoClose = 'outside';
  }

  ngOnInit() {
    this.service.getData().then(dataaa => {
      let grid3MapList;
      let grid4MapList;
      let grid5MapList;
      let dataset_grid3;
      let dataset_grid4;
      let dataset_grid5;
      let dataset_grid6;
      let yearQuarter = [];
      let lob = [];
      let sourceSystem = [];

      let openDQIssuesData = this.service.getdataQualityScoreData();
      let grid3Data = this.service.getopenDQPrioritySummary();
      let grid4Data = this.service.getopenDQPriorityDtlsLowPr();
      let appGridData = this.service.getissueSummaryLst();
      let issueDetailsMap = this.service.getissueTypeDetails();

      this.openDQIssues = Math.round(openDQIssuesData['dqScore']).toString();
      this.header = openDQIssuesData['header'].toString();

      this.keysOfGrid3 = Object.keys(grid3Data);
      this.grid3config.data.labels = this.keysOfGrid3;
      this.grid4config.data.labels = this.keysOfGrid3;
      this.grid5config.data.labels = this.keysOfGrid3;
      this.grid6config.data.labels = this.keysOfGrid3;

      for (const itr_1 in grid3Data) {
        grid3MapList = grid3Data[itr_1];
        for (const itr_2 in grid3MapList) {
          dataset_grid3 = -1 * parseInt(grid3MapList[itr_2]['highPriority']);
          if(grid3MapList[itr_2]['agingBucket'] === '30-60'){
            this.grid3config.data.datasets[1].data.push(dataset_grid3);
          }
          else if(grid3MapList[itr_2]['agingBucket'] === '<30'){
            this.grid3config.data.datasets[2].data.push(dataset_grid3);
          }
          else if(grid3MapList[itr_2]['agingBucket'] === '>60'){
            this.grid3config.data.datasets[0].data.push(dataset_grid3);
          }
        }
      }

      for (const itr_1 in grid4Data) {
        grid4MapList = grid4Data[itr_1];
        for (const itr_2 in grid4MapList) {
          dataset_grid4 = parseInt(grid4MapList[itr_2]['lowPriority']);
          if(grid3MapList[itr_2]['agingBucket'] === '30-60'){
            this.grid4config.data.datasets[1].data.push(dataset_grid4);
          }
          else if(grid3MapList[itr_2]['agingBucket'] === '<30'){
            this.grid4config.data.datasets[2].data.push(dataset_grid4);
          }
          else if(grid3MapList[itr_2]['agingBucket'] === '>60'){
            this.grid4config.data.datasets[0].data.push(dataset_grid4);
          }
        }
      }
      for (const itr_3 in appGridData) {
        if (
          yearQuarter.indexOf(appGridData[itr_3]['yearQuarter']) == -1 &&
          null != appGridData[itr_3]['yearQuarter']
        ) {
          yearQuarter.push(appGridData[itr_3]['yearQuarter']);
          this.yearQtr[appGridData[itr_3]['yearQuarter']] = true;
        }
      }
      for (const itr_3 in appGridData) {
        if (
          lob.indexOf(appGridData[itr_3]['lob']) == -1 &&
          null != appGridData[itr_3]['lob']
        ) {
          lob.push(appGridData[itr_3]['lob']);
          this.LOBFilter[appGridData[itr_3]['lob']] = true;
        }
      }
      for (const itr_4 in appGridData) {
        if (
          sourceSystem.indexOf(appGridData[itr_4]['sourceSystem']) == -1 &&
          null != appGridData[itr_4]['sourceSystem']
        ) {
          sourceSystem.push(appGridData[itr_4]['sourceSystem']);
          this.SourceSystem[appGridData[itr_4]['sourceSystem']] = true;
        }
      }
      for (const itr_5 in issueDetailsMap) {
        grid5MapList = issueDetailsMap[itr_5];
        for (const itr_2 in grid5MapList) {
          dataset_grid5 = -1 * parseInt(grid5MapList[itr_2]['priorQuarter']);
          dataset_grid6 = grid5MapList[itr_2]['currentQuarter'];

          this.grid5config.data.datasets[itr_2].data.push(dataset_grid5);
          this.grid6config.data.datasets[itr_2].data.push(dataset_grid6);
        }
      }
      this.drop1 = yearQuarter;
      this.drop1.sort();
      this.drop2 = lob;
      this.drop2.sort();
      this.drop3 = sourceSystem;
      this.drop3.sort();

      this.grid3loaded = true;
      this.grid4loaded = true;
      this.grid5loaded = true;
      this.grid6loaded = true;
    });
  }

  filterLOBData(e) {
    let labels = [];
    for (const key in this.LOBFilter) {
      if (this.LOBFilter[key]) {
        labels.push(key);
      }
    }

    let templet = {};
    let tempArray = [];

    const appGridData = this.service.getissueSummaryLst();

    for (const itr_3 in appGridData) {
      if (this.LOBFilter[appGridData[itr_3]['lob']]) {
        if (templet[appGridData[itr_3]['legalEntity']]) {
          templet[appGridData[itr_3]['legalEntity']]['crntQtr'] =
            appGridData[itr_3]['currentQuarter'];
          templet[appGridData[itr_3]['legalEntity']]['prQtr'] =
            appGridData[itr_3]['priorQuarter'];
          templet[appGridData[itr_3]['legalEntity']]['change'] =
            appGridData[itr_3]['change'];
        } else {
          templet[appGridData[itr_3]['legalEntity']] = appGridData[itr_3];
        }
      }
    }

    for (const itr_4 in templet) {
      tempArray.push(templet[itr_4]);
    }
    this.rowData = tempArray;
    this.grid.rowData = this.rowData;
    this.chart1.data.labels = labels;
    this.chart1.chart.update();
    this.chart2.data.labels = labels;
    this.chart2.chart.update();
  }
  changeData1() {
    document.getElementById('div1').style.display = 'block';
    document.getElementById('div2').style.display = 'none';
  }

  changeData2() {
    document.getElementById('div1').style.display = 'none';
    document.getElementById('div2').style.display = 'block';
  }

  filteryearQtr(e) {
    let templet = {};
    let tempArray = [];

    const appGridData = this.service.getissueSummaryLst();

    for (const itr_3 in appGridData) {
      if (this.yearQtr[appGridData[itr_3]['yearQuarter']]) {
        if (templet[appGridData[itr_3]['legalEntity']]) {
          templet[appGridData[itr_3]['legalEntity']]['crntQtr'] =
            appGridData[itr_3]['currentQuarter'];
          templet[appGridData[itr_3]['legalEntity']]['prQtr'] =
            appGridData[itr_3]['priorQuarter'];
          templet[appGridData[itr_3]['legalEntity']]['change'] =
            appGridData[itr_3]['change'];
        } else {
          templet[appGridData[itr_3]['legalEntity']] = appGridData[itr_3];
        }
      }
    }

    for (const itr_4 in templet) {
      tempArray.push(templet[itr_4]);
    }
    this.rowData = tempArray;
    this.grid.rowData = this.rowData;
  }

  filterSourceSystem(e) {
    let templet = {};
    let tempArray = [];

    const appGridData = this.service.getissueSummaryLst();

    for (const itr_3 in appGridData) {
      if (this.SourceSystem[appGridData[itr_3]['sourceSystem']]) {
        if (templet[appGridData[itr_3]['legalEntity']]) {
          templet[appGridData[itr_3]['legalEntity']]['crntQtr'] =
            appGridData[itr_3]['currentQuarter'];
          templet[appGridData[itr_3]['legalEntity']]['prQtr'] =
            appGridData[itr_3]['priorQuarter'];
          templet[appGridData[itr_3]['legalEntity']]['change'] =
            appGridData[itr_3]['change'];
        } else {
          templet[appGridData[itr_3]['legalEntity']] = appGridData[itr_3];
        }
      }
    }

    for (const itr_4 in templet) {
      if (templet[itr_4]) {
              tempArray.push(templet[itr_4]);
      }
    }
    this.rowData = tempArray;
    this.grid.rowData = this.rowData;
  }
  changeData4() {
    document.getElementById('div4').style.display = 'block';
    document.getElementById('div5').style.display = 'block';
    document.getElementById('div3').style.display = 'none';
  }

  changeData5() {
    document.getElementById('div4').style.display = 'none';
    document.getElementById('div5').style.display = 'none';
    document.getElementById('div3').style.display = 'block';
  }

  formatNumberWithComma = function (x) {
    x = x.toString();
    let afterPoint = '';
    if (x.indexOf('.') > 0)
      afterPoint = x.substring(x.indexOf('.'), x.length);
    x = Math.floor(x);
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
      lastThree = ',' + lastThree;
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;
    return res;
  }

  selectAllLobs = function (e) {
    for (let key in this.LOBFilter) {
      if (this.LOBFilter[key] !== undefined) {
        this.LOBFilter[key] = this.allLobSelected;
      }
    }
    this.filterLOBData();
  }

  selectAllSourceSystem = function (e) {
    for (let key in this.SourceSystem) {
      if (this.SourceSystem[key] !== undefined) {
        this.SourceSystem[key] = this.allSourceSystemSelected;
      }
    }
    this.filterSourceSystem();
  }

  selectAllYearQuarter = function (e) {
    for (let key in this.yearQtr) {
      if (this.yearQtr[key] !== undefined) {
        this.yearQtr[key] = this.allYearQtrSelected;
      }
    }
    this.filteryearQtr();
  }
}
