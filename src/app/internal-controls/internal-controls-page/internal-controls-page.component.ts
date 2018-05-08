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
  grid1chartStyle = '';
  displayValue = {
    level1ProcessDQP: 'Level 1 Process',
    level2ProcessDQP: 'Level 2 Process',
    sourceSystem: 'Source System',
    sourceLob: 'Legal Entity / LOB',
    dqriScore: 'DQRI Score',
    dqpScore: 'DQI Score',
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
  scoreBySelected = 'level1ProcessDQP';
  ecdeSelected = 'ecdeRcrdsTstd';
  grid1config = {
    type: 'horizontalBar',
    data: {
      labels: [],
      datasets: [
        {
          label: '<30',
          data: [],
          backgroundColor: '#0086b3',
          hoverBackgroundColor: '#0086b3'
        }
      ]
    },

    options: {
      plugins: {
        datalabels: {
          color: 'white',
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
              autoSkip: false,
              minRotation: 0,
              maxRotation: 90
            },
            barPercentage: 1
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
          label: '<30',
          data: [],
          backgroundColor: '#0086b3',
          hoverBackgroundColor: '#0086b3'
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
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 0
            },
            barPercentage: 1
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
      this.impactScoreModel = this.service.getImpactScoreModel();
      this.dqRIScoreModel = this.service.getdQScoreModel();
      // this.isL1L2SrcSysLglEntityModel = this.service.getIsL1L2SrcSysLglEntityModel();
      this.fillLobFilter();
      this.fillSourceSystemFilter();
      this.updateBothCharts();
      this.updateGrid();
    });
    this.grid.internalControlsFlag = true;
  }
  getchart1Data() {
    let dataSet = [];
    dataSet =
      this.scoreBySelected === 'level1ProcessDQP'
        ? this.service.getImpactScoreL1SrcSystemLegalEntityLOBModel()
        : this.scoreBySelected === 'level2ProcessDQP'
          ? this.service.getImpactScoreL2SrcSystemLegalEntityLOBModel()
          : this.scoreBySelected === 'sourceSystem'
            ? this.service.getImpactScoreSrcSysSrcSystemLegalEntityLOBModel()
            : this.scoreBySelected === 'sourcelob'
              ? []
              : this.service.getImpactScoreL1SrcSystemLegalEntityLOBModel();
    return dataSet;
  }
  getSourceBySelectedKey(): String {
    return this.scoreBySelected === 'level1ProcessDQP'
      ? 'level1ProcessDqp'
      : this.scoreBySelected === 'level2ProcessDQP'
        ? 'level2ProcessDqp'
        : this.scoreBySelected === 'sourceSystem'
          ? 'sourceSystem'
          : this.scoreBySelected === 'sourceLob'
            ? ''
            : 'level1ProcessDqp';
  }
  updateChart1Type() {
    // let type = '';
    if (this.scoreSelected === 'dqriScore') {
      // this.grid1config.options.plugins.datalabels['rotation'] = 0;
      this.grid1config.type = 'horizontalBar';
    } else if (this.scoreSelected === 'dqpScore') {
      this.grid1config.type = 'bar';
      //   this.grid1config.options.plugins.datalabels['rotation'] = 90;
    } else if (this.scoreSelected === 'impactScore') {
      this.grid1config.type = 'bubble';
    } else {
      this.grid1config.type = 'horizontalBar';
    }

    // this.chart1.chart.type = type;
  }
  updateChart1() {
    this.grid1config.data.datasets[0].data = [];
    this.grid1config.data.labels = [];
    let dataSet = this.getchart1Data();
    // this.chart1.chart.canvas.height='1500';
    for (let i in dataSet) {
      if (
        dataSet[i] &&
        this.LOBFilter[dataSet[i]['sourcelob']] &&
        this.sourceSystemFilter[dataSet[i]['sourceSystem']] &&
        this.scoreSelected !== 'impactScore'
      ) {
        const index = this.grid1config.data.labels.indexOf(
          dataSet[i][this.getSourceBySelectedKey().toString()]
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
          this.grid1config.data.labels.push(
            dataSet[i][this.getSourceBySelectedKey().toString()]
          );
        }
      } else if (this.scoreSelected === 'impactScore') {
        this.grid1config.data.datasets[0].data.push({
          x: parseFloat(dataSet[i]['impactScore']),
          y: parseFloat(dataSet[i]['dqpScore']),
          r: parseFloat(dataSet[i]['ecdeCnt']) * 3
        });
        this.grid1config.data.labels.push(
          dataSet[i][this.getSourceBySelectedKey().toString()]
        );
        this.grid1config.data.datasets[0]['backgroundColor'] = '#0086b3';
        this.grid1config.data.datasets[0]['hoverBackgroundColor'] = '#0086b3';
        //this.grid1config.data.datasets[0]['radius']=50;
        this.grid1config.options['tooltips'] = {
          callbacks: {
            label: function(t, d) {
              var datasetLabel = d.datasets[t.datasetIndex].label;
              var xLabel = Math.abs(t.xLabel);
              return (
                'Dimentions_Swap : ' +
                d.labels[t.index] +
                ' ECDE Count : ' +
                d.datasets[0].data[t.index].r / 3 +
                ' Impact Score : ' +
                d.datasets[0].data[t.index].x +
                ' DQP Score : ' +
                d.datasets[0].data[t.index].y +
                '%'
              );
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
    if (this.scoreBySelected === 'level1ProcessDQP') {
      dataSet = this.service.getEcdeCntL1SrcSysLegalEntityModel();
    } else if (this.scoreBySelected === 'level2ProcessDQP') {
      dataSet = this.service.getEcdeCntL2SrcSysLegalEntityModel();
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
        this.LOBFilter[dataSet[i]['sourcelob']] &&
        this.sourceSystemFilter[dataSet[i]['sourceSystem']]
      ) {
        console.log(dataSet[i][this.getSourceBySelectedKey().toString()]);
        let index = this.grid2config.data.labels.indexOf(
          dataSet[i][this.getSourceBySelectedKey().toString()]
        );
        if (index !== -1) {
          this.grid2config.data.datasets[0].data[index] =
            parseFloat(this.grid1config.data.datasets[0].data[index]) +
            parseFloat(dataSet[i][this.ecdeSelected]);
            console.log(parseFloat(this.grid1config.data.datasets[0].data[index]) +
            parseFloat(dataSet[i][this.ecdeSelected]));
        } else {
          console.log( parseFloat(dataSet[i][this.ecdeSelected]));
          this.grid2config.data.datasets[0].data.push(
            parseFloat(dataSet[i][this.ecdeSelected])
          );
          this.grid2config.data.labels.push(
            dataSet[i][this.getSourceBySelectedKey().toString()]
          );
        }
      }
    }
    this.chart2.chart.data = this.grid2config.data;
    this.chart2.chart.update();
  }
  updateBothCharts() {
    this.updateChart1();
    this.updateChart2();
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
      if (lobs.indexOf(dataSet[i]['sourcelob']) == -1) {
        lobs.push(dataSet[i]['sourcelob']);
        this.LOBFilter[dataSet[i]['sourcelob']] = true;
      }
    }
    this.drop3 = lobs;
  }
  filterData(e) {
    this.updateBothCharts();
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
    let dimention = '';
    dimention =
      this.scoreBySelected === 'level1ProcessDQP'
        ? 'Level1_Process_Name'
        : this.scoreBySelected === 'level2ProcessDQP'
          ? 'Level2_Process_DQP'
          : this.scoreBySelected === 'sourceSystem'
            ? 'SOURCE_SYSTEM'
            : this.scoreBySelected === 'sourcelob'
              ? 'LOB'
              : 'Level1_Process_Name';

    rowData = this.service
      .getImpactScoreL1L2SrcLegalEntityModel()
      .filter(record => record.dimention === dimention);
    this.grid.rowData = rowData;
  }
}
