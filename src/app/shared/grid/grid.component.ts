import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  columnDefs;
  rowData;
  constructor() {
    this.columnDefs = [
      {headerName: "Make", field: "make" },
      {headerName: "Model", field: "model"},
      {headerName: "Price", field: "price"}
  ];

  this.rowData = [
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000}
  ]

   }

  ngOnInit() {
  }

}
