import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-label-percentage',
  templateUrl: './label-percentage.component.html',
  styleUrls: ['./label-percentage.component.css']
})
export class LabelPercentageComponent implements OnInit {
  @Input() label: String;
  @Input() percentage: Number;

  @Input() NoPFlag: boolean;
  constructor() {
    if (this.NoPFlag === undefined) {
      this.NoPFlag = false;
    }
  }

  ngOnInit() {}
}
