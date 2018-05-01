import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MeasureRemidateDQService {
    MeasureRemidateJsonObject = {};
    private url = 'MeasureRemidateDQ.json';
    constructor(private httpc: HttpClient) {
        this.getData().then((data) => {
            this.MeasureRemidateJsonObject = data;
        });
    }
    getData() {
        return new Promise(resolve => {
            this.httpc.get(this.url).subscribe((data) => { resolve(data); this.MeasureRemidateJsonObject = data; }, err => { console.error(err); });
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

    getissueSummaryLst(){
        return this.MeasureRemidateJsonObject['issueSummaryLst'];
    }

    getissueTypeDetails(){
        return this.MeasureRemidateJsonObject['issueTypeDetails']['openDQIssuesTypeDetailsMap'];
    }

    getopenDQPrioritySummaryMap(){
        return this.MeasureRemidateJsonObject['openDQPrioritySummary']['openDQPrioritySummaryMap'];
        
    }
}

