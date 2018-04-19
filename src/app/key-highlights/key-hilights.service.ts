import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class KeyHilightsService {
	keyHighlightsJsonObject = {};
	 private url = 'KeyHighlights.json';
      constructor(private httpc: HttpClient) {
        this.getData().then((data) => {
            this.keyHighlightsJsonObject = data;
        });
          }
    getData() {
        return new Promise(resolve => {
            this.httpc.get(this.url).subscribe((data) => { resolve(data); this.keyHighlightsJsonObject = data; }, err => { console.error(err); });
        });
    }
  getdataQualityMoniteringData(){
    return this.keyHighlightsJsonObject['dataQualityMonitering'];
  }
  getdQRIAndDQPScoresData(){
   return this.keyHighlightsJsonObject['dQRIAndDQPScores'];
  }

  getlistOfDQMoniteringStatsData(){
    return this.keyHighlightsJsonObject['listOfDQMoniteringStats'];
  }
  getlistOfHighPriorityDQIssuesData(){
    return this.keyHighlightsJsonObject['listOfHighPriorityDQIssues'];
  }
 getopenDQIssuesData(){
    return this.keyHighlightsJsonObject['openDQIssues'];
  } 
}
