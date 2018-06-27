import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InternalControlService } from '../service/internal-control.service';
import { ChartComponent } from 'angular2-chartjs';
import { GridComponent } from '../../shared/grid/grid.component';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-internal-controls-page',
  templateUrl: './internal-controls-page.component.html',
  styleUrls: ['./internal-controls-page.component.css']
})
export class InternalControlsPageComponent implements OnInit {
  @ViewChild('grid1Chart') chart1: ChartComponent;
  @ViewChild('grid2Chart') chart2: ChartComponent;
  @ViewChild('grid') grid: GridComponent;
  public input = '';
  grid1chartStyle = '';
  allLobSelected = true;
  allSourceSysSelected = true;
  displayValue = {
    level1ProcessDqp: 'Level 1 Process',
    level2ProcessDqp: 'Level 2 Process',
    sourceSystem: 'Source System',
    sourceLOB: 'Legal Entity / LOB',
    dqriScore: 'DQRI Score',
    dqpScore: 'DQP Score',
    impactScore: 'Impact Score',
    ecdeRcrdsTstd: 'ECDE Records Tested',
    ecdeCnt: 'ECDE Count'
  };
  impactScoreModel = {};
  dQPScoreModel = {};
  dqRIScoreModel = {};
  isL1L2SrcSysLglEntityModel = [];
  LOBFilter = {};
  sourceSystemFilter = {};
  drop3 = [];
  drop4 = [];
  scoreSelected = 'dqriScore';
  scoreBySelected = 'level1ProcessDqp';
  ecdeSelected = 'ecdeRcrdsTstd';
  grid1config = {
    type: 'horizontalBar',
    data: {
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
          backgroundColor: '#0086b3',
          hoverBackgroundColor: '#0086b3'
        }
      ]
    },

    options: {
      plugins: {
        datalabels: {
          color: '#000000',
          display: true,
          align: 'end',
          anchor: 'top',
          formatter: label => {
            if (this.scoreSelected === 'impactScore') {
              return '';
            } else {
              return Math.round(label);
            }
          }
        }
      },
      legend: {
        display: false
      },

      scales: {
        xAxes: [
          {
            ticks: {
              fontFamily: 'Open Sans Bold, sans-serif',
              autoSkip: false,
              minRotation: 0,
              maxRotation: 90
            },
            barPercentage: 1,
            scaleLabel: {
              display: true,
              labelString: 'DQRI Score'
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontFamily: 'Open Sans Bold, sans-serif',
              max: 120,
              callback: function(value) {
                return value;
              }
            },
            barPercentage: 1.15,
            scaleLabel: {
              display: true,
              labelString: ''
            }
          }
        ]
      }
    }
  };
  grid2config = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
          backgroundColor: '#0086b3',
          hoverBackgroundColor: '#0086b3'
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
          color: '#000000',
          display: true,
          align: 'bottom',
          //anchor: 'top',
          offset:-55,
          formatter: value => {
            return this.formatNumberWithComma(Math.round(value));
          },
          rotation: 90
        }
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontFamily: 'Open Sans Bold, sans-serif',
              autoSkip: false,
              maxRotation: 90,
              minRotation: 0
            },
            barPercentage: 1
          }
        ],
        yAxes: [
          {
            ticks: {
              fontFamily: 'Open Sans Bold, sans-serif',
              callback: function(x) {
                x = x.toString();
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
                return res;
              },
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: '#of Rows Tested'
            }
          }
        ]
      }
    }
  };

  service: InternalControlService;
  constructor(
    internalControlService: InternalControlService,
    ngbDropdownConfi: NgbDropdownConfig
  ) {
    this.service = internalControlService;
    ngbDropdownConfi.autoClose = 'outside';
  }

  ngOnInit() {
    this.service.getData().then(dataaa => {
      this.dQPScoreModel = this.service.getQPModel();

      this.dQPScoreModel['dqpScore'] = Math.abs(
        parseFloat(this.dQPScoreModel['dqpScore'])
      );
      this.impactScoreModel = this.service.getImpactScoreModel();
      this.impactScoreModel['header'] = this.initCap(this.impactScoreModel['header']) ;


      



     // console.log(result);
     // this.impactScoreModel['header'] = result;
      
      
     // console.log(this.impactScoreModel);
      this.dqRIScoreModel = this.service.getdQScoreModel();
      this.fillLobFilter();
      this.fillSourceSystemFilter();
      this.updateBothCharts();
      this.updateGrid();
    });
    this.grid.internalControlsFlag = true;
  }

  initCap (input: String)
  {
   // debugger;
    if (input!=null) {
      var stringArr = input.split(" ");
      var result = "";
      var cap = stringArr.length;
      for(var x = 0; x < cap; x++) {
        stringArr[x] = stringArr[x].toLowerCase();
        if(x === cap - 1) {
          result += stringArr[x].substring(0,1).toUpperCase() + stringArr[x].substring(1);
        } else {
          result += stringArr[x].substring(0,1).toUpperCase() + stringArr[x].substring(1) + " ";
        }
      }
    }
    console.log(result);
    return result;
  }
  getchart1Data() {
    let dataSet = [];
    dataSet =
      this.scoreBySelected === 'level1ProcessDqp'
        ? this.service.getImpactScoreL1SrcSystemLegalEntityLOBModel()
        : this.scoreBySelected === 'level2ProcessDqp'
          ? this.service.getImpactScoreL2SrcSystemLegalEntityLOBModel()
          : this.scoreBySelected === 'sourceSystem'
            ? this.service.getImpactScoreSrcSysSrcSystemLegalEntityLOBModel()
            : this.scoreBySelected === 'sourceLOB'
              ? this.service.getImpactScroreForLegalEntityLOBSourceSystemLegalEntityLOB()
              : this.service.getImpactScoreL1SrcSystemLegalEntityLOBModel();
    return dataSet;
  } /*
  getSourceBySelectedKey(): String {
    return this.scoreBySelected === 'level1ProcessDqp'
      ? 'level1ProcessDqp'
      : this.scoreBySelected === 'level2ProcessDqp'
        ? 'level2ProcessDqp'
        : this.scoreBySelected === 'sourceSystem'
          ? 'sourceSystem'
          : this.scoreBySelected === 'sourceLOB'
            ? ''
            : 'level1ProcessDqp';
  }*/
  valueWithPercent(value) {
    return value + '%';
  }
  valueWithOutPercent(value) {
    return value;
  }
  updateChart1Type() {
    if (this.scoreSelected === 'dqriScore') {
      this.grid1config.type = 'horizontalBar';
      this.grid1config.options.scales.yAxes[0].scaleLabel.labelString = '';
      this.grid1config.options.scales.xAxes[0].scaleLabel.labelString =
        'DQRI Score';
      this.grid1config.options.scales.yAxes[0].ticks.callback = this.valueWithOutPercent;
    } else if (this.scoreSelected === 'dqpScore') {
      this.grid1config.type = 'bar';
      this.grid1config.options.scales.yAxes[0].scaleLabel.labelString =
        'DQP Score';
      this.grid1config.options.scales.xAxes[0].scaleLabel.labelString = '';
      this.grid1config.options.scales.yAxes[0].ticks.callback = this.valueWithPercent;
    } else if (this.scoreSelected === 'impactScore') {
      this.grid1config.type = 'bubble';
      this.grid1config.options.scales.yAxes[0].scaleLabel.labelString =
        'DQP Score';
      this.grid1config.options.scales.xAxes[0].scaleLabel.labelString =
        'Impact Score';
      this.grid1config.options.scales.yAxes[0].ticks.callback = this.valueWithPercent;
    } else {
      this.grid1config.type = 'horizontalBar';
      this.grid1config.options.scales.yAxes[0].scaleLabel.labelString = '';
      this.grid1config.options.scales.xAxes[0].scaleLabel.labelString = '';
      this.grid1config.options.scales.yAxes[0].ticks.callback = this.valueWithOutPercent;
    }
  }
  updateChart1() {
    this.grid1config.data.datasets[0].data = [];
    this.grid1config.data.labels = [];
    let dataSet = this.getchart1Data();
    for (let i in dataSet) {
      if (
        dataSet[i] &&
        this.LOBFilter[dataSet[i]['sourceLOB']] &&
        this.sourceSystemFilter[dataSet[i]['sourceSystem']] &&
        this.scoreSelected !== 'impactScore'
      ) {
        const index = this.grid1config.data.labels.indexOf(
          dataSet[i][this.scoreBySelected]
        );
        if (index !== -1) {
          this.grid1config.data.datasets[0].data[index] = (
            (parseFloat(this.grid1config.data.datasets[0].data[index]) +
              parseFloat(dataSet[i][this.scoreSelected])) /
            2
          ).toFixed(2);
        } else {
          this.grid1config.data.datasets[0].data.push(
            parseFloat(dataSet[i][this.scoreSelected])
          );
          this.grid1config.data.labels.push(dataSet[i][this.scoreBySelected]);
        }
        delete this.grid1config.options['tooltips'];
      } else if (this.scoreSelected === 'impactScore') {
        this.grid1config.data.datasets[0].data.push({
          x: parseFloat(dataSet[i]['impactScore']),
          y: parseFloat(dataSet[i]['dqpScore']),
          r: parseFloat(dataSet[i]['ecdeCnt']) * 3
        });
        this.grid1config.data.labels.push(dataSet[i][this.scoreBySelected]);
        this.grid1config.data.datasets[0]['backgroundColor'] = '#0086b3';
        this.grid1config.data.datasets[0]['hoverBackgroundColor'] = '#0086b3';
        //this.grid1config.data.datasets[0]['radius']=50;
        this.grid1config.options['tooltips'] = {
          callbacks: {
            label: function(t, d) {
              let datasetLabel = d.datasets[t.datasetIndex].label;
              let xLabel = Math.abs(t.xLabel);
              return [
                'Dimentions_Swap : ' + d.labels[t.index],
                ' ECDE Count : ' + d.datasets[0].data[t.index].r / 3,
                ' Impact Score : ' + d.datasets[0].data[t.index].x,
                ' DQP Score : ' + d.datasets[0].data[t.index].y + '%'
              ];
            }
          }
        };
      }
    }
    this.grid1config.data.labels.sort();
    this.updateChart1Type();
    this.chart1.chart.data = this.grid1config.data;
    this.chart1.chart.render(this.grid1config);
    this.chart1.chart.update();
  }
  getchart2Data() {
    let dataSet = [];
    if (this.scoreBySelected === 'level1ProcessDqp') {
      dataSet = this.service.getEcdeCntL1SrcSysLegalEntityModel();
    } else if (this.scoreBySelected === 'level2ProcessDqp') {
      dataSet = this.service.getEcdeCntL2SrcSysLegalEntityModel();
    } else if (this.scoreBySelected === 'sourceSystem') {
      dataSet = this.service.getEcdeCountEcdeRecords();
    } else if (this.scoreBySelected === 'sourceLOB') {
      dataSet = this.service.getECDECountForLegalEntityLOBSourceSystemLegalEntityLOB();
    } else {
      dataSet = [];
    }
    return dataSet;
  }
  updateChart2() {
    this.grid2config.data.datasets[0].data = [];
    this.grid2config.data.labels = [];
    let dataSet = this.getchart2Data();

    for (const i in dataSet) {
      if (
        dataSet[i] &&
        this.LOBFilter[dataSet[i]['sourceLOB']] &&
        this.sourceSystemFilter[dataSet[i]['sourceSystem']]
      ) {
        let index = this.grid2config.data.labels.indexOf(
          dataSet[i][this.scoreBySelected]
        );
        if (index !== -1) {
          this.grid2config.data.datasets[0].data[index] =
            parseFloat(this.grid2config.data.datasets[0].data[index]) +
            parseFloat(dataSet[i][this.ecdeSelected]);
        } else {
          this.grid2config.data.datasets[0].data.push(
            parseFloat(dataSet[i][this.ecdeSelected])
          );
          this.grid2config.data.labels.push(dataSet[i][this.scoreBySelected]);
        }
      }
    }
    if (this.ecdeSelected === 'ecdeRcrdsTstd') {
      this.grid2config.options.scales.yAxes[0].scaleLabel.labelString =
        '#of Rows Tested';
        this.grid2config.options['tooltips'] = {
          callbacks: {
            label: function(t, d) {
              let datasetLabel = d.datasets[t.datasetIndex].label;
              let xLabel = Math.abs(t.xLabel);
              return [
                'Dimentions_Swap : ' + d.labels[t.index],
                ' #of Rows Tested : ' + d.datasets[0].data[t.index].r / 3
              ];
            }
          }
        };
    } else if (this.ecdeSelected === 'ecdeCnt') {
      this.grid2config.options.scales.yAxes[0].scaleLabel.labelString =
        'ECDE Count';
        this.grid2config.options['tooltips'] = {
          callbacks: {
            label: function(t, d) {
              let datasetLabel = d.datasets[t.datasetIndex].label;
              let xLabel = Math.abs(t.xLabel);
              return [
                'Dimentions_Swap : ' + d.labels[t.index],
                ' ECDE Count : ' + d.datasets[0].data[t.index].r / 3
              ];
            }
          }
        };
    }
    console.log(this.grid2config.options);
    this.chart2.chart.data = this.grid2config.data;
    this.chart2.chart.options.scales.yAxes[0].scaleLabel.labelString=this.grid2config.options.scales.yAxes[0].scaleLabel.labelString;
    this.chart2.chart.render(this.grid2config);
    this.chart2.chart.tooltips=this.grid2config.options.tooltips;
    this.chart2.chart.update();
  }
  updateBothCharts() {
    this.updateChart1();
    this.updateChart2();
    this.updateGrid();
  }
  fillSourceSystemFilter(): any {
    let dataSet = this.getchart1Data();
    let sourceSystems = [];

    for (const i in dataSet) {
      if (sourceSystems.indexOf(dataSet[i]['sourceSystem']) === -1) {
        sourceSystems.push(dataSet[i]['sourceSystem']);
        this.sourceSystemFilter[dataSet[i]['sourceSystem']] = true;
      }
    }
    this.drop4 = sourceSystems;
  }
  fillLobFilter() {
    let dataSet = this.getchart1Data();
    let lobs = [];

    for (const i in dataSet) {
      if (lobs.indexOf(dataSet[i]['sourceLOB']) === -1) {
        lobs.push(dataSet[i]['sourceLOB']);
        this.LOBFilter[dataSet[i]['sourceLOB']] = true;
      }
    }
    this.drop3 = lobs;
  }
  filterData(e) {
    this.updateBothCharts();
    this.allLobFilterValues();
    this.allSourceSysValues();
  }
  updateGrid() {
    let rowData = [];
    let columnDefs = [
      { headerName: 'Legal Entity / LOB', field: 'level1ProcessDqp' },
      { headerName: 'ECDE', field: 'ecde' },
      { headerName: 'Impact Score', field: 'impactScore' },
      { headerName: 'Completness', field: 'completness' },
      { headerName: 'Conformity', field: 'conformity' },
      { headerName: 'Validity', field: 'validity' },
      { headerName: 'Accuracy', field: 'accuracy' }
    ];

    this.grid.columnDefs = columnDefs;
    let dimension = '';
    dimension =
      this.scoreBySelected === 'level1ProcessDqp'
        ? 'Level1_Process_Name'
        : this.scoreBySelected === 'level2ProcessDqp'
          ? 'Level2_Process_DQP'
          : this.scoreBySelected === 'sourceSystem'
            ? 'SOURCE_SYSTEM'
            : this.scoreBySelected === 'sourceLOB'
              ? 'LOB'
              : 'Level1_Process_Name';

    rowData = this.service
      .getImpactScoreL1L2SrcLegalEntityModel()
      .filter(
        record =>
          record.dimension === dimension &&
          this.LOBFilter[record.sourceLOB] &&
          this.sourceSystemFilter[record.sourceSytem]
      );
    this.grid.rowData = rowData;
  }

  formatNumberWithComma = function(x) {
    x = x.toString();
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
    return res;
  };
  selectAllLobs = function(e) {
    for (let key in this.LOBFilter) {
      if (this.LOBFilter[key] !== undefined) {
        this.LOBFilter[key] = this.allLobSelected;
      }
    }
    this.filterData();
  };
  selectAllSourceSys = function(e) {
    for (let key in this.sourceSystemFilter) {
      if (this.sourceSystemFilter[key] !== undefined) {
        this.sourceSystemFilter[key] = this.allSourceSysSelected;
      }
    }
    this.filterData();
  };
  allLobFilterValues = function() {
    for (let o in this.LOBFilter) {
      if (!this.LOBFilter[o]) {
        this.allLobSelected = false;
      }
    }
  };
  allSourceSysValues = function() {
    for (let o in this.sourceSystemFilter) {
      if (!this.sourceSystemFilter[o]) {
        this.allSourceSysSelected = false;
      }
    }
  };
}
