import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InternalControlService {
  internalControlsJsonObject = {};
  // just change this url to point to the service
  private url = 'InternalControls.json';
  constructor(private httpc: HttpClient) {
      this.getData().then((data) => {
          this.internalControlsJsonObject = data;
      });
        }
  getData() {
      console.log("inside service Internal Controls")
      return new Promise(resolve => {
          this.httpc.get(this.url).subscribe((data) => { resolve(data); this.internalControlsJsonObject = data; }, err => { console.error(err); });
      });
  }
  getImpactScoreModel() {

      return this.internalControlsJsonObject['impactScoreModel'];
  }
  getdQScoreModel() {
      return this.internalControlsJsonObject['dQRIScoreModel'];
  }
  getQPModel() {
      return this.internalControlsJsonObject['dQPScoreModel'];
  }

}
