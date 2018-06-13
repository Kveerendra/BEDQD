import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class DataQualityMoniteringService {
  dataQualityJsonObject = {};

  private rootURL = environment.root_Url;
  private datamonitoringJSON = environment.DataQualityJSON;
  //private url = 'DataQualityMonitoring.json';
  private url =this.rootURL+ this.datamonitoringJSON + new Date().getTime();
  constructor(private httpc: HttpClient) {
    this.getData().then(data => {
      this.dataQualityJsonObject = data;
    });
  }
  getData() {
    return new Promise(resolve => {
      let headers = new HttpHeaders();
      headers.append('no-cache', 'true');
      this.httpc.get(this.url,{ headers }).subscribe(
        data => {
          resolve(data);
          this.dataQualityJsonObject = data;
        },
        err => {
          console.error(err);
        }
      );
    });
  }
  getbcdeWithDQModel() {
    return this.dataQualityJsonObject['bcdeWithDQModel'];
  }
  getdQScoreModel() {
    return this.dataQualityJsonObject['dQScoreModel'];
  }
  getecdeWithDQModel() {
    return this.dataQualityJsonObject['ecdeWithDQModel'];
  }

  getperstOfAdsProfileModel() {
    return this.dataQualityJsonObject['perstOfAdsProfileModel'];
  }

  getdQMonitoringDetailsbySourceSystem() {
    return this.dataQualityJsonObject['dQMonitoringDetailsbySourceSystem'];
  }
  geteCDEandBCDEwithDQmonitoringbyADS() {
    return this.dataQualityJsonObject['eCDEandBCDEwithDQmonitoringbyADS'];
  }
}
