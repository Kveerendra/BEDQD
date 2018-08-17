import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class DataQualityMoniteringService {
  dataQualityJsonObject = {};

  private rootURL = environment.root_Url;
  private refreshURL = environment.refreshURL;
  private datamonitoringJSON = environment.DataQualityJSON;
  private refreshUrl = this.refreshURL + "refreshDashboardEndPoint";
  //private url = 'DataQualityMonitoring.json';
  private url =this.rootURL+ this.datamonitoringJSON + new Date().getTime();
  constructor(private httpc: HttpClient) {
    this.getData().then(data => {
      this.dataQualityJsonObject = data;
    });
  }
  getData() {
    this.url = this.rootURL+ this.datamonitoringJSON + new Date().getTime();
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

  getRefreshedData() {
    return new Promise(resolve => {
      let headers = new HttpHeaders();
      headers.append('no-cache', 'true');
      this.httpc.get(this.refreshUrl, { headers }).subscribe(
        data => {
          resolve(data);
          console.log(data['header']);
        },
        err => {
          console.error(err);
        }
      );
    });
  }
}
