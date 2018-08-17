import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class KeyHilightsService {
  keyHighlightsJsonObject = {};
  private rootURL = environment.root_Url;
  private refreshURL = environment.refreshURL;
  private KeyHighlightsJSON = environment.KeyHighlightsJSON;
  //private url = 'KeyHighlights.json';
  private refreshUrl = this.refreshURL + "refreshDashboardEndPoint";
  private url = this.rootURL + this.KeyHighlightsJSON + new Date().getTime();

  
  constructor(private httpc: HttpClient) {
    this.getData().then(data => {
      this.keyHighlightsJsonObject = data;
    });
  }
  getData() {
     this.url = this.rootURL + this.KeyHighlightsJSON + new Date().getTime();
    return new Promise(resolve => {
      let headers = new HttpHeaders();
      headers.append('no-cache', 'true');
      this.httpc.get(this.url, { headers }).subscribe(
        data => {
          resolve(data);
          this.keyHighlightsJsonObject = data;
        },
        err => {
          console.error(err);
        }
      );
    });
  }
  getdataQualityMoniteringData() {
    return this.keyHighlightsJsonObject['dataQualityMonitering'];
  }
  getdQRIAndDQPScoresData() {
    return this.keyHighlightsJsonObject['dQRIAndDQPScores'];
  }

  getlistOfDQMoniteringStatsData() {
    return this.keyHighlightsJsonObject['listOfDQMoniteringStats'];
  }
  getlistOfHighPriorityDQIssuesData() {
    return this.keyHighlightsJsonObject['listOfHighPriorityDQIssues'];
  }
  getopenDQIssuesData() {
    return this.keyHighlightsJsonObject['openDQIssues'];
  }

  getRefreshedData() {
    return new Promise(resolve => {
      let headers = new HttpHeaders();
      headers.append('no-cache', 'true');
      headers.append("Access-Control-Allow-Origin", "*");
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
