import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { InternalControlService } from "../service/internal-control.service";
import { ChartComponent } from "angular2-chartjs";

@Component({
  selector: "app-internal-controls-page",
  templateUrl: "./internal-controls-page.component.html",
  styleUrls: ["./internal-controls-page.component.css"]
})
export class InternalControlsPageComponent implements OnInit {
  @ViewChild("grid1Chart") chart1: ChartComponent;
  @ViewChild("grid2Chart") chart2: ChartComponent;
  impactScoreModel = {};
  dQPScoreModel = {};
  dqRIScoreModel = {};
  isL1L2SrcSysLglEntityModel = [];
  LOBFilter = {};
  sourceSystemFilter = {};
  drop3 = [];
  drop4 = [];
  scoreSelected = "dqriScore";
  scoreBySelected = "sourceSystem";
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
  constructor(internalControlService: InternalControlService) {
    this.service = internalControlService;
  }

  ngOnInit() {
    this.service.getData().then(dataaa => {
      this.dQPScoreModel = this.service.getQPModel();
      this.impactScoreModel = this.service.getImpactScoreModel();
      this.dqRIScoreModel = this.service.getdQScoreModel();
      this.isL1L2SrcSysLglEntityModel = this.service.getIsL1L2SrcSysLglEntityModel();

      this.updateChart1();
    });
  }

  updateChart1() {
    this.grid1config.data.datasets[0].data = [];
      this.grid1config.data.labels = [];
      for (var i in this.isL1L2SrcSysLglEntityModel) {
        if (this.isL1L2SrcSysLglEntityModel[i]) {
          var index = this.grid1config.data.labels.indexOf(
            this.isL1L2SrcSysLglEntityModel[i][this.scoreBySelected]
          );
          if (index !== -1) {
            this.grid1config.data.datasets[0].data[index] =
              parseFloat(this.grid1config.data.datasets[0].data[index]) +
              parseFloat(
                this.isL1L2SrcSysLglEntityModel[i][this.scoreSelected]
              );
          } else {
            this.grid1config.data.datasets[0].data.push(
              parseFloat(this.isL1L2SrcSysLglEntityModel[i][this.scoreSelected])
            );
            this.grid1config.data.labels.push(
              this.isL1L2SrcSysLglEntityModel[i][this.scoreBySelected]
            );
          }
        }
      }
      console.log(this.grid1config.data);
      this.chart1.chart.data = this.grid1config.data;
      this.chart1.chart.update();
  }
  filterData(e) {}
}
