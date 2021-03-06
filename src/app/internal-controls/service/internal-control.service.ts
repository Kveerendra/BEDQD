import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class InternalControlService {
  internalControlsJsonObject = {};
  // just change this url to point to the service
  private rootURL = environment.root_Url;
  private refreshURL = environment.refreshURL;
  private InternalControlJSON = environment.InternalControlJSON;
  private refreshUrl = this.refreshURL + "refreshDashboardEndPoint";
  //private url = 'InternalControls.json';
  private url = this.rootURL + this.InternalControlJSON + new Date().getTime();
  
  constructor(private httpc: HttpClient) {
    if (this.internalControlsJsonObject === {}) {
      this.getData(null).then(data => {
        this.internalControlsJsonObject = data;
      });
    }
  }
  setData(data) {
    this.internalControlsJsonObject = data;
  }
  getData(refreshCall:string) {
    this.url = this.rootURL + this.InternalControlJSON + new Date().getTime();
    return new Promise(resolve => {
      let headers = new HttpHeaders();
      headers.append('no-cache', 'true');
      if (Object.keys(this.internalControlsJsonObject).length <= 0 || refreshCall == 'refreshCall') {
        this.httpc.get(this.url,{headers}).subscribe(
          data => {
            resolve(data);
            this.internalControlsJsonObject = data;
          },
          err => {
            console.error(err);
          }
        );
      } else {
        resolve(this.internalControlsJsonObject);
      }
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
  getDqriDQPImpactScoreL1L2SrcLegalModel() {
    return this.internalControlsJsonObject[
      'dqriDQPImpactScoreL1L2SrcLegalModel'
    ];
  }
  getEcdeCntL1SrcSysLegalEntityModel() {
    return this.internalControlsJsonObject['ecdeCntL1SrcSysLegalEntityModel'];
  }
  getEcdeCntL2SrcSysLegalEntityModel() {
    return this.internalControlsJsonObject['ecdeCntL2SrcSysLegalEntityModel'];
  }
  getImpactScoreL1L2SrcLegalEntityModel() {
    return this.internalControlsJsonObject[
      'impactScoreL1L2SrcLegalEntityModel'
    ];
  }
  getImpactScoreL2SrcSystemLegalEntityLOBModel() {
    return this.internalControlsJsonObject[
      'impactScoreL2SrcSystemLegalEntityLOBModel'
    ];
  }
  getImpactScoreSrcSysSrcSystemLegalEntityLOBModel() {
    return this.internalControlsJsonObject[
      'impactScoreSrcSysSrcSystemLegalEntityLOBModel'
    ];
  }
  getEcdeCountEcdeRecords() {
    return this.internalControlsJsonObject['ecdeCountEcdeRecords'];
  }
  getImpactScoreL1SrcSystemLegalEntityLOBModel() {
    return this.internalControlsJsonObject[
      'impactScoreL1SrcSystemLegalEntityLOBModel'
    ];
  }

  getImpactScroreForLegalEntityLOBSourceSystemLegalEntityLOB() {
    return this.internalControlsJsonObject[
      'impactScroreForLegalEntityLOBSourceSystemLegalEntityLOB'
    ];
  }
  getECDECountForLegalEntityLOBSourceSystemLegalEntityLOB() {
    return this.internalControlsJsonObject[
      'eCDECountForLegalEntityLOBSourceSystemLegalEntityLOB'
    ];
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
