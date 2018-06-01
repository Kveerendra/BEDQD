import { Injectable } from "@angular/core";
import { MeasureRemidateDQService } from "../measure-remidate-data-quality/measure-remidate-data-quality.service";


@Injectable()
export class MeasureRemidiateDataProvider {
  private MeasureRemidatelurl = 'MeasureRemidateDQ.json';
    private MeasureRemidateJsonObject = {};

    constructor(private measureRemidateDQService: MeasureRemidateDQService) {

    }

    public getMeasureRemidateJsonObject() {
        return this.measureRemidateDQService;
    }

    public loadMeasureRemidateJsonObject() {
      return this.measureRemidateDQService.getData();
    }
}
