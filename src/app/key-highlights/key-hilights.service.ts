import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class KeyHilightsService {
  keyHighlightsJsonObject = {};
  private rootURL = environment.root_Url;
  private KeyHighlightsJSON = environment.KeyHighlightsJSON;
  //private url = 'KeyHighlights.json';
  private url = this.rootURL + this.KeyHighlightsJSON + new Date().getTime();
  constructor(private httpc: HttpClient) {
    this.getData().then(data => {
      this.keyHighlightsJsonObject = data;
    });
  }
  getData() {
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
}
