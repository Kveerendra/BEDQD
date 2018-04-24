import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataQualityMoniteringService {
    dataQualityJsonObject = {};
    // just change this url to point to the service
    private url = 'DataQualityMonitoring.json';
    constructor(private httpc: HttpClient) {
        this.getData().then((data) => {
            this.dataQualityJsonObject = data;
        });
          }
    getData() {
        console.log("inside service data Qulaity")
        return new Promise(resolve => {
            this.httpc.get(this.url).subscribe((data) => { 
            resolve(data); 
            this.dataQualityJsonObject = data;
            console.log(data) }, err => { console.error(err); });
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
