import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { KeyHilightsService } from '../key-hilights.service';

@Component({
  selector: 'app-key-highlights-page',
  templateUrl: './key-highlights-page.component.html',
  styleUrls: ['./key-highlights-page.component.css'],
  providers: [NgbDropdownConfig,KeyHilightsService]
})
export class KeyHighlightsPageComponent implements OnInit {
  grid1config = {
    type: 'pie',
    data: {
      labels: ["Data"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784,433]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
  };
  grid2config = {
    type: 'pie',
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784,433]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
  };
  grid3config = {
    type: 'horizontalBar',
    data: {
        labels: ["ECDEs", "BCDEs"],
        
        datasets: [{
            label:"Not DQ Monitered",
            data: [39, 51],
            backgroundColor: "#006622",
            hoverBackgroundColor: "#006622"
        },{
            label:"DQ Monitered",
            data: [61, 49],
            backgroundColor: " #004080",
            hoverBackgroundColor: " #004080"
        }]
    },
    options: {
    scales: {
        xAxes: [{
            ticks: {
                beginAtZero:true,
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
            },
            scaleLabel:{
                display:true
            },
            gridLines: {
            }, 
            stacked: true
        }],
        yAxes: [{
            gridLines: {
                display:false,
                color: "#fff",
                zeroLineColor: "#fff",
                zeroLineWidth: 0
            },
            ticks: {
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
            },
            stacked: true
        }]
    },
    legend:{
        display:true
    },
}
  };

grid4config = {
    type: 'bar',
    data: {
      labels: ['Jul-Sep 2014', 'Oct-Dec 2014'],
      datasets: [
        {
          label: '<30 days',
          data: [35, 20],
          stack: 'Stack 0',
          backgroundColor: ' #004080',
        },
        {
          label: '60 days',
          data: [30, 15],
          stack: 'Stack 0',
          backgroundColor: '#00b33c'
        },
        {
          label: '30-60 days',
          data: [25, 9],
          stack: 'Stack 0',
          backgroundColor: '#85e085'
        }
      ]
    },
    options: {
      responsive: true
    }
  };
  constructor(service: KeyHilightsService) {
    this.grid1config.data.labels = service.getGrid1Data();
    this.grid2config.data.labels = service.getGrid2Data();
   }

  ngOnInit() {
  }

}
