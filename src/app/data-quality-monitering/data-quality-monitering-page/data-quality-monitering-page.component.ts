import { Component, OnInit, Inject } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-data-quality-monitering-page',
  templateUrl: './data-quality-monitering-page.component.html',
  styleUrls: ['./data-quality-monitering-page.component.css'],
  providers: [ NgbDropdownConfig ]
})
export class DataQualityMoniteringPageComponent implements OnInit {
  drop1: String;
  drop2: String;
  drop3: String;
  drop4: String;
  drop5: String;
  constructor() {
    this.drop1 = 'Source System';
    this.drop2 = 'All';
    this.drop3 = 'All';
    this.drop4 = 'All';
    this.drop5 = 'ADS';
   }

  ngOnInit() {
  }

}
