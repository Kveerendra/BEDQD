import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InternalControlService } from '../service/internal-control.service';
import { ChartComponent } from 'angular2-chartjs';
import { GridComponent } from '../../shared/grid/grid.component';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-internal-controls-page",
  templateUrl: "./internal-controls-page.component.html",
  styleUrls: ["./internal-controls-page.component.css"]
})
export class InternalControlsPageComponent implements OnInit {
  @ViewChild("grid1Chart") chart1: ChartComponent;
  @ViewChild("grid2Chart") chart2: ChartComponent;
  @ViewChild("grid") grid: GridComponent;
  impactScoreModel = {};
  dQPScoreModel = {};
  dqRIScoreModel = {};
  isL1L2SrcSysLglEntityModel = [];
  LOBFilter = {};
  sourceSystemFilter = {};
  drop3 = [];
  drop4 = [];
  scoreSelected = "dqriScore";
  scoreBySelected = "level1ProcessDQP";
  ecdeSelected = "ecdeRcrdsTstd";
  grid1config = {
    type: "horizontalBar",
    data: {
      labels: [],
      datasets: [
        {
          label: "<30",
          data: [],
          backgroundColor: "#0086b3",
          hoverBackgroundColor: "#0086b3"
        }
      ]
    },
    options: {
      legend: {
        display: false
      }
    }
  };
  grid2config = {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "<30",
          data: [],
          backgroundColor: "#0086b3",
          hoverBackgroundColor: "#0086b3"
        }
      ]
    },
    options: {
      legend: {
        display: false
      }
    }
  };

  service: InternalControlService;
  constructor(internalControlService: InternalControlService, ngbDropdownConfi: NgbDropdownConfig) {
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
      this.updateChart1();
      this.updateChart2();
      this.updateGrid();
    });
    this.grid.internalControlsFlag = true;
  }

  updateChart1() {
    this.grid1config.data.datasets[0].data = [];
    this.grid1config.data.labels = [];
    let dataSet = this.service.getIsL1L2SrcSysLglEntityModel();
    for (let i in dataSet) {
      if (
        dataSet[i] &&
        this.LOBFilter[dataSet[i]["sourceLob"]] &&
        this.sourceSystemFilter[dataSet[i]["sourceSystem"]]
      ) {
        let index = this.grid1config.data.labels.indexOf(
          dataSet[i][this.scoreBySelected]
        );
        if (index !== -1) {
          this.grid1config.data.datasets[0].data[index] =
            parseFloat(this.grid1config.data.datasets[0].data[index]) +
            parseFloat(dataSet[i][this.scoreSelected]);
        } else {
          this.grid1config.data.datasets[0].data.push(
            parseFloat(dataSet[i][this.scoreSelected])
          );
          this.grid1config.data.labels.push(dataSet[i][this.scoreBySelected]);
        }
      }
    }
    this.chart1.chart.data = this.grid1config.data;
    this.chart1.chart.update();
  }

  updateChart2() {
    this.grid2config.data.datasets[0].data = [];
    this.grid2config.data.labels = [];
    let dataSet = [];
    if (this.scoreBySelected === "level1ProcessDQP") {
      dataSet = this.service.getEcdeCntL1SrcSysLegalEntityModel();
    } else if (this.scoreBySelected === "level2ProcessDQP") {
      dataSet = this.service.getEcdeCntL2SrcSysLegalEntityModel();
    }
    for (let i in dataSet) {
      if (
        dataSet[i] &&
        this.LOBFilter[dataSet[i]["sourceLob"]] &&
        this.sourceSystemFilter[dataSet[i]["sourceSystem"]]
      ) {
        console.log(this.ecdeSelected);
        const index = this.grid2config.data.labels.indexOf(
          dataSet[i][this.scoreBySelected]
        );
        if (index !== -1) {
          this.grid2config.data.datasets[0].data[index] =
            parseFloat(this.grid1config.data.datasets[0].data[index]) +
            parseFloat(dataSet[i][this.ecdeSelected]);
        } else {
          this.grid2config.data.datasets[0].data.push(
            parseFloat(dataSet[i][this.ecdeSelected])
          );
          this.grid2config.data.labels.push(dataSet[i][this.scoreBySelected]);
        }
      }
    }
    console.log(this.grid2config.data);
    this.chart2.chart.data = this.grid2config.data;
    this.chart2.chart.update();
  }
  updateBothCharts() {
    this.updateChart1();
    this.updateChart2();
  }
  fillSourceSystemFilter(): any {
    let dataSet = this.service.getIsL1L2SrcSysLglEntityModel();
    let sourceSystems = [];

    for (let i in dataSet) {
      if (sourceSystems.indexOf(dataSet[i]["sourceSystem"]) == -1) {
        sourceSystems.push(dataSet[i]["sourceSystem"]);
        this.sourceSystemFilter[dataSet[i]["sourceSystem"]] = true;
      }
    }
    this.drop4 = sourceSystems;
    console.log(this.sourceSystemFilter);
  }
  fillLobFilter() {
    let dataSet = this.service.getIsL1L2SrcSysLglEntityModel();
    let lobs = [];

    for (let i in dataSet) {
      if (lobs.indexOf(dataSet[i]["sourceLob"]) == -1) {
        lobs.push(dataSet[i]["sourceLob"]);
        this.LOBFilter[dataSet[i]["sourceLob"]] = true;
      }
    }
    this.drop3 = lobs;
    console.log(this.LOBFilter);
  }
  filterData(e) {
    this.updateBothCharts();
  }
  updateGrid() {
    var rowData = [];
    var columnDefs = [
      { headerName: "Legal Entity / LOB", field: 'level1ProcessDqp' },
      { headerName: "ECDE", field: "ecde" },
      { headerName: "Impact Score", field: "impactScore" },
      { headerName: "Completness", field: "completness" },
      { headerName: "Conformity", field: "conformity" },
      { headerName: "Validity", field: "validity" },
      { headerName: "Accuracy", field: "accuracy" }
    ];

    this.grid.columnDefs = columnDefs;
    var dimention = "";
    dimention =
      this.scoreBySelected == "level1ProcessDQP"
        ? "Level1_Process_Name"
        : this.scoreBySelected == "level2ProcessDQP"
          ? "Level2_Process_DQP"
          : this.scoreBySelected == "sourceSystem"
            ? "SOURCE_SYSTEM"
            : this.scoreBySelected == "sourceLob"
              ? "LOB"
              : "Level1_Process_Name";

    rowData = this.service
      .getImpactScoreL1L2SrcLegalEntityModel()
      .filter(record => record.dimention == dimention);
    this.grid.rowData = rowData;
  }
}
