import { Injectable } from '@angular/core';

@Injectable()
export class DataQualityMoniteringService {
dataQualityJsonObject = {
  "bcdeWithDQModel": {
      "header": "BCDE_WITH_DQ_MONITORING",
      "bcdeWithDQcore": "39"
  },
  "dQScoreModel": {
      "header": "DATA_QUALITY_SCORE",
      "dqScore": "83.39"
  },
  "ecdeWithDQModel": {
      "header": "ECDE_DQ_MNTR",
      "ecdeWithDQScore": "50"
  },
  "perstOfAdsProfileModel": [
      {
          "header": "% of ADS Profiled",
          "bucfName": "CAO",
          "adsCount": "1",
          "prQtr": "100",
          "crntQtr": "100"
      },
      {
          "header": "% of ADS Profiled",
          "bucfName": "QS",
          "adsCount": "1",
          "prQtr": "100",
          "crntQtr": "100"
      },
     
  ],
  "dQMonitoringDetailsbySourceSystem": [
      {
          "databaseName": "HR GDW",
          "ads": "Archer",
          "bucfName": "CD",
          "dataQualityScore": "99.99",
          "chgFrmPrQtr": "50.03",
          "rcrdsPsd": "5458.0",
          "rowsTstd": "5459.0",
          "header": "DQ_MONITORING_BY_SOURCE_SYSTEM"
      },
     
  ],
  "eCDEandBCDEwithDQmonitoringbyADS": [
      {
          "ads": "Insurance ...",
          "bucfName": "CD",
          "yearQtr": "Nov-Dec 2010",
          "bcdeTot": "1",
          "ecdeTot": "1",
          "header": "ECDE_AND_BCDE_WITH_DQ_MONITORING_BY_ADS"
      }
  ]
};
  constructor() { }

  getDataQualityModel(){
    return this.dataQualityJsonObject.dQScoreModel;
  }

}
