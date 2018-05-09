import { Component, OnInit, Input } from '@angular/core';
import { KeyHilightsService } from '../key-hilights.service';

@Component({
  selector: 'app-dq-score',
  templateUrl: './dq-score.component.html',
  styleUrls: ['./dq-score.component.css']
})
export class DqScoreComponent implements OnInit {
  DqScoreModel = {};
  grid0loaded = false;
  dqscore: String;
  changeFromPriorQuarter: String;
  service: KeyHilightsService;
  constructor(keyHighlightsService: KeyHilightsService) {
    this.service = keyHighlightsService;
  }
  ngOnInit() {
    this.service.getData().then(dataaa => {
      this.DqScoreModel = this.service.getdataQualityMoniteringData();
      this.dqscore = this.DqScoreModel['dqScore'].toString() + ' %';
      this.changeFromPriorQuarter =
        this.DqScoreModel['changeFromPriorQuarter'].toString() + ' %';
      this.grid0loaded = true;
    });
  }
}
