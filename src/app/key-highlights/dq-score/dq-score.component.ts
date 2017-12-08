import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dq-score',
  templateUrl: './dq-score.component.html',
  styleUrls: ['./dq-score.component.css']
})
export class DqScoreComponent implements OnInit {
  type = 'bar';
  data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: '0',
        data: [65, 59, 80, 81, 56, 55, 40],
        stack: 'Stack 0',
        backgroundColor: 'blue',
        options: {
          scales: {
              xAxes: [{
                  stacked: true
              }],
              yAxes: [{
                  stacked: true
              }]
          }
      }
      },
     /* {
        label: '1',
        data: [65, 59, 80, 81, 56, 55, 40],
        stack: 'Stack 0',
        backgroundColor: 'red',
        options: {
          scales: {
              xAxes: [{
                  stacked: true
              }],
              yAxes: [{
                  stacked: true
              }]
          }
      }
      },*/
      {
        label: '3',
        data: [65, 59, 80, 81, 56, 55, 40],
        stack: 'Stack 1',
        backgroundColor: 'green',
        options: {
          scales: {
              xAxes: [{
                  stacked: true
              }],
              yAxes: [{
                  stacked: true
              }]
          }
      }
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };
  constructor() { }

  ngOnInit() {
  }

}
