import { Component, OnInit } from '@angular/core';
import { InternalControlService } from '../service/internal-control.service';

@Component({
  selector: 'app-internal-controls-page',
  templateUrl: './internal-controls-page.component.html',
  styleUrls: ['./internal-controls-page.component.css']
})
export class InternalControlsPageComponent implements OnInit {
  impactScoreModel = {};
  dQPScoreModel = {};
  dqRIScoreModel = {};
  LOBFilter = {};
  sourceSystemFilter = {};
  drop3 = [];
  drop4 = [];
  grid1config = {
    type: 'horizontalBar',
    data: {
      labels: ['a', 'b', 'c', 'd'],
      datasets: [
      {
        label: '<30',
        data: [0, 59, 75, 20],
        backgroundColor: '#0086b3',
        hoverBackgroundColor: '#0086b3'
      }]
    },
    options: {
      legend: {
        display: false
      }
    }
  };
  grid2config = {
    type: 'bar',
    data: {
      labels: ['a', 'b', 'c', 'd'],
      datasets: [{
        label: '<30',
        data: [0, 59, 75, 20],
        backgroundColor: '#0086b3',
        hoverBackgroundColor: '#0086b3'
      }]
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
    });
  }
  filterData(e) {}
}
