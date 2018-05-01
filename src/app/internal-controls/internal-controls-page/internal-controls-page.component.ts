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
  service: InternalControlService;
  constructor(internalControlService: InternalControlService) {
    this.service = internalControlService;
  }

  ngOnInit() {

    this.service.getData().then((dataaa) => {

      this.dQPScoreModel = this.service.getQPModel();
      this.impactScoreModel = this.service.getImpactScoreModel();
      this.dqRIScoreModel = this.service.getdQScoreModel();

    });

  }
filterData(e) {

}
}
