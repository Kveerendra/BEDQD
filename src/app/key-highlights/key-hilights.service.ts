import { Injectable } from '@angular/core';

@Injectable()
export class KeyHilightsService {

  constructor() { }
  getGrid1Data(){
    return ["Africa", "Asia", "Europe", "Latin America", "North America"];
  }
  getGrid2Data(){
    return ["Africa", "Asia", "Europe", "Latin America", "North America"];
  }
}
