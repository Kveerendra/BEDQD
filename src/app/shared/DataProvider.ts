import { Injectable } from "@angular/core";
import { InternalControlService } from "../internal-controls/service/internal-control.service";

@Injectable()
export class DataProvider {
  private internalControlurl = 'InternalControls.json';
    private internalControlsJsonObject = {};

    constructor(private internalControlService: InternalControlService) {

    }

    public getinternalControlsJsonObject() {
        return this.internalControlsJsonObject;
    }

    loadinternalControlsJsonObject() {
      return this.internalControlService.getData();
    }
}
