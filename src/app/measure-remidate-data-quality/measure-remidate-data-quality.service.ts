import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
@Injectable()
export class MeasureRemidateDQService {
    MeasureRemidateJsonObject = {};
    private rootURL = environment.root_Url;
    private MeasureRemidateJSON = environment.MeasureRemidateJSON;
    //private url = 'MeasureRemidateDQ.json';
    private url = this.rootURL + this.MeasureRemidateJSON + new Date().getTime();
    constructor(private httpc: HttpClient) {
        this.getData().then((data) => {
            this.MeasureRemidateJsonObject = data;
        });
    }
    getData() {
        return new Promise(resolve => {
            let headers = new HttpHeaders();
            headers.append('no-cache', 'true');
            if (Object.keys(this.MeasureRemidateJsonObject).length <= 0) {
                this.httpc.get(this.url,{ headers }).subscribe(
                    data => {
                        resolve(data);
                        this.MeasureRemidateJsonObject = data;
                    },
                    err => {
                        console.error(err);
                    }
                );
            } else {
                resolve(this.MeasureRemidateJsonObject);
            }


        });
    }
    getdataQualityScoreData() {
        return this.MeasureRemidateJsonObject['dqScoreModel'];
    }
    getopenDQPrioritySummary() {
        return this.MeasureRemidateJsonObject['openDQPriorityDtlsHighPr']['openDQPrioritySummaryMap'];
    }
    getopenDQPriorityDtlsLowPr() {
        return this.MeasureRemidateJsonObject['openDQPriorityDtlsLowPr']['openDQPrioritySummaryMap'];
    }

    getissueSummaryLst() {
        return this.MeasureRemidateJsonObject['issueSummaryLst'];
    }

    getissueTypeDetails() {
        return this.MeasureRemidateJsonObject['issueTypeDetails']['openDQIssuesTypeDetailsMap'];
    }

    getopenDQPrioritySummaryMap() {
        return this.MeasureRemidateJsonObject['openDQPrioritySummary']['openDQPrioritySummaryMap'];

    }
}

