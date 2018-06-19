import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { KeyHilightsService } from '../key-hilights.service';
import { AngularFontAwesomeService } from 'angular-font-awesome';
import { ChartComponent } from 'angular2-chartjs';

@Component({
  selector: 'app-key-highlights-page',
  templateUrl: './key-highlights-page.component.html',
  styleUrls: ['./key-highlights-page.component.css'],
  providers: [NgbDropdownConfig, KeyHilightsService, AngularFontAwesomeService]
})
export class KeyHighlightsPageComponent implements OnInit {
  @ViewChild('grid1configChart') chart1: ChartComponent;
  @ViewChild('grid2configChart') chart2: ChartComponent;
  @ViewChild('grid3configChart') chart3: ChartComponent;
  @ViewChild('grid4configChart') chart4: ChartComponent;
  sourceSystem = {};
  lobFilter = {};
  yearQuarterFilter = {};
  grid3loaded = false;
  grid4loaded = false;
  allLobSelected = true;
  allYearQrtrSelected = true;
  allSourceSysSelected = true;
  tRecords: String;
  dqriScore: String;
  dqpScore: String;
  impactScore: String;
  drop2: String[] = [];
  drop3: String[] = [];
  drop4: String[] = [];

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
    for (let key in this.lobFilter) {
      if (this.lobFilter[key] !== undefined) {
        this.lobFilter[key] = this.allLobSelected;
      }
    }
    this.filtergrid3();
  }

  selectAllYearQrtr = function (e) {
    for (let key in this.yearQuarterFilter) {
      if (this.yearQuarterFilter[key] !== undefined) {
        this.yearQuarterFilter[key] = this.allYearQrtrSelected;
      }
    }
    this.filtergrid3();
  }

  selectAllSourceSys = function (e) {
    for (let key in this.sourceSystem) {
      if (this.sourceSystem[key] !== undefined) {
        this.sourceSystem[key] = this.allSourceSysSelected;
      }
    }
    this.filtergrid3();
  }

  grid3config = {
    type: 'horizontalBar',
    data: {
      labels: ['ECDEs', 'BCDEs'],
      datasets: [
        {
          label: 'Not DQ Monitered',
          data: [],
          backgroundColor: '#e30613',
          hoverBackgroundColor: '#e30613'
        },
        {
          label: 'DQ Monitered',
          data: [],
          backgroundColor: '#43b02a',
          hoverBackgroundColor: '#43b02a'
        }
      ]
    },

    options: {
      plugins: {
        datalabels: {
          color: 'white',
          formatter: value => {
            return Math.abs(value) + ' %';
          },display: (context: any) => {
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
              fontSize: 11,
              callback: value => {
                return value + ' %';
              }
            },
            scaleLabel: {
              display: true,
              labelString: '% Monitored',
              fontStyle : 'bold',
            },
            gridLines: {},
            stacked: true
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
              color: '#fff',
              zeroLineColor: '#fff',
              zeroLineWidth: 0
            },
            ticks: {
              fontFamily: 'Open Sans Bold, sans-serif',
              fontSize: 11
            },
            stacked: true
          }
        ]
      },
      legend: {
        display: true
      }
    }
  };

  grid4config = {
    type: 'bar',
    data: {
      labels: ['Jul-Sep 2017', 'Oct-Dec 2017'],
      datasets: [
        {
          label: '<30 days',
          data: [],
          stack: 'Stack 0',
          backgroundColor: '#43b02a'
        },
        {
          label: '30-60 days',
          data: [],
          stack: 'Stack 0',
          backgroundColor: '#ffd500'
        },
        {
          label: '60 days',
          data: [],
          stack: 'Stack 0',
          backgroundColor: '#e30613'
        }
      ]
    },
    options: {
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            let x = tooltipItem.yLabel.toString();
            let afterPoint = '';
            if (x.indexOf('.') > 0) {
              afterPoint = x.substring(x.indexOf('.'), x.length);
            }
            x = Math.floor(x);
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
              tooltipItem.yLabel = res;
              return tooltipItem.yLabel }, }
      },
      plugins: {
        datalabels: {
          color: 'white',
          formatter: value => {
            return this.formatNumberWithComma(Math.round(value));
          },
          display: (context: any) => {
            return context.chart.isDatasetVisible(context.datasetIndex);
        }
        }
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: '# of Days Open',
              fontStyle : 'bold',
              fontSize : '13' 
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: '# of Issues',
              fontStyle : 'bold',
            }, ticks: {
              callback: function (x) {
                x = x/1000;
                x = x+'K';
                return x;
              },
              beginAtZero: true,
              stepSize: 700000
            }
          }
        ]
      }
    }
  };

  grid1config = {
    type: 'bar',
    data: {
      labels: ['Prior Quarter', 'Current Quarter'],
      datasets: [
        {
          label: '',
          data: [],
          backgroundColor: '#43b02a'
        }
      ]
    },
    options: {
      plugins: {
        datalabels: {
          color: '#b3b3b3',
          formatter: Math.round,
          align: 'end',
          anchor: 'top'
        }
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: true
      }, scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: '# of Issues',
              fontStyle : 'bold',
            }
          }
        ]
      }
    }
  };

  grid2config = {
    type: 'bar',
    data: {
      labels: ['Current Quarter'],
      datasets: [
        {
          label: '',
          data: [],
          backgroundColor: '#b32d00'
        }
      ]
    },
    options: {
      // plugins: {
      //   datalabels: {
      //     color: 'white',
      //     formatter: Math.round
      //   }
      // },
      legend: {
        display: false
      },
      tooltips: {
        enabled: true
      }
    }
  };
  service: KeyHilightsService;
  constructor(
    KeyHighlightsService: KeyHilightsService,
    ngbDropdownConfig: NgbDropdownConfig
  ) {
    this.service = KeyHighlightsService;
    ngbDropdownConfig.autoClose = 'outside';
  }

  ngOnInit() {
    this.service.getData().then(dataaa => {
      var recievedData_1 = this.service.getdQRIAndDQPScoresData();
      this.tRecords = this.formatNumberWithComma(Math.round(recievedData_1['totalRecords'])).toString();
      this.dqriScore = recievedData_1['dqriScore'].toString();
      this.dqpScore = recievedData_1['dqpScore'].toString() + '%';
      this.impactScore = recievedData_1['impactScore'].toString();

      var WholeData = this.service.getlistOfDQMoniteringStatsData();
      var hpDqIssues = this.service.getlistOfHighPriorityDQIssuesData();
      var openDQIssues = this.service.getopenDQIssuesData();

      for (var l in WholeData) {
        if (
          WholeData[l] &&
          this.drop3.indexOf(WholeData[l]['yearQuarter']) === -1
        ) {
          this.drop3.push(WholeData[l]['yearQuarter']);
          this.yearQuarterFilter[WholeData[l]['yearQuarter']] = true;
        }
      }
      for (var j in WholeData) {
        if (WholeData[j] && this.drop4.indexOf(WholeData[j]['lob']) === -1) {
          this.drop4.push(WholeData[j]['lob']);
          this.lobFilter[WholeData[j]['lob']] = true;
        }
      }
      for (var k in WholeData) {
        if (this.drop2.indexOf(WholeData[k]['sourceSystem']) === -1) {
          this.drop2.push(WholeData[k]['sourceSystem']);
          this.sourceSystem[WholeData[k]['sourceSystem']] = true;
        }
      }

      let grid3configData = {
        "ECDEs":{"notDQMonitered":0,
                  "dqMonitered":0},
        "BCDEs":{"notDQMonitered":0,
                  "dqMonitered":0}
      };
      for (var i in WholeData) {
        if (WholeData[i]) {
          if (WholeData[i]['label'] === 'ECDEs') {
            grid3configData.ECDEs.notDQMonitered = 
            (parseInt(WholeData[i]['notDQMonitered'])+grid3configData.ECDEs.notDQMonitered)/2;
            grid3configData.ECDEs.dqMonitered = 
            (parseInt(WholeData[i]['dqMonitered'])+grid3configData.ECDEs.dqMonitered)/2;
          }
          if (WholeData[i]['label'] === 'BCDEs') {
            grid3configData.BCDEs.notDQMonitered = 
            (parseInt(WholeData[i]['notDQMonitered'])+grid3configData.BCDEs.notDQMonitered)/2;
            grid3configData.BCDEs.dqMonitered = 
            (parseInt(WholeData[i]['dqMonitered'])+grid3configData.BCDEs.dqMonitered)/2;
          }
        }
      }
      this.grid3config.data.datasets[0].data.push(
        grid3configData.ECDEs.notDQMonitered
      );
      this.grid3config.data.datasets[1].data.push(
        grid3configData.ECDEs.dqMonitered
      );
      this.grid3config.data.datasets[0].data.push(
        grid3configData.BCDEs.notDQMonitered
      );
      this.grid3config.data.datasets[1].data.push(
        grid3configData.BCDEs.dqMonitered
      );
      this.grid3loaded = true;
      this.grid4config.data.datasets[0].data.push(
        hpDqIssues[1]['nbrOfIssues'],
        hpDqIssues[4]['nbrOfIssues']
      );

      this.grid4config.data.datasets[1].data.push(
        hpDqIssues[2]['nbrOfIssues'],
        hpDqIssues[5]['nbrOfIssues']
      );

      this.grid4config.data.datasets[2].data.push(
        hpDqIssues[0]['nbrOfIssues'],
        hpDqIssues[3]['nbrOfIssues']
      );

      this.grid4loaded = true;
      this.grid1config.data.datasets[0].data.push(openDQIssues['priorQuarter']);
      this.grid1config.data.datasets[0].data.push(
        openDQIssues['currentQuarter']
      );
    });
  }

  filtergrid3(e) {
    var WholeData = this.service.getlistOfDQMoniteringStatsData();
    this.grid3config.data.datasets[0].data = [];
    this.grid3config.data.datasets[1].data = [];
    let grid3configData = {
      "ECDEs":{"notDQMonitered":0,
                "dqMonitered":0},
      "BCDEs":{"notDQMonitered":0,
                "dqMonitered":0}
    };
    for (var i in WholeData) {
      if (WholeData[i]) {
        if (
          WholeData[i]['label'] === 'ECDEs' &&
          this.lobFilter[WholeData[i]['lob']] &&
          this.sourceSystem[WholeData[i]['sourceSystem']] &&
          this.yearQuarterFilter[WholeData[i]['yearQuarter']]
        ) {
          grid3configData.ECDEs.notDQMonitered = 
          (parseInt(WholeData[i]['notDQMonitered'])+grid3configData.ECDEs.notDQMonitered)/2;
          grid3configData.ECDEs.dqMonitered = 
          (parseInt(WholeData[i]['dqMonitered'])+grid3configData.ECDEs.dqMonitered)/2;
        }
        if (
          WholeData[i]['label'] === 'BCDEs' &&
          this.lobFilter[WholeData[i]['lob']] &&
          this.sourceSystem[WholeData[i]['sourceSystem']] &&
          this.yearQuarterFilter[WholeData[i]['yearQuarter']]
        ) {
          grid3configData.BCDEs.notDQMonitered = 
          (parseInt(WholeData[i]['notDQMonitered'])+grid3configData.BCDEs.notDQMonitered)/2;
          grid3configData.BCDEs.dqMonitered = 
          (parseInt(WholeData[i]['dqMonitered'])+grid3configData.BCDEs.dqMonitered)/2;
        }
      }
    }
    this.grid3config.data.datasets[0].data.push(
      grid3configData.ECDEs.notDQMonitered
    );
    this.grid3config.data.datasets[1].data.push(
      grid3configData.ECDEs.dqMonitered
    );
    this.grid3config.data.datasets[0].data.push(
      grid3configData.BCDEs.notDQMonitered
    );
    this.grid3config.data.datasets[1].data.push(
      grid3configData.BCDEs.dqMonitered
    );
    this.chart3.data = this.grid3config.data;
    this.chart3.chart.update();
  }
}
